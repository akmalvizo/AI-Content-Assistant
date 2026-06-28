/**
 * components/ChatInput.jsx
 * Sticky message input bar — multiline textarea, send button,
 * attachment placeholder, and live character counter.
 * Auto-expands up to 6 lines. All logic will be wired in Phase 4.
 */

import React, { useState, useRef, useEffect } from 'react';
import { HiOutlinePaperAirplane, HiOutlinePaperClip } from 'react-icons/hi';
import { useChat } from '../context/ChatContext.jsx';

const MAX_CHARS = 2000;

function ChatInput() {
  const { state } = useChat();
  const isDark = state.theme === 'dark';

  const [value, setValue]         = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef               = useRef(null);

  // ── Auto-expand textarea height ───────────────────────────────────────────
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    // Cap at ~6 lines (24 px line-height × 6 = 144 px)
    el.style.height = Math.min(el.scrollHeight, 144) + 'px';
  }, [value]);

  const handleKeyDown = (e) => {
    // Submit on Enter (not Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || value.length > MAX_CHARS) return;
    // TODO: dispatch ADD_MESSAGE + call API in Phase 4
    setValue('');
  };

  const remaining   = MAX_CHARS - value.length;
  const overLimit   = remaining < 0;
  const canSubmit   = value.trim().length > 0 && !overLimit;

  // ── Styles ─────────────────────────────────────────────────────────────────
  const wrapperBg  = isDark ? 'bg-zinc-950'  : 'bg-white';
  const innerBg    = isDark ? 'bg-zinc-900'  : 'bg-slate-50';
  const borderColor = isFocused
    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
    : isDark
      ? 'border-zinc-700'
      : 'border-slate-300';
  const textColor  = isDark ? 'text-zinc-100' : 'text-slate-900';
  const placeholder = isDark ? 'placeholder:text-zinc-600' : 'placeholder:text-slate-400';
  const mutedText  = isDark ? 'text-zinc-600' : 'text-slate-400';
  const attachBtn  = isDark
    ? 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100';

  return (
    <div className={`${wrapperBg} px-4 pb-4 pt-2`}>
      <div
        className={`
          relative flex flex-col rounded-2xl border transition-all duration-200
          ${innerBg} ${borderColor}
        `}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Message AI Content Assistant…"
          aria-label="Message input"
          rows={1}
          maxLength={MAX_CHARS + 50}  // soft cap; hard cap enforced in submit
          className={`
            w-full bg-transparent px-4 pt-3.5 pb-2
            text-sm leading-relaxed outline-none
            ${textColor} ${placeholder}
          `}
        />

        {/* Bottom bar: attachment + counter + send ─────────────────────────── */}
        <div className="flex items-center gap-2 px-3 pb-2.5">
          {/* Attachment button (placeholder) */}
          <button
            aria-label="Attach file (coming soon)"
            disabled
            className={`p-1.5 rounded-lg transition-colors ${attachBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <HiOutlinePaperClip className="text-lg" />
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Character counter */}
          <span
            className={`text-[11px] font-mono transition-colors ${
              overLimit
                ? 'text-red-500 font-semibold'
                : remaining < 200
                  ? 'text-amber-500'
                  : mutedText
            }`}
          >
            {remaining}
          </span>

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label="Send message"
            className={`
              flex items-center justify-center
              w-8 h-8 rounded-xl transition-all duration-150
              ${canSubmit
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-sm active:scale-95'
                : isDark
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            <HiOutlinePaperAirplane className="text-base -rotate-45" />
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className={`text-center text-[10px] mt-2 ${mutedText}`}>
        Press <kbd className="font-mono">Enter</kbd> to send · <kbd className="font-mono">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}

export default ChatInput;
