"""
app/routes/chat.py
------------------
Chat API route. Receives, validates, delegates, returns.
No business logic lives here.
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
        "Accepts a user message and an optional content mode, "
        "returns an AI-generated response tailored to that mode."
    ),
)
async def send_message(request: ChatRequest) -> ChatResponse:
    """
    POST /api/chat

    Request body:
        { "message": "Write a LinkedIn post about AI.", "mode": "linkedin" }

    Response:
        { "response": "...", "timestamp": "...", "model": "...", "mode": "linkedin" }
    """
    logger.info(
        "POST /api/chat | mode=%s | message_length=%d",
        request.mode, len(request.message),
    )

    response = await chat_service.generate_response(request)

    logger.info(
        "POST /api/chat | mode=%s | model=%s | response_length=%d",
        response.mode, response.model, len(response.response),
    )
    return response
