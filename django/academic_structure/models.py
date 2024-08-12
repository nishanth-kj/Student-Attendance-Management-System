from django.db import models
from django.conf import settings

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True, help_text="e.g. CS, ME, EC")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Course(models.Model):
    """Programs like B.Tech, M.Tech, BCA"""
    name = models.CharField(max_length=100, unique=True)
    duration_years = models.IntegerField(default=4)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.name

class AcademicYear(models.Model):
    """e.g. 2023-2024"""
    name = models.CharField(max_length=20, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    is_current = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_current:
            # Set all other years to False
            AcademicYear.objects.filter(is_current=True).update(is_current=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Semester(models.Model):
    """1st, 2nd, 3rd, ... 8th"""
    number = models.IntegerField(unique=True)
    name = models.CharField(max_length=20, help_text="e.g. Semester 1")

    def __str__(self):
        return self.name

class Class(models.Model):
    """Specific Class e.g. CS-A (Semester 3)"""
    name = models.CharField(max_length=50, help_text="e.g. Section A")
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    
    # Class Teacher (Optional for now)
    # teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'STAFF'})

    def __str__(self):
        return f"{self.course.name} - Sem {self.semester.number} - {self.name} ({self.academic_year.name})"

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.name} ({self.code})"
