import { useState, useEffect } from 'react';
import axios from 'axios';
import HikingRouteCard from '../components/HikingRouteCard';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix pour les icônes Leaflet avec Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Randonnee() {
  const [routes, setRoutes] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, facile, intermediaire, difficile
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger les itinéraires
      const resRoutes = await axios.get(`${API_URL}/api/routes`);
      setRoutes(resRoutes.data);
    } catch (error) {
      console.error('Erreur chargement données:', error);
      // Fallback sur données locales
      import('../data/routes').then(module => {
        setRoutes(module.routes || []);
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRoutes = routes.filter(route => {
    const matchesFilter = filter === 'all' || route.difficulty?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = route.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.region?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="randonnee-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Randonnée en Montagne</h1>
          <p className="hero-subtitle">
            Explorez les plus beaux sentiers des Alpes françaises
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro-section">
        <div className="container">
          <h2>Découvrez la randonnée alpine</h2>
          <p>
            La randonnée en montagne offre des panoramas exceptionnels et une connexion unique avec la nature.
            Que vous soyez débutant ou randonneur confirmé, nos itinéraires soigneusement sélectionnés vous
            garantissent des expériences inoubliables en toute sécurité.
          </p>
          
          <div className="info-cards">
            <div className="info-card">
              <span className="icon">▦</span>
              <h3>Itinéraires variés</h3>
              <p>Du sentier familial à la grande randonnée, trouvez le parcours adapté à votre niveau</p>
            </div>
            <div className="info-card">
              <span className="icon">•</span>
              <h3>Guides professionnels</h3>
              <p>Nos guides certifiés vous accompagnent sur les itinéraires techniques</p>
            </div>
            <div className="info-card">
              <span className="icon">○</span>
              <h3>Saisons optimales</h3>
              <p>Recommandations précises pour chaque itinéraire selon la période</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils de sécurité */}
      <section className="safety-section">
        <div className="container">
          <h2>Conseils de sécurité</h2>
          <div className="safety-grid">
            <div className="safety-item">
              <strong>Avant le départ</strong>
              <ul>
                <li>Vérifiez la météo et les conditions du sentier</li>
                <li>Informez vos proches de votre itinéraire</li>
                <li>Préparez votre sac : eau, nourriture, trousse de secours</li>
              </ul>
            </div>
            <div className="safety-item">
              <strong>Équipement essentiel</strong>
              <ul>
                <li>Chaussures de randonnée montantes</li>
                <li>Vêtements adaptés (couches multiples)</li>
                <li>Carte, boussole ou GPS</li>
                <li>Téléphone chargé</li>
              </ul>
            </div>
            <div className="safety-item">
              <strong>En montagne</strong>
              <ul>
                <li>Restez sur les sentiers balisés</li>
                <li>Adaptez votre rythme à votre condition</li>
                <li>En cas de doute, faites demi-tour</li>
                <li>Respectez la faune et la flore</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="routes-section">
        <div className="container">
          <h2>Nos itinéraires de randonnée</h2>
          
          <div className="filters-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Rechercher un itinéraire ou une région..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#1a202c',
                  outline: 'none'
                }}
              />
            </div>
            
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                Tous
              </button>
              <button 
                className={filter === 'facile' ? 'active' : ''}
                onClick={() => setFilter('facile')}
              >
                Facile
              </button>
              <button 
                className={filter === 'intermediaire' ? 'active' : ''}
                onClick={() => setFilter('intermediaire')}
              >
                Intermédiaire
              </button>
              <button 
                className={filter === 'difficile' ? 'active' : ''}
                onClick={() => setFilter('difficile')}
              >
                Difficile
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Chargement des itinéraires...</div>
          ) : (
            <>
              <p className="results-count">
                {filteredRoutes.length} itinéraire{filteredRoutes.length > 1 ? 's' : ''} trouvé{filteredRoutes.length > 1 ? 's' : ''}
              </p>
              <div className="routes-grid">
                {filteredRoutes.map((route) => (
                  <HikingRouteCard key={route.id} route={route} />
                ))}
              </div>
            </>
          )}

          {filteredRoutes.length === 0 && !loading && (
            <div className="no-results">
              <p>Aucun itinéraire ne correspond à vos critères.</p>
              <button onClick={() => { setFilter('all'); setSearchTerm(''); }}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Carte interactive */}
      <section className="map-section">
        <div className="container">
          <h2>Carte interactive des itinéraires</h2>
          <p className="section-intro">
            Explorez les itinéraires de randonnée directement sur la carte. Cliquez sur un marqueur pour voir les détails.
          </p>
          <div className="map-container">
            <MapContainer 
              center={[45.9237, 6.8694]} 
              zoom={10} 
              style={{ height: '500px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredRoutes.map((route) => {
                // Coordonnées par défaut (Chamonix) si non spécifiées
                const lat = route.latitude || 45.9237 + (Math.random() - 0.5) * 0.3;
                const lng = route.longitude || 6.8694 + (Math.random() - 0.5) * 0.3;
                
                return (
                  <Marker key={route.id} position={[lat, lng]}>
                    <Popup>
                      <div style={{ minWidth: '200px' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{route.name}</h3>
                        <p style={{ margin: '0.25rem 0', color: '#666' }}>
                          {route.region || 'Haute-Savoie'}
                        </p>
                        <p style={{ margin: '0.25rem 0', color: '#666' }}>
                          {route.duration || 'N/A'}
                        </p>
                        <p style={{ margin: '0.25rem 0', color: '#666' }}>
                          {route.distance || 'N/A'}
                        </p>
                        <p style={{ 
                          margin: '0.5rem 0 0 0', 
                          padding: '0.25rem 0.5rem',
                          background: route.difficulty === 'facile' ? '#10b981' : 
                                    route.difficulty === 'intermediaire' ? '#f59e0b' : '#ef4444',
                          color: 'white',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          textAlign: 'center'
                        }}>
                          {route.difficulty || 'Intermédiaire'}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="gallery-section">
        <div className="container">
          <h2>Galerie de randonnées</h2>
          <div className="photo-gallery">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" alt="Lac de montagne" />
              <p>Lac d'altitude dans les Écrins</p>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=800&q=80" alt="Sentier forestier" />
              <p>Sentier en forêt d'altitude</p>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" alt="Panorama montagne" />
              <p>Panorama depuis le col</p>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80" alt="Refuge montagne" />
              <p>Refuge de haute montagne</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .randonnee-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-content h1 {
          margin: 0;
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.95;
        }

        .intro-section,
        .safety-section,
        .routes-section,
        .gallery-section {
          padding: 3rem 2rem;
          background: white;
          color: #1a202c;
        }

        .map-section {
          background: white;
          color: #1a202c;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .container > p,
        .intro-section p,
        .section-intro {
          color: #2d3748;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #1a202c !important;
        }

        h3 {
          color: #1a202c !important;
        }

        .intro-section h2,
        .routes-section h2,
        .map-section h2,
        .gallery-section h2 {
          color: #1a202c !important;
        }

        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .info-card {
          background: white;
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }

        .info-card .icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .info-card h3 {
          margin: 0 0 0.5rem 0;
          color: #2d5016;
        }

        .info-card p {
          color: #4a5568;
        }

        .safety-section {
          background: #f7fafc;
        }

        .safety-section h2 {
          color: #1a202c !important;
        }

        .safety-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .safety-item {
          background: white;
          padding: 1.5rem;
          border-radius: 0;
          border-left: 4px solid #f59e0b;
        }

        .safety-item strong {
          display: block;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: #1a202c;
        }

        .safety-item ul {
          margin: 0;
          padding-left: 1.25rem;
          color: #4a5568;
        }

        .safety-item li {
          margin-bottom: 0.5rem;
        }

        .filters-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 0;
          font-size: 1rem;
          color: #1a202c;
        }

        .search-box input:focus {
          outline: none;
          border-color: #2d5016;
        }

        .filter-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-buttons button {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e2e8f0;
          background: white;
          color: #1a202c;
          border-radius: 0;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .filter-buttons button:hover {
          border-color: #2d5016;
          color: #2d5016;
        }

        .filter-buttons button.active {
          background: #2d5016;
          color: white;
          border-color: #2d5016;
        }

        .results-count {
          color: #718096;
          margin-bottom: 1.5rem;
        }

        .routes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .loading,
        .no-results {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .no-results button {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #2d5016;
          color: white !important;
          border: none;
          border-radius: 0;
          cursor: pointer;
          font-weight: 600;
        }

        .photo-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .gallery-item {
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .gallery-item:hover {
          transform: translateY(-4px);
        }

        .gallery-item img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          display: block;
        }

        .gallery-item p {
          padding: 1rem;
          margin: 0;
          background: white;
          font-weight: 600;
          color: #1a202c;
        }

        .map-section {
          padding: 3rem 2rem;
          background: #f7fafc;
        }

        .map-container {
          margin-top: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 0;
          overflow: hidden;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 0;
        }

        .leaflet-popup-content {
          margin: 0.75rem;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .filters-bar {
            flex-direction: column;
          }

          .routes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
