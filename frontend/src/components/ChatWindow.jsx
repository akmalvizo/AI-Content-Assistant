/**
 * components/ChatWindow.jsx
 * Main chat display area for AI Content Assistant.
 * Renders the message history, typing indicator, and chat input.
 */

import React from 'react';
import Message from './Message.jsx';
import TypingLoader from './TypingLoader.jsx';
import ChatInput from './ChatInput.jsx';
import PromptCards from './PromptCards.jsx';

/**
 * ChatWindow — central chat interface component.
 * Placeholder: message rendering and state integration added in Phase 2.
 */
function ChatWindow() {
  // Placeholder state — will be wired to ChatContext in Phase 2
  const messages = [];
  const isTyping = false;

  return (
    <main className="chat-window">
      {/* Message list or empty-state prompt cards */}
      {messages.length === 0 ? (
        <PromptCards />
      ) : (
        <div className="chat-messages">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
        </div>
      )}

      {/* Typing / loading indicator */}
      {isTyping && <TypingLoader />}

      {/* Message input bar */}
      <ChatInput />
    </main>
  );
}

export default ChatWindow;
