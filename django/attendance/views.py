from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.services import UserService
from .services import AttendanceService
from .permissions import IsStaff, IsStaffOrReadOnly, IsAdmin
from config.utils import ApiSuccessResponse, ApiErrorResponse

class StudentListView(APIView):
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
        return ApiErrorResponse(result.error, result.message, status_code=result.status_code)

class StudentDetailView(APIView):
    permission_classes = [IsStaff]

    def get(self, request, usn):
        result = UserService.get_student_by_usn(usn)
        if result.is_success:
            return ApiSuccessResponse(result.data)
        return ApiErrorResponse(result.error, status_code=result.status_code)

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
        
        if result.is_success:
            return ApiSuccessResponse(result.data, result.message)
        return ApiErrorResponse(result.error, status_code=result.status_code)

class AttendanceLogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role == 'STUDENT':
            result = AttendanceService.get_logs(usn=request.user.usn)
        else:
            usn = request.query_params.get('usn')
            result = AttendanceService.get_logs(usn)
        
        if not result.is_success:
            return ApiErrorResponse(result.error, status_code=result.status_code)
            
        logs = result.data
        
        if request.query_params.get('format') == 'csv':
            from django.http import HttpResponse
            import csv
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="attendance_report.csv"'
            
            writer = csv.writer(response)
            writer.writerow(['Username', 'USN', 'Timestamp'])
            for log in logs:
                writer.writerow([log.get('username'), log.get('usn'), log.get('timestamp')])
            return response
            
        return ApiSuccessResponse(logs)

class AttendanceAnalyticsView(APIView):
    permission_classes = [IsStaff]

    def get(self, request):
        result = AttendanceService.get_analytics()
        if result.is_success:
            return ApiSuccessResponse(result.data)
        return ApiErrorResponse(result.error)
