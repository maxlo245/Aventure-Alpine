import React, { useEffect, useMemo, useState } from 'react';
import { videos as localVideos } from '../data/videos';
import VideoCard from '../components/VideoCard';
import api from '../api/client';

const Videos = () => {
  const [sport, setSport] = useState('Tous');
  const [sort, setSort] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(localVideos);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/videos');
        setItems(data);
      } catch (err) {
        setError("API indisponible, vidéos locales affichées.");
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    // Filtre par sport
    let list = sport === 'Tous'
      ? items
      : items.filter((v) => v.sport === sport);
    
    // Filtre par recherche
    if (searchTerm) {
      list = list.filter((v) => 
        v.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri
    return [...list].sort((a, b) => {
      if (sort === 'recent') {
        const dateA = new Date(a.date || a.uploadDate || 0);
        const dateB = new Date(b.date || b.uploadDate || 0);
        return dateB - dateA;
      }
      if (sort === 'old') {
        const dateA = new Date(a.date || a.uploadDate || 0);
        const dateB = new Date(b.date || b.uploadDate || 0);
        return dateA - dateB;
      }
      if (sort === 'popular') {
        const viewsA = a.views || a.popularity || 0;
        const viewsB = b.views || b.popularity || 0;
        return viewsB - viewsA;
      }
      if (sort === 'duration') {
        const durationA = parseInt(a.duration) || 0;
        const durationB = parseInt(b.duration) || 0;
        return durationA - durationB;
      }
      if (sort === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [sport, sort, searchTerm, items]);

  const sports = ['Tous', ...new Set(items.map((v) => v.sport))];

  const handleReset = () => {
    setSport('Tous');
    setSort('recent');
    setSearchTerm('');
  };

  return (
    <section id="videos" style={{ padding: '2rem', background: 'white', borderRadius: '12px', minHeight: '100vh' }}>
      <div className="section-head" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1a202c' }}>🎥 Vidéos</h2>
          <p style={{ color: '#4a5568' }}>Des images immersives pour préparer ou rêver la prochaine sortie.</p>
        </div>
      </div>

      {/* Barre de filtres avancés */}
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
            placeholder="🔍 Rechercher une vidéo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: '1',
              minWidth: '250px',
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#1a202c',
              outline: 'none',
              transition: 'border 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          
          <select 
            value={sport} 
            onChange={(e) => setSport(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            {sports.map((s) => (
              <option key={s} value={s}>🏔️ {s}</option>
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
            <option value="recent">📅 Plus récentes</option>
            <option value="old">📅 Plus anciennes</option>
            <option value="popular">🔥 Popularité</option>
            <option value="duration">⏱️ Durée (courte → longue)</option>
            <option value="title">🔤 Alphabétique</option>
          </select>

          {(searchTerm || sport !== 'Tous' || sort !== 'recent') && (
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
        <strong>{filtered.length}</strong> vidéo{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
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
          <p style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>🎬</p>
          <p style={{ fontSize: '1.25rem', color: '#4a5568', margin: 0 }}>Aucune vidéo ne correspond à vos critères</p>
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
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Videos;
