/**
 * components/ChatInput.jsx
 * Sticky message input bar wired to ChatContext.sendMessage().
 *
 * Behaviour:
 *   - Enter sends, Shift+Enter adds a newline.
 *   - Textarea auto-expands up to 6 lines.
 *   - Input and send button are disabled while isLoading.
 *   - Character counter turns amber < 200, red when over limit.
 *   - Inline validation error displayed below the input bar.
 */

import React, { useState, useRef, useEffect } from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { MdErrorOutline } from 'react-icons/md';
import { useChat } from '../context/ChatContext.jsx';
import { getModeById } from '../data/modes.js';

const MAX_CHARS = 5000;

function ChatInput() {
  const { state, sendMessage, dispatch } = useChat();
  const { isLoading, error, theme, selectedMode } = state;
  const isDark = theme === 'dark';
  const mode   = getModeById(selectedMode);

  const [value, setValue]         = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef               = useRef(null);

  // ── Auto-expand textarea ──────────────────────────────────────────────────
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 144) + 'px'; // max 6 lines
  }, [value]);

  // ── Focus input when loading finishes ────────────────────────────────────
  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > MAX_CHARS || isLoading) return;

    // Clear any previous validation error
    dispatch({ type: 'CLEAR_ERROR' });

    sendMessage(trimmed);
    setValue('');
  };

  const remaining = MAX_CHARS - value.length;
  const overLimit = remaining < 0;
  const canSubmit = value.trim().length > 0 && !overLimit && !isLoading;

  // ── Styles ────────────────────────────────────────────────────────────────

  const wrapperBg   = isDark ? 'bg-zinc-950' : 'bg-white';
  const innerBg     = isDark ? 'bg-zinc-900' : 'bg-slate-50';
  const textColor   = isDark ? 'text-zinc-100' : 'text-slate-900';
  const mutedText   = isDark ? 'text-zinc-600' : 'text-slate-400';
  const placeholder = isDark ? 'placeholder:text-zinc-600' : 'placeholder:text-slate-400';

  const borderColor = (() => {
    if (overLimit)   return 'border-red-500 ring-2 ring-red-500/20';
    if (isFocused)   return 'border-emerald-500 ring-2 ring-emerald-500/20';
    return isDark ? 'border-zinc-700' : 'border-slate-300';
  })();

  return (
    <div className={`${wrapperBg} px-4 pb-4 pt-2`}>

      {/* ── Validation / API error banner ─────────────────────────────── */}
      {error && (
        <div className={`
          flex items-center gap-2 px-3 py-2 mb-2 rounded-xl text-xs font-medium
          ${isDark
            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
            : 'bg-red-50 text-red-600 border border-red-200'}
        `}>
          <MdErrorOutline className="text-base shrink-0" />
          <span>{error}</span>
          <button
            onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
            aria-label="Dismiss error"
            className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Input bubble ─────────────────────────────────────────────── */}
      <div className={`
        relative flex flex-col rounded-2xl border transition-all duration-200
        ${innerBg} ${borderColor}
        ${isLoading ? 'opacity-70' : ''}
      `}>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isLoading ? 'Waiting for response…' : (mode.placeholder || 'Message AI Content Assistant…')}
          aria-label="Message input"
          disabled={isLoading}
          rows={1}
          className={`
            w-full bg-transparent px-4 pt-3.5 pb-2 text-sm leading-relaxed outline-none
            ${textColor} ${placeholder}
            disabled:cursor-not-allowed
          `}
        />

        {/* Bottom bar */}
        <div className="flex items-center gap-2 px-3 pb-2.5">

          <div className="flex-1" />

          {/* Character counter */}
          <span className={`text-[11px] font-mono transition-colors ${
            overLimit
              ? 'text-red-500 font-semibold'
              : remaining < 200
                ? 'text-amber-500'
                : mutedText
          }`}>
            {remaining}
          </span>

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label="Send message"
            className={`
              flex items-center justify-center w-8 h-8 rounded-xl
              transition-all duration-150
              ${canSubmit
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-sm active:scale-95'
                : isDark
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
            `}
          >
            <HiOutlinePaperAirplane className="text-base -rotate-45" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default ChatInput;
