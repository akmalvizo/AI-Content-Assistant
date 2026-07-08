"""
app/models/chat_models.py
--------------------------
Pydantic request / response schemas for the chat endpoint.
"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

from app.constants.prompt_types import ALL_MODES, DEFAULT_MODE


class ChatRequest(BaseModel):
    """
    Payload sent by the frontend for every chat turn.

    Attributes:
        message: User input text (1–5000 characters).
        mode:    Content generation mode identifier. Defaults to 'general'.
    """

    message: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="User message text.",
        examples=["Write a LinkedIn post about AI trends."],
    )

    mode: Optional[str] = Field(
        default=DEFAULT_MODE,
        description=f"Content mode. Supported values: {', '.join(ALL_MODES)}",
        examples=["linkedin"],
    )


class ChatResponse(BaseModel):
    """
    Payload returned after processing a chat turn.

    Attributes:
        response:   AI-generated reply text.
        timestamp:  ISO-8601 UTC timestamp.
        model:      LLM model identifier.
        mode:       Content mode used to generate this response.
    """

    response:  str      = Field(..., description="AI-generated reply.")
    timestamp: datetime = Field(..., description="UTC timestamp of the response.")
    model:     str      = Field(..., description="LLM model identifier.")
    mode:      str      = Field(..., description="Content mode used.")
