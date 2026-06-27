/**
 * main.jsx
 * Entry point for the AI Content Assistant React application.
 * Mounts the root <App /> component into the DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Mount the application to the #root element defined in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
