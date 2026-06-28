/**
 * components/Sidebar.jsx
 * Collapsible sidebar — new chat, recent conversations, and tool navigation.
 * On mobile it renders as a slide-out drawer over a dark backdrop.
 */

import React from 'react';
import {
  MdOutlineDashboard,
  MdOutlineEmail,
  MdOutlineSettings,
  MdOutlineAdd,
} from 'react-icons/md';
import {
  BsStars,
  BsYoutube,
  BsLinkedin,
} from 'react-icons/bs';
import {
  HiOutlineDocumentText,
  HiOutlineSearch,
  HiOutlineChat,
} from 'react-icons/hi';
import { useChat } from '../context/ChatContext.jsx';
import { recentChats, navItems } from '../data/mockChats.js';

// ─── Icon map keyed to navItem.icon strings ───────────────────────────────────

const NAV_ICONS = {
  dashboard: <MdOutlineDashboard className="text-lg" />,
  linkedin:  <BsLinkedin         className="text-base" />,
  youtube:   <BsYoutube          className="text-lg" />,
  blog:      <HiOutlineDocumentText className="text-lg" />,
  seo:       <HiOutlineSearch    className="text-lg" />,
  email:     <MdOutlineEmail     className="text-lg" />,
};

function Sidebar() {
  const { state, dispatch, clearChat } = useChat();
  const isDark = state.theme === 'dark';

  const base = isDark
    ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
    : 'bg-slate-50 border-slate-200 text-slate-900';

  const mutedText  = isDark ? 'text-zinc-500' : 'text-slate-400';
  const hoverItem  = isDark ? 'hover:bg-zinc-800' : 'hover:bg-slate-100';
  const activeItem = isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-emerald-50 text-emerald-700';
  const divider    = isDark ? 'border-zinc-800' : 'border-slate-200';

  const handleNewChat = () => {
    clearChat();
    dispatch({ type: 'CLOSE_SIDEBAR' });
  };

  const handleSelectChat = (id) =>
    dispatch({ type: 'SELECT_CHAT', payload: id });

  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });

  // ── Sidebar inner content (shared between desktop & mobile drawer) ──────────
  const sidebarContent = (
    <aside
      className={`
        flex flex-col h-full w-64 border-r
        ${base}
      `}
    >
      {/* New Chat button */}
      <div className="p-3">
        <button
          onClick={handleNewChat}
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

      {/* ── Navigation tools ─────────────────────────────────────────── */}
      <nav className={`px-2 pb-2 border-b ${divider}`} aria-label="Content tools">
        <p className={`px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest ${mutedText}`}>
          Tools
        </p>
        <ul role="list" className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleSelectChat(item.id)}
                aria-current={state.selectedChat === item.id ? 'page' : undefined}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                  transition-colors duration-150
                  ${state.selectedChat === item.id ? activeItem : `${mutedText} ${hoverItem}`}
                `}
              >
                {NAV_ICONS[item.icon]}
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Recent Chats ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-2 py-2 min-h-0">
        <p className={`px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest ${mutedText}`}>
          Recent
        </p>
        <ul role="list" className="space-y-0.5">
          {recentChats.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => handleSelectChat(chat.id)}
                aria-label={`Open chat: ${chat.title}`}
                className={`
                  w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm
                  transition-colors duration-150
                  ${state.selectedChat === chat.id ? activeItem : `${hoverItem}`}
                `}
              >
                <HiOutlineChat className={`mt-0.5 shrink-0 text-base ${mutedText}`} />
                <div className="text-left overflow-hidden">
                  <p className="truncate text-xs font-medium leading-snug">
                    {chat.title}
                  </p>
                  <p className={`text-[10px] ${mutedText}`}>{chat.date}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div className={`p-2 border-t ${divider}`}>
        <button
          aria-label="Settings"
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
            ${mutedText} ${hoverItem} transition-colors duration-150
          `}
        >
          <MdOutlineSettings className="text-lg" />
          <span>Settings</span>
        </button>

        {/* User row */}
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
      {/* ── Desktop: always-visible sidebar ─────────────────────────── */}
      <div className="hidden md:flex h-full">
        {sidebarContent}
      </div>

      {/* ── Mobile: slide-out drawer ──────────────────────────────────── */}
      {state.sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 md:hidden animate-slide-in">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
