import React, { useEffect, useState } from 'react';
import { sports as localSports } from '../data/sports';
import api from '../api/client';

const Activities = () => {
  const [items, setItems] = useState(localSports);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/activities');
        const mapped = data.map((a) => ({
          id: a.id,
          name: a.name,
          summary: a.summary,
          image: a.image,
          sport: a.sport,
        }));
        setItems(mapped);
      } catch (err) {
        setError("API indisponible, activités locales affichées.");
      }
    };
    load();
  }, []);

  return (
    <section id="activities">
      <h2 className="text-title">Sports de montagne</h2>
      <p className="text-secondary">Découverte, progression ou sensations : choisissez votre terrain.</p>
      {error && <p className="hint">{error}</p>}
      <div className="adventure-grid">
        {items.map((sport) => (
          <article key={sport.id} className="card bg-card">
            <div className="card-meta">
              <span className="pill">{sport.name}</span>
            </div>
            {sport.image && <img src={sport.image} alt={sport.name} className="sport-image" />}
            <h3 className="text-title">{sport.name}</h3>
            <p className="text-secondary">{sport.summary}</p>
            <a className="link" href={`/articles?category=${sport.name}`}>Voir les conseils</a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Activities;
