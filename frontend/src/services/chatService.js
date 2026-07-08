/**
 * services/chatService.js
 * Chat API service — the only frontend file that knows the endpoint shape.
 *
 * Phase 6: accepts a mode parameter and includes it in the request body.
 */

import apiClient from './api.js';

/**
 * sendChatMessage — POST /api/chat
 *
 * @param {string} message - User input text.
 * @param {string} mode    - Content mode id (e.g. "linkedin", "blog").
 * @returns {Promise<{ response: string, timestamp: string, model: string, mode: string }>}
 */
export async function sendChatMessage(message, mode = 'general') {
  return apiClient.post('/api/chat', { message, mode });
}
