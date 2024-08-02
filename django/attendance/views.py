from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.permissions import IsStaffUser
from accounts.services import UserService
from .services import AttendanceService

class StudentListView(APIView):
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

class StudentDetailView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request, usn):
        student_data = UserService.get_student_by_usn(usn)
        if student_data:
            return Response(student_data)
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, usn):
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            student = User.objects.get(usn=usn, role='STUDENT')
            student.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

class AttendanceMarkView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        image_data = request.data.get('image')
        result = AttendanceService.mark_attendance(image_data)
        
        status_code = result.get('status_code', 200)
        return Response(result, status=status_code)

class AttendanceLogView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request):
        usn = request.query_params.get('usn')
        logs = AttendanceService.get_logs(usn)
        return Response(logs)
