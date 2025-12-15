import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Adventures from './Adventures';
import Contact from './Contact';
import Activities from './pages/Activities';
import Articles from './pages/Articles';
import Videos from './pages/Videos';
import RoutesPage from './pages/RoutesPage';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Randonnee from './pages/Randonnee';
import Escalade from './pages/Escalade';
import Ski from './pages/Ski';
import './App.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterMessage('⚠️ Email invalide');
      return;
    }

    try {
      console.log('Newsletter subscription:', newsletterEmail);
      setNewsletterMessage('✅ Inscription réussie !');
      setNewsletterEmail('');
      
      setTimeout(() => setNewsletterMessage(''), 3000);
    } catch (error) {
      setNewsletterMessage('❌ Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aventures Alpines</h1>
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
                <Link to="/dashboard">👤 {user.nom_utilisateur}</Link>
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
        </Routes>
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
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>🏔️ Aventures Alpines</h3>
            <p style={{ color: '#cbd5e0', lineHeight: '1.6' }}>
              Votre guide pour explorer les plus beaux sommets et itinéraires des Alpes françaises.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
                📍 Chamonix, Haute-Savoie<br />
                📧 contact@aventures-alpines.fr<br />
                📞 +33 4 50 XX XX XX
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>📬 Newsletter</h3>
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
                <p style={{ margin: 0, fontSize: '0.9rem', color: newsletterMessage.includes('✅') ? '#10b981' : '#f59e0b' }}>
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>🌐 Suivez-nous</h3>
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
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                title="Facebook"
              >
                📘
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
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                title="Instagram"
              >
                📷
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
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                title="Twitter"
              >
                🐦
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
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                title="YouTube"
              >
                ▶️
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
          </div>
          <p style={{ margin: 0, color: '#a0aec0', fontSize: '0.9rem' }}>
            &copy; 2025 Aventures Alpines. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;