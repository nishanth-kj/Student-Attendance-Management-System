# Student Attendance Management System - Django Backend

A Django-based student attendance management system with face recognition capabilities using `dlib` and `face-recognition` libraries.

## 🚀 Features

- **Face Recognition**: Automated attendance marking using facial recognition
- **Student Management**: CRUD operations for student records
- **Attendance Tracking**: Real-time attendance logging and reporting
- **Image Processing**: OpenCV-based image processing for face detection
- **REST API**: Django REST Framework for API endpoints

## 📋 Prerequisites

- Python 3.12 or higher
- UV package manager (recommended) or pip
- Webcam (for face recognition features)
- Windows OS (for pre-built dlib wheel)

## 🛠️ Installation

### Using UV (Recommended)

UV is a fast Python package manager that simplifies dependency management.

1. **Install UV** (if not already installed):

```bash
# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

2. **Clone the repository** (if not already done):

```bash
git clone
cd Student-Attendance-Management-System/django
```

3. **Sync dependencies**:

```bash
uv sync
```

This will:

- Create a virtual environment in `.venv`
- Install all dependencies from `pyproject.toml`
- Install local wheel files for `dlib` and `face-recognition` from the `library/` directory

4. **Activate the virtual environment**:

```bash
# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# Windows (CMD)
.venv\Scripts\activate.bat
```

### Using pip (Alternative)

If you prefer using pip:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell)
venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Install local wheel files
pip install library/dlib-19.24.99-cp312-cp312-win_amd64.whl
pip install library/face_recognition-1.3.0-py2.py3-none-any.whl
```

## 🗄️ Database Setup

1. **Run migrations**:

```bash
.venv\Scripts\python.exe manage.py migrate
```

2. **Create a superuser** (optional):

```bash
.venv\Scripts\python.exe manage.py createsuperuser
```

## 🏃 Running the Application

### Development Server

Start the Django development server:

```bash
# Using the virtual environment directly (RECOMMENDED)
.venv\Scripts\python.exe manage.py runserver

# Or activate the virtual environment first
.venv\Scripts\Activate.ps1
python manage.py runserver
```

The application will be available at `http://localhost:8000`

> [!IMPORTANT] > **Why not use `uv run`?**
>
> While UV is excellent for dependency management, `uv run python manage.py runserver` will fail with Django applications. This is because UV tries to build the project as a package, which causes errors like:
>
> ```
> error: Multiple top-level packages discovered in a flat-layout
> ```
>
> **Solution**: Always use the virtual environment directly (`.venv\Scripts\python.exe`) or activate the virtual environment first. This is the recommended approach for Django applications with UV.

## 📁 Project Structure

```
django/
├── attendance/              # Main Django app
│   ├── models.py           # Database models
│   ├── views.py            # View logic
│   ├── forms.py            # Form definitions
│   ├── templates/          # HTML templates
│   ├── static/             # Static files (CSS, JS, images)
│   └── Training_images/    # Training images for face recognition
├── student_management_project/  # Django project settings
│   ├── settings.py         # Project settings
│   ├── urls.py             # URL routing
│   └── wsgi.py             # WSGI configuration
├── library/                # Local wheel files
│   ├── dlib-19.24.99-cp312-cp312-win_amd64.whl
│   └── face_recognition-1.3.0-py2.py3-none-any.whl
├── student_images/         # Uploaded student images
├── manage.py               # Django management script
├── pyproject.toml          # UV/Python project configuration
├── requirements.txt        # Pip requirements (legacy)
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root (optional):

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
```

### Settings

Key settings are located in `student_management_project/settings.py`:

- Database configuration
- Installed apps
- Middleware
- Static files configuration

## 📝 Common Commands

### Django Management Commands

```bash
# Run Django management commands (activate venv first or use full path)
.venv\Scripts\python.exe manage.py <command>

# Run migrations
.venv\Scripts\python.exe manage.py migrate

# Create migrations
.venv\Scripts\python.exe manage.py makemigrations

# Create superuser
.venv\Scripts\python.exe manage.py createsuperuser

# Collect static files
.venv\Scripts\python.exe manage.py collectstatic

# Run tests
.venv\Scripts\python.exe manage.py test

# Check for issues
.venv\Scripts\python.exe manage.py check
```

### UV Package Management

```bash
# Add a new dependency
uv add <package-name>

# Update dependencies
uv sync

# Remove a dependency
uv remove <package-name>
```

## 🎯 Face Recognition Setup

1. **Add training images**:

   - Place student face images in `attendance/Training_images/`
   - Name format: `StudentName.jpg`

2. **Train the model**:
   The face encodings are generated automatically when the application starts.

3. **Test face recognition**:
   - Access the attendance marking page
   - Allow camera access
   - The system will automatically detect and mark attendance

## 🐛 Troubleshooting

### dlib installation issues

- Ensure you're using Python 3.12
- The pre-built wheel in `library/` is for Windows x64
- For other platforms, you may need to build dlib from source

### Camera not detected

- Check camera permissions in Windows settings
- Ensure no other application is using the camera
- Try different camera index in the code if you have multiple cameras

### UV sync fails

- Ensure UV is up to date: `uv self update`
- Clear the cache: `uv cache clean`
- Delete `.venv` and run `uv sync` again

## 📚 Dependencies

### Core Dependencies

- **Django** (>=5.0): Web framework
- **djangorestframework** (>=3.14): REST API framework
- **dlib**: Face detection and recognition
- **face-recognition**: High-level face recognition library
- **opencv-python**: Computer vision library
- **numpy**: Numerical computing
- **Pillow**: Image processing

### Development Dependencies

- **pylint**: Code linting
- **isort**: Import sorting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

[Add your license information here]

## 👥 Authors

[Add author information here]

## 🙏 Acknowledgments

- Face recognition powered by dlib and face_recognition libraries
- Built with Django and Django REST Framework
