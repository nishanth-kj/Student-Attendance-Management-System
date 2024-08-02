from django.db import models
<<<<<<< HEAD
from django.conf import settings

class Log(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='attendance_logs', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.timestamp}'
=======

from django.db import models

class Student(models.Model):
    usn = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    studentImage = models.ImageField(upload_to='student_images/')
    face_embedding = models.BinaryField(blank=True, null=True)

    def __str__(self):
        return self.name


class Log(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='logs')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.student.name} - {self.timestamp}'
>>>>>>> dcf51ac (django dir)
