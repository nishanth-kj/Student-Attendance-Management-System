import numpy as np
import cv2
import face_recognition
from django.contrib.auth import get_user_model
from attendance.models import Log
from attendance.utils import decode_base64_image

User = get_user_model()

class AttendanceService:
    @staticmethod
    def log_to_dict(log):
        """Manual serialization for Log model"""
        return {
            'id': log.id,
            'user': log.user.id,
            'username': log.user.username,
            'student_name': log.user.username, # Or first_name if available
            'usn': log.user.usn,
            'timestamp': log.timestamp.isoformat()
        }

    @staticmethod
    def mark_attendance(image_data):
        if not image_data:
            return {'error': 'No image data provided', 'status_code': 400}

        frame = decode_base64_image(image_data)
        if frame is None:
            return {'error': 'Invalid image data', 'status_code': 400}

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        if not face_encodings:
            return {'error': 'No face detected', 'status_code': 400}

        live_encoding = face_encodings[0]
        users = User.objects.exclude(face_embedding__isnull=True)
        known_encodings = [np.frombuffer(u.face_embedding, dtype=np.float64) for u in users]
        
        if not known_encodings:
            return {'error': 'No registered users with face data', 'status_code': 400}

        matches = face_recognition.compare_faces(known_encodings, live_encoding)
        face_distances = face_recognition.face_distance(known_encodings, live_encoding)
        
        if any(matches):
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                user = list(users)[best_match_index]
                Log.objects.create(user=user)
                return {
                    'status': 'success',
                    'username': user.username,
                    'usn': user.usn if hasattr(user, 'usn') else 'N/A',
                    'role': user.role,
                    'message': f'Attendance marked for {user.username}',
                    'status_code': 200
                }

        return {'error': 'No match found', 'status_code': 404}

    @staticmethod
    def get_logs(usn=None):
        if usn:
            logs = Log.objects.filter(user__usn=usn).order_by('-timestamp')
        else:
            logs = Log.objects.all().order_by('-timestamp')
        
        return [AttendanceService.log_to_dict(l) for l in logs]
