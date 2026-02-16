import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { validateEmailFamilies, validatePassword, validatePasswordConfirmation, validateUsername } from '../utils/validators';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom_utilisateur: '',
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    nom: '',
    prenom: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    nom_utilisateur: null,
    email: null,
    mot_de_passe: null,
    mot_de_passe_confirmation: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setError('');

    // Validation regex en temps réel
    if (name === 'email') {
      setFieldErrors(prev => ({ ...prev, email: value ? validateEmailFamilies(value) : null }));
    }
    if (name === 'mot_de_passe') {
      setFieldErrors(prev => ({
        ...prev,
        mot_de_passe: value ? validatePassword(value) : null,
        mot_de_passe_confirmation: newFormData.mot_de_passe_confirmation ? validatePasswordConfirmation(value, newFormData.mot_de_passe_confirmation) : null
      }));
    }
    if (name === 'mot_de_passe_confirmation') {
      setFieldErrors(prev => ({ ...prev, mot_de_passe_confirmation: value ? validatePasswordConfirmation(newFormData.mot_de_passe, value) : null }));
    }
    if (name === 'nom_utilisateur') {
      setFieldErrors(prev => ({ ...prev, nom_utilisateur: value ? validateUsername(value) : null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    const usernameErr = validateUsername(formData.nom_utilisateur);
    if (usernameErr) {
      setError(`Nom d'utilisateur invalide [${usernameErr.code}] : ${usernameErr.message}`);
      return;
    }

    const emailErr = validateEmailFamilies(formData.email);
    if (emailErr) {
      setError(`Email invalide [${emailErr.code}] : ${emailErr.message}`);
      return;
    }

    const pwdErr = validatePassword(formData.mot_de_passe);
    if (pwdErr) {
      setError(`Mot de passe invalide [${pwdErr.code}] : ${pwdErr.message}`);
      return;
    }

    if (formData.mot_de_passe !== formData.mot_de_passe_confirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      const { mot_de_passe_confirmation, ...dataToSend } = formData;
      const response = await axios.post(`${API_URL}/api/auth/register`, dataToSend);
      
      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Rediriger vers le dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur inscription:', err);
      setError(err.response?.data?.error || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h1>Créer un compte</h1>
        <p className="auth-subtitle">Rejoignez la communauté Aventures Alpines</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Jean"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Dupont"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nom_utilisateur">Nom d'utilisateur *</label>
            <input
              type="text"
              id="nom_utilisateur"
              name="nom_utilisateur"
              value={formData.nom_utilisateur}
              onChange={handleChange}
              required
              placeholder="jeandupont"
              disabled={loading}
              style={fieldErrors.nom_utilisateur ? { borderColor: '#f87171' } : formData.nom_utilisateur ? { borderColor: '#34d399' } : {}}
            />
            {formData.nom_utilisateur && (
              <span className="field-validation" style={{ color: fieldErrors.nom_utilisateur ? '#f87171' : '#34d399', fontSize: '0.82rem', marginTop: 4 }}>
                {fieldErrors.nom_utilisateur ? `[${fieldErrors.nom_utilisateur.code}] ${fieldErrors.nom_utilisateur.message}` : '✓ Nom d\'utilisateur valide'}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jean.dupont@email.com"
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
            <label htmlFor="mot_de_passe">Mot de passe * (min. 6 caractères)</label>
            <input
              type="password"
              id="mot_de_passe"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              required
              placeholder="••••••••"
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

          <div className="form-group">
            <label htmlFor="mot_de_passe_confirmation">Confirmer le mot de passe *</label>
            <input
              type="password"
              id="mot_de_passe_confirmation"
              name="mot_de_passe_confirmation"
              value={formData.mot_de_passe_confirmation}
              onChange={handleChange}
              required
              placeholder="••••••••"
              minLength={6}
              disabled={loading}
              style={fieldErrors.mot_de_passe_confirmation ? { borderColor: '#f87171' } : formData.mot_de_passe_confirmation ? { borderColor: '#34d399' } : {}}
            />
            {formData.mot_de_passe_confirmation && (
              <span className="field-validation" style={{ color: fieldErrors.mot_de_passe_confirmation ? '#f87171' : '#34d399', fontSize: '0.82rem', marginTop: 4 }}>
                {fieldErrors.mot_de_passe_confirmation ? `[${fieldErrors.mot_de_passe_confirmation.code}] ${fieldErrors.mot_de_passe_confirmation.message}` : '✓ Confirmation valide'}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Création du compte...' : 'Créer mon compte'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Déjà un compte ?{' '}
            <Link to="/login">Se connecter</Link>
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
          background: linear-gradient(135deg, #232946 0%, #16161a 100%);
        }

        .register-card {
          max-width: 550px;
        }

        .auth-card {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .auth-card h1 {
          color: var(--text-primary);
        }

        .auth-subtitle,
        .alert,
        .alert-error {
          color: var(--text-secondary);
        }

        .alert {
          padding: 1rem;
          border-radius: 0;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .alert-error {
          background-color: #2d3748;
          color: #f87171;
          border: 1px solid #f87171;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #e0e7ef;
          font-size: 0.95rem;
        }

        .form-group input {
          padding: 0.75rem;
          border: 2px solid #334155;
          border-radius: 0;
          font-size: 1rem;
          background: #232946;
          color: #f9fafb;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #a5b4fc;
          box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.15);
        }

        .form-group input:disabled {
          background-color: #232946;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .btn {
          padding: 0.875rem;
          border: none;
          border-radius: 0;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%);
          color: #f9fafb;
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
          color: #cbd5e1;
          font-size: 0.95rem;
        }

        .auth-footer p {
          margin: 0.75rem 0;
        }

        .auth-footer a {
          color: #38bdf8;
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

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
