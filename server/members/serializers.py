from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token

from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = "__all__"

    def create(self, validated_data):
        if validated_data["name"]:
            member = Member.objects.create_user(
                email = validated_data["email"],
                password = validated_data["password"],
                name = validated_data["name"]
            )
            return member
        member = Member.objects.create_user(
            email = validated_data["email"],
            password = validated_data["password"]
        )
        return member


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, member: Member) -> Token:
        token = super().get_token(member)

        token['email'] = member.email
        token['name'] = member.name

        return token