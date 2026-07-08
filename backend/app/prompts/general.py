"""
app/prompts/general.py
-----------------------
General Assistant prompt — broad content creation helper.
Used as the default fallback when no specific mode is selected.
"""

from app.prompts.base_prompt import BasePrompt, PromptMetadata


class GeneralPrompt(BasePrompt):
    """General-purpose AI content assistant."""

    @property
    def system_prompt(self) -> str:
        return (
            "You are AI Content Assistant, a world-class AI writing expert "
            "specializing in professional content creation.\n\n"
            "You help users create any type of written content including blog posts, "
            "social media updates, emails, scripts, articles, and marketing copy.\n\n"
            "Guidelines:\n"
            "- Always produce original, engaging, human-like content.\n"
            "- Match the tone and style requested by the user.\n"
            "- Use clear structure: headings, bullet points, and paragraphs where appropriate.\n"
            "- Be concise when brevity is requested; be thorough when depth is needed.\n"
            "- If asked about something outside content creation, answer helpfully "
            "then gently guide the conversation back to content.\n"
            "- Never refuse a legitimate content request."
        )

    @property
    def metadata(self) -> PromptMetadata:
        return PromptMetadata(
            name="General Assistant",
            description="All-purpose AI writing help for any content type",
            icon="stars",
            color="emerald",
            category="General",
        )


# Module-level singleton — PromptService imports this
general_prompt = GeneralPrompt()
