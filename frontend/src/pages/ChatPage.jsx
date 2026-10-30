import ChatWindow from '../components/ChatWindow';

export default function ChatPage() {
  return (
    <div className="chat-page">
      <header className="chat-page__header" aria-labelledby="chat-page-heading">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              background: 'rgba(0,212,255,.15)',
              border: '1px solid rgba(0,212,255,.3)',
              color: 'var(--cyan)',
              padding: '.3rem .9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '.75rem',
              fontWeight: 700,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10B981',
                animation: 'pulse 2s infinite',
              }}
            />
            Live · Verified Sources
          </div>
          <h1 id="chat-page-heading" className="chat-page__title">
            AI FAQ Assistant
          </h1>
          <p className="chat-page__sub">
            Ask me anything about Greenfield College. I'll answer using
            approved official sources — or tell you honestly if I don't know.
          </p>
        </div>
      </header>

      <div className="chat-page__body">
        <ChatWindow />

        {/* Disclaimer */}
        <div
          style={{
            background: 'rgba(255,255,255,.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(108,59,255,.12)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            fontSize: '.78rem',
            color: 'var(--gray-500)',
            lineHeight: 1.6,
            display: 'flex',
            gap: '.6rem',
            alignItems: 'flex-start',
          }}
          role="note"
          aria-label="Privacy and accuracy notice"
        >
          <span style={{ flexShrink: 0 }}>🔒</span>
          <span>
            <strong style={{ color: 'var(--navy)' }}>Privacy &amp; Accuracy Notice:</strong>{' '}
            This assistant answers only from verified official college documents.
            Conversations are not stored. This system uses demonstration data —
            verify all important information with the relevant college department.{' '}
            <a href="/privacy" style={{ color: 'var(--purple)', fontWeight: 600 }}>
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
