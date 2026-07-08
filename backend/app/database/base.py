"""
app/database/base.py
---------------------
Declarative base shared by all SQLAlchemy ORM models.

Every model file imports `Base` from here. Alembic's env.py also imports
it so autogenerate can discover all table definitions.
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Shared declarative base for all ORM models."""
    pass
