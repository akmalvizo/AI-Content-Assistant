"""
app/config.py
-------------
Application configuration for AI Content Assistant.
Loads environment variables using Pydantic BaseSettings.

All sensitive values are read from the .env file — never hard-coded.
To swap AI providers in the future, only change the GROQ_* values here
(or add a new provider block). Nothing else in the codebase needs to change.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Settings — centralised configuration model.
    Values are automatically loaded from the .env file or environment variables.
    """

    # ── Application ───────────────────────────────────────────────────────────
    APP_NAME: str   = "AI Content Assistant"
    ENVIRONMENT: str = "development"   # development | staging | production
    DEBUG: bool     = True

    # ── Server ────────────────────────────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # ── CORS ──────────────────────────────────────────────────────────────────
    # All local Vite ports and production frontend URL.
    # Add your Vercel URL here when deploying.
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",   # Vite fallback port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ]

    # ── Groq AI Provider ─────────────────────────────────────────────────────
    # To switch providers, add a new block here and update llm_service.py only.
    GROQ_API_KEY:  str = ""
    GROQ_MODEL:    str = "llama-3.3-70b-versatile"
    GROQ_BASE_URL: str = "https://api.groq.com"   # override for proxies / testing

    # Request limits
    GROQ_MAX_TOKENS:   int   = 1024
    GROQ_TEMPERATURE:  float = 0.7

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }


# Singleton — import this everywhere; never instantiate Settings() again.
settings = Settings()
