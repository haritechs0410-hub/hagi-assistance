/**
 * api/chat.js – Frontend API service for the College FAQ AI Assistant.
 * All backend communication is centralised here.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Send a question to the backend and return the structured response.
 * @param {string} query
 * @returns {Promise<Object>}
 */
export async function sendChat(query) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Server error: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch suggested questions for the chat suggestions panel.
 * @returns {Promise<string[]>}
 */
export async function fetchSuggestions() {
  const res = await fetch(`${BASE_URL}/api/suggestions`);
  if (!res.ok) throw new Error('Failed to load suggestions');
  const data = await res.json();
  return data.suggestions || [];
}

/**
 * Fetch FAQ categories.
 * @returns {Promise<string[]>}
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`);
  if (!res.ok) throw new Error('Failed to load categories');
  const data = await res.json();
  return data.categories || [];
}

/**
 * Health check – returns true if backend is reachable.
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(4000) });
    return res.ok;
  } catch {
    return false;
  }
}
