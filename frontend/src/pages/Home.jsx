/**
 * pages/Home.jsx
 * Root application shell — composes Navbar, Sidebar, and ChatWindow
 * into the full-screen two-panel layout.
 * Theme class is applied here at the top level so Tailwind dark variants work.
 */

import React from 'react';
import { useChat } from '../context/ChatContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';

function Home() {
  const { state } = useChat();
  const isDark = state.theme === 'dark';

  return (
    // The "dark" class on the root enables Tailwind dark: variants globally
    <div className={`${isDark ? 'dark' : ''} flex flex-col h-screen overflow-hidden`}>
      {/* Navbar — full width, fixed height */}
      <Navbar />

      {/* Body — sidebar + chat area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ChatWindow />
      </div>
    </div>
  );
}

export default Home;
