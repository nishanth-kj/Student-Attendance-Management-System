import os
import django
import sys
from django.utils import timezone

# Setup Django environment
sys.path.append(os.path.join(os.getcwd()))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from attendance.models import Log

User = get_user_model()

def seed_data():
    print("🌱 Starting database seeding...")

    # 1. Create Admin
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            password='admin123',
            email='admin@university.edu',
            role='ADMIN'
        )
        print("✅ Admin created (admin / admin123)")
    else:
        print("⏭️ Admin already exists")

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
            print(f"✅ Staff created: {data['username']}")

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
            print(f"✅ Student created: {data['username']} ({data['usn']})")
            
            # Create some dummy logs for students
            Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(days=1))
            Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(hours=2))
            print(f"   📝 Logs seeded for {data['username']}")

    print("✨ Seeding completed successfully!")

if __name__ == "__main__":
    seed_data()
