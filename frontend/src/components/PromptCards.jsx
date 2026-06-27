/**
 * components/PromptCards.jsx
 * Suggested prompt cards for AI Content Assistant.
 * Displayed on the empty-state screen to help users get started quickly.
 */

import React from 'react';

/**
 * Placeholder prompt suggestions.
 * Will be loaded from a config or API in Phase 2.
 */
const PLACEHOLDER_PROMPTS = [
  { id: 1, label: 'Write a blog post intro', icon: '✍️' },
  { id: 2, label: 'Summarize a document',    icon: '📄' },
  { id: 3, label: 'Generate social media copy', icon: '📣' },
  { id: 4, label: 'Brainstorm ideas',        icon: '💡' },
];

/**
 * PromptCards — empty-state suggested prompts component.
 * Placeholder: click handlers and dynamic content will be wired in Phase 2.
 */
function PromptCards() {
  return (
    <div className="prompt-cards">
      <h2 className="prompt-cards__heading">How can I help you today?</h2>

      <div className="prompt-cards__grid">
        {PLACEHOLDER_PROMPTS.map((prompt) => (
          <button
            key={prompt.id}
            className="prompt-cards__card"
            type="button"
            aria-label={`Use prompt: ${prompt.label}`}
            // TODO: populate ChatInput with prompt text on click (Phase 2)
          >
            <span className="prompt-cards__icon">{prompt.icon}</span>
            <span className="prompt-cards__label">{prompt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PromptCards;
