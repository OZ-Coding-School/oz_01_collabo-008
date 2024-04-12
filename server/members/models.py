from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)


class MemberManager(BaseUserManager): 
    def _create_member(self, email: str, password: str, **extra_fields):
        if not email:
            raise ValueError('이메일은 필수 입력 항목입니다.')
        email = self.normalize_email(email)
        member = self.model(email=email, **extra_fields)
        member.set_password(password)
        member.save(using=self._db)
        return member

    def create_member(self, email: str, password: str, **extra_fields):
        if extra_fields.get("is_superuser") is True:
            raise ValueError("일반유저를 슈퍼유저로 생성할 수 없습니다")
        return self._create_member(email, password, **extra_fields)

    def create_superuser(self, email: str, password: str, **extra_fields):
        superuser = self._create_member(email, password, **extra_fields)
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.save(using=self._db)
        return superuser


class Member(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    image = models.URLField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    objects = MemberManager()

    def __str__(self) -> str:
        return f"{self.email} / {self.name}"
