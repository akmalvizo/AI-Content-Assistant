/**
 * components/ChatWindow.jsx
 * Main chat area.
 *
 * - Empty messages → PromptCards (welcome / empty state)
 * - Messages present → scrollable list of Message bubbles
 * - isLoading → TypingLoader shown below last message
 * - Auto-scrolls to bottom on new messages and while loading
 * - ChatInput always pinned to the bottom
 */

import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext.jsx';
import { scrollToBottom } from '../utils/helpers.js';
import Message      from './Message.jsx';
import TypingLoader from './TypingLoader.jsx';
import ChatInput    from './ChatInput.jsx';
import PromptCards  from './PromptCards.jsx';

function ChatWindow() {
  const { state }  = useChat();
  const { messages, isLoading, theme } = state;
  const isDark     = theme === 'dark';
  const bottomRef  = useRef(null);

  // Auto-scroll whenever the message list or loading state changes
  useEffect(() => {
    scrollToBottom(bottomRef);
  }, [messages, isLoading]);

  const bgColor = isDark ? 'bg-zinc-950' : 'bg-slate-50';

  return (
    <div className={`flex flex-col flex-1 h-full min-w-0 ${bgColor}`}>

      {/* ── Scrollable message area ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {messages.length === 0 ? (
          <PromptCards />
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {isLoading && <TypingLoader />}

            {/* Scroll anchor */}
            <div ref={bottomRef} aria-hidden="true" />
          </div>
        )}
      </div>

      {/* ── Sticky chat input ────────────────────────────────────────── */}
      <div className={`
        sticky bottom-0 border-t
        ${isDark ? 'border-zinc-800' : 'border-slate-200'}
        ${bgColor}
      `}>
        <div className="max-w-3xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
