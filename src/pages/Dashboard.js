import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [prestations, setPrestations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    loadData(token);
  }, [navigate]);

  const loadData = async (token) => {
    try {
      // Charger les réservations
      const resReservations = await axios.get(`${API_URL}/api/reservations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(resReservations.data);

      // Charger les prestations disponibles
      const resPrestations = await axios.get(`${API_URL}/api/prestations`);
      setPrestations(resPrestations.data);
    } catch (err) {
      console.error('Erreur chargement données:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Token invalide ou expiré
        handleLogout();
      } else if (err.response?.status === 503) {
        // Base de données non configurée - mode dégradé
        setError('Mode sans base de données - Les réservations ne sont pas disponibles');
        setReservations([]);
        setPrestations([]);
      } else {
        setError('Erreur lors du chargement des données');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Tableau de bord</h1>
            <p className="welcome-text">
              Bienvenue, <strong>{user?.prenom || user?.nom_utilisateur}</strong> !
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user?.role === 'admin' && (
              <Link 
                to="/admin/dashboard" 
                className="btn btn-primary"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: '600'
                }}
              >
                Dashboard Admin
              </Link>
            )}
            <button onClick={handleLogout} className="btn btn-secondary">
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Profil utilisateur */}
        <section className="dashboard-section">
          <h2>Mon profil</h2>
          <div className="profile-card">
            <div className="profile-item">
              <span className="label">Nom d'utilisateur :</span>
              <span className="value">{user?.nom_utilisateur}</span>
            </div>
            <div className="profile-item">
              <span className="label">Email :</span>
              <span className="value">{user?.email}</span>
            </div>
            {user?.nom && (
              <div className="profile-item">
                <span className="label">Nom complet :</span>
                <span className="value">{user.prenom} {user.nom}</span>
              </div>
            )}
            <div className="profile-item">
              <span className="label">Membre depuis :</span>
              <span className="value">
                {new Date(user?.date_inscription).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </section>

        {/* Mes réservations */}
        <section className="dashboard-section">
          <h2>Mes réservations ({reservations.length})</h2>
          {reservations.length === 0 ? (
            <div className="empty-state">
              <p>Aucune réservation pour le moment</p>
              <Link to="/activities" className="btn btn-primary">
                Découvrir les activités
              </Link>
            </div>
          ) : (
            <div className="reservations-grid">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="reservation-card">
                  <div className="reservation-header">
                    <h3>{reservation.prestationname}</h3>
                    <span className={`status-badge status-${reservation.status}`}>
                      {reservation.status === 'en_attente' ? 'En attente' :
                       reservation.status === 'confirmee' ? 'Confirmée' : 'Annulée'}
                    </span>
                  </div>
                  <div className="reservation-details">
                    <div className="detail-item">
                      <span className="icon"></span>
                      <span>
                        Du {new Date(reservation.startdate).toLocaleDateString('fr-FR')} 
                        {' au '}
                        {new Date(reservation.enddate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="icon"></span>
                      <span>{reservation.numpeople} personne(s)</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon"></span>
                      <span>{reservation.totalprice} €</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon"></span>
                      <span>{reservation.activitytype}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Prestations disponibles */}
        <section className="dashboard-section">
          <h2>Prestations disponibles</h2>
          <div className="prestations-grid">
            {prestations.slice(0, 6).map((prestation) => (
              <div key={prestation.id} className="prestation-card">
                <h3>{prestation.name}</h3>
                <p className="description">{prestation.description}</p>
                <div className="prestation-footer">
                  <span className="type">{prestation.activitytype}</span>
                  <span className="price">{prestation.baseprice}€</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Liens rapides */}
        <section className="dashboard-section">
          <h2>Accès rapide</h2>
          <div className="quick-links">
            <Link to="/activities" className="quick-link-card">
              <span className="icon">▲</span>
              <span className="text">Activités</span>
            </Link>
            <Link to="/routes" className="quick-link-card">
              <span className="icon">◆</span>
              <span className="text">Randonnées</span>
            </Link>
            <Link to="/articles" className="quick-link-card">
              <span className="icon">■</span>
              <span className="text">Articles</span>
            </Link>
            <Link to="/videos" className="quick-link-card">
              <span className="icon">▶</span>
              <span className="text">Vidéos</span>
            </Link>
          </div>
        </section>
      </div>

      <style jsx="true">{`
        .dashboard-container {
          min-height: 100vh;
          background: #f7fafc;
          color: #1a202c;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 2rem;
        }

        .welcome-text {
          margin: 0.5rem 0 0 0;
          opacity: 0.95;
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-section {
          background: white;
          color: #1a202c;
          border-radius: 0;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .dashboard-section h2 {
          margin: 0 0 1.5rem 0;
          color: #1a202c;
          font-size: 1.5rem;
        }

        .profile-card {
          display: grid;
          gap: 1rem;
        }

        .profile-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 0;
        }

        .label {
          font-weight: 600;
          color: #4a5568;
        }

        .value {
          color: #1a202c;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .empty-state p {
          margin-bottom: 1.5rem;
        }

        .reservations-grid,
        .prestations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .reservation-card,
        .prestation-card {
          border: 2px solid #e2e8f0;
          border-radius: 0;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .reservation-card:hover,
        .prestation-card:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .reservation-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .reservation-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #1a202c;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 0;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .status-en_attente {
          background: #fef3c7;
          color: #92400e;
        }

        .status-confirmee {
          background: #d1fae5;
          color: #065f46;
        }

        .status-annulee {
          background: #fee2e2;
          color: #991b1b;
        }

        .reservation-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4a5568;
        }

        .icon {
          font-size: 1.25rem;
        }

        .price {
          font-weight: 700;
          color: #667eea;
          font-size: 1.1rem;
        }

        .prestation-card h3 {
          margin: 0 0 0.5rem 0;
          color: #1a202c;
          font-size: 1.1rem;
        }

        .description {
          color: #718096;
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
        }

        .prestation-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .type {
          background: #edf2f7;
          padding: 0.25rem 0.75rem;
          border-radius: 0;
          font-size: 0.85rem;
          color: #4a5568;
        }

        .quick-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .quick-link-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem;
          background: #f7fafc;
          border-radius: 0;
          text-decoration: none;
          color: #1a202c;
          transition: all 0.2s;
        }

        .quick-link-card:hover {
          background: #667eea;
          color: white;
          transform: translateY(-4px);
        }

        .quick-link-card .icon {
          font-size: 2rem;
        }

        .quick-link-card .text {
          font-weight: 600;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.9);
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: #718096;
          font-size: 1.25rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 0;
          margin-bottom: 1.5rem;
        }

        .alert-error {
          background-color: #fee;
          color: #c53030;
          border: 1px solid #fc8181;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .dashboard-section {
            padding: 1.5rem;
          }

          .reservations-grid,
          .prestations-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
