/**
 * services/api.js
 * Axios HTTP client for AI Content Assistant.
 * Provides a pre-configured instance and placeholder service functions
 * for communicating with the FastAPI backend.
 */

import axios from 'axios';

// ─── Axios Instance ────────────────────────────────────────────────────────────

/**
 * apiClient — shared Axios instance.
 * Base URL is pulled from the Vite environment variable.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30-second request timeout
});

// ─── Request Interceptor ───────────────────────────────────────────────────────

/**
 * Attach auth tokens or request metadata before each request.
 * Placeholder: authentication headers will be added in Phase 3.
 */
apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach Bearer token from auth context (Phase 3)
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

/**
 * Centralized error handling for all API responses.
 * Placeholder: toast notifications and token refresh will be added in Phase 3.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: handle 401 / 403 / 500 globally (Phase 3)
    return Promise.reject(error);
  }
);

// ─── Service Functions ─────────────────────────────────────────────────────────

/**
 * sendMessage — placeholder function to POST a user message to the backend.
 * Will be implemented in Phase 2.
 *
 * @param {string} message - The user's input text
 * @returns {Promise<object>} AI response object
 */
export async function sendMessage(message) {
  // TODO: implement in Phase 2
  // return apiClient.post('/api/chat', { message });
  throw new Error('sendMessage is not yet implemented');
}

/**
 * checkHealth — placeholder function to verify the backend is reachable.
 * Will be implemented in Phase 2.
 *
 * @returns {Promise<object>} Health status object
 */
export async function checkHealth() {
  // TODO: implement in Phase 2
  // return apiClient.get('/api/health');
  throw new Error('checkHealth is not yet implemented');
}

export default apiClient;
