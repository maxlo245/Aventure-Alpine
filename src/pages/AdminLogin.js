import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Identifiants admin (à terme, à stocker dans une base de données avec hash)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'AdminAlpine2025!'
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (
        formData.username === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        // Connexion réussie
        const adminSession = {
          username: formData.username,
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('adminSession', JSON.stringify(adminSession));
        navigate('/admin/dashboard');
      } else {
        setError('Identifiant ou mot de passe incorrect');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            🔐 Admin
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Aventures Alpines - Panneau d'administration
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#333'
            }}>
              Identifiant
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoFocus
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#333'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s',
              boxSizing: 'border-box'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '6px',
          fontSize: '0.85rem',
          color: '#666'
        }}>
          <strong>📝 Identifiants par défaut :</strong><br />
          Identifiant : <code style={{ background: '#e9ecef', padding: '2px 6px', borderRadius: '3px' }}>admin</code><br />
          Mot de passe : <code style={{ background: '#e9ecef', padding: '2px 6px', borderRadius: '3px' }}>AdminAlpine2025!</code>
        </div>
      </div>
    </div>
  );
}
