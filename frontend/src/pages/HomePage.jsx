import { useEffect, useRef } from 'react';

const CATEGORIES = [
  {
    id: 'admissions',
    icon: '🎓',
    title: 'Admissions',
    desc: 'Application procedure, eligibility, deadlines, required documents, and management quota.',
    color: 'linear-gradient(135deg,#6C3BFF22,#00D4FF11)',
    border: '#6C3BFF',
  },
  {
    id: 'courses',
    icon: '📚',
    title: 'Courses & Programs',
    desc: 'Undergraduate, postgraduate, diploma, and certificate programs across all departments.',
    color: 'linear-gradient(135deg,#FF4DA622,#6C3BFF11)',
    border: '#FF4DA6',
  },
  {
    id: 'fees',
    icon: '💰',
    title: 'Fee Structure',
    desc: 'Tuition fees, hostel charges, lab fees, payment procedures, and installment options.',
    color: 'linear-gradient(135deg,#10B98122,#00D4FF11)',
    border: '#10B981',
  },
  {
    id: 'scholarships',
    icon: '🏆',
    title: 'Scholarships',
    desc: 'Merit, sports, government, and external scholarships — eligibility and application process.',
    color: 'linear-gradient(135deg,#F59E0B22,#FF4DA611)',
    border: '#F59E0B',
  },
  {
    id: 'library',
    icon: '📖',
    title: 'Library Services',
    desc: 'Timings, borrowing limits, digital resources, IEEE Xplore, Springer, and NPTEL access.',
    color: 'linear-gradient(135deg,#3B82F622,#6C3BFF11)',
    border: '#3B82F6',
  },
  {
    id: 'campus',
    icon: '🏛️',
    title: 'Campus Facilities',
    desc: 'Sports, canteen, medical centre, WiFi, hostel, and bus transport facilities.',
    color: 'linear-gradient(135deg,#8B5CF622,#FF4DA611)',
    border: '#8B5CF6',
  },
  {
    id: 'examinations',
    icon: '📝',
    title: 'Examinations',
    desc: 'Exam pattern, CGPA system, internal assessments, attendance requirements, and grading.',
    color: 'linear-gradient(135deg,#EC489922,#6C3BFF11)',
    border: '#EC4899',
  },
  {
    id: 'placements',
    icon: '💼',
    title: 'Placements',
    desc: 'Placement statistics, top recruiters, average packages, and campus recruitment process.',
    color: 'linear-gradient(135deg,#06B6D422,#10B98111)',
    border: '#06B6D4',
  },
];

const STATS = [
  { icon: '📋', value: '30+', label: 'Verified FAQs' },
  { icon: '🏢', value: '9', label: 'Official Sources' },
  { icon: '🎓', value: '8', label: 'Topic Categories' },
  { icon: '🔒', value: '100%', label: 'Privacy Compliant' },
];

const HOW_STEPS = [
  {
    icon: '💬',
    title: 'Ask Your Question',
    desc: 'Type any question about admissions, fees, courses, or campus life in natural language.',
  },
  {
    icon: '🔍',
    title: 'AI Retrieves Evidence',
    desc: 'The BM25 retrieval engine searches verified official documents from approved college sources.',
  },
  {
    icon: '✅',
    title: 'Get a Cited Answer',
    desc: 'Receive an accurate answer with full source citations — or an honest fallback if unsure.',
  },
];

