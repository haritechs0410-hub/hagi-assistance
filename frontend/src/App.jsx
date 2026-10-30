import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PrivacyPage from './pages/PrivacyPage';

/**
 * Lightweight client-side router using the History API.
 * No external routing dependency required.
 */
function useRouter() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Intercept <a> clicks for client-side navigation
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      // Only handle internal paths (not external or mailto)
      if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
      e.preventDefault();
      window.history.pushState({}, '', href);
      setPath(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return path;
}

function renderPage(path) {
  if (path === '/chat') return <ChatPage />;
  if (path === '/privacy') return <PrivacyPage />;
  return <HomePage />;
}

export default function App() {
  const path = useRouter();
  const showFooter = path !== '/chat';

  return (
    <>
      <Navbar />
      {renderPage(path)}
      {showFooter && <Footer />}
    </>
  );
}
