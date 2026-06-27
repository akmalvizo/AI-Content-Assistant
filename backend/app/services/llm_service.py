"""
app/services/llm_service.py
---------------------------
LLM service layer for AI Content Assistant.
Abstracts all interactions with the language model provider.
Business logic for prompt construction and response parsing lives here.
"""


class LLMService:
    """
    LLMService — placeholder service class for LLM interactions.

    Responsibilities (Phase 2):
        - Initialise the LLM client with credentials from config
        - Build structured prompt messages
        - Call the LLM provider API
        - Parse and return the model's response
        - Handle rate limiting and retries
    """

    def __init__(self):
        # TODO: initialise LLM client (e.g. OpenAI, Anthropic) in Phase 2
        pass

    async def generate_response(self, user_message: str) -> str:
        """
        Generate an AI response for the given user message.

        Args:
            user_message: The text input from the user.

        Returns:
            The AI-generated response string.

        TODO (Phase 2): implement actual LLM API call here.
        """
        # Placeholder — real implementation in Phase 2
        return "Placeholder LLM response."
