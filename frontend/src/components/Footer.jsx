export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">🎓</div>
              Greenfield College AI Assistant
            </div>
            <p className="footer__desc">
              An AI-powered FAQ assistant providing instant, verified answers
              about Greenfield College of Technology &amp; Sciences from
              approved official sources.
            </p>
            <div className="footer__demo-notice">
              <span>⚠️</span>
              <span>
                <strong>Demonstration Data</strong> — This assistant uses sample
                data. Replace with official verified documents before production use.
              </span>
            </div>
          </div>

          <div>
            <div className="footer__col-title">Services</div>
            <div className="footer__links">
              <a href="/chat">Ask AI Assistant</a>
              <a href="/#categories">Browse Topics</a>
              <a href="/#how-it-works">How It Works</a>
            </div>
          </div>

          <div>
            <div className="footer__col-title">Information</div>
            <div className="footer__links">
              <a href="/#admissions">Admissions</a>
              <a href="/#courses">Courses</a>
              <a href="/#fees">Fee Structure</a>
              <a href="/#scholarships">Scholarships</a>
            </div>
          </div>

          <div>
            <div className="footer__col-title">Legal</div>
            <div className="footer__links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/privacy#data">Data Protection</a>
              <a
                href="mailto:info@greenfieldcollege.edu"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
              <a
                href="https://greenfieldcollege.edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Website ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} Greenfield College of Technology &amp; Sciences. All rights reserved.
          </span>
          <div className="footer__bottom-right">
            <a href="/privacy">Privacy Policy</a>
            <a href="mailto:info@greenfieldcollege.edu">Contact</a>
            <span style={{ color: 'rgba(255,255,255,.3)' }}>|</span>
            <span>Built with ❤️ for student success</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
