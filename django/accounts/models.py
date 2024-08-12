from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ADMIN = 'ADMIN'
    STAFF = 'STAFF'
    STUDENT = 'STUDENT'
    
    ROLE_CHOICES = [
        (ADMIN, 'Administrator'),
        (STAFF, 'Staff Member'),
        (STUDENT, 'Student'),
    ]
    
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default=STAFF
    )
    
    usn = models.CharField(max_length=100, unique=True, null=True, blank=True)
    
    # Biometric fields for Staff & Students
    image_blob = models.BinaryField(null=True, blank=True)
    image_format = models.CharField(max_length=10, null=True, blank=True)
    face_embedding = models.BinaryField(null=True, blank=True)
    
    # Academic Info
    department = models.ForeignKey(
        'academic_structure.Department', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='users'
    )
    
    def is_admin(self):
        return self.role == self.ADMIN or self.is_superuser

    def is_staff_member(self):
        return self.role == self.STAFF
    
    def is_student_member(self):
        return self.role == self.STUDENT

    def __str__(self):
        return f"{self.username} ({self.role})"
