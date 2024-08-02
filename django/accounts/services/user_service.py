import base64
import io
from django.contrib.auth import get_user_model
from attendance.utils import get_face_encoding

User = get_user_model()

class UserService:
    @staticmethod
    def user_to_dict(user):
        """Manual serialization for User model"""
        image_data = None
        if user.image_blob:
            encoded = base64.b64encode(user.image_blob).decode('utf-8')
            image_data = f"data:image/{user.image_format or 'jpeg'};base64,{encoded}"
        
        # Combine names or fallback to username
        full_name = f"{user.first_name} {user.last_name}".strip()
        display_name = full_name if full_name else user.username

        return {
            'id': user.id,
            'username': user.username,
            'name': display_name,
            'email': user.email,
            'role': user.role,
            'usn': user.usn,
            'student_image': image_data,
            'staff_image': image_data
        }

    @staticmethod
    def create_user(username, password, email='', role=User.STAFF, usn=None, image_input=None):
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=role,
            usn=usn
        )
        
        if image_input:
            UserService.update_user_biometrics(user, image_input)
            
        return UserService.user_to_dict(user)

    @staticmethod
    def update_user_biometrics(user, image_input):
        if 'base64,' in image_input:
            format, imgstr = image_input.split(';base64,')
            ext = format.split('/')[-1]
            user.image_blob = base64.b64decode(imgstr)
            user.image_format = ext
            
            # Extract face embedding
            image_file = io.BytesIO(user.image_blob)
            encoding = get_face_encoding(image_file)
            if encoding is not None:
                user.face_embedding = encoding.tobytes()
            
            user.save()
        return user

    @staticmethod
    def get_staff_list():
        staff = User.objects.filter(role=User.STAFF)
        return [UserService.user_to_dict(u) for u in staff]

    @staticmethod
    def get_student_list():
        students = User.objects.filter(role=User.STUDENT)
        return [UserService.user_to_dict(u) for u in students]

    @staticmethod
    def get_user_detail(pk):
        try:
            user = User.objects.get(pk=pk)
            return UserService.user_to_dict(user)
        except User.DoesNotExist:
            return None

    @staticmethod
    def get_student_by_usn(usn):
        try:
            user = User.objects.get(usn=usn, role=User.STUDENT)
            return UserService.user_to_dict(user)
        except User.DoesNotExist:
            return None

    @staticmethod
    def delete_user(user_id):
        try:
            user = User.objects.get(pk=user_id)
            user.delete()
            return True
        except User.DoesNotExist:
            return False
