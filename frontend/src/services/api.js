/**
 * services/api.js
 * Axios HTTP client for AI Content Assistant.
 * Exports a pre-configured Axios instance and typed service functions.
 */

import axios from 'axios';

// ─── Axios Instance ────────────────────────────────────────────────────────────

/**
 * apiClient — shared Axios instance.
 * Base URL is read from the Vite environment variable VITE_API_URL.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// ─── Request Interceptor ───────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach Bearer token (Phase 3)
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response.data,   // unwrap .data so callers get the payload directly
  (error) => Promise.reject(error)
);

// ─── Service Functions ─────────────────────────────────────────────────────────

/**
 * checkHealth — calls GET /health and returns the status payload.
 *
 * @returns {Promise<{ status: string }>}
 */
export async function checkHealth() {
  return apiClient.get('/health');
}

/**
 * sendMessage — placeholder for POST /api/chat (Phase 3).
 *
 * @param {string} message
 * @returns {Promise<{ reply: string }>}
 */
export async function sendMessage(message) {
  // TODO: implement in Phase 3
  return apiClient.post('/api/chat', { message });
}

export default apiClient;
