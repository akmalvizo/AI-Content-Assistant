/**
 * components/ChatHeader.jsx
 * Thin bar above the message area showing the currently active content mode.
 * Updates instantly when the user switches modes in the Sidebar.
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
import { MdOutlineAdd } from 'react-icons/md';
import { useChat } from '../context/ChatContext.jsx';
import { getModeById } from '../data/modes.js';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const MODE_ICONS = {
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

// ─── Tailwind colour map ──────────────────────────────────────────────────────

const BADGE_DARK = {
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  blue:    'bg-blue-500/15    text-blue-400    border-blue-500/30',
  purple:  'bg-purple-500/15  text-purple-400  border-purple-500/30',
  red:     'bg-red-500/15     text-red-400     border-red-500/30',
  teal:    'bg-teal-500/15    text-teal-400    border-teal-500/30',
  amber:   'bg-amber-500/15   text-amber-400   border-amber-500/30',
  orange:  'bg-orange-500/15  text-orange-400  border-orange-500/30',
};

const BADGE_LIGHT = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  blue:    'bg-blue-50    text-blue-700    border-blue-200',
  purple:  'bg-purple-50  text-purple-700  border-purple-200',
  red:     'bg-red-50     text-red-700     border-red-200',
  teal:    'bg-teal-50    text-teal-700    border-teal-200',
  amber:   'bg-amber-50   text-amber-700   border-amber-200',
  orange:  'bg-orange-50  text-orange-700  border-orange-200',
};

function ChatHeader({ onNewChat }) {
  const { state } = useChat();
  const isDark    = state.theme === 'dark';
  const mode      = getModeById(state.selectedMode);
  const badgeMap  = isDark ? BADGE_DARK : BADGE_LIGHT;
  const badge     = badgeMap[mode.color] ?? badgeMap.emerald;

  const headerBg  = isDark
    ? 'bg-zinc-950 border-zinc-800'
    : 'bg-slate-50 border-slate-200';

  const mutedText = isDark ? 'text-zinc-500' : 'text-slate-400';
  const newChatBtn = isDark
    ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100';

  return (
    <div className={`flex items-center justify-between px-4 py-2.5 border-b ${headerBg}`}>

      {/* ── Left: mode badge ─────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-semibold uppercase tracking-widest ${mutedText}`}>
          Mode
        </span>
        <span className={`
          inline-flex items-center gap-1.5 px-2.5 py-1
          rounded-full border text-xs font-semibold
          ${badge}
        `}>
          <span className="text-sm">{MODE_ICONS[mode.icon]}</span>
          {mode.label}
        </span>
      </div>

      {/* ── Right: new chat button ────────────────────────────── */}
      <button
        onClick={onNewChat}
        aria-label="Start a new chat"
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          transition-colors duration-150 ${newChatBtn}
        `}
      >
        <MdOutlineAdd className="text-base" />
        New Chat
      </button>
    </div>
  );
}

export default ChatHeader;
