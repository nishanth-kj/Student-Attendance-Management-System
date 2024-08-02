# API Documentation

## Authentication
The system uses JWT (JSON Web Token) authentication.
- **Login**: `POST /auth/login/`
- **Info**: `GET /auth/me/` (Requires Authorization header)

## User Management
- **List Students**: `GET /auth/students/` (Staff/Admin only)
- **Create Student**: `POST /auth/students/` (Staff/Admin only)
- **Delete User**: `DELETE /auth/users/<id>/` (Admin only)

## Attendance
- **Mark Attendance**: `POST /attendance/mark/`
  - Body: `{ "image": "base64_string" }`
- **View Logs**: `GET /attendance/logs/`
  - Query Params: `?usn=...&format=csv`
  - Students only see their own logs.
  - Staff see all logs or filter by USN.

## Documentation UI
Interactive docs are available at:
- Swagger: `/api/docs/`
- Redoc: `/api/redoc/`
