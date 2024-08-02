import base64
import uuid
from django.utils import timezone

class SystemUtils:
    @staticmethod
    def generate_unique_filename(extension="jpg"):
        return f"{uuid.uuid4()}.{extension}"

    @staticmethod
    def get_current_timestamp():
        return timezone.now().isoformat()

    @staticmethod
    def format_date(dt):
        if not dt:
            return None
        return dt.strftime("%Y-%m-%d %H:%M:%S")

    @staticmethod
    def is_base64_image(data):
        if not isinstance(data, str):
            return False
        return data.startswith('data:image/')
