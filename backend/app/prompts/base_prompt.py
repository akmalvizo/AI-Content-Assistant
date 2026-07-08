"""
app/prompts/base_prompt.py
---------------------------
Abstract base class for all content-mode prompt definitions.

Every prompt file in this package inherits from BasePrompt and implements:
  - system_prompt  →  the full system instruction sent to the LLM
  - metadata       →  name, description, icon, color, category for the UI

PromptService discovers all concrete subclasses via the registry pattern.
No other service or route needs to know about individual prompt classes.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass(frozen=True)
class PromptMetadata:
    """
    Lightweight metadata descriptor exposed to PromptService.
    The frontend never receives this — it is only used server-side.

    Attributes:
        name        Human-readable mode name, e.g. "LinkedIn Writer"
        description One-sentence description of what this mode produces
        icon        React-Icons key used by the frontend (informational)
        color       Tailwind color name, e.g. "blue"
        category    Grouping label, e.g. "Social Media"
    """
    name:        str
    description: str
    icon:        str
    color:       str
    category:    str


class BasePrompt(ABC):
    """
    Abstract base for all content-generation prompt definitions.

    Subclasses MUST implement:
        system_prompt   — the system instruction string passed to the LLM
        metadata        — a PromptMetadata instance describing this mode
    """

    @property
    @abstractmethod
    def system_prompt(self) -> str:
        """Return the full system prompt string for this content mode."""

    @property
    @abstractmethod
    def metadata(self) -> PromptMetadata:
        """Return metadata describing this content mode."""

    def build_messages(self, user_message: str) -> list[dict]:
        """
        Construct the full messages list for the Groq Chat Completions API.

        Args:
            user_message: Sanitised user input from ChatService.

        Returns:
            List of {"role": ..., "content": ...} dicts.
        """
        return [
            {"role": "system", "content": self.system_prompt},
            {"role": "user",   "content": user_message},
        ]
