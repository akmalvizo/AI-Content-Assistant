"""
app/services/prompt_service.py
--------------------------------
Prompt Management System — the intelligence layer of AI Content Assistant.

Responsibilities:
  - Maintain a registry that maps every mode identifier to its BasePrompt instance.
  - Validate incoming mode strings against the registry.
  - Return the correct BasePrompt for a given mode (with a safe fallback).
  - Provide the full messages list ready for the LLM API.

*** EXTENSION POINT ***
To add a new content mode:
  1. Create  app/prompts/<new_mode>.py  with a BasePrompt subclass.
  2. Import the singleton and add one line to _REGISTRY below.
  3. Add the mode constant to  app/constants/prompt_types.py.
  That's it — routes, chat_service, llm_service, and the LLM call are untouched.
"""

import logging
from typing import Optional

from app.prompts.base_prompt import BasePrompt
from app.prompts.general   import general_prompt
from app.prompts.blog      import blog_prompt
from app.prompts.linkedin  import linkedin_prompt
from app.prompts.instagram import instagram_prompt
from app.prompts.facebook  import facebook_prompt
from app.prompts.youtube   import youtube_prompt
from app.prompts.email     import email_prompt
from app.prompts.seo       import seo_prompt
from app.prompts.product   import product_prompt
from app.prompts.rewrite   import rewrite_prompt

from app.constants.prompt_types import ALL_MODES, DEFAULT_MODE

logger = logging.getLogger(__name__)

# ── Prompt registry ───────────────────────────────────────────────────────────
# Maps mode identifier strings → BasePrompt singletons.
# Loaded once at module import — zero runtime overhead per request.

_REGISTRY: dict[str, BasePrompt] = {
    "general":   general_prompt,
    "blog":      blog_prompt,
    "linkedin":  linkedin_prompt,
    "instagram": instagram_prompt,
    "facebook":  facebook_prompt,
    "youtube":   youtube_prompt,
    "email":     email_prompt,
    "seo":       seo_prompt,
    "product":   product_prompt,
    "rewrite":   rewrite_prompt,
}


class PromptService:
    """
    PromptService — single source of truth for all AI prompt construction.

    All methods are synchronous (no I/O) — prompts are pure in-memory objects.
    """

    # ── Public interface ──────────────────────────────────────────────────────

    def get_prompt(self, mode: Optional[str]) -> BasePrompt:
        """
        Return the BasePrompt instance for the given mode.
        Falls back to GeneralPrompt for None, empty, or unrecognised modes.

        Args:
            mode: Mode identifier string from the API request.

        Returns:
            The registered BasePrompt for the mode.
        """
        resolved = self._resolve_mode(mode)
        prompt   = _REGISTRY[resolved]
        logger.debug("PromptService: resolved mode=%s → %s", resolved, prompt.metadata.name)
        return prompt

    def build_messages(self, mode: Optional[str], user_message: str) -> list[dict]:
        """
        Build the complete messages list for the LLM API call.

        Args:
            mode:         Content mode identifier.
            user_message: Sanitised user input.

        Returns:
            List of {"role": ..., "content": ...} dicts.
        """
        prompt = self.get_prompt(mode)
        return prompt.build_messages(user_message)

    def is_valid_mode(self, mode: str) -> bool:
        """Return True if mode is in the registry."""
        return mode in _REGISTRY

    def all_modes(self) -> list[str]:
        """Return sorted list of all supported mode identifiers."""
        return list(_REGISTRY.keys())

    # ── Private helpers ───────────────────────────────────────────────────────

    def _resolve_mode(self, mode: Optional[str]) -> str:
        """
        Normalise and validate a mode string.

        - Strips whitespace and lowercases.
        - Returns DEFAULT_MODE for None / empty / unknown values.
        """
        if not mode:
            return DEFAULT_MODE

        normalised = mode.strip().lower()

        if normalised not in _REGISTRY:
            logger.warning(
                "PromptService: unknown mode '%s' — falling back to '%s'",
                mode, DEFAULT_MODE,
            )
            return DEFAULT_MODE

        return normalised


# Module-level singleton
prompt_service = PromptService()
