"""
app/config.py
-------------
Application configuration for AI Content Assistant.
All values are loaded from environment variables / .env file.
"""

import logging
from typing import List

from pydantic_settings import BaseSettings

logger = logging.getLogger(__name__)


class Settings(BaseSettings):

    # ── Application ───────────────────────────────────────────────────────────
    APP_NAME:    str  = "AI Content Assistant"
    ENVIRONMENT: str  = "development"
    DEBUG:       bool = True

    # ── Server ────────────────────────────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # ── CORS ──────────────────────────────────────────────────────────────────
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ]

    # ── Groq AI ───────────────────────────────────────────────────────────────
    GROQ_API_KEY:     str   = ""
    GROQ_MODEL:       str   = "llama-3.3-70b-versatile"
    GROQ_BASE_URL:    str   = "https://api.groq.com"
    GROQ_MAX_TOKENS:  int   = 1024
    GROQ_TEMPERATURE: float = 0.7

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
        "extra": "ignore",   # silently ignore any unknown env vars (e.g. leftover DB keys)
    }

    def validate_on_startup(self) -> None:
        if not self.GROQ_API_KEY:
            logger.warning("GROQ_API_KEY is not set — AI responses will fail.")
        else:
            logger.info("Config OK | model=%s", self.GROQ_MODEL)


settings = Settings()
