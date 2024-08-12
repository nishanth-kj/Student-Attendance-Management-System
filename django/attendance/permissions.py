from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Access only for users with ADMIN role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ADMIN')

class IsStaff(permissions.BasePermission):
    """
    Access for ADMIN or STAFF roles.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['ADMIN', 'STAFF']
        )

class IsStudent(permissions.BasePermission):
    """
    Access only for users with STUDENT role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'STUDENT')

class IsOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit/view it.
    Assumes the model has a 'user' field.
    """
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return obj == request.user

class IsStaffOrOwner(permissions.BasePermission):
    """
    Allow access if user is staff/admin OR if they own the object.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.role in ['ADMIN', 'STAFF']:
            return True
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return obj == request.user

class AuthenticatedReadOnly(permissions.BasePermission):
    """
    Allow any authenticated user to READ. WRITE is restricted (default to False).
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.method in permissions.SAFE_METHODS

class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Staff/Admin can do anything. Others can only perform GET/HEAD/OPTIONS.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.role in ['ADMIN', 'STAFF']
