import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminSession, setAdminSession] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    reservations: 0,
    articles: 0,
    videos: 0
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin/login');
      return;
    }
    setAdminSession(JSON.parse(session));
    loadStats();
  }, [navigate]);

  const loadStats = () => {
    // Simuler le chargement des statistiques
    // À terme, remplacer par des appels API réels
    setStats({
      users: 42,
      reservations: 127,
      articles: 15,
      videos: 8
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  if (!adminSession) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#1a202c' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
              Aventures Alpines - Administration
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Connecté en tant que <strong>{adminSession.username}</strong>
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.color = 'white';
            }}
          >
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: '0 2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '2rem'
        }}>
          {['overview', 'users', 'content', 'reservations', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid #667eea' : '3px solid transparent',
                color: activeTab === tab ? '#667eea' : '#666',
                fontWeight: activeTab === tab ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textTransform: 'capitalize'
              }}
            >
              {tab === 'overview' ? 'Vue d\'ensemble' :
               tab === 'users' ? 'Utilisateurs' :
               tab === 'content' ? 'Contenu' :
               tab === 'reservations' ? 'Réservations' :
               'Paramètres'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { title: 'Utilisateurs', value: stats.users, icon: 'U', color: '#667eea' },
                { title: 'Réservations', value: stats.reservations, icon: 'R', color: '#f093fb' },
                { title: 'Articles', value: stats.articles, icon: 'A', color: '#4facfe' },
                { title: 'Vidéos', value: stats.videos, icon: 'V', color: '#43e97b' }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                    <div style={{
                      fontSize: '0.8rem',
                      color: stat.color,
                      background: `${stat.color}20`,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontWeight: '600'
                    }}>
                      +12%
                    </div>
                  </div>
                  <h3 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    margin: '0 0 0.5rem 0',
                    color: stat.color
                  }}>
                    {stat.value}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: '#666',
                    fontSize: '0.9rem'
                  }}>
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{
                margin: '0 0 1.5rem 0',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#333'
              }}>
                Activité récente
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { action: 'Nouvelle réservation', user: 'Jean Dupont', time: 'Il y a 5 min', color: '#667eea' },
                  { action: 'Nouvel utilisateur inscrit', user: 'Marie Martin', time: 'Il y a 15 min', color: '#43e97b' },
                  { action: 'Article publié', user: 'Admin', time: 'Il y a 1h', color: '#4facfe' },
                  { action: 'Commentaire ajouté', user: 'Pierre Dubois', time: 'Il y a 2h', color: '#f093fb' }
                ].map((activity, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${activity.color}`
                  }}>
                    <div>
                      <strong style={{ color: '#333' }}>{activity.action}</strong>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                        par {activity.user}
                      </p>
                    </div>
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Gestion des utilisateurs</h2>
            <p style={{ color: '#666' }}>
              Liste des utilisateurs inscrits, gestion des rôles et permissions...
            </p>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
              Note : Fonctionnalité à développer : intégration avec la base de données
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Gestion du contenu</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                textAlign: 'left'
              }}>
                + Ajouter un article
              </button>
              <button style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                textAlign: 'left'
              }}>
                + Ajouter une vidéo
              </button>
              <button style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                textAlign: 'left'
              }}>
                + Ajouter un itinéraire
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Gestion des réservations</h2>
            <p style={{ color: '#666' }}>
              Vue d'ensemble des réservations, confirmations, annulations...
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Paramètres</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Sécurité</h3>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  Changer le mot de passe
                </button>
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Configuration du site</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Gérer les paramètres généraux, notifications, intégrations...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
