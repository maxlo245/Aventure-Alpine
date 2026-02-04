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

import Footer from './components/Footer';
import Contact from './Contact.js';


export default function App() {
  const [recaptchaValidated, setRecaptchaValidated] = useState(false);

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
              <button className="header-btn theme-btn" aria-label="Changer le thème">🌙</button>
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
            </Routes>
          </Suspense>
        </main>
        {/* Footer retiré */}
      </div>
    </ErrorBoundary>
  );
}