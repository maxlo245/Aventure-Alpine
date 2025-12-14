import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Adventures from './Adventures';
import Contact from './Contact';
import Activities from './pages/Activities';
import Articles from './pages/Articles';
import Videos from './pages/Videos';
import RoutesPage from './pages/RoutesPage';
import Blog from './pages/Blog';
import './App.css';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL || '/Aventure-Alpine/'}>
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