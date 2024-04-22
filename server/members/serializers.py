from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from django.contrib.auth.hashers import make_password

from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ("id", "email", "password", "name", "image", "created_at", "updated_at")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        if validated_data.get("name") is not None:
            member = Member.objects.create_member(
                email = validated_data["email"],
                password = validated_data["password"],
                name = validated_data["name"]
            )
            return member
        member = Member.objects.create_member(
            email = validated_data["email"],
            password = validated_data["password"]
        )
        return member


class MemberUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Member
        fields = ("id", "email", "password", "name", "image", "created_at", "updated_at")

    def update(self, instance, validated_data):
        if validated_data.get("name") is not None and validated_data.get("name") != "":
            instance.name = validated_data.get("name")

        if validated_data.get("password") is not None and validated_data.get("password") != "":
            password = validated_data["password"]
            instance.password = make_password(password)

        instance.save()
        return instance


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField(required=True)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, member: Member) -> Token:
        token = super().get_token(member)

        token["id"] = member.id
        token["email"] = member.email
        token["name"] = member.name

        return token