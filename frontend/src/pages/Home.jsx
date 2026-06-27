/**
 * pages/Home.jsx
 * Home page for AI Content Assistant.
 * Composes the main layout: Navbar, Sidebar, and ChatWindow.
 */

import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';

/**
 * Home — primary application page.
 * Renders the full-screen chat layout.
 */
function Home() {
  return (
    <div className="home-page">
      {/* Top navigation bar */}
      <Navbar />

      <div className="home-layout">
        {/* Collapsible sidebar for conversation history / settings */}
        <Sidebar />

        {/* Main chat area */}
        <ChatWindow />
      </div>
    </div>
  );
}

export default Home;
