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

    def update(self, instance, validated_data):
        if validated_data.get("password") is not None:
            passowrd = validated_data["password"]
            validated_data["password"] = make_password(passowrd)
        return super().update(instance, validated_data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, member: Member) -> Token:
        token = super().get_token(member)

        token["id"] = member.id
        token["email"] = member.email
        token["name"] = member.name

        return token