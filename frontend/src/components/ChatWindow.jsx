import { useEffect, useRef, useState, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { fetchSuggestions } from '../api/chat';

/* ── helpers ─────────────────────────────────────────────────────────── */
function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch { return ''; }
}

/* ── SourceCitation ──────────────────────────────────────────────────── */
function SourceCitation({ source }) {
  if (!source) return null;
  return (
    <a
      href={source.official_url}
      target="_blank"
      rel="noopener noreferrer"
      className="source-cite"
      title={`View source: ${source.title}`}
    >
      <span className="source-cite__icon">📄</span>
      <div className="source-cite__text">
        <div className="source-cite__title">{source.title}</div>
        <div className="source-cite__meta">
          {source.department} · Verified {source.last_verified_date}
        </div>
      </div>
      {source.is_demo && <span className="source-cite__demo">DEMO</span>}
    </a>
  );
}

/* ── Message ─────────────────────────────────────────────────────────── */
function Message({ msg, onChipClick }) {
  const isUser = msg.role === 'user';
  const isError = msg.status === 'error';
  const isNotFound = msg.status === 'not_found';
  const hasSources = msg.sources?.length > 0 && msg.sources[0]?.source;
  const hasClarifications = msg.clarificationOptions?.length > 0;

  return (
    <div className={`chat-msg chat-msg--${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-msg__avatar" aria-hidden="true">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="chat-msg__content">
        <div className={`chat-msg__bubble${isError ? ' chat-msg__bubble--error' : ''}`}>
          {msg.text}
        </div>

        {/* Clarification option chips */}
        {hasClarifications && (
          <div className="clarification-chips" role="list" aria-label="Clarification options">
            {msg.clarificationOptions.map((opt, i) => (
              <button
                key={i}
                className="clarification-chip"
                onClick={() => onChipClick(opt)}
                role="listitem"
                aria-label={`Select: ${opt}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Fallback notice */}
        {isNotFound && (
          <div className="chat-msg__fallback" role="alert">
            <span>ℹ️</span>
            <span>
              Please contact the relevant department or visit the{' '}
              <a
                href="https://greenfieldcollege.edu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                official college website
              </a>{' '}
              for accurate information.
            </span>
          </div>
        )}

        {/* Source citations */}
        {hasSources && !isUser && (
          <div className="chat-msg__sources" aria-label="Sources">
            <div style={{ fontSize: '.72rem', color: 'var(--gray-400)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '.2rem' }}>
              📚 Sources
            </div>
            {msg.sources.slice(0, 3).map((result, i) =>
              result.source ? <SourceCitation key={i} source={result.source} /> : null
            )}
          </div>
        )}

        <div className="chat-msg__time">{formatTime(msg.timestamp)}</div>
      </div>
    </div>
  );
}

/* ── TypingIndicator ─────────────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg--assistant" aria-label="AI is thinking">
      <div className="chat-msg__avatar" aria-hidden="true">🤖</div>
      <div className="typing-indicator" aria-live="polite">
        <span /><span /><span />
      </div>
    </div>
  );
}

/* ── WelcomeState ────────────────────────────────────────────────────── */
function WelcomeState() {
  return (
    <div className="chat-welcome">
      <div className="chat-welcome__icon">🎓</div>
      <h2 className="chat-welcome__title">Welcome to the College AI Assistant</h2>
      <p className="chat-welcome__sub">
        Ask me anything about Greenfield College — admissions, fees, courses,
        scholarships, library, or campus facilities.
      </p>
    </div>
  );
}

/* ── SuggestionsPanel ────────────────────────────────────────────────── */
function SuggestionsPanel({ suggestions, onSelect }) {
  const icons = ['🎓', '📚', '💰', '🏆', '🏛️', '🏅'];
  return (
    <div className="suggestions-panel" aria-label="Suggested questions">
      <div className="suggestions-panel__title">
        <span>💡</span> Quick Questions
      </div>
      <div className="suggestions-panel__chips" role="list">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="suggestion-chip"
            onClick={() => onSelect(s)}
            role="listitem"
            aria-label={`Ask: ${s}`}
          >
            <span aria-hidden="true">{icons[i % icons.length]}</span>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── ChatWindow (main export) ────────────────────────────────────────── */
export default function ChatWindow() {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch suggestions on mount
  useEffect(() => {
    fetchSuggestions()
      .then(setSuggestions)
      .catch(() => setSuggestions([
        'What is the admission procedure?',
        'What is the fee structure for B.Tech?',
        'What courses are available?',
        'What scholarships are available?',
        'What are the library timings?',
        'Is there WiFi on campus?',
      ]));
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const handleSuggestion = useCallback((text) => {
    sendMessage(text);
    inputRef.current?.focus();
  }, [sendMessage]);

  const onlyWelcome = messages.length === 1 && messages[0].id === 'welcome';

  return (
    <>
      {/* Chat window */}
      <div className="chat-window" role="main" aria-label="AI Chat Interface">
        {/* Header */}
        <div className="chat-window__header">
          <div className="chat-window__identity">
            <div className="chat-window__avatar" aria-hidden="true">
              🤖
              <div className="chat-window__status-dot" aria-hidden="true" />
            </div>
            <div>
              <div className="chat-window__name">College AI Assistant</div>
              <div className="chat-window__status">
                <span>●</span> Powered by verified college sources
              </div>
            </div>
          </div>
          <div className="chat-window__actions">
            <button
              className="chat-window__btn"
              onClick={clearChat}
              id="clear-chat-btn"
              aria-label="Clear chat history"
            >
              🗑️ Clear Chat
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="chat-messages"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {onlyWelcome ? (
            <WelcomeState />
          ) : (
            messages.map(msg => (
              <Message
                key={msg.id}
                msg={msg}
                onChipClick={handleSuggestion}
              />
            ))
          )}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <form
            className="chat-input__form"
            onSubmit={handleSubmit}
            aria-label="Message input form"
          >
            <textarea
              ref={inputRef}
              id="chat-input-field"
              className="chat-input__field"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about admissions, fees, courses, scholarships…"
              disabled={isLoading}
              aria-label="Type your question"
              rows={1}
              maxLength={500}
            />
            <button
              type="submit"
              className="chat-input__send"
              disabled={!input.trim() || isLoading}
              id="chat-send-btn"
              aria-label="Send message"
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </form>
        </div>
      </div>

      {/* Suggestions panel */}
      {suggestions.length > 0 && (
        <SuggestionsPanel
          suggestions={suggestions}
          onSelect={handleSuggestion}
        />
      )}
    </>
  );
}
