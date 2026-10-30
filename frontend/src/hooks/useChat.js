/**
 * useChat.js – Custom React hook managing the chat state.
 */
import { useState, useCallback, useRef } from 'react';
import { sendChat } from '../api/chat';

const WELCOME_MSG = {
  id: 'welcome',
  role: 'assistant',
  text: "Hello! I'm the Greenfield College AI Assistant. I can answer your questions about admissions, courses, fees, scholarships, library services, and campus facilities — all from verified official sources. How can I help you today?",
  status: 'welcome',
  sources: [],
  clarificationOptions: [],
  timestamp: new Date().toISOString(),
};

export function useChat() {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (query) => {
    if (!query.trim() || isLoading) return;

    // Add user message immediately
    const userMsg = {
      id: Date.now() + '-user',
      role: 'user',
      text: query.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const data = await sendChat(query.trim());

      const assistantMsg = {
        id: Date.now() + '-assistant',
        role: 'assistant',
        text: data.answer || '',
        status: data.status,
        sources: data.results || [],
        clarificationOptions: data.clarification_options || [],
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errMsg = {
        id: Date.now() + '-error',
        role: 'assistant',
        text: 'Sorry, I could not connect to the knowledge base. Please ensure the backend server is running and try again.',
        status: 'error',
        sources: [],
        clarificationOptions: [],
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errMsg]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MSG]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
