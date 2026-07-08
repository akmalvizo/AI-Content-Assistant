/**
 * components/Sidebar.jsx
 * Collapsible sidebar with real content-mode navigation.
 *
 * Phase 6: modes come from data/modes.js and selecting one calls changeMode()
 * from ChatContext, which instantly switches the prompt strategy and clears
 * the conversation.
 */

import React from 'react';
import {
  MdOutlineSettings, MdOutlineAdd,
} from 'react-icons/md';
import {
  BsStars, BsLinkedin, BsYoutube, BsFacebook,
} from 'react-icons/bs';
import {
  HiOutlineDocumentText, HiOutlineSearch, HiOutlineChat,
  HiOutlineMail, HiOutlinePencilAlt, HiOutlineShoppingBag,
  HiOutlineCamera,
} from 'react-icons/hi';
import { useChat } from '../context/ChatContext.jsx';
import { MODES, getModeById } from '../data/modes.js';
import { recentChats } from '../data/mockChats.js';

// ─── Icon map (matches modes.js icon keys) ────────────────────────────────────

const MODE_ICONS = {
  stars:     <BsStars     className="text-base" />,
  blog:      <HiOutlineDocumentText className="text-base" />,
  linkedin:  <BsLinkedin  className="text-base" />,
  instagram: <HiOutlineCamera className="text-base" />,
  facebook:  <BsFacebook  className="text-base" />,
  youtube:   <BsYoutube   className="text-base" />,
  email:     <HiOutlineMail className="text-base" />,
  seo:       <HiOutlineSearch className="text-base" />,
  product:   <HiOutlineShoppingBag className="text-base" />,
  rewrite:   <HiOutlinePencilAlt className="text-base" />,
};

// ─── Category ordering for the sidebar sections ───────────────────────────────

const CATEGORY_ORDER = ["General", "Writing", "Social Media", "Video", "Business", "Advertising", "E-Commerce", "Editing"];

function groupByCategory(modes) {
  const map = {};
  for (const m of modes) {
    if (!map[m.category]) map[m.category] = [];
    map[m.category].push(m);
  }
  // Return in defined order, then any extras
  const ordered = [];
  for (const cat of CATEGORY_ORDER) {
    if (map[cat]) ordered.push({ category: cat, modes: map[cat] });
  }
  for (const [cat, items] of Object.entries(map)) {
    if (!CATEGORY_ORDER.includes(cat)) ordered.push({ category: cat, modes: items });
  }
  return ordered;
}

const GROUPED_MODES = groupByCategory(MODES);

function Sidebar() {
  const { state, dispatch, changeMode, clearChat } = useChat();
  const isDark = state.theme === 'dark';

  // Styles
  const base       = isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-slate-50 border-slate-200 text-slate-900';
  const mutedText  = isDark ? 'text-zinc-500' : 'text-slate-400';
  const hoverItem  = isDark ? 'hover:bg-zinc-800/70' : 'hover:bg-slate-100';
  const divider    = isDark ? 'border-zinc-800' : 'border-slate-200';

  const activeMode  = state.selectedMode;

  const activeStyle = (modeId) => {
    if (activeMode !== modeId) return `${mutedText} ${hoverItem}`;
    const mode = getModeById(modeId);
    const colors = {
      emerald: isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700',
      blue:    isDark ? 'bg-blue-500/15    text-blue-400'    : 'bg-blue-50    text-blue-700',
      purple:  isDark ? 'bg-purple-500/15  text-purple-400'  : 'bg-purple-50  text-purple-700',
      red:     isDark ? 'bg-red-500/15     text-red-400'     : 'bg-red-50     text-red-700',
      teal:    isDark ? 'bg-teal-500/15    text-teal-400'    : 'bg-teal-50    text-teal-700',
      amber:   isDark ? 'bg-amber-500/15   text-amber-400'   : 'bg-amber-50   text-amber-700',
      orange:  isDark ? 'bg-orange-500/15  text-orange-400'  : 'bg-orange-50  text-orange-700',
    };
    return colors[mode.color] ?? colors.emerald;
  };

  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });

  const sidebarContent = (
    <aside className={`flex flex-col h-full w-64 border-r ${base}`}>

      {/* ── New Chat ──────────────────────────────────────────────── */}
      <div className="p-3">
        <button
          onClick={() => { clearChat(); closeSidebar(); }}
          aria-label="Start a new chat"
          className="
            w-full flex items-center justify-center gap-2
            py-2.5 px-4 rounded-xl
            bg-emerald-500 hover:bg-emerald-400
            text-white font-semibold text-sm
            transition-all duration-150 active:scale-95 shadow-sm
          "
        >
          <MdOutlineAdd className="text-lg" />
          New Chat
        </button>
      </div>

      {/* ── Mode navigation ───────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto min-h-0 px-2 pb-2">
        {GROUPED_MODES.map(({ category, modes }) => (
          <nav key={category} className="mb-3" aria-label={category}>
            <p className={`px-2 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest ${mutedText}`}>
              {category}
            </p>
            <ul role="list" className="space-y-0.5">
              {modes.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => changeMode(m.id)}
                    aria-current={activeMode === m.id ? 'page' : undefined}
                    aria-label={`Switch to ${m.label}`}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                      transition-colors duration-150
                      ${activeStyle(m.id)}
                    `}
                  >
                    {MODE_ICONS[m.icon] ?? <BsStars className="text-base" />}
                    <span className="truncate">{m.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* ── Recent Chats ──────────────────────────────────────────── */}
        <div className={`border-t pt-2 mt-1 ${divider}`}>
          <p className={`px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest ${mutedText}`}>
            Recent
          </p>
          <ul role="list" className="space-y-0.5">
            {recentChats.slice(0, 5).map((chat) => (
              <li key={chat.id}>
                <button
                  aria-label={`Open chat: ${chat.title}`}
                  className={`
                    w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm
                    transition-colors duration-150 ${mutedText} ${hoverItem}
                  `}
                >
                  <HiOutlineChat className="mt-0.5 shrink-0 text-base" />
                  <div className="text-left overflow-hidden">
                    <p className="truncate text-xs font-medium leading-snug">{chat.title}</p>
                    <p className="text-[10px] opacity-60">{chat.date}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div className={`p-2 border-t ${divider}`}>
        <button
          aria-label="Settings"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${mutedText} ${hoverItem} transition-colors`}
        >
          <MdOutlineSettings className="text-lg" />
          <span>Settings</span>
        </button>

        <div className={`flex items-center gap-3 px-3 py-2 mt-1 rounded-lg ${hoverItem} cursor-pointer transition-colors`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">Akmal</p>
            <p className={`text-[10px] ${mutedText} truncate`}>Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex h-full">{sidebarContent}</div>

      {/* Mobile drawer */}
      {state.sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeSidebar} aria-hidden="true" />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden animate-slide-in">{sidebarContent}</div>
        </>
      )}
    </>
  );
}

export default Sidebar;
