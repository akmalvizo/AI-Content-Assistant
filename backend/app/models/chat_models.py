"""
app/models/chat_models.py
--------------------------
Pydantic request / response schemas for the chat endpoint.

Keeping models in a dedicated file means the route and service
layers stay decoupled — swap the response shape here without
touching the route or the service.
"""

from pydantic import BaseModel, Field
from datetime import datetime


class ChatRequest(BaseModel):
    """
    Payload sent by the frontend for every chat turn.

    Attributes:
        message: The raw user input string (1–5000 characters).
    """

    message: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="User message text.",
        examples=["Write a LinkedIn post about AI trends."],
    )


class ChatResponse(BaseModel):
    """
    Payload returned by the backend after processing a chat turn.

    Attributes:
        response:   The AI-generated (or mock) reply.
        timestamp:  ISO-8601 UTC timestamp of when the response was created.
        model:      Identifier of the model / service that produced the reply.
    """

    response:  str      = Field(..., description="AI-generated reply.")
    timestamp: datetime = Field(..., description="UTC timestamp of the response.")
    model:     str      = Field(..., description="Model / service identifier.")
