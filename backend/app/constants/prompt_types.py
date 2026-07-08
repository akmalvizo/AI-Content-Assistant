"""
app/constants/prompt_types.py
------------------------------
Single source of truth for all supported content-generation mode identifiers.

Rules:
  - Every string here maps 1-to-1 to a prompt file in app/prompts/.
  - The frontend sends one of these values in the "mode" field.
  - PromptService uses them to look up the correct BasePrompt subclass.
  - To add a new mode: add a constant here, create its prompt file,
    and register it in PromptService. Nothing else changes.
"""

# ── Supported mode identifiers ────────────────────────────────────────────────

GENERAL   = "general"
BLOG      = "blog"
LINKEDIN  = "linkedin"
INSTAGRAM = "instagram"
FACEBOOK  = "facebook"
YOUTUBE   = "youtube"
EMAIL     = "email"
SEO       = "seo"
PRODUCT   = "product"
REWRITE   = "rewrite"

# Ordered list used for validation and Swagger docs
ALL_MODES: list[str] = [
    GENERAL,
    BLOG,
    LINKEDIN,
    INSTAGRAM,
    FACEBOOK,
    YOUTUBE,
    EMAIL,
    SEO,
    PRODUCT,
    REWRITE,
]

# Default fallback when an unknown mode is received
DEFAULT_MODE: str = GENERAL
