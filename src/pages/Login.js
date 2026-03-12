import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { validateEmailFamilies, validatePassword } from '../utils/validators';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: null, mot_de_passe: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');

    // Validation regex en temps réel
    if (name === 'email') {
      setFieldErrors(prev => ({ ...prev, email: value ? validateEmailFamilies(value) : null }));
    }
    if (name === 'mot_de_passe') {
      setFieldErrors(prev => ({ ...prev, mot_de_passe: value ? validatePassword(value) : null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Blocage si email invalide
    const emailErr = validateEmailFamilies(formData.email);
    if (emailErr) {
      setError(`Email invalide [${emailErr.code}] : ${emailErr.message}`);
      return;
    }
    // Blocage si mot de passe invalide
    const pwdErr = validatePassword(formData.mot_de_passe);
    if (pwdErr) {
      setError(`Mot de passe invalide [${pwdErr.code}] : ${pwdErr.message}`);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);
      
      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Rediriger vers le dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur connexion:', err);
      setError(err.response?.data?.error || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Connexion</h1>
        <p className="auth-subtitle">Accédez à votre compte Aventures Alpines</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              disabled={loading}
              style={fieldErrors.email ? { borderColor: '#f87171' } : formData.email ? { borderColor: '#34d399' } : {}}
            />
            {formData.email && (
              <span className="field-validation" style={{ color: fieldErrors.email ? '#f87171' : '#34d399', fontSize: '0.82rem', marginTop: 4 }}>
                {fieldErrors.email ? `[${fieldErrors.email.code}] ${fieldErrors.email.message}` : '✓ Email valide'}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mot_de_passe">Mot de passe</label>
            <input
              type="password"
              id="mot_de_passe"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              required
              placeholder="Votre mot de passe"
              minLength={6}
              disabled={loading}
              style={fieldErrors.mot_de_passe ? { borderColor: '#f87171' } : formData.mot_de_passe ? { borderColor: '#34d399' } : {}}
            />
            {formData.mot_de_passe && (
              <span className="field-validation" style={{ color: fieldErrors.mot_de_passe ? '#f87171' : '#34d399', fontSize: '0.82rem', marginTop: 4 }}>
                {fieldErrors.mot_de_passe ? `[${fieldErrors.mot_de_passe.code}] ${fieldErrors.mot_de_passe.message}` : '✓ Mot de passe valide'}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Pas encore de compte ?{' '}
            <Link to="/register">Créer un compte</Link>
          </p>
          <p>
            <Link to="/">← Retour à l'accueil</Link>
          </p>
        </div>
      </div>

      <style jsx="true">{`
        .auth-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--bg-main);
        }

        .auth-card {
          background: var(--bg-card);
          color: var(--text-primary);
          border-radius: 12px;
          padding: 3rem;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border);
        }

        .auth-card h1 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          color: var(--text-primary);
          text-align: center;
        }

        .auth-subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .alert-error {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          border: 1px solid var(--danger);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .form-group input {
          padding: 0.75rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 1rem;
          background: var(--bg-soft);
          color: var(--text-primary);
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        .form-group input:disabled {
          background-color: var(--bg-soft);
          color: var(--text-muted);
          cursor: not-allowed;
        }

        .btn {
          padding: 0.875rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent) 0%, #0ea5e9 100%);
          color: #fff;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-block {
          width: 100%;
        }

        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .auth-footer p {
          margin: 0.75rem 0;
        }

        .auth-footer a {
          color: var(--accent-light);
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .auth-card {
            padding: 2rem;
          }

          .auth-card h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
