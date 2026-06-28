/**
 * services/api.js
 * Base Axios instance for AI Content Assistant.
 *
 * Responsibilities:
 *   - Create a single, reusable Axios instance pointed at the backend.
 *   - Attach request headers (auth tokens in Phase 5).
 *   - Unwrap response payloads and normalise errors.
 *
 * Never call this directly from components — use chatService.js instead.
 */

import axios from 'axios';

// ─── Instance ─────────────────────────────────────────────────────────────────

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000, // 30 s — generous for slow connections
});

// ─── Request interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    // Phase 5: attach `Authorization: Bearer <token>` here
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  // Unwrap .data so every caller receives the JSON payload directly
  (response) => response.data,

  (error) => {
    // Normalise all API errors into a plain Error with a human-readable message
    const serverMsg =
      error?.response?.data?.message ||
      error?.response?.data?.detail  ||
      error?.message                 ||
      'An unexpected error occurred.';

    const normalised      = new Error(serverMsg);
    normalised.status     = error?.response?.status;
    normalised.isApiError = true;

    return Promise.reject(normalised);
  }
);

// ─── Health check ─────────────────────────────────────────────────────────────

/**
 * checkHealth — GET /health
 * @returns {Promise<{ status: string }>}
 */
export async function checkHealth() {
  return apiClient.get('/health');
}

export default apiClient;
