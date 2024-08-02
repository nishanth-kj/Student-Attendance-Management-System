import os
import io
import base64
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.files.base import ContentFile
from attendance.models import Log

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial users and logs'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🌱 Starting database seeding...'))

        # 1. Create Admin
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                password='admin123',
                email='admin@university.edu',
                role='ADMIN'
            )
            self.stdout.write(self.style.SUCCESS('✅ Admin created (admin / admin123)'))
        else:
            self.stdout.write('⏭️ Admin already exists')

        # 2. Create Staff
        staff_users = [
            {'username': 'prof_jane', 'email': 'jane@university.edu', 'role': 'STAFF'},
            {'username': 'prof_john', 'email': 'john@university.edu', 'role': 'STAFF'},
        ]

        for data in staff_users:
            if not User.objects.filter(username=data['username']).exists():
                User.objects.create_user(
                    password='password123',
                    **data
                )
                self.stdout.write(self.style.SUCCESS(f"✅ Staff created: {data['username']}"))

        # 3. Create Students
        students = [
            {'username': 'student_1', 'usn': '1MS21CS001', 'role': 'STUDENT'},
            {'username': 'student_2', 'usn': '1MS21CS002', 'role': 'STUDENT'},
            {'username': 'student_3', 'usn': '1MS21CS003', 'role': 'STUDENT'},
        ]

        for data in students:
            if not User.objects.filter(username=data['username']).exists():
                user = User.objects.create_user(
                    password='password123',
                    email=f"{data['username']}@student.edu",
                    **data
                )
                self.stdout.write(self.style.SUCCESS(f"✅ Student created: {data['username']} ({data['usn']})"))
                
                # Create some dummy logs for students
                Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(days=1))
                Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(hours=2))
                self.stdout.write(f"   📝 Logs seeded for {data['username']}")

        self.stdout.write(self.style.SUCCESS('✨ Seeding completed successfully!'))
