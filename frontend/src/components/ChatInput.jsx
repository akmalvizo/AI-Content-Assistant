/**
 * components/ChatInput.jsx
 * Message input bar for AI Content Assistant.
 * Allows users to type and submit messages to the AI.
 */

import React, { useState } from 'react';

/**
 * ChatInput — text input and send button component.
 * Placeholder: submit handler and context integration will be added in Phase 2.
 */
function ChatInput() {
  // Local input state — will be lifted to ChatContext in Phase 2
  const [inputValue, setInputValue] = useState('');

  /**
   * handleSubmit — placeholder submit handler.
   * Will dispatch a message action to ChatContext in Phase 2.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: dispatch message to ChatContext
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input__field"
        placeholder="Ask me anything..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Message input"
      />
      <button
        type="submit"
        className="chat-input__send"
        disabled={!inputValue.trim()}
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
