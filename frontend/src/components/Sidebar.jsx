/**
 * components/Sidebar.jsx
 * Sidebar panel for AI Content Assistant.
 * Will display conversation history, saved prompts, and settings links.
 */

import React from 'react';

/**
 * Sidebar — left-panel navigation component.
 * Placeholder: conversation list and prompt shortcuts will be added in Phase 2.
 */
function Sidebar() {
  return (
    <aside className="sidebar">
      {/* New chat button placeholder */}
      <div className="sidebar-new-chat">+ New Chat</div>

      {/* Conversation history list placeholder */}
      <ul className="sidebar-history">
        {/* Conversation items will be rendered here dynamically */}
      </ul>
    </aside>
  );
}

export default Sidebar;
