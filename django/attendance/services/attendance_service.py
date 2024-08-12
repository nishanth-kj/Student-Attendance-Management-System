import numpy as np
from django.contrib.auth import get_user_model
from attendance.models import Log
from attendance.services.biometric_service import BiometricService
from config.utils.services import BaseService

User = get_user_model()

class AttendanceService(BaseService):
    @staticmethod
    def log_to_dict(log):
        """Manual serialization for Log model"""
        full_name = f"{log.user.first_name} {log.user.last_name}".strip()
        display_name = full_name if full_name else log.user.username
        
        return {
            'id': log.id,
            'user': log.user.id,
            'username': log.user.username,
            'student_name': display_name,
            'usn': log.user.usn,
            'timestamp': log.timestamp.isoformat()
        }

    @classmethod
    def mark_attendance(cls, image_data):
        if not image_data:
            return cls.failure("No image data provided")

        # 1. Extract Encoding using BiometricService
        encoding = BiometricService.extract_encoding(image_data)
        if encoding is None:
            return cls.failure("No face detected or invalid image")

        # 2. Identify User using BiometricService
        users = User.objects.filter(role='STUDENT').exclude(face_embedding__isnull=True)
        user = BiometricService.identify_user(encoding, users)

        if user:
            Log.objects.create(user=user)
            data = {
                'username': user.username,
                'usn': user.usn,
                'role': user.role,
                'name': f"{user.first_name} {user.last_name}".strip() or user.username,
            }
            return cls.success(data, f'Attendance marked for {user.username}')

        return cls.failure("No match found", status_code=404)

    @classmethod
    def get_logs(cls, usn=None):
        if usn:
            logs = Log.objects.filter(user__usn=usn).order_by('-timestamp')
        else:
            logs = Log.objects.all().order_by('-timestamp')
        
        return cls.success([cls.log_to_dict(l) for l in logs])

    @classmethod
    def get_analytics(cls):
        from django.db.models import Count
        from django.db.models.functions import TruncDate
        from django.utils import timezone
        
        today = timezone.now().date()
        total_students = User.objects.filter(role='STUDENT').count()
        today_attendance = Log.objects.filter(timestamp__date=today).values('user').distinct().count()
        
        # Monthly trend (last 30 days)
        last_30_days = timezone.now() - timezone.timedelta(days=30)
        daily_stats = Log.objects.filter(timestamp__gte=last_30_days) \
            .annotate(date=TruncDate('timestamp')) \
            .values('date') \
            .annotate(count=Count('user', distinct=True)) \
            .order_by('date')
        
        data = {
            'summary': {
                'total_students': total_students,
                'today_present': today_attendance,
                'attendance_rate': (today_attendance / total_students * 100) if total_students > 0 else 0
            },
            'trends': list(daily_stats)
        }
        return cls.success(data)
