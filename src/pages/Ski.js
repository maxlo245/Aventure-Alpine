import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Ski() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/stations-ski`);
      setStations(res.data);
    } catch (error) {
      console.error('Erreur chargement stations:', error);
      // Données de fallback
      setStations([
        {
          id: 1,
          name: 'Les Grands Montets',
          snowconditions: 'Excellent - 180cm base',
          slopetype: 'noire',
          haslifts: true,
          location: 'Chamonix, Haute-Savoie',
          skidomain: 'Chamonix Mont-Blanc'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const disciplines = [
    {
      id: 'alpin',
      name: 'Ski Alpin',
      icon: 'Alpin',
      description: 'Descentes sur pistes aménagées et damées'
    },
    {
      id: 'fond',
      name: 'Ski de Fond',
      icon: 'Fond',
      description: 'Glisse sur terrain plat ou vallonné'
    },
    {
      id: 'rando',
      name: 'Ski de Randonnée',
      icon: 'Rando',
      description: 'Ascension et descente hors-piste'
    },
    {
      id: 'freeride',
      name: 'Hors-Piste / Freeride',
      icon: 'Freeride',
      description: 'Poudreuse et terrains vierges'
    }
  ];

  const testimonials = [
    {
      name: 'Sophie M.',
      station: 'Les Grands Montets',
      text: 'Conditions exceptionnelles ! La poudreuse était parfaite et les pistes noires offrent un vrai challenge.',
      rating: 5,
      date: '10 décembre 2025'
    },
    {
      name: 'Marc D.',
      station: 'Portes du Soleil',
      text: 'Domaine immense, idéal pour une semaine complète. Les enfants ont adoré les pistes vertes.',
      rating: 5,
      date: '5 décembre 2025'
    },
    {
      name: 'Julie L.',
      station: 'Les Carroz',
      text: 'Parfait pour débuter en famille. Ambiance conviviale et personnel très accueillant.',
      rating: 4,
      date: '2 décembre 2025'
    }
  ];

  const slopeColors = {
    verte: { label: 'Verte', color: '#10b981', difficulty: 'Facile - Débutants' },
    bleue: { label: 'Bleue', color: '#3b82f6', difficulty: 'Intermédiaire' },
    rouge: { label: 'Rouge', color: '#ef4444', difficulty: 'Difficile' },
    noire: { label: 'Noire', color: '#1f2937', difficulty: 'Très difficile - Experts' }
  };

  return (
    <div className="ski-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Ski en Montagne</h1>
          <p className="hero-subtitle">
            Glissez sur les plus beaux domaines skiables des Alpes
          </p>
        </div>
      </section>

      {/* Disciplines */}
      <section className="disciplines-section">
        <div className="container">
          <h2>Les disciplines du ski</h2>
          <p className="section-intro">
            Du ski alpin classique au freeride engagé, découvrez toutes les façons de profiter de la montagne enneigée.
          </p>
          <div className="disciplines-grid">
            {disciplines.map((discipline) => (
              <div key={discipline.id} className="discipline-card">
                <span className="discipline-icon">{discipline.icon}</span>
                <h3>{discipline.name}</h3>
                <p>{discipline.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions en temps réel */}
      <section className="conditions-section">
        <div className="container">
          <h2>Conditions d'enneigement en temps réel</h2>
          <p className="section-intro">
            Consultez l'état de la neige dans nos stations partenaires pour planifier votre sortie.
          </p>
          
          {loading ? (
            <div className="loading">Chargement des conditions...</div>
          ) : (
            <div className="stations-grid">
              {stations.map((station) => {
                const slope = slopeColors[station.slopetype] || slopeColors.bleue;
                return (
                  <div key={station.id} className="station-card">
                    <div className="station-header">
                      <h3>{station.name}</h3>
                      {station.haslifts && <span className="lift-badge">Remontées</span>}
                    </div>
                    
                    <div className="snow-status">
                      <div className="status-indicator">
                        <span className="status-dot excellent"></span>
                        <strong>{station.snowconditions || 'Conditions excellentes'}</strong>
                      </div>
                    </div>

                    <div className="station-info">
                      <div className="info-item">
                        <span className="icon">●</span>
                        <span>{station.location}</span>
                      </div>
                      {station.skidomain && (
                        <div className="info-item">
                          <span className="icon">▲</span>
                          <span>{station.skidomain}</span>
                        </div>
                      )}
                      <div className="info-item">
                        <span className="icon">▬</span>
                        <span>Pistes {slope.label} • {slope.difficulty}</span>
                      </div>
                    </div>

                    <button className="btn-details">Voir les détails</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Niveaux de pistes */}
      <section className="slopes-section">
        <div className="container">
          <h2>Comprendre les niveaux de pistes</h2>
          <div className="slopes-grid">
            {Object.entries(slopeColors).map(([key, slope]) => (
              <div key={key} className="slope-card">
                <div 
                  className="slope-color"
                  style={{ backgroundColor: slope.color }}
                ></div>
                <h3>{slope.label}</h3>
                <p>{slope.difficulty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="testimonials-section">
        <div className="container">
          <h2>Témoignages de skieurs</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div>
                    <strong>{testimonial.name}</strong>
                    <p className="station-name">{testimonial.station}</p>
                  </div>
                  <div className="rating">
                    {Array(testimonial.rating).fill('-').join('')}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-date">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offres spéciales */}
      <section className="offers-section">
        <div className="container">
          <h2>Offres spéciales</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">-20%</div>
              <h3>Forfait Famille</h3>
              <p>2 adultes + 2 enfants pour le prix de 3 adultes</p>
              <ul>
                <li>Valable 7 jours</li>
                <li>Accès illimité remontées</li>
                <li>Cours ESF inclus pour enfants</li>
              </ul>
              <button className="btn-offer">Réserver maintenant</button>
            </div>

            <div className="offer-card">
              <div className="offer-badge">Nouveau</div>
              <h3>Stage Hors-Piste</h3>
              <p>Weekend intensif avec guide UIAGM</p>
              <ul>
                <li>2 jours / 1 nuit en refuge</li>
                <li>Matériel sécurité fourni</li>
                <li>Max 6 participants</li>
              </ul>
              <button className="btn-offer">En savoir plus</button>
            </div>

            <div className="offer-card">
              <div className="offer-badge">-15%</div>
              <h3>Early Bird</h3>
              <p>Réservez avant le 20 décembre</p>
              <ul>
                <li>Forfait saison</li>
                <li>Accès 3 domaines</li>
                <li>Parking gratuit</li>
              </ul>
              <button className="btn-offer">Profiter de l'offre</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx="true">{`
        .ski-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%);
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

        .disciplines-section,
        .conditions-section,
        .slopes-section,
        .testimonials-section,
        .offers-section {
          padding: 3rem 2rem;
          background: white;
          color: #1a202c;
        }

        .disciplines-section {
          background: #f0f9ff;
          color: #1a202c;
        }

        .conditions-section {
          background: #fef3c7;
        }

        .slopes-section {
          background: #f7fafc;
        }

        .testimonials-section {
          background: #fef2f2;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .container > p,
        .intro-section p,
        .discipline-card p,
        .condition-card p,
        .slope-card p {
          color: #2d3748;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #1a202c !important;
        }

        h3 {
          color: #1a202c !important;
        }

        .intro-section h2,
        .disciplines-section h2,
        .conditions-section h2,
        .slopes-section h2,
        .testimonials-section h2,
        .offers-section h2 {
          color: #1a202c !important;
        }

        .section-intro {
          color: #4a5568;
          margin-bottom: 2rem;
        }

        .disciplines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .discipline-card {
          background: white;
          padding: 2rem;
          border-radius: 0;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .discipline-card:hover {
          transform: translateY(-4px);
        }

        .discipline-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .discipline-card h3 {
          margin: 0 0 0.5rem 0;
          color: #0c4a6e;
        }

        .stations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .station-card {
          background: white;
          border-radius: 0;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .station-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .station-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .station-header h3 {
          margin: 0;
          color: #1a202c;
        }

        .lift-badge {
          background: #e0f2fe;
          color: #0c4a6e;
          padding: 0.25rem 0.75rem;
          border-radius: 0;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .snow-status {
          background: #f0f9ff;
          padding: 1rem;
          border-radius: 0;
          margin-bottom: 1rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 0;
        }

        .status-dot.excellent {
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .station-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4a5568;
          font-size: 0.95rem;
        }

        .btn-details {
          width: 100%;
          padding: 0.75rem;
          background: #0284c7;
          color: white !important;
          border: none;
          border-radius: 0;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-details:hover {
          background: #0369a1;
        }

        .slopes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .slope-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .slope-color {
          width: 60px;
          height: 60px;
          border-radius: 0;
          margin: 0 auto 1rem;
        }

        .slope-card h3 {
          margin: 0 0 0.5rem 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .testimonial-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .station-name {
          color: #0284c7;
          margin: 0.25rem 0 0 0;
          font-size: 0.9rem;
        }

        .rating {
          font-size: 1.25rem;
        }

        .testimonial-text {
          color: #4a5568;
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .testimonial-date {
          color: #9ca3af;
          font-size: 0.85rem;
          margin: 0;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .offer-card {
          background: white;
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: relative;
        }

        .offer-badge {
          position: absolute;
          top: -10px;
          right: 20px;
          background: #f59e0b;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .offer-card h3 {
          margin: 0 0 0.5rem 0;
          color: #0c4a6e;
        }

        .offer-card > p {
          color: #718096;
          margin-bottom: 1rem;
        }

        .offer-card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }

        .offer-card li {
          padding: 0.5rem 0;
          color: #4a5568;
        }

        .btn-offer {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%);
          color: white;
          border: none;
          border-radius: 0;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-offer:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(12, 74, 110, 0.3);
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

          .stations-grid,
          .offers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
