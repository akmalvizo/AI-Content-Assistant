/**
 * context/ChatContext.jsx
 * Global state + actions for AI Content Assistant.
 *
 * State shape:
 *   messages     — array of message objects { id, role, content, timestamp }
 *   isLoading    — true while waiting for a backend response
 *   error        — string | null  (shown as a toast / banner in Phase 5)
 *   selectedChat — id of the active sidebar conversation
 *   theme        — 'dark' | 'light'
 *   sidebarOpen  — mobile drawer state
 *
 * Exposed via useChat():
 *   state        — all of the above
 *   sendMessage(text) — validates → adds user msg → calls API → adds AI msg
 *   clearChat()       — resets messages to an empty array
 *   dispatch          — raw dispatch for UI-only actions (theme, sidebar)
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { sendChatMessage } from '../services/chatService.js';
import { generateUUID, formatTimestamp, validateMessage } from '../utils/helpers.js';

// ─── Context ──────────────────────────────────────────────────────────────────

const ChatContext = createContext(null);

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState = {
  messages:     [],       // Start with an empty chat — welcome screen shows
  isLoading:    false,
  error:        null,
  selectedChat: null,
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
      return { ...state, messages: [], selectedChat: null, error: null };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };

    case 'SELECT_CHAT':
      return { ...state, selectedChat: action.payload, sidebarOpen: false };

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  /**
   * sendMessage — full chat round-trip.
   *
   * 1. Validate the input.
   * 2. Immediately append the user message to state.
   * 3. Set isLoading = true  →  triggers TypingLoader.
   * 4. Call the backend via chatService.
   * 5. Append the AI response message.
   * 6. Set isLoading = false.
   * 7. On error: set the error string (do NOT crash).
   *
   * @param {string} text - Raw user input from ChatInput.
   */
  const sendMessage = useCallback(async (text) => {
    // ── 1. Validate ──────────────────────────────────────────────────────────
    const { valid, error: validationError } = validateMessage(text);
    if (!valid) {
      dispatch({ type: 'SET_ERROR', payload: validationError });
      return;
    }

    dispatch({ type: 'CLEAR_ERROR' });

    // ── 2. Append user message immediately ───────────────────────────────────
    const userMessage = {
      id:        generateUUID(),
      role:      'user',
      content:   text.trim(),
      timestamp: formatTimestamp(new Date()),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    // ── 3. Show typing indicator ─────────────────────────────────────────────
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // ── 4. Call API ────────────────────────────────────────────────────────
      const data = await sendChatMessage(text.trim());

      // ── 5. Append AI response ──────────────────────────────────────────────
      const aiMessage = {
        id:        generateUUID(),
        role:      'assistant',
        content:   data.response,
        timestamp: formatTimestamp(data.timestamp),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });

    } catch (err) {
      // ── 7. Surface error — do not crash ───────────────────────────────────
      const message = err?.message || 'Failed to reach the server. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      // ── 6. Always stop the typing indicator ───────────────────────────────
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  /**
   * clearChat — reset the conversation to the empty (welcome) state.
   */
  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
  }, []);

  return (
    <ChatContext.Provider value={{ state, dispatch, sendMessage, clearChat }}>
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
