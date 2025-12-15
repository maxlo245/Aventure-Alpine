import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <h2>Bienvenue dans les Alpes</h2>
        <p>Itinéraires, conseils, vidéos et retours d'expérience pour préparer vos sorties en altitude.</p>
        <div className="cta-row">
          <Link className="btn" to="/activities">Découvrir les activités</Link>
          <Link className="btn ghost" to="/routes">Voir les itinéraires</Link>
        </div>
      </div>
      <div className="hero-panel">
        <div className="stat-card">
          <div className="stat-value">40+</div>
          <div className="stat-label">spots recensés</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">sports majeurs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Communauté</div>
          <div className="stat-label">Partage d'expériences terrain</div>
        </div>
      </div>
    </section>
  );
}

export default Home;