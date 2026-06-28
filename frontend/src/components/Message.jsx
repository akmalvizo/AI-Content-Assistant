/**
 * components/Message.jsx
 * Single chat message bubble — user (right-aligned) or assistant (left-aligned).
 * Renders markdown-style bold/italic text and a copy + regenerate action bar.
 */

import React, { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import {
  HiOutlineClipboard,
  HiOutlineRefresh,
  HiCheck,
} from 'react-icons/hi';
import { useChat } from '../context/ChatContext.jsx';

/**
 * Minimal inline markdown renderer — handles **bold**, *italic*, bullet lists.
 * A proper markdown library (e.g. react-markdown) will replace this in Phase 4.
 */
function renderContent(text) {
  return text.split('\n').map((line, i) => {
    // Bullet list
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="ml-4 list-disc">
          {formatInline(line.slice(2))}
        </li>
      );
    }
    // Empty line → spacing
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="leading-relaxed">{formatInline(line)}</p>;
  });
}

/** Bold (**text**) and italic (*text*) inline formatting */
function formatInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function Message({ message }) {
  const { state } = useChat();
  const isDark  = state.theme === 'dark';
  const isUser  = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── User message ────────────────────────────────────────────────────────────
  if (isUser) {
    return (
      <div className="flex justify-end gap-3 group animate-fade-in">
        <div className="max-w-[75%]">
          <div
            className="
              px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed
              bg-emerald-500 text-white shadow-sm
            "
          >
            {message.content}
          </div>
          <p className={`text-right text-[10px] mt-1 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
            {message.timestamp}
          </p>
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow-sm">
          A
        </div>
      </div>
    );
  }

  // ── Assistant message ───────────────────────────────────────────────────────
  const bubbleBg  = isDark ? 'bg-zinc-900 border-zinc-800'   : 'bg-white border-slate-200';
  const textColor = isDark ? 'text-zinc-100'                  : 'text-slate-800';
  const actionBtn = isDark
    ? 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100';

  return (
    <div className="flex gap-3 group animate-fade-in">
      {/* AI avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        <BsStars className="text-white text-sm" />
      </div>

      <div className="flex-1 max-w-[85%]">
        {/* Bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl rounded-tl-sm border text-sm
            ${bubbleBg} ${textColor} shadow-sm
          `}
        >
          <div className="space-y-1">
            {renderContent(message.content)}
          </div>
        </div>

        {/* Action bar — copy + regenerate */}
        <div className={`flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150`}>
          <button
            onClick={handleCopy}
            aria-label="Copy message"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors ${actionBtn}`}
          >
            {copied
              ? <><HiCheck className="text-emerald-500" /> Copied</>
              : <><HiOutlineClipboard /> Copy</>
            }
          </button>
          <button
            aria-label="Regenerate response"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors ${actionBtn}`}
          >
            <HiOutlineRefresh />
            Regenerate
          </button>
          <p className={`ml-auto text-[10px] ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
