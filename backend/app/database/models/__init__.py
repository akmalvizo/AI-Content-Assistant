# app/database/models/__init__.py
# Centralized imports for all DB models — used by Alembic autogenerate.

from app.database.models.conversation import Conversation  # noqa
from app.database.models.message import Message  # noqa

__all__ = ["Conversation", "Message"]
