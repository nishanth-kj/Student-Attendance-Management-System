from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .user_service import UserService

class AuthService:
    @staticmethod
    def login_user(username, password):
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserService.user_to_dict(user)
            }
        return None
