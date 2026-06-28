/**
 * components/TypingLoader.jsx
 * Animated three-dot typing indicator shown while the AI is generating.
 * Uses a custom Tailwind keyframe animation defined in tailwind.config.js.
 */

import React from 'react';
import { BsStars } from 'react-icons/bs';
import { useChat } from '../context/ChatContext.jsx';

function TypingLoader() {
  const { state } = useChat();
  const isDark = state.theme === 'dark';

  const bubbleBg = isDark
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-white border-slate-200';

  const dotColor = isDark ? 'bg-zinc-400' : 'bg-slate-400';

  return (
    <div className="flex gap-3 animate-fade-in" role="status" aria-label="AI is typing">
      {/* AI avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        <BsStars className="text-white text-sm" />
      </div>

      {/* Bubble with bouncing dots */}
      <div
        className={`
          flex items-center gap-1.5
          px-4 py-3.5 rounded-2xl rounded-tl-sm border shadow-sm
          ${bubbleBg}
        `}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`
              w-2 h-2 rounded-full ${dotColor}
              animate-bounce3
            `}
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default TypingLoader;
