from django.urls import path
from .views import (
    RegisterMember,
    LoginView,
    LogoutView,
    MemberDetailView,
    RefreshTokenView,
    UploadProfileImageView
)


urlpatterns = [
    path('register', RegisterMember.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('login/refresh', RefreshTokenView.as_view(), name='token-refresh'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('detail', MemberDetailView.as_view(), name='member-detail'),
    path('image-upload', UploadProfileImageView.as_view(), name='image-upload'),
]