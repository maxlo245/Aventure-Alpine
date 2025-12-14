import React from 'react';

const HikingRouteCard = ({ route }) => {
  return (
    <article className="card">
      <div className="card-meta">
        <span className="pill">{route.region}</span>
        <span>{route.distanceKm} km</span>
        <span>{route.difficulty}</span>
      </div>
      <h3>{route.name}</h3>
      <p>Saison conseillée : {route.season}</p>
      <p>Départ : {route.start} • Arrivée : {route.end}</p>
      {route.withGuide && <div className="pill pill-accent">Guide recommandé</div>}
    </article>
  );
};

export default HikingRouteCard;
