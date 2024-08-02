from django.test import TestCase
<<<<<<< HEAD
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
=======

# Create your tests here.
>>>>>>> dcf51ac (django dir)
