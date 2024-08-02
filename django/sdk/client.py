import requests
import os

class StudentManagementAPI:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url.rstrip('/')
        self.access_token = None
        self.refresh_token = None

    def _get_headers(self):
        headers = {
            "Content-Type": "application/json"
        }
        if self.access_token:
            headers["Authorization"] = f"Bearer {self.access_token}"
        return headers

    def login(self, username, password):
        url = f"{self.base_url}/auth/login/"
        response = requests.post(url, json={"username": username, "password": password})
        if response.status_code == 200:
            data = response.json()
            self.access_token = data.get('access')
            self.refresh_token = data.get('refresh')
            return data
        response.raise_for_status()

    def register(self, username, password, email, role="STAFF", usn=None):
        url = f"{self.base_url}/auth/register/"
        data = {
            "username": username,
            "password": password,
            "email": email,
            "role": role
        }
        if usn:
            data["usn"] = usn
        response = requests.post(url, json=data)
        return response.json()

    def get_me(self):
        url = f"{self.base_url}/auth/me/"
        response = requests.get(url, headers=self._get_headers())
        return response.json()

    def get_attendance_logs(self):
        url = f"{self.base_url}/attendance/logs/"
        response = requests.get(url, headers=self._get_headers())
        return response.json()

    def get_analytics(self):
        url = f"{self.base_url}/attendance/analytics/"
        response = requests.get(url, headers=self._get_headers())
        return response.json()

    def list_students(self):
        url = f"{self.base_url}/attendance/students/"
        response = requests.get(url, headers=self._get_headers())
        return response.json()

    def add_student(self, username, password, email, usn, image_input=None):
        url = f"{self.base_url}/attendance/students/"
        data = {
            "username": username,
            "password": password,
            "email": email,
            "role": "STUDENT",
            "usn": usn
        }
        if image_input:
            data["image_input"] = image_input
        response = requests.post(url, json=data, headers=self._get_headers())
        return response.json()

    def scan_attendance(self, image_input_base64):
        url = f"{self.base_url}/attendance/mark/"
        response = requests.post(url, json={"image": image_input_base64}, headers=self._get_headers())
        return response.json()

# Example usage
if __name__ == "__main__":
    api = StudentManagementAPI()
    try:
        api.login("admin", "admin123")
        print("Logged in successfully!")
        me = api.get_me()
        print(f"Current User: {me['username']} ({me['role']})")
        
        logs = api.get_attendance_logs()
        print(f"Total Logs: {len(logs)}")
    except Exception as e:
        print(f"Error: {e}")
