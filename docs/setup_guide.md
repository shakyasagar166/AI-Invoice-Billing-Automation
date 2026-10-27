# Setup & Deployment Guide

## Prerequisites
- Python 3.10+
- Node.js 18+ & npm
- Docker & Docker Compose (Optional)

---

## 1. Backend Setup

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
Swagger UI will be accessible at: `http://localhost:8000/docs`

---

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The web dashboard will open at: `http://localhost:5173`

---

## 3. Docker Compose 1-Click Launch

```bash
docker-compose -f infrastructure/docker-compose.yml up --build
```
