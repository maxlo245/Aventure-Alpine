import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Adventures from './Adventures';
import Contact from './Contact';
import Activities from './pages/Activities';
import Articles from './pages/Articles';
import Videos from './pages/Videos';
import RoutesPage from './pages/RoutesPage';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUsername(localStorage.getItem('username') || '');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aventures Alpines</h1>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/activities">Activités</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/videos">Vidéos</Link></li>
            <li><Link to="/routes">Itinéraires</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/dashboard">📊 Dashboard</Link></li>
                <li>
                  <button 
                    onClick={handleLogout}
                    style={{
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'var(--accent)';
                      e.target.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.color = 'var(--text-primary)';
                    }}
                  >
                    🚪 Logout ({username})
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login">🔐 Admin</Link></li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2025 Aventures Alpines. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;