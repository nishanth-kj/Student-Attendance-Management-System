from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Log

User = get_user_model()

class LogModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='password'
        )

    def test_log_creation(self):
        log = Log.objects.create(user=self.user)
        self.assertEqual(log.user.username, 'testuser')
        self.assertTrue(log.timestamp)

    def test_log_str(self):
        log = Log.objects.create(user=self.user)
        self.assertIn('testuser', str(log))

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

class AttendanceAPITest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username='admin', password='password', role='ADMIN')
        self.client.force_authenticate(user=self.admin)
        self.student = User.objects.create_user(username='stu1', password='password', role='STUDENT', usn='USN001')

    def test_student_list(self):
        url = reverse('student_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should contain at least stu1
        self.assertTrue(any(s['username'] == 'stu1' for s in response.data))

    def test_attendance_logs(self):
        Log.objects.create(user=self.student)
        url = reverse('get_logs')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['username'], 'stu1')
