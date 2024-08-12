from django.conf import settings
from .responses import ApiStatus

class ServiceResult:
    """Standardized result for service operations"""
    def __init__(self, status=ApiStatus.SUCCESS, data=None, error=None, message=None, status_code=200):
        self.status = status
        self.data = data
        self.error = error
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {
            'status': self.status,
            'data': self.data,
            'error': self.error,
            'message': self.message,
            'status_code': self.status_code
        }

    @property
    def is_success(self):
        return self.status == ApiStatus.SUCCESS

class BaseService:
    """Base class for all business logic services"""
    
    @staticmethod
    def success(data=None, message="Success", status_code=200):
        return ServiceResult(status=ApiStatus.SUCCESS, data=data, message=message, status_code=status_code)

    @staticmethod
    def failure(error="An error occurred", message="Error", status_code=400):
        return ServiceResult(status=ApiStatus.ERROR, error=error, message=message, status_code=status_code)
