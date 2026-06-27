/**
 * components/Message.jsx
 * Individual chat message bubble for AI Content Assistant.
 * Renders a single user or assistant message with appropriate styling.
 */

import React from 'react';

/**
 * Message — single message display component.
 *
 * @param {object} props
 * @param {object} props.message - Message data object
 * @param {string} props.message.id      - Unique message identifier
 * @param {string} props.message.role    - 'user' | 'assistant'
 * @param {string} props.message.content - Text content of the message
 */
function Message({ message }) {
  // Placeholder: styling and markdown rendering will be implemented in Phase 2
  const { role, content } = message;

  return (
    <div className={`message message--${role}`}>
      <span className="message-role">{role === 'user' ? 'You' : 'AI'}</span>
      <p className="message-content">{content}</p>
    </div>
  );
}

export default Message;
