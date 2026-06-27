/**
 * App.jsx
 * Root application component for AI Content Assistant.
 * Handles top-level layout, routing, and context providers.
 */

import React from 'react';
import { ChatProvider } from './context/ChatContext.jsx';
import Home from './pages/Home.jsx';

/**
 * App — root component.
 * Wraps the application in global context providers and renders the main page.
 */
function App() {
  return (
    <ChatProvider>
      {/* Main application entry point — routing will be added in Phase 2 */}
      <Home />
    </ChatProvider>
  );
}

export default App;
