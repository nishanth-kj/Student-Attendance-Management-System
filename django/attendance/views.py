from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.permissions import IsStaffUser
from accounts.services import UserService
from .services import AttendanceService
import csv
from django.http import HttpResponse
from config.utils import ApiSuccessResponse, ApiErrorResponse

class StudentListView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request):
        students = UserService.get_student_list()
        return ApiSuccessResponse(students)

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
            return ApiSuccessResponse(user_data, "Student enrolled successfully", status.HTTP_201_CREATED)
        except Exception as e:
            return ApiErrorResponse(str(e))

class StudentDetailView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request, usn):
        student_data = UserService.get_student_by_usn(usn)
        if student_data:
            return ApiSuccessResponse(student_data)
        return ApiErrorResponse("Student not found", status_code=status.HTTP_404_NOT_FOUND)

    def delete(self, request, usn):
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            student = User.objects.get(usn=usn, role='STUDENT')
            student.delete()
            return ApiSuccessResponse(None, "Student deleted", status_code=status.HTTP_204_NO_CONTENT)
        except Exception:
            return ApiErrorResponse("Student not found", status_code=status.HTTP_404_NOT_FOUND)

class AttendanceMarkView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        image_data = request.data.get('image')
        result = AttendanceService.mark_attendance(image_data)
        
        if result.get('status') == 1:
            return ApiSuccessResponse(result, "Attendance marked")
        return ApiErrorResponse(result.get('error', 'Match failed'), status_code=result.get('status_code', 400))

class AttendanceLogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role == 'STUDENT':
            logs = AttendanceService.get_logs(usn=request.user.usn)
        else:
            usn = request.query_params.get('usn')
            logs = AttendanceService.get_logs(usn)
        
        if request.query_params.get('format') == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="attendance_report.csv"'
            
            writer = csv.writer(response)
            writer.writerow(['Username', 'USN', 'Timestamp'])
            for log in logs:
                writer.writerow([log.get('username'), log.get('usn'), log.get('timestamp')])
            return response
            
        return ApiSuccessResponse(logs)

class AttendanceAnalyticsView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request):
        analytics = AttendanceService.get_analytics()
        return ApiSuccessResponse(analytics)
