"""
app/services/chat_service.py
-----------------------------
Business logic layer for the chat feature.

Architecture:
    chat.py  ──►  ChatService.generate_response()
                       │
                       ├──►  PromptService.build_messages()  ──►  correct BasePrompt
                       │
                       └──►  LLMService.complete_with_messages()  ──►  Groq API

To add a new content mode: create a prompt file + register in PromptService.
To swap LLM providers: update llm_service.py only.
This file never changes for those operations.
"""

import logging
from datetime import datetime, timezone

from app.models.chat_models import ChatRequest, ChatResponse
from app.services.llm_service import llm_service
from app.services.prompt_service import prompt_service
from app.config import settings

logger = logging.getLogger(__name__)


class ChatService:
    """
    ChatService — orchestrates a single mode-aware chat round-trip.
    """

    async def generate_response(self, request: ChatRequest) -> ChatResponse:
        """
        Process a validated ChatRequest and return an AI-generated ChatResponse.

        Steps:
          1. Sanitise the message.
          2. Resolve the content mode via PromptService.
          3. Build the LLM messages list (system prompt + user turn).
          4. Call LLMService with the pre-built messages.
          5. Return a ChatResponse with response, timestamp, model, and mode.
          6. On LLMService failure, return a graceful error response.

        Args:
            request: Validated ChatRequest (message + mode).

        Returns:
            ChatResponse — always returned, never raises.
        """
        message      = request.message.strip()
        mode         = request.mode or "general"
        resolved_mode = prompt_service._resolve_mode(mode)

        logger.info(
            "ChatService.generate_response | mode=%s | message_length=%d",
            resolved_mode, len(message),
        )
        logger.debug(
            "ChatService.generate_response | message_preview=%.80s", message
        )

        try:
            # Build the mode-specific messages list
            messages = prompt_service.build_messages(resolved_mode, message)

            # Delegate to LLM — passes pre-built messages, not raw text
            reply = await llm_service.complete_with_messages(messages)

            logger.info(
                "ChatService.generate_response | success | mode=%s | response_length=%d",
                resolved_mode, len(reply),
            )

        except RuntimeError as exc:
            logger.warning("ChatService: LLMService error — %s", str(exc))
            reply = str(exc)

        return ChatResponse(
            response=reply,
            timestamp=datetime.now(timezone.utc),
            model=settings.GROQ_MODEL,
            mode=resolved_mode,
        )


# Module-level singleton
chat_service = ChatService()
