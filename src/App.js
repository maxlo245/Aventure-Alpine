import React, { useState, Suspense, Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // Log possible error
    console.error("Erreur capturée par ErrorBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", color: "red", background: "#fffbe6" }}>
          <h2>Une erreur est survenue dans l'application.</h2>
          <pre>{this.state.error && this.state.error.toString()}</pre>
          <p>Merci de recharger la page ou de contacter l'administrateur.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
import { Routes, Route, Link } from 'react-router-dom';
import RecaptchaGate from './RecaptchaGate';
import Home from './Home.js';
import Activities from './pages/Activities.js';
import Randonnee from './pages/Randonnee.js';
import Escalade from './pages/Escalade.js';
import Ski from './pages/Ski.js';
import Articles from './pages/Articles.js';
import Videos from './pages/Videos.js';
import RoutesPage from './pages/RoutesPage.js';
import Blog from './pages/Blog.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import PhpMyAdmin from './pages/PhpMyAdmin.js';
import NotFound from './pages/NotFound.js';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite.js';
import APropos from './pages/APropos.js';
import ConditionsUtilisation from './pages/ConditionsUtilisation.js';
import InscriptionActivite from './pages/InscriptionActivite.js';

import Footer from './components/Footer';
import Contact from './Contact.js';


export default function App() {
  const [recaptchaValidated, setRecaptchaValidated] = useState(false);
  const [pmaStatus, setPmaStatus] = useState('offline');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Vérifier le statut phpMyAdmin
  React.useEffect(() => {
    const checkPma = async () => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3000);
        await fetch('http://localhost:8080', { mode: 'no-cors', signal: ctrl.signal });
        clearTimeout(t);
        setPmaStatus('online');
      } catch { setPmaStatus('offline'); }
    };
    checkPma();
    const id = setInterval(checkPma, 10000);
    return () => clearInterval(id);
  }, []);

  // Appliquer le thème au body
  React.useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (!recaptchaValidated) {
    return <RecaptchaGate onSuccess={() => setRecaptchaValidated(true)} />;
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header compact-header">
          <div className="header-row">
            <h1 className="header-title">Aventures Alpines</h1>
            <div className="header-actions">
              <Link to="/register" className="header-btn">Inscription</Link>
              <Link to="/login" className="header-btn">Connexion</Link>
              <button className="header-btn theme-btn" aria-label="Changer le thème" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          <nav>
            <ul className="header-nav">
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
              <li><Link to="/inscription-activite" style={{color:'#a5b4fc',fontWeight:700}}>S'inscrire</Link></li>
              <li><Link to="/phpmyadmin"><span style={{display:'inline-block',width:8,height:8,borderRadius:'50%',background:pmaStatus==='online'?'#10b981':'#ef4444',marginRight:5,boxShadow:`0 0 6px ${pmaStatus==='online'?'#10b981':'#ef4444'}`}} />phpMyAdmin</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Suspense fallback={<div>Chargement...</div>}>
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/phpmyadmin" element={<PhpMyAdmin />} />
              <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/conditions" element={<ConditionsUtilisation />} />
              <Route path="/inscription-activite" element={<InscriptionActivite />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {/* Footer retiré */}
      </div>
    </ErrorBoundary>
  );
}