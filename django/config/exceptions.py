from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Standardize the error response format
        custom_data = {
            'error': response.data.get('detail', 'An error occurred'),
            'status_code': response.status_code,
            'details': response.data
        }
        response.data = custom_data
    else:
        # Handle cases where DRF doesn't catch the error (e.g. server errors)
        # In a real production app, you might want to log this.
        return Response({
            'error': 'Internal Server Error',
            'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR,
            'details': str(exc)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
