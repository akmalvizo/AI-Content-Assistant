/**
 * context/ChatContext.jsx
 * Global state and actions for AI Content Assistant.
 *
 * Phase 6 additions:
 *   selectedMode  — current content-generation mode id (e.g. "linkedin")
 *   changeMode()  — switch mode and clear the chat simultaneously
 *
 * Exposed via useChat():
 *   state          — full state object
 *   sendMessage()  — validate → add user msg → call API (with mode) → add AI msg
 *   clearChat()    — reset messages + error
 *   changeMode()   — switch mode + clear chat
 *   dispatch       — raw dispatch for theme / sidebar UI actions
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { sendChatMessage } from '../services/chatService.js';
import { generateUUID, formatTimestamp, validateMessage } from '../utils/helpers.js';
import { DEFAULT_MODE_ID } from '../data/modes.js';

// ─── Context ──────────────────────────────────────────────────────────────────

const ChatContext = createContext(null);

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState = {
  messages:     [],
  isLoading:    false,
  error:        null,
  selectedMode: DEFAULT_MODE_ID,   // ← Phase 6: active content mode
  theme:        'dark',
  sidebarOpen:  false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function chatReducer(state, action) {
  switch (action.type) {

    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };

    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };

    case 'CLEAR_CHAT':
      return { ...state, messages: [], error: null };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    case 'SET_MODE':
      // Switching mode also clears the conversation
      return { ...state, selectedMode: action.payload, messages: [], error: null };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  /**
   * sendMessage — full mode-aware chat round-trip.
   *
   * 1. Validate input.
   * 2. Append user message immediately.
   * 3. Show typing indicator.
   * 4. POST { message, mode } to /api/chat.
   * 5. Append AI response.
   * 6. Stop typing indicator.
   * 7. On error: show error banner.
   */
  const sendMessage = useCallback(async (text) => {
    const { valid, error: validationError } = validateMessage(text);
    if (!valid) {
      dispatch({ type: 'SET_ERROR', payload: validationError });
      return;
    }

    dispatch({ type: 'CLEAR_ERROR' });

    const userMessage = {
      id:        generateUUID(),
      role:      'user',
      content:   text.trim(),
      timestamp: formatTimestamp(new Date()),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Pass the current mode to the backend
      const data = await sendChatMessage(text.trim(), state.selectedMode);

      const aiMessage = {
        id:        generateUUID(),
        role:      'assistant',
        content:   data.response,
        timestamp: formatTimestamp(data.timestamp),
        mode:      data.mode,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });

    } catch (err) {
      const message = err?.message || 'Failed to reach the server. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.selectedMode]);

  /**
   * changeMode — switch content mode and start a fresh conversation.
   * Also closes the mobile sidebar drawer.
   */
  const changeMode = useCallback((modeId) => {
    dispatch({ type: 'SET_MODE', payload: modeId });
    dispatch({ type: 'CLOSE_SIDEBAR' });
  }, []);

  /**
   * clearChat — reset messages without changing the mode.
   */
  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
  }, []);

  return (
    <ChatContext.Provider value={{ state, dispatch, sendMessage, changeMode, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used inside <ChatProvider>');
  return ctx;
}

export default ChatContext;
