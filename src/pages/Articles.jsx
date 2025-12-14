import React, { useEffect, useMemo, useState } from 'react';
import { articles as localArticles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import api from '../api/client';

const Articles = () => {
  const [category, setCategory] = useState('Toutes');
  const [sort, setSort] = useState('recent');
  const [items, setItems] = useState(localArticles);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/articles');
        setItems(data);
      } catch (err) {
        setError("API indisponible, affichage des articles locaux.");
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const list = category === 'Toutes'
      ? items
      : items.filter((a) => a.category === category);
    return [...list].sort((a, b) => {
      if (sort === 'recent') return new Date(b.date) - new Date(a.date);
      if (sort === 'old') return new Date(a.date) - new Date(b.date);
      return 0;
    });
  }, [category, sort, items]);

  const categories = ['Toutes', ...new Set(items.map((a) => a.category))];

  return (
    <section id="articles">
      <div className="section-head">
        <div>
          <h2>Articles</h2>
          <p>Fiches pratiques, retours d'expérience et méthodes terrain.</p>
        </div>
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Plus récents</option>
            <option value="old">Plus anciens</option>
          </select>
        </div>
      </div>
      {error && <p className="hint">{error}</p>}
      <div className="adventure-grid">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default Articles;
