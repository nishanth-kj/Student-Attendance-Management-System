# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    libboost-python-dev \
    python3-dev \
    ffmpeg \
    libsm6 \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Install UV
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy project files
COPY pyproject.toml .
COPY uv.lock .

# Install dependencies (excluding the windows wheels)
# We use --no-install-project to only install dependencies
RUN uv sync --no-install-project

# Note: The windows wheels in ./library/ won't work here.
# We need to install dlib and face-recognition from source/pip in Linux.
RUN uv pip install dlib face-recognition

# Copy the rest of the application
COPY . .

# Run the application
CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
