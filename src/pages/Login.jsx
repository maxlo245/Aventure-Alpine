import React, { useState } from 'react';
import api from '../api/client';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/login', { username, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      onLoginSuccess();
    } catch (err) {
      setError('Identifiants invalides');
      console.error('Erreur login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 style={{ marginTop: 0 }}>🔐 Accès Administrateur</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Connectez-vous pour accéder au dashboard</p>

        {error && <p className="hint" style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Identifiant</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre identifiant"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '16px' }}>
          💡 Identifiants par défaut: admin / password123
        </p>
      </div>
    </section>
  );
};

export default Login;
