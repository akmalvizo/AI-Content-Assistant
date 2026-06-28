/**
 * components/Navbar.jsx
 * Top navigation bar — logo, title, theme toggle, user avatar.
 * Renders a hamburger menu on mobile to open/close the sidebar drawer.
 */

import React from 'react';
import { BsStars } from 'react-icons/bs';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useChat } from '../context/ChatContext.jsx';

function Navbar() {
  const { state, dispatch } = useChat();
  const isDark = state.theme === 'dark';

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: isDark ? 'light' : 'dark' });

  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });

  return (
    <header
      className={`
        flex items-center justify-between
        px-4 py-3 h-14
        border-b
        ${isDark
          ? 'bg-zinc-900 border-zinc-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'}
        sticky top-0 z-30
      `}
    >
      {/* ── Left: hamburger (mobile) + logo ──────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Hamburger — only visible on mobile */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className={`
            md:hidden p-2 rounded-lg transition-colors
            ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-slate-100 text-slate-500'}
          `}
        >
          <HiOutlineMenuAlt2 className="text-xl" />
        </button>

        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-sm">
            <BsStars className="text-white text-sm" />
          </div>
          <span className="font-semibold text-sm tracking-tight">
            AI Content Assistant
          </span>
        </div>
      </div>

      {/* ── Right: theme toggle + avatar ─────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`
            p-2 rounded-lg transition-colors text-lg
            ${isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'}
          `}
        >
          {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>

        {/* User avatar placeholder */}
        <button
          aria-label="User menu"
          className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
        >
          A
        </button>
      </div>
    </header>
  );
}

export default Navbar;
