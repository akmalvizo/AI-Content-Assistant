/**
 * services/api.js
 * Axios instance for AI Content Assistant.
 *
 * URL strategy
 * ─────────────
 * Development  → VITE_API_URL is empty in .env
 *                Axios uses baseURL = '' (relative URLs)
 *                Vite proxy intercepts /api/* and /health → localhost:8000
 *                Result: no CORS, no direct connection to 8000 from browser
 *
 * Production   → VITE_API_URL = https://your-app.onrender.com (set in Vercel)
 *                Axios uses that as baseURL for all requests
 *
 * This means the browser NEVER makes a direct connection to port 8000.
 * All traffic goes through the Vite proxy in dev.
 */

import axios from 'axios';

// Empty string in dev → relative URLs → Vite proxy takes over
// Full URL in prod    → direct requests to Render backend
const BASE_URL = import.meta.env.VITE_API_URL ?? '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
  withCredentials: false,
});

// ─── Request interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response.data,

  (error) => {
    // Network / connection errors — backend not running
    if (
      error.code === 'ERR_NETWORK' ||
      error.code === 'ERR_CONNECTION_REFUSED' ||
      error.code === 'ECONNREFUSED'
    ) {
      const e      = new Error('Cannot connect to the server. Please make sure the backend is running.');
      e.isApiError = true;
      e.status     = 0;
      return Promise.reject(e);
    }

    // HTTP errors — server responded with 4xx / 5xx
    const serverMsg =
      error?.response?.data?.message ||
      error?.response?.data?.detail  ||
      error?.message                 ||
      'An unexpected error occurred.';

    const normalised      = new Error(serverMsg);
    normalised.status     = error?.response?.status ?? 0;
    normalised.isApiError = true;

    return Promise.reject(normalised);
  }
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

export async function checkHealth() {
  return apiClient.get('/health');
}

export default apiClient;
