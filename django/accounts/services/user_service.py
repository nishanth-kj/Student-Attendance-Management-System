import base64
import io
from django.contrib.auth import get_user_model
from config.utils.services import BaseService
from attendance.services.biometric_service import BiometricService

User = get_user_model()

class UserService(BaseService):
    @staticmethod
    def user_to_dict(user):
        """Manual serialization for User model"""
        image_data = None
        if user.image_blob:
            encoded = base64.b64encode(user.image_blob).decode('utf-8')
            image_data = f"data:image/{user.image_format or 'jpeg'};base64,{encoded}"
        
        full_name = f"{user.first_name} {user.last_name}".strip()
        display_name = full_name if full_name else user.username

        return {
            'id': user.id,
            'username': user.username,
            'name': display_name,
            'email': user.email,
            'role': user.role,
            'usn': user.usn,
            'image_url': image_data
        }

    @classmethod
    def create_user(cls, username, password, email='', role=User.STAFF, usn=None, image_input=None):
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                role=role,
                usn=usn
            )
            
            if image_input:
                cls.update_user_biometrics(user, image_input)
                
            return cls.success(cls.user_to_dict(user), "User created successfully", status_code=201)
        except Exception as e:
            return cls.failure(str(e), "Failed to create user")

    @staticmethod
    def update_user_biometrics(user, image_input):
        """
        Updates user's saved image and biometric face embedding.
        """
        if isinstance(image_input, str) and 'base64,' in image_input:
            format_part, imgstr = image_input.split(';base64,')
            ext = format_part.split('/')[-1]
            user.image_blob = base64.b64decode(imgstr)
            user.image_format = ext
            
            # Use BiometricService for face extraction
            encoding = BiometricService.extract_encoding(user.image_blob)
            if encoding is not None:
                user.face_embedding = encoding.tobytes()
            
            user.save()
        return user

    @classmethod
    def get_staff_list(cls):
        staff = User.objects.filter(role=User.STAFF)
        return cls.success([cls.user_to_dict(u) for u in staff])

    @classmethod
    def get_student_list(cls):
        students = User.objects.filter(role=User.STUDENT)
        return cls.success([cls.user_to_dict(u) for u in students])

    @classmethod
    def get_user_detail(cls, pk):
        try:
            user = User.objects.get(pk=pk)
            return cls.success(cls.user_to_dict(user))
        except User.DoesNotExist:
            return cls.failure("User not found", status_code=404)

    @classmethod
    def get_student_by_usn(cls, usn):
        try:
            user = User.objects.get(usn=usn, role=User.STUDENT)
            return cls.success(cls.user_to_dict(user))
        except User.DoesNotExist:
            return cls.failure("Student not found", status_code=404)

    @classmethod
    def delete_user(cls, user_id):
        try:
            user = User.objects.get(pk=user_id)
            user.delete()
            return cls.success(None, "User deleted")
        except User.DoesNotExist:
            return cls.failure("User not found", status_code=404)
