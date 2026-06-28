/**
 * services/api.js
 * Base Axios instance for AI Content Assistant.
 *
 * URL strategy:
 *   Development  →  VITE_API_URL is set to http://localhost:8000 in .env.
 *                   The Vite dev server proxy rewrites /api/* → backend,
 *                   so both absolute and relative requests work locally.
 *   Production   →  VITE_API_URL is set to the Render backend URL in Vercel
 *                   environment variables.
 *
 * Never call this directly from components — use chatService.js instead.
 */

import axios from 'axios';

// ─── Base URL ─────────────────────────────────────────────────────────────────
// Reads VITE_API_URL from the .env file.
// Falls back to empty string so the Vite proxy handles routing in dev.
const BASE_URL = import.meta.env.VITE_API_URL || '';

// ─── Axios instance ───────────────────────────────────────────────────────────

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000, // 30 s
  withCredentials: false,
});

// ─── Request interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    // Phase 6: attach Authorization header here when auth is added
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  // Unwrap the JSON payload so callers receive it directly (no .data access needed)
  (response) => response.data,

  (error) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
      const msg = 'Cannot reach the server. Make sure the backend is running on port 8000.';
      const e      = new Error(msg);
      e.isApiError = true;
      e.status     = 0;
      return Promise.reject(e);
    }

    // Normalise all other errors into a single Error shape
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

// ─── Standalone helpers ───────────────────────────────────────────────────────

/**
 * checkHealth — GET /health
 * Used by the Phase 2 landing page health-check button.
 * @returns {Promise<{ status: string }>}
 */
export async function checkHealth() {
  return apiClient.get('/health');
}

export default apiClient;
