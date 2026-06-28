/**
 * App.jsx
 * Root component — wraps the entire app in ChatProvider and renders Home.
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
