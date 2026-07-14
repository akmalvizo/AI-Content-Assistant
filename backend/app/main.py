"""
app/main.py
-----------
FastAPI application factory for AI Content Assistant.
No database. No authentication. Just AI chat.
"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError

from app.config import settings
from app.routes import chat, health
from app.utils.logging_config import setup_logging
from app.utils.exception_handlers import (
    http_exception_handler,
    validation_exception_handler,
    unhandled_exception_handler,
)

# ─── 1. Logging ───────────────────────────────────────────────────────────────

setup_logging(level="DEBUG" if settings.DEBUG else "INFO")
logger = logging.getLogger(__name__)

settings.validate_on_startup()

# ─── 2. Application ───────────────────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    description="AI Content Assistant API — Groq-powered multi-mode content generation.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── 3. CORS ──────────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── 4. Exception handlers ────────────────────────────────────────────────────

app.add_exception_handler(StarletteHTTPException,   http_exception_handler)
app.add_exception_handler(RequestValidationError,   validation_exception_handler)
app.add_exception_handler(Exception,                unhandled_exception_handler)

# ─── 5. Routers ───────────────────────────────────────────────────────────────

app.include_router(health.router,           tags=["Health"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])

logger.info("Routers registered: /health · /api/chat")

# ─── 6. Root ──────────────────────────────────────────────────────────────────

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Backend is running successfully."}
