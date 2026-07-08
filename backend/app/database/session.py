"""
app/database/session.py
------------------------
Async SQLAlchemy engine and session factory for AI Content Assistant.

Usage in routes / services:
    async with get_session() as session:
        result = await session.execute(...)

The engine is created once at module import. The async session factory
is used to create a new session per request via the FastAPI dependency.
"""

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.config import settings

logger = logging.getLogger(__name__)

# ─── Engine ───────────────────────────────────────────────────────────────────
# pool_pre_ping=True — verify connections before handing them out (avoids
# "connection was closed" errors after Supabase idle timeouts).

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,          # logs SQL in DEBUG mode only
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

# ─── Session factory ──────────────────────────────────────────────────────────

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,       # keep objects usable after commit
    autoflush=False,
    autocommit=False,
)

# ─── FastAPI dependency ───────────────────────────────────────────────────────

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency that yields a database session per request
    and guarantees rollback + close on any exception.

    Usage:
        @router.get("/example")
        async def handler(session: AsyncSession = Depends(get_session)):
            ...
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
