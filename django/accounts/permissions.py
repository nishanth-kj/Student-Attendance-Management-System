from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to Admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ADMIN')

class IsStaffUser(permissions.BasePermission):
    """
    Allows access to Staff members (and Admins as they are super-users).
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.role in ['ADMIN', 'STAFF']

class IsStaffOnly(permissions.BasePermission):
    """
    Strictly allows access only to Staff members, not Admins or Students.
    Used for specific actions requested to be "Staff only".
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'STAFF')
