"""
app/routes/chat.py
------------------
Chat API route.

Auth status: optional — works with or without a Bearer token.
  - If a valid token is provided, user_id is logged for tracing.
  - If no token is provided, the request still succeeds (guest mode).
  - Re-enable strict auth by uncommenting the Depends(get_current_user) line
    once the frontend login system is in place.
"""

import logging
from typing import Optional

from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.models.chat_models import ChatRequest, ChatResponse
from app.services.chat_service import chat_service

logger = logging.getLogger(__name__)
router = APIRouter()

# Optional bearer — does NOT raise 401 when the header is absent
_optional_bearer = HTTPBearer(auto_error=False)


@router.post(
    "/chat",
    response_model=ChatResponse,
    summary="Send a chat message",
    description=(
        "Accepts a user message and an optional content mode, "
        "returns an AI-generated response tailored to that mode. "
        "Works with or without a Bearer token."
    ),
    responses={
        200: {"description": "AI response returned"},
        422: {"description": "Validation error"},
    },
)
async def send_message(
    request:     ChatRequest,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_optional_bearer),
) -> ChatResponse:
    """
    POST /api/chat

    Request body:
        { "message": "Write a LinkedIn post about AI.", "mode": "linkedin" }

    Response:
        { "response": "...", "timestamp": "...", "model": "...", "mode": "linkedin" }
    """
    user_label = "guest"
    if credentials:
        # Token present — log a short prefix for tracing (not the full token)
        user_label = f"token:{credentials.credentials[:8]}..."

    logger.info(
        "POST /api/chat | user=%s | mode=%s | msg_len=%d",
        user_label, request.mode, len(request.message),
    )

    response = await chat_service.generate_response(request)

    logger.info(
        "POST /api/chat | user=%s | model=%s | response_len=%d",
        user_label, response.model, len(response.response),
    )
    return response
