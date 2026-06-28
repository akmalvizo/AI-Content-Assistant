"""
app/main.py
-----------
Entry point for the AI Content Assistant FastAPI application.
Registers routers, configures CORS middleware, and exposes the root endpoint.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import health
from app.config import settings

# ─── Application Instance ─────────────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    description="AI Content Assistant API — powered by FastAPI",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Middleware ──────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────

# Health check — active
app.include_router(health.router, tags=["Health"])

# Chat — registered but empty; will be wired in Phase 3
# app.include_router(chat.router, prefix="/api", tags=["Chat"])

# ─── Root Endpoint ────────────────────────────────────────────────────────────

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint — confirms the API is running."""
    return {"message": "Backend is running successfully."}
