# System Architecture Documentation

## Overview
EduTrack Pro is a college-grade attendance management system that leverages facial recognition for automated attendance logging. It provides role-based access for Admins, Staff (Faculty), and Students.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Django REST Framework (DRF), SimpleJWT for Auth.
- **AI/ML**: `dlib`, `face-recognition`, and `OpenCV` for biometric processing.
- **Database**: PostgreSQL (Production), SQLite (Development).
- **Infratructure**: Docker, Docker Compose, Kubernetes.

## System Flow
1. **Enrollment**: Staff/Admin registers a student and uploads their face image.
2. **Biometric Processing**: The system extracts 128-d face embeddings and stores them in the DB.
3. **Attendance Marking**: Students show their face to the camera. The system compares the live embedding with stored embeddings.
4. **Logging**: On a match, a `Log` entry is created with a timestamp.

## Role-Based Dashboards
- **Admin**: Full system control, user management (Staff/Students).
- **Staff (Faculty)**: Student management, class attendance reports, CSV exports.
- **Student**: View personal attendance history and stats.
