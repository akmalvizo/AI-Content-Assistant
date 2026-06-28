"""
app/services/chat_service.py
-----------------------------
Business logic layer for the chat feature.

*** PHASE 5 SWAP POINT ***
To add a real AI provider, replace the body of `generate_response`
with a call to groq_service.py (or any other provider service).
Routes, models, and the frontend do NOT need to change.

Architecture:
    chat.py  ──►  ChatService.generate_response()  ──►  mock (now) / Groq (Phase 5)
"""

import logging
import random
from datetime import datetime, timezone

from app.models.chat_models import ChatRequest, ChatResponse

logger = logging.getLogger(__name__)

# ─── Mock response pool ───────────────────────────────────────────────────────
# A set of varied, realistic-looking mock replies that make the UI feel alive
# without connecting to any external service.

_MOCK_RESPONSES: list[str] = [
    (
        "Great question! Here's a draft you can work with:\n\n"
        "**AI is not replacing creators — it's supercharging them.** 🚀\n\n"
        "The most successful content teams in 2026 are the ones pairing human "
        "creativity with AI speed. The result? More content, better quality, "
        "and half the time.\n\n"
        "Are you already using AI in your workflow? Drop a comment 👇\n\n"
        "#ContentCreation #AITools #FutureOfWork"
    ),
    (
        "Here's a punchy LinkedIn post for you:\n\n"
        "5 things I wish I knew before starting with AI content tools:\n\n"
        "- Prompts matter more than the tool itself\n"
        "- Editing AI output is faster than writing from scratch\n"
        "- Your unique voice is still your biggest asset\n"
        "- Batch creation saves hours every week\n"
        "- The learning curve is shorter than you think\n\n"
        "Save this for later. You'll thank yourself. 🔖\n\n"
        "#Productivity #AI #Writing"
    ),
    (
        "I've generated a response based on your request:\n\n"
        "**The secret to great content in 2026?**\n\n"
        "It's not writing faster. It's *thinking* clearer.\n\n"
        "AI handles the drafting. You handle the strategy.\n"
        "That's the new content workflow — and it's incredibly powerful.\n\n"
        "#ContentStrategy #AIWriting #LinkedInTips"
    ),
    (
        "Here's a YouTube script hook for you:\n\n"
        "---\n"
        "**[HOOK — 0:00–0:15]**\n\n"
        "What if you could write a week's worth of content in a single afternoon? "
        "No, I'm not talking about burning out — I'm talking about working smarter "
        "with AI. In this video, I'll show you the exact workflow I use to produce "
        "10× the content without 10× the effort.\n\n"
        "Stay until the end — the last tip alone will save you hours every week.\n"
        "---"
    ),
    (
        "This is a mock response from the AI Content Assistant backend. "
        "The full Groq AI integration will be live in Phase 5.\n\n"
        "Your message has been received and processed successfully. "
        "The architecture is in place — routes ✅ · service layer ✅ · "
        "models ✅ · frontend integration ✅\n\n"
        "Ready for Phase 5! 🎉"
    ),
]


class ChatService:
    """
    ChatService — handles all chat business logic.

    Currently returns mock responses.
    In Phase 5, inject a GroqService (or any LLM client) here
    and replace `_mock_generate` with the real API call.
    No other file needs to change.
    """

    async def generate_response(self, request: ChatRequest) -> ChatResponse:
        """
        Process a user message and return a response.

        Args:
            request: Validated ChatRequest containing the user message.

        Returns:
            ChatResponse with the reply, timestamp, and model name.

        Raises:
            Exception: Propagated to the global exception handler in main.py.
        """
        logger.info("ChatService.generate_response | message_length=%d", len(request.message))

        reply = self._mock_generate(request.message)

        response = ChatResponse(
            response=reply,
            timestamp=datetime.now(timezone.utc),
            model="mock-v1",          # Phase 5: replace with "groq/llama-3-70b" etc.
        )

        logger.info("ChatService.generate_response | model=%s", response.model)
        return response

    # ── Private helpers ───────────────────────────────────────────────────────

    def _mock_generate(self, message: str) -> str:
        """
        Return a context-aware mock reply.

        Picks from the pool based on simple keyword matching so the demo
        feels more responsive than a random reply would.

        Args:
            message: Raw user message text.

        Returns:
            A mock reply string.
        """
        msg_lower = message.lower()

        if any(kw in msg_lower for kw in ("linkedin", "professional", "post")):
            return _MOCK_RESPONSES[0]
        if any(kw in msg_lower for kw in ("list", "tips", "secret", "top")):
            return _MOCK_RESPONSES[1]
        if any(kw in msg_lower for kw in ("strategy", "workflow", "content")):
            return _MOCK_RESPONSES[2]
        if any(kw in msg_lower for kw in ("youtube", "script", "video", "hook")):
            return _MOCK_RESPONSES[3]

        # Default: pick randomly from remaining responses
        return random.choice(_MOCK_RESPONSES)


# ── Module-level singleton ────────────────────────────────────────────────────
# Import this instance in the route — do not construct a new one per request.
chat_service = ChatService()
