import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Escalade() {
  const [sites, setSites] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resSites, resVideos] = await Promise.all([
        axios.get(`${API_URL}/api/sites-escalade`),
        axios.get(`${API_URL}/api/videos`)
      ]);
      setSites(resSites.data);
      setVideos(resVideos.data.filter(v => v.sport?.toLowerCase().includes('escalade')));
    } catch (error) {
      console.error('Erreur chargement données:', error);
      // Données de fallback
      setSites([
        {
          id: 1,
          name: 'Voie du Pilier Sud',
          description: 'Grande voie mythique sur granite parfait',
          difficulty: 'experimente',
          location: 'Massif du Mont-Blanc',
          site: 'Aiguille du Midi',
          duration: '6h00'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSites = sites.filter(site => 
    difficultyFilter === 'all' || site.difficulty === difficultyFilter
  );

  const difficultyLevels = {
    facile: { label: 'Facile', color: '#10b981', description: 'Idéal pour débuter' },
    moyen: { label: 'Moyen', color: '#3b82f6', description: 'Quelques prises techniques' },
    difficile: { label: 'Difficile', color: '#f59e0b', description: 'Expérience requise' },
    experimente: { label: 'Expert', color: '#ef4444', description: 'Niveau avancé uniquement' }
  };

  return (
    <div className="escalade-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>🧗 Escalade en Montagne</h1>
          <p className="hero-subtitle">
            Des parois mythiques aux voies d'initiation, explorez l'escalade alpine
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro-section">
        <div className="container">
          <h2>L'escalade alpine</h2>
          <p>
            L'escalade en montagne combine technique, engagement et contemplation. Des dalles d'initiation
            aux grandes voies légendaires, chaque grimpeur trouve son terrain de jeu dans les Alpes.
            Découvrez nos sites soigneusement sélectionnés et progressez en toute sécurité.
          </p>
        </div>
      </section>

      {/* Conseils pour débutants */}
      <section className="beginners-section">
        <div className="container">
          <h2>🎯 Débuter l'escalade : nos conseils</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">🏋️</span>
              <h3>1. Commencez en salle</h3>
              <p>Apprenez les bases en salle d'escalade avant de partir en falaise. Travaillez la technique, les nœuds et l'assurage.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">👥</span>
              <h3>2. Ne grimpez jamais seul</h3>
              <p>L'escalade se pratique toujours à deux minimum : un grimpeur, un assureur. La communication est essentielle.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🎒</span>
              <h3>3. Équipement adapté</h3>
              <p>Baudrier, chaussons, casque, corde, dégaines : utilisez du matériel certifié et en bon état.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">📚</span>
              <h3>4. Formez-vous</h3>
              <p>Suivez un stage avec un moniteur diplômé pour apprendre les manœuvres de sécurité et progresser rapidement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Règles de sécurité */}
      <section className="safety-section">
        <div className="container">
          <h2>⚠️ Sécurité en escalade</h2>
          <div className="safety-checklist">
            <div className="safety-column">
              <h3>Avant de grimper</h3>
              <ul>
                <li>✓ Vérifier le matériel (usure, date de péremption)</li>
                <li>✓ Contrôle croisé : baudrier, nœud de 8, mousqueton</li>
                <li>✓ Établir les codes de communication</li>
                <li>✓ Vérifier la météo et l'état de la voie</li>
              </ul>
            </div>
            <div className="safety-column">
              <h3>Pendant l'escalade</h3>
              <ul>
                <li>✓ Rester concentré sur l'assurage</li>
                <li>✓ Annoncer clairement les manœuvres</li>
                <li>✓ Ne jamais lâcher la corde</li>
                <li>✓ Porter un casque (chutes de pierres)</li>
              </ul>
            </div>
            <div className="safety-column">
              <h3>En cas de problème</h3>
              <ul>
                <li>✓ Garder son calme</li>
                <li>✓ Communiquer avec son binôme</li>
                <li>✓ Connaître les manœuvres de secours</li>
                <li>✓ Avoir un téléphone chargé (112)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sites d'escalade */}
      <section className="sites-section">
        <div className="container">
          <h2>Sites d'escalade classés par niveau</h2>
          
          <div className="difficulty-filters">
            <button
              className={difficultyFilter === 'all' ? 'active' : ''}
              onClick={() => setDifficultyFilter('all')}
            >
              Tous les niveaux
            </button>
            {Object.entries(difficultyLevels).map(([key, level]) => (
              <button
                key={key}
                className={difficultyFilter === key ? 'active' : ''}
                onClick={() => setDifficultyFilter(key)}
                style={{ borderColor: level.color }}
              >
                {level.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading">Chargement des sites...</div>
          ) : (
            <div className="sites-grid">
              {filteredSites.map((site) => {
                const levelInfo = difficultyLevels[site.difficulty] || difficultyLevels.moyen;
                return (
                  <div key={site.id} className="site-card">
                    <div className="site-header">
                      <h3>{site.name}</h3>
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: levelInfo.color }}
                      >
                        {levelInfo.label}
                      </span>
                    </div>
                    <p className="site-description">{site.description}</p>
                    <div className="site-details">
                      <div className="detail">
                        <span className="icon">📍</span>
                        <span>{site.location}</span>
                      </div>
                      {site.site && (
                        <div className="detail">
                          <span className="icon">🏔️</span>
                          <span>{site.site}</span>
                        </div>
                      )}
                      {site.duration && (
                        <div className="detail">
                          <span className="icon">⏱️</span>
                          <span>{site.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Vidéos */}
      <section className="videos-section">
        <div className="container">
          <h2>🎥 Vidéos : grimpeurs expérimentés en action</h2>
          <p className="section-subtitle">
            Inspirez-vous des meilleurs et apprenez de leurs techniques
          </p>
          <div className="videos-grid">
            {videos.slice(0, 3).map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <span className="play-button">▶</span>
                </div>
                <h3>{video.title}</h3>
                <p className="video-duration">{video.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx="true">{`
        .escalade-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-content h1 {
          margin: 0 0 1rem 0;
          font-size: 3rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.95;
        }

        .intro-section,
        .beginners-section,
        .safety-section,
        .sites-section,
        .videos-section {
          padding: 3rem 2rem;
        }

        .beginners-section {
          background: #f0f9ff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #1a202c;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .tip-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .tip-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .tip-card h3 {
          margin: 0 0 0.75rem 0;
          color: #1e3a8a;
        }

        .safety-checklist {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .safety-column {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          border-top: 4px solid #ef4444;
        }

        .safety-column h3 {
          margin: 0 0 1rem 0;
          color: #1a202c;
        }

        .safety-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .safety-column li {
          padding: 0.5rem 0;
          color: #4a5568;
        }

        .difficulty-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .difficulty-filters button {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .difficulty-filters button:hover {
          transform: translateY(-2px);
        }

        .difficulty-filters button.active {
          background: #1e3a8a;
          color: white;
          border-color: #1e3a8a;
        }

        .sites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .site-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .site-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .site-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .site-header h3 {
          margin: 0;
          flex: 1;
          color: #1a202c;
        }

        .difficulty-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .site-description {
          color: #4a5568;
          margin-bottom: 1rem;
        }

        .site-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #718096;
          font-size: 0.95rem;
        }

        .section-subtitle {
          color: #718096;
          margin-bottom: 2rem;
        }

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .video-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
          cursor: pointer;
        }

        .video-card:hover {
          transform: scale(1.02);
        }

        .video-thumbnail {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #1e3a8a;
        }

        .video-card h3 {
          padding: 1rem;
          margin: 0;
          font-size: 1.1rem;
          color: #1a202c;
        }

        .video-duration {
          padding: 0 1rem 1rem;
          margin: 0;
          color: #718096;
          font-size: 0.9rem;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .sites-grid,
          .videos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
