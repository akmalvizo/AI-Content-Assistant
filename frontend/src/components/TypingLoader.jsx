/**
 * components/TypingLoader.jsx
 * Animated typing indicator for AI Content Assistant.
 * Displays while the AI is generating a response.
 */

import React from 'react';

/**
 * TypingLoader — animated loading indicator component.
 * Placeholder: animation will be styled with Tailwind CSS in Phase 2.
 */
function TypingLoader() {
  return (
    <div className="typing-loader" role="status" aria-label="AI is typing">
      {/* Three bouncing dots — animated via CSS / Tailwind in Phase 2 */}
      <span className="typing-loader__dot" />
      <span className="typing-loader__dot" />
      <span className="typing-loader__dot" />
    </div>
  );
}

export default TypingLoader;
