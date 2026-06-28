/**
 * services/chatService.js
 * Chat-specific API service for AI Content Assistant.
 *
 * This is the ONLY file that knows the chat endpoint URL and payload shape.
 * Components and context call this module — they never touch Axios directly.
 *
 * Phase 5 swap point:
 *   If the backend endpoint or response schema changes (e.g. streaming),
 *   only this file needs updating. Nothing else changes.
 */

import apiClient from './api.js';

/**
 * sendChatMessage — POST /api/chat
 *
 * @param {string} message - The user's input text.
 * @returns {Promise<{ response: string, timestamp: string, model: string }>}
 * @throws {Error} Normalised error from the Axios response interceptor.
 */
export async function sendChatMessage(message) {
  return apiClient.post('/api/chat', { message });
}
