from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .user_service import UserService
from config.utils.services import BaseService

class AuthService(BaseService):
    @classmethod
    def login_user(cls, username, password):
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserService.user_to_dict(user)
            }
            return cls.success(data, "Login successful")
        return cls.failure("Invalid credentials", status_code=401)
