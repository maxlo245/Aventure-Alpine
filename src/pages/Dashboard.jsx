import React, { useEffect, useState } from 'react';
import api from '../api/client';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('tous');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.get('/contact-messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(data);
      setError('');
    } catch (err) {
      setError('Impossible de charger les messages. Vérifiez que l\'API est lancée ou reconnectez-vous.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/contact-messages/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut');
      console.error('Erreur:', err);
    }
  };

  const filtered = filter === 'tous' 
    ? messages 
    : messages.filter(m => m.status === filter);

  const stats = {
    total: messages.length,
    nouveau: messages.filter(m => m.status === 'nouveau').length,
    traite: messages.filter(m => m.status === 'traité').length,
    archive: messages.filter(m => m.status === 'archivé').length,
  };

  return (
    <section id="dashboard">
      <h2>📊 Dashboard - Messages de Contact</h2>
      <p>Gérez les demandes reçues depuis le formulaire de contact.</p>

      {error && <p className="hint" style={{ color: '#ef4444' }}>{error}</p>}

      {/* Stats */}
      <div className="hero-panel" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.nouveau}</div>
          <div className="stat-label">Nouveaux</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.traite}</div>
          <div className="stat-label">Traités</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.archive}</div>
          <div className="stat-label">Archivés</div>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters" style={{ marginBottom: '24px' }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="tous">Tous ({stats.total})</option>
          <option value="nouveau">Nouveaux ({stats.nouveau})</option>
          <option value="traité">Traités ({stats.traite})</option>
          <option value="archivé">Archivés ({stats.archive})</option>
        </select>
        <button onClick={loadMessages} style={{ padding: '8px 16px' }}>🔄 Actualiser</button>
      </div>

      {/* Messages */}
      {loading ? (
        <p>Chargement des messages...</p>
      ) : filtered.length === 0 ? (
        <p>Aucun message dans cette catégorie.</p>
      ) : (
        <div className="adventure-grid">
          {filtered.map((msg) => (
            <article key={msg.id} className="card" style={{ 
              borderLeft: msg.status === 'nouveau' ? '4px solid var(--accent)' : '4px solid #4ade80' 
            }}>
              <div className="card-meta" style={{ marginBottom: '12px' }}>
                <span className="pill" style={{ 
                  background: msg.status === 'nouveau' ? 'rgba(189, 52, 254, 0.2)' : 
                              msg.status === 'traité' ? 'rgba(74, 222, 128, 0.2)' : 
                              'rgba(100, 116, 139, 0.2)',
                  color: msg.status === 'nouveau' ? 'var(--accent)' : 
                         msg.status === 'traité' ? '#4ade80' : '#94a3b8'
                }}>
                  {msg.status}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {new Date(msg.createdAt).toLocaleString('fr-FR')}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{msg.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '12px' }}>
                📧 {msg.email}
              </p>
              <p style={{ 
                background: 'rgba(15, 15, 35, 0.6)', 
                padding: '12px', 
                borderRadius: '6px',
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                {msg.message}
              </p>

              <div className="card-footer" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {msg.status !== 'traité' && (
                  <button 
                    onClick={() => updateStatus(msg.id, 'traité')}
                    style={{ fontSize: '13px', padding: '6px 12px', background: '#4ade80' }}
                  >
                    ✓ Marquer traité
                  </button>
                )}
                {msg.status !== 'archivé' && (
                  <button 
                    onClick={() => updateStatus(msg.id, 'archivé')}
                    style={{ fontSize: '13px', padding: '6px 12px', background: '#64748b' }}
                  >
                    📦 Archiver
                  </button>
                )}
                {msg.status !== 'nouveau' && (
                  <button 
                    onClick={() => updateStatus(msg.id, 'nouveau')}
                    style={{ fontSize: '13px', padding: '6px 12px', background: 'var(--accent)' }}
                  >
                    ↩ Nouveau
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
