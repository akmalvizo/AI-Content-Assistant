/**
 * context/ChatContext.jsx
 * Global chat state context for AI Content Assistant.
 * Provides conversation state and dispatch actions to all child components.
 */

import React, { createContext, useContext, useReducer } from 'react';

// ─── Context Creation ──────────────────────────────────────────────────────────

const ChatContext = createContext(null);

// ─── Initial State ─────────────────────────────────────────────────────────────

/**
 * Initial shape of the chat state.
 * Will be expanded with conversation history, loading flags, etc. in Phase 2.
 */
const initialState = {
  messages:  [],   // Array of { id, role, content } message objects
  isLoading: false, // True while awaiting an AI response
  error:     null,  // Holds any error message string
};

// ─── Reducer ───────────────────────────────────────────────────────────────────

/**
 * chatReducer — pure function that computes the next state.
 * Action types will be defined and implemented in Phase 2.
 *
 * @param {object} state   - Current state
 * @param {object} action  - Dispatched action { type, payload }
 */
function chatReducer(state, action) {
  switch (action.type) {
    // TODO: ADD_MESSAGE, SET_LOADING, SET_ERROR, CLEAR_CHAT — Phase 2
    default:
      return state;
  }
}

// ─── Provider ──────────────────────────────────────────────────────────────────

/**
 * ChatProvider — wraps the app and exposes chat state + dispatch.
 *
 * @param {React.ReactNode} children
 */
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

// ─── Custom Hook ───────────────────────────────────────────────────────────────

/**
 * useChat — convenience hook for consuming ChatContext.
 * Throws if used outside of <ChatProvider />.
 */
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a <ChatProvider>');
  }
  return context;
}

export default ChatContext;
