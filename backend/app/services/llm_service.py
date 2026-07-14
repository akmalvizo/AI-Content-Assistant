"""
app/services/llm_service.py
----------------------------
LLM integration layer — the ONLY file that knows about Groq.

To swap providers: replace imports + client init + _call_api(). Nothing else.
"""

import asyncio
import logging
import time

from groq import (
    AsyncGroq,
    APIConnectionError,
    APIStatusError,
    APITimeoutError,
    RateLimitError,
    AuthenticationError,
)

from app.config import settings

logger = logging.getLogger(__name__)

# ── User-safe error messages — never exposes internal details ─────────────────

_ERROR_MESSAGES = {
    "auth":       "AI service authentication failed. Please contact support.",
    "rate_limit": "The AI service is temporarily busy due to high demand. Please wait 10–15 seconds and try again.",
    "connection": "Could not reach the AI service. Please check your connection and try again.",
    "timeout":    "The AI service took too long to respond. Please try again.",
    "api_error":  "The AI service returned an error. Please try again.",
    "no_key":     "AI service is not configured. Please set GROQ_API_KEY in your .env file.",
    "unexpected": "An unexpected error occurred. Please try again.",
}


class LLMService:
    """Async wrapper around the Groq Chat Completions API."""

    def __init__(self) -> None:
        if not settings.GROQ_API_KEY:
            logger.warning("LLMService: GROQ_API_KEY is not set.")
            self._client: AsyncGroq | None = None
        else:
            self._client = AsyncGroq(api_key=settings.GROQ_API_KEY)
            logger.info(
                "LLMService: AsyncGroq client initialised | model=%s | max_tokens=%d | temp=%.1f",
                settings.GROQ_MODEL,
                settings.GROQ_MAX_TOKENS,
                settings.GROQ_TEMPERATURE,
            )

    async def complete_with_messages(self, messages: list[dict]) -> str:
        if self._client is None:
            raise RuntimeError(_ERROR_MESSAGES["no_key"])
        return await self._call_api(messages)

    async def complete(self, user_message: str, system_prompt: str) -> str:
        if self._client is None:
            raise RuntimeError(_ERROR_MESSAGES["no_key"])
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message},
        ]
        return await self._call_api(messages)

    async def _call_api(self, messages: list[dict]) -> str:
        t_start = time.perf_counter()
        user_chars = len(messages[-1]["content"]) if messages else 0
        logger.info(
            "LLMService: → Groq request | model=%s | user_chars=%d",
            settings.GROQ_MODEL, user_chars,
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
                "LLMService: ← Groq response | elapsed_ms=%d | response_chars=%d",
                elapsed_ms, len(response_text),
            )
            return response_text.strip()

        except AuthenticationError:
            logger.error("LLMService: authentication failed")
            raise RuntimeError(_ERROR_MESSAGES["auth"])

        except RateLimitError:
            # Groq SDK raises RateLimitError for HTTP 429
            logger.warning("LLMService: rate limit exceeded (RateLimitError)")
            raise RuntimeError(_ERROR_MESSAGES["rate_limit"])

        except APIStatusError as exc:
            # Groq SDK sometimes raises APIStatusError for 429 instead of RateLimitError
            # Always intercept 429 here and return the friendly rate-limit message.
            status_code = getattr(exc, "status_code", 0)
            if status_code == 429:
                logger.warning("LLMService: rate limit exceeded (APIStatusError 429)")
                raise RuntimeError(_ERROR_MESSAGES["rate_limit"])
            logger.error("LLMService: API status error | status=%s", status_code)
            raise RuntimeError(_ERROR_MESSAGES["api_error"])

        except APIConnectionError:
            logger.error("LLMService: connection error")
            raise RuntimeError(_ERROR_MESSAGES["connection"])

        except APITimeoutError:
            logger.error("LLMService: request timed out")
            raise RuntimeError(_ERROR_MESSAGES["timeout"])

        except Exception:
            logger.exception("LLMService: unexpected error")
            raise RuntimeError(_ERROR_MESSAGES["unexpected"])


# Module-level singleton
llm_service = LLMService()
