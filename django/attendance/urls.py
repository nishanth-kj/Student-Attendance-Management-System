from django.urls import path
from .views import StudentListView, StudentDetailView, AttendanceMarkView, AttendanceLogView, AttendanceAnalyticsView

urlpatterns = [
    path('students/', StudentListView.as_view(), name='student_list'),
    path('students/<str:usn>/', StudentDetailView.as_view(), name='student_detail'),
    path('mark/', AttendanceMarkView.as_view(), name='mark_attendance'),
    path('logs/', AttendanceLogView.as_view(), name='get_logs'),
    path('analytics/', AttendanceAnalyticsView.as_view(), name='attendance_analytics'),
]
