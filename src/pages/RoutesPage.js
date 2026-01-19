import React, { useEffect, useMemo, useState } from 'react';
import { routes as localRoutes } from '../data/routes';
import HikingRouteCard from '../components/HikingRouteCard';
import api from '../api/client';

const RoutesPage = () => {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('Toutes');
  const [items, setItems] = useState(localRoutes);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/routes');
        setItems(data);
      } catch (err) {
        setError("API indisponible, itinéraires locaux affichés.");
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((route) => {
      const matchesQuery = route.name.toLowerCase().includes(query.toLowerCase()) ||
        route.region.toLowerCase().includes(query.toLowerCase());
      const matchesDifficulty = difficulty === 'Toutes' || route.difficulty === difficulty;
      return matchesQuery && matchesDifficulty;
    });
  }, [query, difficulty, items]);

  const difficulties = ['Toutes', ...new Set(items.map((r) => r.difficulty))];

  return (
    <section id="routes">
      <div className="section-head">
        <div>
          <h2>Itinéraires</h2>
          <p>Recherchez un parcours par région ou niveau.</p>
        </div>
        <div className="filters">
          <input
            type="search"
            placeholder="Rechercher (nom ou région)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            {difficulties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          return (
            <section id="routes">
              <div className="section-head">
                <div>
                  <h2 className="text-title">Itinéraires</h2>
                  <p className="text-secondary">Recherchez un parcours par région ou niveau.</p>
                </div>
                <div className="filters">
                  <input
                    type="search"
                    placeholder="Rechercher (nom ou région)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    {difficulties.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              {error && <p className="hint">{error}</p>}
              <div className="adventure-grid">
                {filtered.map((route) => (
                  <HikingRouteCard key={route.id} route={route} />
                ))}
              </div>
            </section>
          );
