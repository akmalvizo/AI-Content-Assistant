"""
app/routes/chat.py
------------------
Chat API route for AI Content Assistant.

Responsibility of this module:
  1. Receive and validate the request (Pydantic handles this automatically).
  2. Delegate to ChatService.
  3. Return the response.

No business logic lives here — all logic is in app/services/chat_service.py.
"""

import logging

from fastapi import APIRouter
from app.models.chat_models import ChatRequest, ChatResponse
from app.services.chat_service import chat_service

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post(
    "/chat",
    response_model=ChatResponse,
    summary="Send a chat message",
    description=(
        "Accepts a user message and returns an AI-generated response. "
        "Currently returns mock responses — Groq integration added in Phase 5."
    ),
)
async def send_message(request: ChatRequest) -> ChatResponse:
    """
    POST /api/chat

    Request body:
        { "message": "Write a LinkedIn post about AI." }

    Response:
        { "response": "...", "timestamp": "...", "model": "mock-v1" }
    """
    logger.info("POST /api/chat | message_length=%d", len(request.message))

    response = await chat_service.generate_response(request)

    logger.info("POST /api/chat | responded with model=%s", response.model)
    return response
