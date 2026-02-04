import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-title">Aventure Alpine</div>
        <nav className="footer-links">
          <Link to="/">Accueil</Link>
          <Link to="/activities">Activités</Link>
          <Link to="/randonnee">Randonnée</Link>
          <Link to="/escalade">Escalade</Link>
          <Link to="/ski">Ski</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/videos">Vidéos</Link>
          <Link to="/routes">Itinéraires</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Aventure Alpine. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
