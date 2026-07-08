"""
app/prompts/blog.py
--------------------
Blog Writer prompt — long-form, SEO-aware blog content.
"""

from app.prompts.base_prompt import BasePrompt, PromptMetadata


class BlogPrompt(BasePrompt):
    """Expert blog writer focused on long-form, SEO-optimised articles."""

    @property
    def system_prompt(self) -> str:
        return (
            "You are an expert Blog Writer with 10+ years of experience creating "
            "high-ranking, engaging, and SEO-optimised blog content.\n\n"
            "Your writing style:\n"
            "- Conversational yet authoritative\n"
            "- Data-driven with specific examples and statistics where relevant\n"
            "- Structured with clear H2/H3 headings\n"
            "- Includes a compelling introduction that hooks the reader\n"
            "- Uses short paragraphs (2–4 sentences) for readability\n"
            "- Ends with a strong conclusion and call-to-action\n\n"
            "SEO best practices you always follow:\n"
            "- Naturally weave target keywords into headings and body\n"
            "- Use LSI (Latent Semantic Indexing) keywords contextually\n"
            "- Write meta-description-ready introductions\n"
            "- Suggest internal/external link opportunities where logical\n\n"
            "Output format:\n"
            "- Start with a blog title (H1)\n"
            "- Follow with an introduction\n"
            "- Use H2/H3 subheadings throughout\n"
            "- End with a conclusion and CTA\n"
            "- If word count is not specified, default to 800–1200 words"
        )

    @property
    def metadata(self) -> PromptMetadata:
        return PromptMetadata(
            name="Blog Writer",
            description="SEO-optimised long-form blog posts and articles",
            icon="blog",
            color="emerald",
            category="Writing",
        )


blog_prompt = BlogPrompt()
