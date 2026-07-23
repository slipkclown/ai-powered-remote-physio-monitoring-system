from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ==========================================
# FastAPI Application
# ==========================================

app = FastAPI(
    title="AI-Powered Remote Physiotherapy Monitoring API",
    description="Backend API for AI-Powered Remote Physiotherapy Monitoring System",
    version="1.0.0"
)

# ==========================================
# Enable CORS
# Allows React frontend to communicate
# with the FastAPI backend.
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Later we'll restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Root Endpoint
# ==========================================

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "AI-Powered Remote Physiotherapy Monitoring API",
        "version": "1.0.0"
    }

# ==========================================
# Health Check
# ==========================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }