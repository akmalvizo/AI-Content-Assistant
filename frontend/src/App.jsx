/**
 * App.jsx
 * Root application component for AI Content Assistant.
 * Wraps the app in the ChatContext provider and renders the Home page.
 */

import React from 'react';
import { ChatProvider } from './context/ChatContext.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <ChatProvider>
      <Home />
    </ChatProvider>
  );
}

export default App;
