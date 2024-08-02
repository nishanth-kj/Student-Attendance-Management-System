# Student Attendance Management System

A modern, full-stack attendance management system with biometric (facial recognition) capabilities. Built with Django REST Framework and React.

## 🌟 Key Features

- **Facial Recognition**: Automated attendance marking using dlib and face-recognition libraries.
- **Role-Based Access Control**: Different dashboards and permissions for Admins, Staff, and Students.
- **Real-time Analytics**: Dashboard with visual representation of attendance trends.
- **Student Management**: Full CRUD operations for student records and biometric enrollment.
- **Secure Authentication**: JWT-based authentication for the frontend.
- **Reporting**: Detailed attendance logs and history.
- **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 5.0 + Django REST Framework
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Face Recognition**: dlib, face-recognition, OpenCV
- **Documentation**: Swagger/OpenAPI (drf-spectacular)
- **Environment**: UV (Python package manager)

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- Docker & Docker Compose (optional, for containerized setup)

### Local Setup (Manual)

#### Backend Setup
1. Navigate to the django directory:
   ```bash
   cd django
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # Linux/Mac
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup
1. Navigate to the react-app directory:
   ```bash
   cd react-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   VITE_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Quick Start with Docker

```bash
docker-compose up --build
```

### Deployment with Kubernetes

The project includes Kubernetes manifests for orchestrated deployment:

```bash
# Applying manifests
kubectl apply -f k8s/base-config.yaml
kubectl apply -f k8s/db.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/api/docs/`

## 📊 API Documentation

Interative API documentation is available via Swagger UI at `/api/schema/swagger-ui/` when the backend is running.

## 🧪 Testing

### Backend Tests
```bash
cd django
python manage.py test
```

### Frontend Tests
```bash
cd react-app
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Nishanth KJ** - [GitHub](https://github.com/nishanth-kj)

## 🙏 Acknowledgments

- Face recognition powered by dlib and face_recognition libraries.
- UI inspiration from modern dashboard designs.
