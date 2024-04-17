from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, NotAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Member
from .serializers import MemberSerializer, MyTokenObtainPairSerializer


class RegisterMember(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        member = Member.objects.filter(email=email).first()
        if member:
            return Response(
                data={
                    "status_code": 409,
                    "message": "CONFLICT: member with this email already exists",
                }, 
                status=status.HTTP_409_CONFLICT
            )
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "result_code": 201,
                "result_message": "Success"
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        member = Member.objects.filter(email=email).first()

        if member is None:
            return Response(
                data={
                    "status_code": 401,
                    "message": "UNAUTHORIZED: permission expired or permission denied",
                }, 
                status=status.HTTP_401_UNAUTHORIZED
            )

        pw_chk = member.check_password(password)

        if pw_chk:
            serializer = MyTokenObtainPairSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            token = serializer.get_token(member)
            refresh_token = str(token)
            access_token = str(token.access_token)

            serializer = MemberSerializer(member)
            response = Response(
                data={
                    "status_code": 200,
                    "message": "Success",
                    "member": serializer.data,
                    "access": access_token,
                    "refresh": refresh_token
                },
                status=status.HTTP_200_OK,
            )

            response.set_cookie(key="access", value=access_token, httponly=False)
            response.set_cookie(key="refresh", value=refresh_token, httponly=False)

            return response
        return Response(
            data={
                "status_code": 401,
                "message": "UNAUTHORIZED: permission expired or permission denied",
            }, 
            status=status.HTTP_401_UNAUTHORIZED
        )


class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # 새로 발급된 토큰값을 쿠키에 설정합니다.
        if 'access' in response.data:
            access_token = response.data['access']
            response.set_cookie(key='access_token', value=access_token)
        return response


class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")
        if not refresh_token:
            return Response(
                data={
                    "detail": "No refresh token provided"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            refresh_token_obj = RefreshToken(refresh_token)
            refresh_token_obj.blacklist()
            response =  Response(
                data= { 
                    "status_code": 200,
                    "message": "Success"
                },
                status=status.HTTP_200_OK
            )
            response.delete_cookie("access")
            response.delete_cookie("refresh")
            return response
        except Exception as e:
            return Response(
                data={
                    "error_message": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class MemberDetailView(APIView):
    def get_member(self, request, member_id):
        try:
            jwt_authenticator = JWTAuthentication()
            response = jwt_authenticator.authenticate(request=request)
            if response is None:
                raise NotAuthenticated
            user , token = response
            member = Member.objects.filter(pk=member_id).first()
            if member_id == token.payload["id"]:
                return member
            raise NotAuthenticated
        except Member.DoesNotExist:
            raise NotFound

    def get(self, request, member_id):
        member = self.get_member(request=request, member_id=member_id)
        if member:
            serializer = MemberSerializer(member)
            response = {
                "status_code": 200,
                "message": "Success",
                "member": serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)

            # ACCESS_TOKEN = request.COOKIES.get("access")
            # REFRESH_TOKEN = request.COOKIES.get("refresh")

            # response.set_cookie("access", ACCESS_TOKEN, httponly=True)
            # response.set_cookie("refresh", REFRESH_TOKEN, httponly=True)

        return Response(
            data={
                "status_code": 400,
                "message": "BAD_REQEUST",
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, member_id):
        member = self.get_member(request=request, member_id=member_id)
        if member is None:
            return Response(
                data={
                    "status_code": 400,
                    "message": "BAD_REQEUST",
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = MemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            member = serializer.save()
            serializer = MemberSerializer(member)
            response = {
                "status_code": 201,
                "message": "Success",
                "member": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, member_id):
        member = self.get_member(request=request, member_id=member_id)
        if member is None:
            return Response(
                data={
                    "status_code": 400,
                    "message": "BAD_REQEUST",
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        member.delete()
        return Response(
            data={
                "status_code": 200,
                "message": "Success",
            },
            status=status.HTTP_200_OK
        )
