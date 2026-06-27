"""
app/routes/chat.py
------------------
Chat route for AI Content Assistant.
Exposes endpoints for sending messages and receiving AI-generated responses.
"""

from fastapi import APIRouter

router = APIRouter()


@router.post("/chat", summary="Send a chat message")
async def send_message(body: dict):
    """
    Accepts a user message and returns a placeholder AI response.

    Request body:
        { "message": "<user input string>" }

    Returns:
        { "reply": "<AI response string>" }

    TODO (Phase 2):
        - Define a Pydantic request/response model in app/models/
        - Delegate to LLMService in app/services/llm_service.py
        - Add streaming support
    """
    # Placeholder response — real LLM call implemented in Phase 2
    return {"reply": "Placeholder response — LLM integration coming in Phase 2."}
