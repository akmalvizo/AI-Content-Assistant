/**
 * data/mockChats.js
 * Centralised mock / placeholder data for AI Content Assistant UI.
 * Replace these with real API responses in Phase 4.
 */

// ─── Recent Chats (Sidebar) ───────────────────────────────────────────────────

export const recentChats = [
  { id: "c1", title: "LinkedIn post about AI trends",  date: "Today" },
  { id: "c2", title: "YouTube script: React 19 tips",  date: "Today" },
  { id: "c3", title: "Blog: Getting started with FastAPI", date: "Yesterday" },
  { id: "c4", title: "SEO article: Tailwind CSS guide",    date: "Yesterday" },
  { id: "c5", title: "Product description for SaaS app",   date: "Jun 26" },
  { id: "c6", title: "Cold email campaign — outreach",     date: "Jun 25" },
  { id: "c7", title: "YouTube script: Python tutorial",    date: "Jun 24" },
];

// ─── Prompt Suggestions (Welcome Screen) ─────────────────────────────────────

export const promptSuggestions = [
  {
    id: "p1",
    icon: "linkedin",
    label: "Write a LinkedIn post",
    description: "Craft an engaging professional update",
    color: "blue",
  },
  {
    id: "p2",
    icon: "youtube",
    label: "Create a YouTube script",
    description: "Full script with hook, body & CTA",
    color: "red",
  },
  {
    id: "p3",
    icon: "blog",
    label: "Generate a blog post",
    description: "SEO-optimised long-form article",
    color: "emerald",
  },
  {
    id: "p4",
    icon: "product",
    label: "Write product description",
    description: "Compelling copy that converts",
    color: "purple",
  },
  {
    id: "p5",
    icon: "improve",
    label: "Improve my writing",
    description: "Clarity, tone & grammar polish",
    color: "amber",
  },
  {
    id: "p6",
    icon: "seo",
    label: "Create SEO article",
    description: "Keyword-rich content that ranks",
    color: "teal",
  },
];

// ─── Sample Conversation Messages ─────────────────────────────────────────────
// Kept for reference / Storybook / testing.
// The live app starts with an empty message list (welcome screen shown).

export const sampleMessages = [
  {
    id: "m1",
    role: "user",
    content: "Write me a short LinkedIn post about the future of AI in content creation.",
    timestamp: "10:32 AM",
  },
  {
    id: "m2",
    role: "assistant",
    content: `**The future of content creation is here — and it's powered by AI.** 🚀

Over the next few years, AI won't replace creators. It will *amplify* them.

Here's what that looks like in practice:
- ✍️ **Drafting** in seconds instead of hours
- 🔍 **SEO research** that's data-driven, not guesswork  
- 🎯 **Personalisation** at scale — content tailored to every audience segment
- 🌐 **Multilingual publishing** without a translation team

The creators who win won't be those who resist AI. They'll be the ones who learn to **collaborate** with it.

Are you already using AI in your content workflow? Drop a comment 👇

#ContentCreation #AITools #FutureOfWork #LinkedInTips`,
    timestamp: "10:32 AM",
  },
  {
    id: "m3",
    role: "user",
    content: "Make it shorter and more punchy. Max 3 lines.",
    timestamp: "10:34 AM",
  },
  {
    id: "m4",
    role: "assistant",
    content: `AI won't replace content creators — it'll supercharge them. 🚀

The writers who adapt will produce 10× the output with twice the quality.

Are you using AI in your workflow yet? The gap between those who do and those who don't is growing fast. 👇

#AI #ContentCreation #FutureOfWork`,
    timestamp: "10:34 AM",
  },
];

// ─── Navigation Items (Sidebar) ───────────────────────────────────────────────

export const navItems = [
  { id: "dashboard",  label: "Dashboard",        icon: "dashboard" },
  { id: "linkedin",   label: "LinkedIn Writer",   icon: "linkedin"  },
  { id: "youtube",    label: "YouTube Script",    icon: "youtube"   },
  { id: "blog",       label: "Blog Writer",       icon: "blog"      },
  { id: "seo",        label: "SEO Assistant",     icon: "seo"       },
  { id: "email",      label: "Email Writer",      icon: "email"     },
];
