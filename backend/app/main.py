"""
app/main.py
-----------
Entry point for the AI Content Assistant FastAPI application.
Initialises the app, registers routers, and configures middleware.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import chat, health
from app.config import settings

# ─── Application Factory ──────────────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    description="AI Content Assistant API — powered by FastAPI",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Middleware ──────────────────────────────────────────────────────────
# Placeholder: origins will be locked down in Phase 3 (production hardening).

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Router Registration ──────────────────────────────────────────────────────

app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(chat.router,   prefix="/api", tags=["Chat"])

# ─── Root Endpoint ────────────────────────────────────────────────────────────

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint — confirms the API is running."""
    return {"message": f"{settings.APP_NAME} API is running"}
