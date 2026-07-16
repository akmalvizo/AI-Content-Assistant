"""
app/config.py
-------------
Application configuration for AI Content Assistant.
All values are loaded from environment variables / .env file.

CORS_ORIGINS can be supplied as:
  - A JSON array string:  '["https://example.com","http://localhost:5173"]'
  - A comma-separated string: "https://example.com,http://localhost:5173"
  - A single URL string:  "https://example.com"
If the environment variable is absent the hardcoded default is used.
"""

import json
import logging
from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings

logger = logging.getLogger(__name__)

# Default origins used when CORS_ORIGINS is not set in the environment.
# Includes the deployed Vercel frontend so the production build can reach
# this backend without any environment variable configuration.
_DEFAULT_CORS_ORIGINS: List[str] = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://ai-content-assistant-virid.vercel.app",
    "https://ai-content-assistant-akmal.vercel.app",
    "https://ai-content-assistant-akmal.vercel.app",
]


class Settings(BaseSettings):

    # ── Application ───────────────────────────────────────────────────────────
    APP_NAME:    str  = "AI Content Assistant"
    ENVIRONMENT: str  = "development"
    DEBUG:       bool = True

    # ── Server ────────────────────────────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # ── CORS ──────────────────────────────────────────────────────────────────
    # Set via environment variable CORS_ORIGINS.
    # Accepts JSON array, comma-separated string, or single URL.
    # Falls back to _DEFAULT_CORS_ORIGINS when not set.
    CORS_ORIGINS: List[str] = _DEFAULT_CORS_ORIGINS

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: object) -> List[str]:
        """
        Normalise CORS_ORIGINS from whatever format the env var arrives in:
          '[\"https://x.com\",\"http://localhost:5173\"]'  → list
          'https://x.com,http://localhost:5173'            → list
          'https://x.com'                                  → ['https://x.com']
          already a list                                   → pass through
        """
        if isinstance(value, list):
            return value

        if isinstance(value, str):
            stripped = value.strip()
            if not stripped:
                return _DEFAULT_CORS_ORIGINS
            # Try JSON array first
            if stripped.startswith("["):
                try:
                    parsed = json.loads(stripped)
                    if isinstance(parsed, list):
                        return [str(o).strip() for o in parsed if str(o).strip()]
                except json.JSONDecodeError:
                    pass
            # Fall back to comma-separated
            return [o.strip() for o in stripped.split(",") if o.strip()]

        return _DEFAULT_CORS_ORIGINS

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
        "extra": "ignore",
    }

    def validate_on_startup(self) -> None:
        if not self.GROQ_API_KEY:
            logger.warning("GROQ_API_KEY is not set — AI responses will fail.")
        else:
            logger.info("Config OK | model=%s", self.GROQ_MODEL)
        logger.info("CORS origins (%d): %s", len(self.CORS_ORIGINS), self.CORS_ORIGINS)


settings = Settings()
