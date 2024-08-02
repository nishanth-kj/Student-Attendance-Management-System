from django.urls import path
from .views import LoginView, UserInfoView, StaffListCreateView, StudentListCreateView, UserDetailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserInfoView.as_view(), name='user_info'),
    path('staff/', StaffListCreateView.as_view(), name='staff_list_create'),
    path('students/', StudentListCreateView.as_view(), name='student_user_list_create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
