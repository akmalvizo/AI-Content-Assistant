/**
 * data/modes.js
 * Single source of truth for all content-generation modes on the frontend.
 *
 * Each entry mirrors the backend prompt registry (app/constants/prompt_types.py).
 * The `id` field is the value sent to the backend in the "mode" field.
 *
 * To add a new mode: add one object here and register the prompt on the backend.
 * Nothing else in the frontend needs to change.
 */

export const MODES = [
  {
    id:          "general",
    label:       "General Assistant",
    description: "All-purpose AI writing help for any content",
    icon:        "stars",
    color:       "emerald",
    category:    "General",
    placeholder: "Ask me anything or describe the content you need…",
    suggestions: [
      { id: "g1", text: "Write a short bio for my personal website" },
      { id: "g2", text: "Explain artificial intelligence in simple terms" },
      { id: "g3", text: "Give me 10 content ideas for a tech blog" },
      { id: "g4", text: "Write a welcome message for my newsletter" },
      { id: "g5", text: "Create an about page for my portfolio" },
      { id: "g6", text: "Help me brainstorm names for my startup" },
    ],
  },
  {
    id:          "blog",
    label:       "Blog Writer",
    description: "SEO-optimised long-form articles and blog posts",
    icon:        "blog",
    color:       "emerald",
    category:    "Writing",
    placeholder: "Describe the blog topic, target audience, and desired length…",
    suggestions: [
      { id: "b1", text: "Write a 1000-word blog post about AI in healthcare" },
      { id: "b2", text: "Explain machine learning for complete beginners" },
      { id: "b3", text: "Write a blog about the future of remote work in 2026" },
      { id: "b4", text: "Create a how-to guide for starting a podcast" },
      { id: "b5", text: "Write a listicle: 10 productivity tools for developers" },
      { id: "b6", text: "Blog post about sustainable living tips for busy people" },
    ],
  },
  {
    id:          "linkedin",
    label:       "LinkedIn Writer",
    description: "Scroll-stopping posts that build your professional brand",
    icon:        "linkedin",
    color:       "blue",
    category:    "Social Media",
    placeholder: "What's the topic, achievement, or insight you want to share?",
    suggestions: [
      { id: "l1", text: "Write a LinkedIn post announcing my new job" },
      { id: "l2", text: "Share a professional lesson I learned from failure" },
      { id: "l3", text: "Post about AI transforming the marketing industry" },
      { id: "l4", text: "Write a thought leadership post about leadership skills" },
      { id: "l5", text: "Announce the launch of my new SaaS product" },
      { id: "l6", text: "Share 5 lessons from 5 years of entrepreneurship" },
    ],
  },
  {
    id:          "instagram",
    label:       "Instagram Caption",
    description: "Engaging captions with hashtags that grow your reach",
    icon:        "instagram",
    color:       "purple",
    category:    "Social Media",
    placeholder: "Describe your photo/video and the vibe you want (funny, inspiring, etc.)…",
    suggestions: [
      { id: "i1", text: "Caption for a photo of my morning coffee routine" },
      { id: "i2", text: "Create 5 captions for a fitness transformation post" },
      { id: "i3", text: "Write captions for a travel photo in Bali" },
      { id: "i4", text: "Inspiring caption for a motivational quote post" },
      { id: "i5", text: "Captions for a behind-the-scenes of my studio" },
      { id: "i6", text: "Product launch caption for a new skincare line" },
    ],
  },
  {
    id:          "facebook",
    label:       "Facebook Ad",
    description: "High-converting ad copy for Facebook & Instagram Ads",
    icon:        "facebook",
    color:       "blue",
    category:    "Advertising",
    placeholder: "Describe your product, target audience, and campaign goal…",
    suggestions: [
      { id: "f1", text: "Facebook ad for an online fitness coaching programme" },
      { id: "f2", text: "Ad copy for a limited-time 50% off sale on shoes" },
      { id: "f3", text: "Write a lead generation ad for a free webinar" },
      { id: "f4", text: "Retargeting ad for people who visited my website" },
      { id: "f5", text: "Facebook ad for a local restaurant's weekend special" },
      { id: "f6", text: "Ad for a B2B SaaS tool targeting small business owners" },
    ],
  },
  {
    id:          "youtube",
    label:       "YouTube Script",
    description: "Full video scripts with hooks, chapters, and CTAs",
    icon:        "youtube",
    color:       "red",
    category:    "Video",
    placeholder: "What's the video topic, target audience, and desired length?",
    suggestions: [
      { id: "y1", text: "10-minute YouTube script: How to learn Python in 30 days" },
      { id: "y2", text: "Script for a React 19 tutorial for beginners" },
      { id: "y3", text: "YouTube video: 5 AI tools that will change your workflow" },
      { id: "y4", text: "Script: My journey from 0 to 100K subscribers" },
      { id: "y5", text: "Educational video: What is machine learning?" },
      { id: "y6", text: "Script for a product review of the latest iPhone" },
    ],
  },
  {
    id:          "email",
    label:       "Email Writer",
    description: "Professional emails that get opened, read, and actioned",
    icon:        "email",
    color:       "teal",
    category:    "Business",
    placeholder: "Describe the email type, recipient, and what you want to achieve…",
    suggestions: [
      { id: "e1", text: "Write a cold outreach email to a potential B2B client" },
      { id: "e2", text: "Professional job application email for a UX designer role" },
      { id: "e3", text: "Follow-up email after a sales call with no response" },
      { id: "e4", text: "Email to a client announcing a project delay" },
      { id: "e5", text: "Welcome email for new newsletter subscribers" },
      { id: "e6", text: "Email asking for a testimonial from a happy customer" },
    ],
  },
  {
    id:          "seo",
    label:       "SEO Writer",
    description: "Keyword-rich articles engineered to rank on Google",
    icon:        "seo",
    color:       "amber",
    category:    "Writing",
    placeholder: "Enter your target keyword, topic, and desired article length…",
    suggestions: [
      { id: "s1", text: "SEO article about 'best project management tools 2026'" },
      { id: "s2", text: "Write an SEO-optimised article about electric vehicles" },
      { id: "s3", text: "SEO blog post targeting 'how to start a dropshipping business'" },
      { id: "s4", text: "Write a pillar page about 'content marketing strategy'" },
      { id: "s5", text: "SEO article: 'best programming languages to learn in 2026'" },
      { id: "s6", text: "SEO guide on 'remote work productivity tips'" },
    ],
  },
  {
    id:          "product",
    label:       "Product Description",
    description: "Compelling e-commerce copy that turns browsers into buyers",
    icon:        "product",
    color:       "purple",
    category:    "E-Commerce",
    placeholder: "Describe your product: name, key features, target customer, and platform…",
    suggestions: [
      { id: "pr1", text: "Product description for wireless noise-cancelling headphones" },
      { id: "pr2", text: "Write an Amazon listing for an ergonomic office chair" },
      { id: "pr3", text: "Shopify description for a minimalist leather wallet" },
      { id: "pr4", text: "Product copy for a premium skincare serum for women 35+" },
      { id: "pr5", text: "Description for a SaaS tool that automates social media" },
      { id: "pr6", text: "E-commerce copy for a kids' educational toy set" },
    ],
  },
  {
    id:          "rewrite",
    label:       "Content Rewriter",
    description: "Rewrite and polish any content for clarity and impact",
    icon:        "rewrite",
    color:       "orange",
    category:    "Editing",
    placeholder: "Paste the content you want rewritten and describe the desired tone/style…",
    suggestions: [
      { id: "r1", text: "Rewrite this paragraph to sound more professional" },
      { id: "r2", text: "Make this email more concise and direct" },
      { id: "r3", text: "Rewrite this product description to be more persuasive" },
      { id: "r4", text: "Improve the clarity and flow of my LinkedIn bio" },
      { id: "r5", text: "Rewrite this blog intro to be more engaging" },
      { id: "r6", text: "Make this cold email sound more human and less salesy" },
    ],
  },
];

/** Default mode — matches backend DEFAULT_MODE */
export const DEFAULT_MODE_ID = "general";

/** Look up a mode object by id, with fallback to general */
export function getModeById(id) {
  return MODES.find((m) => m.id === id) ?? MODES[0];
}
