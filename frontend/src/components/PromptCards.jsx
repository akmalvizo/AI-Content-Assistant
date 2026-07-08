/**
 * components/PromptCards.jsx
 * Welcome / empty-state screen.
 *
 * Phase 6: reads the current mode from ChatContext and renders
 * mode-specific prompt suggestions. Switches instantly when the mode changes.
 */

import React from 'react';
import {
  BsStars, BsLinkedin, BsYoutube, BsFacebook,
} from 'react-icons/bs';
import {
  HiOutlineDocumentText, HiOutlineSearch,
  HiOutlineMail, HiOutlinePencilAlt, HiOutlineShoppingBag,
  HiOutlineCamera,
} from 'react-icons/hi';
import { useChat } from '../context/ChatContext.jsx';
import { getModeById } from '../data/modes.js';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICONS = {
  stars:     <BsStars />,
  blog:      <HiOutlineDocumentText />,
  linkedin:  <BsLinkedin />,
  instagram: <HiOutlineCamera />,
  facebook:  <BsFacebook />,
  youtube:   <BsYoutube />,
  email:     <HiOutlineMail />,
  seo:       <HiOutlineSearch />,
  product:   <HiOutlineShoppingBag />,
  rewrite:   <HiOutlinePencilAlt />,
};

// ─── Colour palettes ──────────────────────────────────────────────────────────

const DARK = {
  emerald: { bg: 'bg-emerald-500/10', icon: 'text-emerald-400', border: 'hover:border-emerald-500/40' },
  blue:    { bg: 'bg-blue-500/10',    icon: 'text-blue-400',    border: 'hover:border-blue-500/40'    },
  purple:  { bg: 'bg-purple-500/10',  icon: 'text-purple-400',  border: 'hover:border-purple-500/40'  },
  red:     { bg: 'bg-red-500/10',     icon: 'text-red-400',     border: 'hover:border-red-500/40'     },
  teal:    { bg: 'bg-teal-500/10',    icon: 'text-teal-400',    border: 'hover:border-teal-500/40'    },
  amber:   { bg: 'bg-amber-500/10',   icon: 'text-amber-400',   border: 'hover:border-amber-500/40'   },
  orange:  { bg: 'bg-orange-500/10',  icon: 'text-orange-400',  border: 'hover:border-orange-500/40'  },
};

const LIGHT = {
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'hover:border-emerald-300' },
  blue:    { bg: 'bg-blue-50',    icon: 'text-blue-600',    border: 'hover:border-blue-300'    },
  purple:  { bg: 'bg-purple-50',  icon: 'text-purple-600',  border: 'hover:border-purple-300'  },
  red:     { bg: 'bg-red-50',     icon: 'text-red-600',     border: 'hover:border-red-300'     },
  teal:    { bg: 'bg-teal-50',    icon: 'text-teal-600',    border: 'hover:border-teal-300'    },
  amber:   { bg: 'bg-amber-50',   icon: 'text-amber-700',   border: 'hover:border-amber-300'   },
  orange:  { bg: 'bg-orange-50',  icon: 'text-orange-600',  border: 'hover:border-orange-300'  },
};

function PromptCards() {
  const { state, sendMessage } = useChat();
  const isDark    = state.theme === 'dark';
  const mode      = getModeById(state.selectedMode);
  const colours   = (isDark ? DARK : LIGHT)[mode.color] ?? (isDark ? DARK : LIGHT).emerald;

  const cardBase  = isDark
    ? 'bg-zinc-900 border-zinc-800 text-white'
    : 'bg-white border-slate-200 text-slate-900';

  const descColor = isDark ? 'text-zinc-400' : 'text-slate-500';
  const badgeBg   = isDark
    ? `${colours.bg} ${colours.icon}`
    : `${colours.bg} ${colours.icon}`;

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 animate-fade-in">

      {/* Mode icon badge */}
      <div className={`
        mb-3 w-12 h-12 rounded-2xl flex items-center justify-center
        text-2xl shadow-lg
        ${isDark
          ? `${colours.bg} ${colours.icon}`
          : `${colours.bg} ${colours.icon}`}
      `}>
        {ICONS[mode.icon]}
      </div>

      <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
        {mode.label}
      </h1>
      <p className={`mt-1 text-sm ${descColor} mb-7 text-center max-w-sm`}>
        {mode.description}
      </p>

      {/* Suggestions grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl">
        {mode.suggestions.map((s) => (
          <button
            key={s.id}
            onClick={() => !state.isLoading && sendMessage(s.text)}
            disabled={state.isLoading}
            aria-label={`Use prompt: ${s.text}`}
            className={`
              group flex items-start gap-3 p-4 rounded-2xl border text-left
              transition-all duration-200
              ${cardBase} ${colours.border}
              hover:shadow-md active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {/* Coloured icon */}
            <span className={`
              mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm
              ${colours.bg} ${colours.icon}
              group-hover:scale-110 transition-transform duration-200
            `}>
              {ICONS[mode.icon]}
            </span>

            <p className="text-xs font-medium leading-relaxed">{s.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PromptCards;
