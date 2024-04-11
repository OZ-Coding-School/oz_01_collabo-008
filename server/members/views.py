from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, NotAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
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
                    "result_code": 409,
                    "result_message": "CONFLICT: member with this email already exists",
                }, 
                status=status.HTTP_409_CONFLICT
            )
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "result_code": 200,
                "result_message": "Success",
                "member": serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
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
                    "result_code": 401,
                    "result_message": "UNAUTHORIZED: permission expired or permission denied",
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
                    "result_code": 200,
                    "result_message": "Success",
                    "member": serializer.data
                },
                status=status.HTTP_200_OK,
            )

            # response.set_cookie("access", access_token, samesite=None, secure=False, httponly=False)
            # response.set_cookie("refresh", refresh_token, samesite=None, secure=False, httponly=False)
            response.set_cookie("access", access_token, httponly=False)
            response.set_cookie("refresh", refresh_token, httponly=False)

            return response
        return Response(
            data={
                "result_code": 401,
                "result_message": "UNAUTHORIZED: permission expired or permission denied",
            }, 
            status=status.HTTP_401_UNAUTHORIZED
        )


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
                    "result_code": 200,
                    "result_message": "Success"
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
    def get_member(self,request, member_id):
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
                "result_code": 200,
                "result_message": "Success",
                "member": serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(
            data={
                "result_code": 400,
                "result_message": "BAD_REQEUST",
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, member_id):
        member = self.get_member(request=request, member_id=member_id)
        if member is None:
            return Response(
                data={
                    "result_code": 400,
                    "result_message": "BAD_REQEUST",
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = MemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            member = serializer.save()
            serializer = MemberSerializer(member)
            response = {
                "result_code": 200,
                "result_message": "Success",
                "member": serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, member_id):
        member = self.get_member(request=request, member_id=member_id)
        if member is None:
            return Response(
                data={
                    "result_code": 400,
                    "result_message": "BAD_REQEUST",
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        member.delete()
        return Response(
            data={
                "result_code": 200,
                "result_message": "Success",
            },
            status=status.HTTP_200_OK
        )
