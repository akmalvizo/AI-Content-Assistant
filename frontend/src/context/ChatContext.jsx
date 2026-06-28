/**
 * context/ChatContext.jsx
 * Global state context for AI Content Assistant.
 * Holds all UI + chat state and exposes it via the useChat() hook.
 * Logic / API calls will be wired in Phase 4 — this is UI-ready placeholder state.
 */

import React, { createContext, useContext, useReducer } from 'react';
import { sampleMessages } from '../data/mockChats.js';

// ─── Context ──────────────────────────────────────────────────────────────────

const ChatContext = createContext(null);

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState = {
  /** Array of { id, role, content, timestamp } — pre-loaded with mock data */
  messages: sampleMessages,

  /** True while the AI is generating a response */
  isLoading: false,

  /** Active error message string, or null */
  error: null,

  /** ID of the currently selected conversation */
  selectedChat: "c1",

  /** 'light' | 'dark' — toggled by the Navbar theme button */
  theme: "dark",

  /** Whether the sidebar is open on mobile */
  sidebarOpen: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function chatReducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case "CLOSE_SIDEBAR":
      return { ...state, sidebarOpen: false };

    case "SELECT_CHAT":
      return { ...state, selectedChat: action.payload, sidebarOpen: false };

    case "SET_MESSAGES":
      return { ...state, messages: action.payload };

    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "CLEAR_CHAT":
      return { ...state, messages: [], selectedChat: null };

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * ChatProvider — wraps the app and makes state available to all children.
 */
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useChat — consume ChatContext in any component.
 * Throws if used outside <ChatProvider>.
 */
export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used inside <ChatProvider>');
  return ctx;
}

export default ChatContext;
