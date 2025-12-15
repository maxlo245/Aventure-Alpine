import React from 'react';

const HikingRouteCard = ({ route }) => {
  return (
    <article className="card">
      <div className="card-meta">
        <span className="pill">{route.region || 'Alpes'}</span>
        <span>{route.distanceKm || route.distance || 'N/A'} km</span>
        <span className={`difficulty-badge ${(route.difficulty || '').toLowerCase()}`}>
          {route.difficulty || 'Intermédiaire'}
        </span>
      </div>
      <h3>{route.name}</h3>
      <p>Saison conseillée : {route.season || 'Toute l\'année'}</p>
      <p>Départ : {route.start || 'Non spécifié'} • Arrivée : {route.end || 'Non spécifié'}</p>
      {route.withGuide && <div className="pill pill-accent">Guide recommandé</div>}
    </article>
  );
};

export default HikingRouteCard;
