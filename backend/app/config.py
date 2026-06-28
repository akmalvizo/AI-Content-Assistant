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

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS — list of allowed frontend origins
    CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # LLM Provider — populated in Phase 3
    GROQ_API_KEY: str = ""

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }


# Singleton settings instance — import this throughout the app
settings = Settings()
