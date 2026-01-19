import React, { useState, lazy, Suspense, useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
// Utilitaire pour gérer le mode sombre/clair
function useDarkMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${mode}`);
    localStorage.setItem('theme', mode);
  }, [mode]);
  return [mode, setMode];
}
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Chargement immédiat des pages critiques
import Home from './Home';

// Lazy loading des autres pages
const Adventures = lazy(() => import('./Adventures'));
const Contact = lazy(() => import('./Contact'));
const Activities = lazy(() => import('./pages/Activities'));
const Articles = lazy(() => import('./pages/Articles'));
const Videos = lazy(() => import('./pages/Videos'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const Blog = lazy(() => import('./pages/Blog'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Randonnee = lazy(() => import('./pages/Randonnee'));
const Escalade = lazy(() => import('./pages/Escalade'));
const Ski = lazy(() => import('./pages/Ski'));
const Reservation = lazy(() => import('./pages/Reservation'));
const ReservationConfirmation = lazy(() => import('./pages/ReservationConfirmation'));

// Composant de chargement optimisé
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '400px',
    fontSize: '1.2rem',
    color: '#6366f1',
    animation: 'fadeIn 0.3s ease-in'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div className="spinner" style={{
        width: '20px',
        height: '20px',
        border: '3px solid rgba(99, 102, 241, 0.2)',
        borderTop: '3px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      Chargement...
    </div>
  </div>
);

function App() {
  const [theme, setTheme] = useDarkMode();
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const location = useLocation();

  // Scroll to top on route change pour une navigation fluide
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Prefetch des pages populaires pour une navigation instantanée
  useEffect(() => {
    const prefetchPages = [Activities, Randonnee, Escalade, Ski, Contact];
    prefetchPages.forEach(page => {
      // Précharger les composants après le chargement initial
      const timer = setTimeout(() => {
        page.preload && page.preload();
      }, 2000);
      return () => clearTimeout(timer);
    });
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterMessage('Email invalide');
      return;
    }

    try {
      console.log('Newsletter subscription:', newsletterEmail);
      setNewsletterMessage('Inscription réussie !');
      setNewsletterEmail('');
      
      setTimeout(() => setNewsletterMessage(''), 3000);
    } catch (error) {
      setNewsletterMessage('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem'}}>
          <h1>Aventures Alpines</h1>
          <button
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              background: theme === 'dark' ? 'linear-gradient(135deg,#f3f4f6,#cbd5e1)' : 'linear-gradient(135deg,#232946,#16161a)',
              color: theme === 'dark' ? '#232946' : '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
              outline: 'none',
            }}
          >
            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          </button>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/activities">Activités</Link></li>
            <li><Link to="/randonnee">Randonnée</Link></li>
            <li><Link to="/escalade">Escalade</Link></li>
            <li><Link to="/ski">Ski</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/videos">Vidéos</Link></li>
            <li><Link to="/routes">Itinéraires</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isLoggedIn ? (
              <li className="auth-link">
                <Link to="/dashboard">{user.nom_utilisateur}</Link>
              </li>
            ) : (
              <>
                <li className="auth-link"><Link to="/login">Connexion</Link></li>
                <li className="auth-link"><Link to="/register">Inscription</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/randonnee" element={<Randonnee />} />
            <Route path="/escalade" element={<Escalade />} />
            <Route path="/ski" element={<Ski />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservation/confirmation" element={<ReservationConfirmation />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </main>
      
      <footer style={{
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        color: 'white',
        padding: '3rem 2rem 1rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Aventures Alpines</h3>
            <p style={{ color: '#cbd5e0', lineHeight: '1.6' }}>
              Votre guide pour explorer les plus beaux sommets et itinéraires des Alpes françaises.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
                Chamonix, Haute-Savoie<br />
                contact@aventures-alpines.fr<br />
                +33 4 50 12 34 56
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Newsletter</h3>
            <p style={{ color: '#cbd5e0', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Recevez nos derniers articles et bons plans montagne
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="email"
                placeholder="Votre email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '2px solid #4a5568',
                  background: '#2d3748',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#4a5568'}
              />
              <button
                type="submit"
                style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                S'inscrire
              </button>
              {newsletterMessage && (
                <p style={{ margin: 0, fontSize: '0.9rem', color: newsletterMessage.includes('réussie') ? '#10b981' : '#f59e0b' }}>
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Suivez-nous</h3>
            <p style={{ color: '#cbd5e0', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Rejoignez notre communauté de passionnés
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://facebook.com/aventures-alpines"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: '#1877f2',
                  borderRadius: '0',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href="https://instagram.com/aventures.alpines"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                  borderRadius: '0',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a
                href="https://twitter.com/aventures_alps"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: '#1da1f2',
                  borderRadius: '0',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title="Twitter"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a
                href="https://www.youtube.com/@aventures-alpines"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: '#ff0000',
                  borderRadius: '0',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title="YouTube"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #4a5568',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Accueil</Link>
            <Link to="/articles" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Articles</Link>
            <Link to="/contact" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Contact</Link>
            <a href="https://github.com/maxlo245/Aventure-Alpine" target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Code source</a>
          </div>
          <p style={{ margin: 0, color: '#a0aec0', fontSize: '0.9rem' }}>
            &copy; 2025 Aventures Alpines. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* SpeedInsights pour Vercel */}
      <SpeedInsights />
    </div>
  );
}

export default App;