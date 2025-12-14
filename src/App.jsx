import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Adventures from './Adventures';
import Contact from './Contact';
import Activities from './pages/Activities';
import Articles from './pages/Articles';
import Videos from './pages/Videos';
import RoutesPage from './pages/RoutesPage';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
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
              <li><Link to="/dashboard">📊 Dashboard</Link></li>
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
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 Aventures Alpines. Tous droits réservés.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;