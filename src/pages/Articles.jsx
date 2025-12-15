import React, { useEffect, useMemo, useState } from 'react';
import { articles as localArticles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import api from '../api/client';

const Articles = () => {
  const [category, setCategory] = useState('Toutes');
  const [sort, setSort] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
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
    // Filtre par catégorie
    let list = category === 'Toutes'
      ? items
      : items.filter((a) => a.category === category);
    
    // Filtre par recherche (titre + description)
    if (searchTerm) {
      list = list.filter((a) => 
        a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri
    return [...list].sort((a, b) => {
      if (sort === 'recent') return new Date(b.date) - new Date(a.date);
      if (sort === 'old') return new Date(a.date) - new Date(b.date);
      if (sort === 'popular') {
        const viewsA = a.views || a.popularity || 0;
        const viewsB = b.views || b.popularity || 0;
        return viewsB - viewsA;
      }
      if (sort === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [category, sort, searchTerm, items]);

  const categories = ['Toutes', ...new Set(items.map((a) => a.category))];

  const handleReset = () => {
    setCategory('Toutes');
    setSort('recent');
    setSearchTerm('');
  };

  return (
    <section id="articles" style={{ padding: '2rem' }}>
      <div className="section-head" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚 Articles</h2>
          <p style={{ color: '#718096' }}>Fiches pratiques, retours d'expérience et méthodes terrain.</p>
        </div>
      </div>

      {/* Barre de recherche avancée */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: '1',
              minWidth: '250px',
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>📂 {c}</option>
            ))}
          </select>

          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="recent">📅 Plus récents</option>
            <option value="old">📅 Plus anciens</option>
            <option value="popular">🔥 Popularité</option>
            <option value="title">🔤 Alphabétique</option>
          </select>

          {(searchTerm || category !== 'Toutes' || sort !== 'recent') && (
            <button
              onClick={handleReset}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#dc2626'}
              onMouseOut={(e) => e.target.style.background = '#ef4444'}
            >
              ✕ Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Compteur de résultats */}
      <div style={{ marginBottom: '1.5rem', color: '#4a5568', fontSize: '0.95rem' }}>
        <strong>{filtered.length}</strong> article{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        {searchTerm && <span> pour "{searchTerm}"</span>}
      </div>

      {error && <p className="hint" style={{ color: '#f59e0b', marginBottom: '1rem' }}>⚠️ {error}</p>}
      
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: '#f7fafc',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>📭</p>
          <p style={{ fontSize: '1.25rem', color: '#4a5568', margin: 0 }}>Aucun article ne correspond à vos critères</p>
          <button
            onClick={handleReset}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="adventure-grid">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Articles;
