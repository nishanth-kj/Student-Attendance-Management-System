from rest_framework.response import Response
from rest_framework import status

class ApiStatus:
    SUCCESS = 1
    ERROR = 0

class ApiResponse(Response):
    """
    Custom standardized API response class.
    Format: { "status": int (1/0), "data": Any, "message": str, "error": Any }
    """
    def __init__(self, data=None, message=None, success=True, error=None, status_code=status.HTTP_200_OK, **kwargs):
        response_data = {
            "status": ApiStatus.SUCCESS if success else ApiStatus.ERROR,
            "message": message or ("Success" if success else "Error"),
            "data": data,
            "error": error
        }
        super().__init__(data=response_data, status=status_code, **kwargs)

class ApiErrorResponse(ApiResponse):
    def __init__(self, error=None, message="An error occurred", status_code=status.HTTP_400_BAD_REQUEST, **kwargs):
        super().__init__(data=None, message=message, success=False, error=error, status_code=status_code, **kwargs)

class ApiSuccessResponse(ApiResponse):
    def __init__(self, data=None, message="Operation successful", status_code=status.HTTP_200_OK, **kwargs):
        super().__init__(data=data, message=message, success=True, error=None, status_code=status_code, **kwargs)
