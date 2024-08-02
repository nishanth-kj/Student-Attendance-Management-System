import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

class ApiService {
    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    setupInterceptors() {
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));

        this.client.interceptors.response.use(
            (response) => {
                // If it's our structured response, return the inner data
                if (response.data && response.data.hasOwnProperty('success')) {
                    if (response.data.success) {
                        return {
                            ...response,
                            data: response.data.data,
                            message: response.data.message
                        };
                    }
                }
                return response;
            },
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem('refresh_token');
                        if (!refreshToken) throw new Error('No refresh token');

                        const response = await axios.post(`${API_BASE_URL}auth/token/refresh/`, {
                            refresh: refreshToken,
                        });
                        const { access } = response.data;
                        localStorage.setItem('access_token', access);
                        this.client.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                        originalRequest.headers['Authorization'] = `Bearer ${access}`;
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    }
                }
                // Extract error message from structured response if available
                const backendError = error.response?.data?.error || error.response?.data?.message || error.message;
                return Promise.reject(backendError);
            }
        );
    }

    // Auth methods
    async login(username, password) {
        return this.client.post('/auth/login/', { username, password });
    }

    async register(userData) {
        return this.client.post('/auth/register/', userData);
    }

    async getCurrentUser() {
        return this.client.get('/auth/me/');
    }

    // Attendance methods
    async getAttendanceLogs(usn = null) {
        const url = usn ? `/attendance/logs/?usn=${usn}` : '/attendance/logs/';
        return this.client.get(url);
    }

    async getAnalytics() {
        return this.client.get('/attendance/analytics/');
    }

    async markAttendance(imageBase64) {
        return this.client.post('/attendance/mark/', { image: imageBase64 });
    }

    // Student methods
    async getStudents() {
        return this.client.get('/attendance/students/');
    }

    async addStudent(studentData) {
        return this.client.post('/attendance/students/', studentData);
    }

    async getStudentDetail(usn) {
        return this.client.get(`/attendance/students/${usn}/`);
    }

    async deleteStudent(usn) {
        return this.client.delete(`/attendance/students/${usn}/`);
    }

    // Faculty/Staff methods
    async getStaff() {
        return this.client.get('/auth/staff/');
    }
}

const api = new ApiService();
export default api;
