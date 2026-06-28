"""
app/services/chat_service.py
-----------------------------
Business logic layer for the chat feature.

Responsibilities:
  - Sanitise and validate the incoming message.
  - Build the user-facing prompt (kept simple — raw message passed to LLM).
  - Delegate the actual API call to LLMService.
  - Wrap the result in a ChatResponse.
  - Translate LLMService RuntimeErrors into clean ChatResponse error replies.

Architecture:
    chat.py  ──►  ChatService.generate_response()  ──►  LLMService.complete()  ──►  Groq API

To swap providers in Phase 6:
  - Replace `llm_service` import with a different service (e.g. openai_service).
  - This file and everything above it stay identical.
"""

import logging
from datetime import datetime, timezone

from app.models.chat_models import ChatRequest, ChatResponse
from app.services.llm_service import llm_service
from app.config import settings

logger = logging.getLogger(__name__)


class ChatService:
    """
    ChatService — orchestrates a single chat round-trip.

    Single public method: `generate_response(request)`.
    All LLM-specific logic lives in llm_service.py.
    """

    async def generate_response(self, request: ChatRequest) -> ChatResponse:
        """
        Process a validated user message and return an AI-generated response.

        Steps:
          1. Sanitise input (strip whitespace).
          2. Log the incoming request (message length only — never the content
             in production; logged here at DEBUG for development convenience).
          3. Call LLMService.complete().
          4. Return a ChatResponse with the reply, timestamp, and model name.
          5. On LLMService failure, return a graceful error ChatResponse
             rather than propagating the exception (keeps the UX clean).

        Args:
            request: Validated ChatRequest from the route layer.

        Returns:
            ChatResponse — always returned, never raises.
        """
        message = request.message.strip()

        logger.info(
            "ChatService.generate_response | message_length=%d",
            len(message),
        )
        logger.debug("ChatService.generate_response | message_preview=%.80s", message)

        try:
            # ── Delegate to LLM service ──────────────────────────────────────
            reply = await llm_service.complete(message)

            logger.info(
                "ChatService.generate_response | success | response_length=%d",
                len(reply),
            )

        except RuntimeError as exc:
            # LLMService already mapped the error to a user-safe string.
            # Return it as a normal response so the frontend displays it in the
            # chat bubble rather than triggering the global error banner.
            logger.warning("ChatService: LLMService error — %s", str(exc))
            reply = str(exc)

        return ChatResponse(
            response=reply,
            timestamp=datetime.now(timezone.utc),
            model=settings.GROQ_MODEL,
        )


# ── Module-level singleton ────────────────────────────────────────────────────
chat_service = ChatService()
