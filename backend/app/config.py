"""
app/config.py
-------------
Application configuration for AI Content Assistant.
Loads environment variables using Pydantic BaseSettings.
All sensitive values are read from the .env file — never hard-coded.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Settings — centralised configuration model.
    Values are automatically loaded from environment variables or .env file.
    """

    # Application
    APP_NAME: str = "AI Content Assistant"
    ENVIRONMENT: str = "development"  # development | staging | production
    DEBUG: bool = True

    # API
    API_PREFIX: str = "/api"

    # CORS — comma-separated list of allowed origins
    CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # LLM Provider (placeholder — Phase 2)
    LLM_API_KEY: str = ""
    LLM_MODEL: str = "gpt-4o"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Singleton settings instance — import this throughout the app
settings = Settings()
