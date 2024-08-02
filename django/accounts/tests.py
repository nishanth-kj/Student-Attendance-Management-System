from django.test import TestCase
from .models import User

class UserModelTest(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(
            username='admin',
            password='password',
            role=User.ADMIN
        )
        self.staff_user = User.objects.create_user(
            username='staff',
            password='password',
            role=User.STAFF
        )
        self.student_user = User.objects.create_user(
            username='student',
            password='password',
            role=User.STUDENT
        )

    def test_user_roles(self):
        self.assertTrue(self.admin_user.is_admin())
        self.assertTrue(self.staff_user.is_staff_member())
        self.assertTrue(self.student_user.is_student_member())

    def test_admin_property(self):
        self.assertFalse(self.staff_user.is_admin())
        self.assertFalse(self.student_user.is_admin())