/* ── Intersection Observer hook for scroll animations ── */
function useAnimateOnScroll() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.animate-in');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function HomePage() {
  const pageRef = useAnimateOnScroll();

  return (
    <main ref={pageRef}>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__container">
          {/* Left content */}
          <div>
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              AI-Powered · Verified Sources
            </div>

            <h1 id="hero-heading" className="hero__title">
              Your College Questions,{' '}
              <span className="highlight">Answered Instantly.</span>
            </h1>

            <p className="hero__subtitle">
              The Greenfield College AI Assistant delivers instant, accurate answers
              about admissions, courses, fees, and campus life — all grounded in
              official, verified college documents.
            </p>

            <div className="hero__actions">
              <a href="/chat" className="btn-primary" id="hero-ask-btn">
                <span>💬</span> Ask AI Assistant
              </a>
              <a href="#categories" className="btn-secondary" id="hero-browse-btn">
                <span>📂</span> Browse Topics
              </a>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-value">30<span>+</span></div>
                <div className="hero__stat-label">Verified FAQs</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-value">9</div>
                <div className="hero__stat-label">Official Sources</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-value">8</div>
                <div className="hero__stat-label">Topic Areas</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__orb-container">
              <div className="hero__chip">🎓 Admissions</div>
              <div className="hero__chip">💰 Fees</div>
              <div className="hero__chip">📚 Courses</div>
              <div className="hero__chip">🏆 Scholarships</div>

              <div className="hero__orb">
                <div className="hero__orb-inner">
                  <span className="hero__orb-emoji">🤖</span>
                  <span className="hero__orb-label">AI Assistant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────── */}
      <section className="section" id="categories" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section__header">
            <div className="section__badge">📂 Knowledge Base</div>
            <h2 id="categories-heading" className="section__title">
              Explore FAQ Categories
            </h2>
            <p className="section__sub">
              Browse verified information across all major college topics. Every answer
              is sourced from official documents.
            </p>
          </div>

          <div className="categories__grid">
            {CATEGORIES.map((cat, i) => (
              <a
                key={cat.id}
                href="/chat"
                id={`category-${cat.id}`}
                className="category-card animate-in"
                style={{
                  background: cat.color,
                  borderColor: `${cat.border}33`,
                  animationDelay: `${i * 0.07}s`,
                }}
                aria-label={`Browse ${cat.title} questions`}
              >
                <div
                  className="category-card__icon"
                  style={{ background: `${cat.border}18` }}
                  aria-hidden="true"
                >
                  {cat.icon}
                </div>
                <h3 className="category-card__title">{cat.title}</h3>
                <p className="category-card__desc">{cat.desc}</p>
                <span className="category-card__arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="section section--alt" id="how-it-works" aria-labelledby="how-heading">
        <div className="container">
          <div className="section__header">
            <div className="section__badge">⚙️ Architecture</div>
            <h2 id="how-heading" className="section__title">
              How the AI Assistant Works
            </h2>
            <p className="section__sub">
              A retrieval-first approach ensures every answer is grounded
              in approved official sources — never invented.
            </p>
          </div>

          <div className="how__steps">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="step-card animate-in" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="step-card__number" aria-hidden="true">{step.icon}</div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Privacy notice */}
          <div
            className="animate-in"
            style={{
              marginTop: '3rem',
              background: 'linear-gradient(135deg,rgba(108,59,255,.06),rgba(0,212,255,.04))',
              border: '1px solid rgba(108,59,255,.15)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem 2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🔒</span>
            <div>
              <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '.35rem' }}>
                Privacy First
              </strong>
              <p style={{ color: 'var(--gray-500)', fontSize: '.9rem', lineHeight: 1.65 }}>
                This assistant does not store your conversations by default, does not collect
                unnecessary personal information, and never exposes student records.
                API keys are stored securely on the server.{' '}
                <a href="/privacy" style={{ color: 'var(--purple)', fontWeight: 600 }}>
                  Read our Privacy Policy →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="section section--dark" id="stats" aria-labelledby="stats-heading">
        <div className="container">
          <div className="section__header">
            <div className="section__badge" style={{ background: 'rgba(0,212,255,.1)', borderColor: 'rgba(0,212,255,.25)', color: 'var(--cyan)' }}>
              📊 By the Numbers
            </div>
            <h2 id="stats-heading" className="section__title">
              Verified Project Data
            </h2>
            <p className="section__sub">
              All statistics below reflect the actual knowledge base and source inventory
              of this demonstration system.
            </p>
          </div>

          <div className="stats__grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card animate-in" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stat-card__icon" aria-hidden="true">{s.icon}</div>
                <div className="stat-card__value">{s.value}</div>
                <div className="stat-card__label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Demo notice */}
          <div
            className="animate-in"
            style={{
              marginTop: '3rem',
              textAlign: 'center',
              background: 'rgba(255,165,0,.07)',
              border: '1px solid rgba(255,165,0,.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 2rem',
              color: '#fbbf24',
              fontSize: '.9rem',
              lineHeight: 1.7,
            }}
          >
            ⚠️ <strong>Demonstration Notice:</strong> This system uses clearly labelled sample data.
            Placement statistics, fees, and all other figures are for demonstration only.
            Replace the knowledge base with official verified documents before production use.
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          background: 'var(--grad-hero)',
          textAlign: 'center',
        }}
        aria-labelledby="cta-heading"
      >
        <div className="container">
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }} aria-hidden="true">🚀</div>
          <h2
            id="cta-heading"
            style={{
              color: 'var(--white)',
              fontSize: 'clamp(1.8rem,3.5vw,2.6rem)',
              fontWeight: 900,
              marginBottom: '1rem',
              letterSpacing: '-.02em',
            }}
          >
            Ready to Get Instant Answers?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: 500, margin: '0 auto 2.5rem' }}>
            Ask the AI assistant your college questions and get verified,
            cited answers in seconds.
          </p>
          <a href="/chat" className="btn-primary" id="cta-start-btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            💬 Start Chatting Now
          </a>
        </div>
      </section>
    </main>
  );
}
