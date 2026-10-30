import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#categories', label: 'Topics' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#stats', label: 'About' },
];

export default function Navbar({ onChatClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <a href="/" className="navbar__logo" aria-label="Greenfield College AI Assistant Home">
        <div className="navbar__logo-icon" aria-hidden="true">🎓</div>
        <div className="navbar__logo-text">
          <span className="navbar__logo-name">Greenfield College</span>
          <span className="navbar__logo-sub">AI FAQ Assistant</span>
        </div>
      </a>

      <div className={`navbar__nav${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="/chat" className="navbar__cta" id="nav-ask-btn" onClick={() => setMenuOpen(false)}>
          💬 Ask AI
        </a>
      </div>

      <button
        className="navbar__hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(v => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
