/**
 * components/PromptCards.jsx
 * Welcome / empty-state screen with six prompt suggestion cards.
 * Clicking a card calls sendMessage() with the suggestion label as the prompt.
 */

import React from 'react';
import { BsLinkedin, BsYoutube, BsStars } from 'react-icons/bs';
import {
  HiOutlineDocumentText,
  HiOutlineShoppingBag,
  HiOutlinePencilAlt,
  HiOutlineSearch,
} from 'react-icons/hi';
import { promptSuggestions } from '../data/mockChats.js';
import { useChat } from '../context/ChatContext.jsx';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICONS = {
  linkedin: <BsLinkedin />,
  youtube:  <BsYoutube />,
  blog:     <HiOutlineDocumentText />,
  product:  <HiOutlineShoppingBag />,
  improve:  <HiOutlinePencilAlt />,
  seo:      <HiOutlineSearch />,
};

// ─── Colour palettes (dark / light) ──────────────────────────────────────────

const DARK_COLOURS = {
  blue:    { bg: 'bg-blue-500/10',    icon: 'text-blue-400',    border: 'hover:border-blue-500/40' },
  red:     { bg: 'bg-red-500/10',     icon: 'text-red-400',     border: 'hover:border-red-500/40'  },
  emerald: { bg: 'bg-emerald-500/10', icon: 'text-emerald-400', border: 'hover:border-emerald-500/40' },
  purple:  { bg: 'bg-purple-500/10',  icon: 'text-purple-400',  border: 'hover:border-purple-500/40' },
  amber:   { bg: 'bg-amber-500/10',   icon: 'text-amber-400',   border: 'hover:border-amber-500/40'  },
  teal:    { bg: 'bg-teal-500/10',    icon: 'text-teal-400',    border: 'hover:border-teal-500/40'   },
};

const LIGHT_COLOURS = {
  blue:    { bg: 'bg-blue-50',    icon: 'text-blue-500',    border: 'hover:border-blue-300' },
  red:     { bg: 'bg-red-50',     icon: 'text-red-500',     border: 'hover:border-red-300'  },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'hover:border-emerald-300' },
  purple:  { bg: 'bg-purple-50',  icon: 'text-purple-500',  border: 'hover:border-purple-300' },
  amber:   { bg: 'bg-amber-50',   icon: 'text-amber-500',   border: 'hover:border-amber-300'  },
  teal:    { bg: 'bg-teal-50',    icon: 'text-teal-600',    border: 'hover:border-teal-300'   },
};

function PromptCards() {
  const { state, sendMessage } = useChat();
  const isDark     = state.theme === 'dark';
  const isLoading  = state.isLoading;
  const colourMap  = isDark ? DARK_COLOURS : LIGHT_COLOURS;

  const cardBase  = isDark
    ? 'bg-zinc-900 border-zinc-800 text-white'
    : 'bg-white border-slate-200 text-slate-900';
  const descColor = isDark ? 'text-zinc-400' : 'text-slate-500';

  const handleCardClick = (label) => {
    if (!isLoading) sendMessage(label);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-10 animate-fade-in">

      {/* Logo mark */}
      <div className="mb-2 w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
        <BsStars className="text-white text-xl" />
      </div>

      <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
        Hello, Akmal 👋
      </h1>
      <p className={`mt-1 text-sm ${descColor} mb-8`}>
        What would you like to create today?
      </p>

      {/* Prompt grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl">
        {promptSuggestions.map((p) => {
          const colours = colourMap[p.color] ?? colourMap.emerald;
          return (
            <button
              key={p.id}
              onClick={() => handleCardClick(p.label)}
              disabled={isLoading}
              aria-label={`Use prompt: ${p.label}`}
              className={`
                group flex items-start gap-3 p-4 rounded-2xl border text-left
                transition-all duration-200
                ${cardBase} ${colours.border}
                hover:shadow-md active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <span className={`
                mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-base
                ${colours.bg} ${colours.icon}
                group-hover:scale-110 transition-transform duration-200
              `}>
                {ICONS[p.icon]}
              </span>
              <div>
                <p className="font-semibold text-sm leading-snug">{p.label}</p>
                <p className={`text-xs mt-0.5 ${descColor}`}>{p.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PromptCards;
