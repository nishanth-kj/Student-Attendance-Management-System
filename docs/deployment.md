# Deployment Guide

## Docker Setup
Ensure you have Docker and Docker Compose installed.
```bash
docker-compose up --build
```

## Kubernetes Deployment
We use a base configuration with separate manifests for DB, Backend, and Frontend.

1. **Config & Secrets**:
   ```bash
   kubectl apply -f k8s/base-config.yaml
   ```
2. **Database**:
   ```bash
   kubectl apply -f k8s/db.yaml
   ```
3. **Backend**:
   ```bash
   kubectl apply -f k8s/backend.yaml
   ```
4. **Frontend**:
   ```bash
   kubectl apply -f k8s/frontend.yaml
   ```

## Production Considerations
- Change the `SECRET_KEY` in `k8s/base-config.yaml`.
- Set `DEBUG=False` in environment variables.
- Use a managed database like AWS RDS or Google Cloud SQL for better reliability.
- Configure an Ingress Controller for SSL/TLS management.
