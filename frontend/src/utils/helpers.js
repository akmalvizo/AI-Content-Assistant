/**
 * utils/helpers.js
 * Shared utility functions for AI Content Assistant.
 * Pure functions — no React, no side effects.
 */

// ─── UUID ─────────────────────────────────────────────────────────────────────

/**
 * generateUUID — returns a RFC-4122 v4 UUID string.
 * Uses the native crypto API when available, falls back to Math.random.
 *
 * @returns {string} e.g. "550e8400-e29b-41d4-a716-446655440000"
 */
export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Polyfill for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─── Timestamp ────────────────────────────────────────────────────────────────

/**
 * formatTimestamp — converts an ISO string or Date to a short HH:MM AM/PM label.
 * Used in Message bubbles.
 *
 * @param {string | Date} value - ISO date string or Date object.
 * @returns {string} e.g. "2:34 PM"
 */
export function formatTimestamp(value) {
  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

const MAX_MESSAGE_LENGTH = 5000;

/**
 * validateMessage — checks a message string before sending.
 *
 * @param {string} text - Raw input from the user.
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateMessage(text) {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty.' };
  }
  if (text.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
    };
  }
  return { valid: true, error: null };
}

// ─── Scroll ───────────────────────────────────────────────────────────────────

/**
 * scrollToBottom — smoothly scrolls a ref element to its bottom.
 *
 * @param {React.RefObject} ref - A ref attached to the scroll container or anchor.
 */
export function scrollToBottom(ref) {
  ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
