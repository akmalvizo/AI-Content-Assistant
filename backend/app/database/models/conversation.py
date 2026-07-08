"""
app/database/models/conversation.py
-------------------------------------
SQLAlchemy ORM model for the Conversation table.

Schema:
    id           — UUID primary key (generated server-side)
    user_id      — nullable FK (Phase 8: linked to users.id)
    title        — auto-generated from first message (max 100 chars)
    mode         — content mode used (e.g. "linkedin", "blog")
    created_at   — UTC timestamp, set on insert
    updated_at   — UTC timestamp, auto-updated on every change

Indexes:
    - (user_id, updated_at DESC) — main query pattern: "user's recent chats"
    - updated_at DESC alone       — for anonymous queries (Phase 7, user_id is NULL)
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import String, DateTime, Index, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Conversation(Base):
    __tablename__ = "conversations"

    # ── Columns ───────────────────────────────────────────────────────────────

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
    )

    # Nullable until Phase 8 introduces user accounts
    user_id: Mapped[str | None] = mapped_column(
        String(128),
        nullable=True,
        index=True,
        comment="Future: FK to users.id — NULL for anonymous sessions",
    )

    title: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="New Conversation",
    )

    mode: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="general",
        comment="Content mode from app/constants/prompt_types.py",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=_utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=_utcnow,
        onupdate=_utcnow,
    )

    # ── Relationships ──────────────────────────────────────────────────────────

    messages: Mapped[list["Message"]] = relationship(  # noqa: F821
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="Message.created_at",
        lazy="selectin",            # auto-load messages with conversation
    )

    # ── Table-level indexes ───────────────────────────────────────────────────

    __table_args__ = (
        Index("ix_conversations_user_updated", "user_id", "updated_at"),
    )

    def __repr__(self) -> str:
        return f"<Conversation id={self.id} title={self.title!r} mode={self.mode}>"
