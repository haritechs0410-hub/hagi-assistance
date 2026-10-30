export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <div className="privacy-content" role="main">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: 15 January 2025 &nbsp;|&nbsp; Version 1.0</p>

        <div
          style={{
            background: 'rgba(108,59,255,.06)',
            border: '1px solid rgba(108,59,255,.15)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            fontSize: '.9rem',
            color: 'var(--gray-700)',
            marginBottom: '2rem',
            lineHeight: 1.7,
          }}
        >
          🔒 <strong>Summary:</strong> We do not collect unnecessary personal information.
          Conversations are not stored by default. API keys are stored securely on the
          server. We never expose student records.
        </div>

        <h2>1. Who We Are</h2>
        <p>
          The Greenfield College AI FAQ Assistant is an educational tool developed for
          Greenfield College of Technology &amp; Sciences. It provides students with
          instant, verified answers about college information using approved official
          documents and a retrieval-based AI system.
        </p>

        <h2>2. What Information We Collect</h2>
        <p>We collect <strong>minimal</strong> information:</p>
        <ul>
          <li><strong>Questions you type:</strong> Used solely to retrieve relevant answers from the knowledge base. Not stored or shared.</li>
          <li><strong>Session data:</strong> Temporary in-browser state only. Cleared when you close the tab.</li>
          <li><strong>No personal identification:</strong> We do not ask for your name, student ID, or any personal details.</li>
          <li><strong>No cookies</strong> are used beyond standard browser session management.</li>
        </ul>

        <h2>3. What We Do NOT Collect</h2>
        <ul>
          <li>Student records, marks, or academic performance data</li>
          <li>Personal identification information</li>
          <li>Device fingerprints or tracking identifiers</li>
          <li>IP addresses stored beyond the current request</li>
          <li>Conversation history (conversations are not persisted to any database)</li>
        </ul>

        <h2>4. How Your Questions Are Processed</h2>
        <p>
          When you submit a question, it is sent to our backend server where it is
          matched against a local knowledge base using BM25 keyword search. Your question
          is treated as untrusted user input and is never injected into any system prompt.
          Input is validated and sanitised before processing.
        </p>
        <p>
          If an optional LLM API (e.g., OpenAI) is configured, your question may be
          sent to that third-party API to generate a grounded response. In that case,
          the third party's privacy policy also applies. No personal data accompanies
          the query.
        </p>

        <h2>5. Data Security</h2>
        <ul>
          <li>API keys are stored in server-side environment variables — never exposed in frontend code.</li>
          <li>User input is validated and HTML-escaped to prevent injection attacks.</li>
          <li>CORS is restricted to the authorised frontend origin.</li>
          <li>Retrieved documents are treated as untrusted content — they cannot override system instructions.</li>
          <li>No sensitive student data is stored in the knowledge base.</li>
        </ul>

        <h2>6. Knowledge Base &amp; Sources</h2>
        <p>
          This system currently uses <strong>demonstration data</strong>. All information
          displayed is clearly labelled as demonstration content. Before production
          deployment, the knowledge base must be replaced with officially verified, approved
          college documents. Expired, unapproved, or disputed documents are automatically
          excluded from retrieval.
        </p>

        <h2>7. Your Rights</h2>
        <p>Since we do not store personal data, there is nothing to access or delete. If you have concerns, contact us at:</p>
        <ul>
          <li><strong>Email:</strong> privacy@greenfieldcollege.edu</li>
          <li><strong>Address:</strong> Data Protection Officer, Greenfield College, Greenfield Nagar, City – 600001</li>
        </ul>

        <h2>8. Third-Party Links</h2>
        <p>
          Source citations in answers may link to official college department pages.
          We are not responsible for the privacy practices of those external sites.
        </p>

        <h2>9. Children's Privacy</h2>
        <p>
          This service is intended for college students (typically 17+). We do not
          knowingly collect data from children under 13. If you believe a child has
          submitted information, contact us immediately.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this policy periodically. The "Last updated" date at the top
          reflects the most recent revision. Continued use of the service constitutes
          acceptance of the updated policy.
        </p>

        <div
          style={{
            marginTop: '2.5rem',
            padding: '1.25rem',
            background: 'var(--lavender)',
            borderRadius: '12px',
            fontSize: '.875rem',
            color: 'var(--gray-500)',
          }}
        >
          <strong style={{ color: 'var(--navy)' }}>Contact Us:</strong>
          <br />
          Greenfield College of Technology &amp; Sciences
          <br />
          Email: <a href="mailto:privacy@greenfieldcollege.edu" style={{ color: 'var(--purple)' }}>privacy@greenfieldcollege.edu</a>
          <br />
          Phone: +91-44-2800-1234
        </div>
      </div>
    </div>
  );
}
