from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from attendance.permissions import IsAdmin, IsStaff
from .services import UserService, AuthService
from config.utils import ApiSuccessResponse, ApiErrorResponse

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        result = UserService.create_user(
            username=request.data.get('username'),
            password=request.data.get('password'),
            email=request.data.get('email', ''),
            role=request.data.get('role', 'STAFF'),
            usn=request.data.get('usn')
        )
        if result.is_success:
            return ApiSuccessResponse(result.data, result.message, status.HTTP_201_CREATED)
        return ApiErrorResponse(result.error, result.message, status_code=result.status_code)

class DemoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        data = {
            "roles": [
                {
                    "title": "Administrator",
                    "description": "Full access to manage staff, students, and system settings.",
                    "username": "admin",
                    "password": "admin123",
                    "capabilities": ["All system features", "Staff Management", "Student Management", "System Logs"]
                },
                {
                    "title": "Faculty Member",
                    "description": "Access to manage students and export attendance reports.",
                    "username": "prof_jane",
                    "password": "password123",
                    "capabilities": ["Student Enrollment", "View Attendance", "CSV Export", "Class Analytics"]
                },
                {
                    "title": "Student",
                    "description": "Access to personal attendance records and check-in history.",
                    "username": "student_1",
                    "password": "password123",
                    "capabilities": ["Personal Dashboard", "Attendance History", "Biometric Check-in Status"]
                }
            ],
            "note": "Use these credentials to explore the system functionality."
        }
        return ApiSuccessResponse(data)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        result = AuthService.login_user(username, password)
        if result.is_success:
            return ApiSuccessResponse(result.data, result.message)
        return ApiErrorResponse(result.error, status_code=result.status_code)

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = UserService.user_to_dict(request.user)
        return ApiSuccessResponse(user_data)

class StaffListCreateView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        result = UserService.get_staff_list()
        return ApiSuccessResponse(result.data)

    def post(self, request):
        result = UserService.create_user(
            username=request.data.get('username'),
            password=request.data.get('password'),
            email=request.data.get('email', ''),
            role='STAFF',
            image_input=request.data.get('image_input')
        )
        if result.is_success:
            return ApiSuccessResponse(result.data, result.message, status.HTTP_201_CREATED)
        return ApiErrorResponse(result.error, status_code=result.status_code)

class StudentListCreateView(APIView):
    permission_classes = [IsStaff]

    def get(self, request):
        result = UserService.get_student_list()
        return ApiSuccessResponse(result.data)

    def post(self, request):
        result = UserService.create_user(
            username=request.data.get('username'),
            password=request.data.get('password'),
            email=request.data.get('email', ''),
            role='STUDENT',
            usn=request.data.get('usn'),
            image_input=request.data.get('image_input')
        )
        if result.is_success:
            return ApiSuccessResponse(result.data, result.message, status.HTTP_201_CREATED)
        return ApiErrorResponse(result.error, status_code=result.status_code)

class UserDetailView(APIView):
    permission_classes = [IsStaff]

    def get(self, request, pk):
        result = UserService.get_user_detail(pk)
        if not result.is_success:
            return ApiErrorResponse(result.error, status_code=result.status_code)
        
        user_data = result.data
        if request.user.role == 'ADMIN' or (request.user.role == 'STAFF' and user_data['role'] == 'STUDENT'):
            return ApiSuccessResponse(user_data)
        return ApiErrorResponse("Unauthorized", status_code=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        result = UserService.delete_user(pk)
        if result.is_success:
             return ApiSuccessResponse(None, result.message, status_code=status.HTTP_204_NO_CONTENT)
        return ApiErrorResponse(result.error, status_code=result.status_code)
