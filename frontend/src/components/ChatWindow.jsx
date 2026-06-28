/**
 * components/ChatWindow.jsx
 * Main chat area — shows the welcome screen (PromptCards) when there are no
 * messages, or the scrollable message list + typing loader when a chat is active.
 * ChatInput is always pinned to the bottom.
 */

import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext.jsx';
import Message from './Message.jsx';
import TypingLoader from './TypingLoader.jsx';
import ChatInput from './ChatInput.jsx';
import PromptCards from './PromptCards.jsx';

function ChatWindow() {
  const { state } = useChat();
  const isDark     = state.theme === 'dark';
  const bottomRef  = useRef(null);

  // Auto-scroll to the latest message whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isLoading]);

  const bgColor = isDark ? 'bg-zinc-950' : 'bg-slate-50';
  const hasMessages = state.messages.length > 0;

  return (
    <div className={`flex flex-col flex-1 h-full min-w-0 ${bgColor}`}>

      {/* ── Scrollable message area ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {!hasMessages ? (
          /* Empty state — welcome screen */
          <PromptCards />
        ) : (
          /* Message list */
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
            {state.messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {state.isLoading && <TypingLoader />}

            {/* Invisible scroll anchor */}
            <div ref={bottomRef} aria-hidden="true" />
          </div>
        )}
      </div>

      {/* ── Sticky chat input ────────────────────────────────────────── */}
      <div className={`
        border-t sticky bottom-0
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
