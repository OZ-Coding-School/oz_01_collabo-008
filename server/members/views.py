from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, NotAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse

from .models import Member
from .serializers import MemberSerializer, LogoutSerializer, MyTokenObtainPairSerializer
from config.settings import env

import boto3


class RegisterMember(APIView):
    permission_classes = [AllowAny]
    serializer_class = MemberSerializer

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
        serializer = self.serializer_class(data=request.data)
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
    serializer_class = MemberSerializer

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
            serializer = self.serializer_class(member)
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

        if 'access' in response.data:
            access_token = response.data['access']
            response.set_cookie(key='access_token', value=access_token)
        return response


class LogoutView(APIView):
    serializer_class = LogoutSerializer

    def post(self, request):
        refresh_token = request.data["refresh"]
        if refresh_token is None:
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
            return response
        except Exception as e:
            return Response(
                data={
                    "error_message": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class MemberDetailView(APIView):
    serializer_class = MemberSerializer

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

    def get(self, request):
        member_id = get_member_id(request=request)
        member = self.get_member(request=request, member_id=member_id)
        if member:
            serializer = self.serializer_class(member)
            response = {
                "status_code": 200,
                "message": "Success",
                "member": serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(
            data={
                "status_code": 400,
                "message": "BAD_REQEUST",
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request):
        member_id = get_member_id(request=request)
        member = self.get_member(request=request, member_id=member_id)
        if member is None:
            return Response(
                data={
                    "status_code": 400,
                    "message": "BAD_REQEUST",
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = self.serializer_class(member, data=request.data, partial=True)
        if serializer.is_valid():
            member = serializer.save()
            serializer = self.serializer_class(member)
            response = {
                "status_code": 201,
                "message": "Success",
                "member": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        member_id = get_member_id(request=request)
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


class UploadProfileImageView(APIView):
    def upload_image_to_naver_cloud(self, image_file, member_id):
        try:
            ncloud = boto3.client(
                's3',
                endpoint_url=env('NCLOUD_ENDPOINT_URL'),
                aws_access_key_id=env("NCLOUD_ACCESS_KEY"),
                aws_secret_access_key=env("NCLOUD_SECRET_KEY"),
                region_name=env("NCLOUD_REGION_NAME")
            )
            bucket_name = env("NCLOUD_BUCKET_NAME")
            file_name = f"{member_id}_{image_file.name}"
            ncloud.upload_fileobj(image_file, bucket_name, file_name)
            image_url = f"{env('NCLOUD_ENDPOINT_URL')}/{bucket_name}/{file_name}"
            return image_url
        except Exception as e:
            return f"error: {str(e)}"

    def post(self, request):
        image_file = request.FILES.get('image')

        if not image_file:
            return Response(
                data={
                    "status_code": 400,
                    "message": "No image provided"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        member_id = get_member_id(request)
        member = Member.objects.filter(pk=member_id).first()
        if member is None:
            return Response(
                data={
                    "status_code": 400,
                    "message": "BAD_REQEUST",
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        image_url = self.upload_image_to_naver_cloud(image_file, member_id)
        if "error" not in image_url:
            member.image = image_url
            member.save()
        
            return Response(
                data={
                    "status_code": 200,
                    "message": "Success"
                },
                status=status.HTTP_200_OK
            )
        return Response(
                data={
                    "status_code": 500,
                    "message": image_url
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@staticmethod
def get_member_id(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise AuthenticationFailed("인증 헤더가 제공되지 않았습니다.")

    try:
        token_type, token = auth_header.split()
        if token_type != 'Bearer':
            raise AuthenticationFailed("잘못된 토큰 타입입니다.")
        
        access_token = AccessToken(token)
        member_id = access_token.payload.get("id")
        
        return member_id
    except ValueError:
        raise AuthenticationFailed("잘못된 토큰 형식입니다.")
    except Exception as e:
        raise AuthenticationFailed("잘못된 토큰입니다.")
