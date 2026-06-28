"""
app/services/llm_service.py
----------------------------
LLM integration layer for AI Content Assistant.

*** PROVIDER SWAP POINT ***
This is the ONLY file in the entire codebase that knows about Groq.
To switch to OpenAI, Gemini, or any other provider:
  1. Replace the import and client initialisation below.
  2. Update `_call_api()` to match the new SDK's call signature.
  3. Keep `complete()` signature identical — no other file changes.

Responsibilities:
  - Validate that the API key is configured at startup.
  - Initialise the async Groq client once (module-level singleton).
  - Send a structured message list to the Groq Chat Completions API.
  - Extract and return the response text.
  - Map every known Groq / network error to a clean, user-safe message.
  - Never log or surface the API key.
"""

import logging
import time

from groq import AsyncGroq, APIConnectionError, APIStatusError, APITimeoutError, \
                 RateLimitError, AuthenticationError

from app.config import settings

logger = logging.getLogger(__name__)

# ─── System prompt ────────────────────────────────────────────────────────────
# Stored as a module-level constant for easy editing without touching logic.

SYSTEM_PROMPT = """You are AI Content Assistant, an expert AI specialized in content creation.

You help users create:
- Blog posts
- LinkedIn posts
- Instagram captions
- YouTube scripts
- SEO articles
- Product descriptions
- Marketing copy
- Professional emails
- Content rewriting

Always write original, engaging, human-like content.
Maintain professional formatting.
Use headings, bullet points, and clear structure whenever appropriate.

If a request is outside content creation, politely answer it but guide \
the conversation back toward your specialization."""

# ─── User-safe error messages — never exposes internals ──────────────────────

_ERROR_MESSAGES = {
    "auth":       "AI service authentication failed. Please contact support.",
    "rate_limit": "The AI service is currently busy. Please wait a moment and try again.",
    "connection": "Could not reach the AI service. Please check your connection and try again.",
    "timeout":    "The AI service took too long to respond. Please try again.",
    "api_error":  "The AI service returned an error. Please try again.",
    "no_key":     "AI service is not configured. Please set GROQ_API_KEY in your .env file.",
    "unexpected": "An unexpected error occurred while generating your response.",
}


class LLMService:
    """
    LLMService — async wrapper around the Groq Chat Completions API.

    Usage (via the module-level singleton `llm_service`):
        reply = await llm_service.complete(user_message)
    """

    def __init__(self) -> None:
        """
        Initialise the async Groq client.

        Logs a warning if the key is absent so the app starts cleanly;
        the error surfaces in the response when a request is made.
        """
        if not settings.GROQ_API_KEY:
            logger.warning(
                "LLMService: GROQ_API_KEY is not set — "
                "chat requests will return an error until the key is configured."
            )
            self._client: AsyncGroq | None = None
        else:
            self._client = AsyncGroq(api_key=settings.GROQ_API_KEY)
            logger.info(
                "LLMService: AsyncGroq client initialised | model=%s | max_tokens=%d | temp=%.1f",
                settings.GROQ_MODEL,
                settings.GROQ_MAX_TOKENS,
                settings.GROQ_TEMPERATURE,
            )

    # ── Public interface ──────────────────────────────────────────────────────

    async def complete(self, user_message: str) -> str:
        """
        Send a user message to Groq and return the assistant's reply.

        Builds the full message list (system prompt + user turn) and
        delegates to `_call_api`.

        Args:
            user_message: Sanitised user input from ChatService.

        Returns:
            AI-generated response text (stripped).

        Raises:
            RuntimeError: User-safe error string — caught by ChatService.
        """
        if self._client is None:
            raise RuntimeError(_ERROR_MESSAGES["no_key"])

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": user_message},
        ]

        return await self._call_api(messages)

    # ── Private helpers ───────────────────────────────────────────────────────

    async def _call_api(self, messages: list[dict]) -> str:
        """
        Execute the async Groq API call.

        Args:
            messages: Full message list including the system prompt.

        Returns:
            Stripped response content string.

        Raises:
            RuntimeError: Mapped user-safe error.
        """
        t_start = time.perf_counter()

        logger.info(
            "LLMService: → Groq request | model=%s | user_chars=%d",
            settings.GROQ_MODEL,
            len(messages[-1]["content"]),
        )

        try:
            completion = await self._client.chat.completions.create(
                model=settings.GROQ_MODEL,
                messages=messages,
                max_tokens=settings.GROQ_MAX_TOKENS,
                temperature=settings.GROQ_TEMPERATURE,
            )

            response_text = completion.choices[0].message.content or ""
            elapsed_ms    = int((time.perf_counter() - t_start) * 1000)

            logger.info(
                "LLMService: ← Groq response | model=%s | elapsed_ms=%d | response_chars=%d",
                settings.GROQ_MODEL,
                elapsed_ms,
                len(response_text),
            )

            return response_text.strip()

        except AuthenticationError:
            logger.error("LLMService: authentication failed — check GROQ_API_KEY")
            raise RuntimeError(_ERROR_MESSAGES["auth"])

        except RateLimitError:
            logger.warning("LLMService: rate limit exceeded")
            raise RuntimeError(_ERROR_MESSAGES["rate_limit"])

        except APIConnectionError:
            logger.error("LLMService: connection error reaching Groq API")
            raise RuntimeError(_ERROR_MESSAGES["connection"])

        except APITimeoutError:
            logger.error("LLMService: request timed out")
            raise RuntimeError(_ERROR_MESSAGES["timeout"])

        except APIStatusError as exc:
            logger.error(
                "LLMService: API status error | status=%s | body=%s",
                exc.status_code, exc.message,
            )
            raise RuntimeError(_ERROR_MESSAGES["api_error"])

        except Exception:
            logger.exception("LLMService: unexpected error")
            raise RuntimeError(_ERROR_MESSAGES["unexpected"])


# ── Module-level singleton ────────────────────────────────────────────────────
# Import `llm_service` wherever needed. Never construct LLMService() again.
llm_service = LLMService()
