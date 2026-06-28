/**
 * main.jsx
 * Entry point for the AI Content Assistant React application.
 * Imports global Tailwind CSS and mounts <App /> into the DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Tailwind base styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
