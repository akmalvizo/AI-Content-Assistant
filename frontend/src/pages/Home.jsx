/**
 * pages/Home.jsx
 * Landing page for AI Content Assistant.
 * Displays the product name, subtitle, feature highlights, and a CTA button.
 * Styled entirely with Tailwind CSS utility classes.
 */

import React, { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { checkHealth } from '../services/api.js';

/**
 * Feature card data — rendered as a responsive grid below the hero section.
 */
const FEATURES = [
  {
    id: 1,
    icon: <BsStars className="text-indigo-400 text-2xl" />,
    title: 'AI-Powered Writing',
    description: 'Generate blog posts, emails, and social copy in seconds.',
  },
  {
    id: 2,
    icon: <HiOutlineLightningBolt className="text-indigo-400 text-2xl" />,
    title: 'Lightning Fast',
    description: 'Streamed responses so you never wait for your content.',
  },
  {
    id: 3,
    icon: <MdOutlineAutoAwesome className="text-indigo-400 text-2xl" />,
    title: 'Smart Prompts',
    description: 'Curated prompt templates to get the best output every time.',
  },
];

function Home() {
  // Tracks the backend health check status shown in the UI
  const [apiStatus, setApiStatus] = useState(null);
  const [checking, setChecking] = useState(false);

  /**
   * handleHealthCheck — calls GET /health and surfaces the result.
   * Demonstrates live frontend ↔ backend connectivity.
   */
  const handleHealthCheck = async () => {
    setChecking(true);
    setApiStatus(null);
    try {
      const data = await checkHealth();
      setApiStatus({ ok: true, label: `Backend status: ${data.status}` });
    } catch {
      setApiStatus({ ok: false, label: 'Could not reach the backend.' });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <BsStars className="text-indigo-400 text-xl" />
          <span className="font-semibold text-lg tracking-tight">
            AI Content Assistant
          </span>
        </div>
        <span className="text-xs text-gray-500 font-mono">v0.1.0 · Phase 2</span>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
          <MdOutlineAutoAwesome className="text-sm" />
          Now in development
        </span>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-4">
          AI Content{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Assistant
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 max-w-xl mb-10">
          Your AI-powered content creation assistant.
        </p>

        {/* CTA — health check */}
        <button
          onClick={handleHealthCheck}
          disabled={checking}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-semibold text-sm shadow-lg shadow-indigo-500/20"
        >
          <HiOutlineLightningBolt className="text-base" />
          {checking ? 'Checking…' : 'Check Backend Status'}
        </button>

        {/* Status badge */}
        {apiStatus && (
          <p
            className={`mt-4 text-sm font-mono px-4 py-2 rounded-lg ${
              apiStatus.ok
                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
          >
            {apiStatus.label}
          </p>
        )}

        {/* ── Feature Cards ──────────────────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left hover:border-indigo-500/50 transition-colors"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-sm text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="text-center py-6 text-xs text-gray-600 border-t border-gray-800">
        © 2026 AI Content Assistant · Phase 2 Setup Complete
      </footer>
    </div>
  );
}

export default Home;
