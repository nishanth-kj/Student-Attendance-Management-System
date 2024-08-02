from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsAdminUser, IsStaffUser
from .services import UserService, AuthService

class DemoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
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
        })

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        result = AuthService.login_user(username, password)
        if result:
            return Response(result)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = UserService.user_to_dict(request.user)
        return Response(user_data)

class StaffListCreateView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        staff = UserService.get_staff_list()
        return Response(staff)

    def post(self, request):
        try:
            user_data = UserService.create_user(
                username=request.data.get('username'),
                password=request.data.get('password'),
                email=request.data.get('email', ''),
                role='STAFF',
                image_input=request.data.get('image_input')
            )
            return Response(user_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StudentListCreateView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request):
        students = UserService.get_student_list()
        return Response(students)

    def post(self, request):
        try:
            user_data = UserService.create_user(
                username=request.data.get('username'),
                password=request.data.get('password'),
                email=request.data.get('email', ''),
                role='STUDENT',
                usn=request.data.get('usn'),
                image_input=request.data.get('image_input')
            )
            return Response(user_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request, pk):
        try:
            user_data = UserService.get_user_detail(pk)
            if not user_data:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
            # Permission check: Admin or Staff managing Student
            if request.user.role == 'ADMIN' or (request.user.role == 'STAFF' and user_data['role'] == 'STUDENT'):
                return Response(user_data)
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        except Exception:
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user_obj = User.objects.get(pk=pk)
            
            if request.user.role == 'ADMIN' or (request.user.role == 'STAFF' and user_obj.role == 'STUDENT'):
                user_obj.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
