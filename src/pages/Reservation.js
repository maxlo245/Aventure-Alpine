import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const offerData = location.state?.offer;

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateDebut: '',
    dateFin: '',
    nombreAdultes: 1,
    nombreEnfants: 0,
    typeForfait: offerData?.type || 'journee',
    messageSpecial: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Définir la date minimum à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    if (!formData.dateDebut) {
      setFormData(prev => ({ ...prev, dateDebut: today }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
    } else if (!/^[0-9\s+()-]{10,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }
    if (!formData.dateDebut) newErrors.dateDebut = 'La date de début est requise';
    if (formData.typeForfait === 'semaine' && !formData.dateFin) {
      newErrors.dateFin = 'La date de fin est requise pour un forfait semaine';
    }
    if (formData.nombreAdultes < 1) {
      newErrors.nombreAdultes = 'Au moins 1 adulte requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    let basePrice = 0;
    
    switch (formData.typeForfait) {
      case 'journee':
        basePrice = 45;
        break;
      case 'semaine':
        basePrice = 250;
        break;
      case 'saison':
        basePrice = 850;
        break;
      default:
        basePrice = 45;
    }

    let total = basePrice * parseInt(formData.nombreAdultes);
    total += basePrice * 0.6 * parseInt(formData.nombreEnfants); // -40% pour enfants

    // Appliquer la réduction si elle existe
    if (offerData?.discount) {
      total *= (1 - offerData.discount / 100);
    }

    return total.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Créer l'objet de réservation
      const reservation = {
        ...formData,
        montantTotal: calculateTotal(),
        offerDetails: offerData,
        numeroReservation: 'ALP' + Date.now().toString().slice(-8),
        dateReservation: new Date().toISOString()
      };

      // Rediriger vers la page de confirmation
      navigate('/reservation/confirmation', { state: { reservation } });
    } catch (error) {
      console.error('Erreur réservation:', error);
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-page">
      <div className="reservation-header">
        <h1>Réservation</h1>
        {offerData && (
          <div className="offer-summary">
            <h3>{offerData.title}</h3>
            <p>{offerData.description}</p>
            {offerData.discount && (
              <span className="discount-badge">-{offerData.discount}%</span>
            )}
          </div>
        )}
      </div>

      <div className="reservation-container">
        <form onSubmit={handleSubmit} className="reservation-form">
          <section className="form-section">
            <h2>Informations personnelles</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom">Nom *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={errors.nom ? 'error' : ''}
                />
                {errors.nom && <span className="error-message">{errors.nom}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="prenom">Prénom *</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={errors.prenom ? 'error' : ''}
                />
                {errors.prenom && <span className="error-message">{errors.prenom}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Téléphone *</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+33 6 12 34 56 78"
                  className={errors.telephone ? 'error' : ''}
                />
                {errors.telephone && <span className="error-message">{errors.telephone}</span>}
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Détails de la réservation</h2>
            
            <div className="form-group">
              <label htmlFor="typeForfait">Type de forfait *</label>
              <select
                id="typeForfait"
                name="typeForfait"
                value={formData.typeForfait}
                onChange={handleChange}
              >
                <option value="journee">Forfait journée - 45€</option>
                <option value="semaine">Forfait semaine - 250€</option>
                <option value="saison">Forfait saison - 850€</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateDebut">Date de début *</label>
                <input
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  value={formData.dateDebut}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.dateDebut ? 'error' : ''}
                />
                {errors.dateDebut && <span className="error-message">{errors.dateDebut}</span>}
              </div>

              {formData.typeForfait === 'semaine' && (
                <div className="form-group">
                  <label htmlFor="dateFin">Date de fin *</label>
                  <input
                    type="date"
                    id="dateFin"
                    name="dateFin"
                    value={formData.dateFin}
                    onChange={handleChange}
                    min={formData.dateDebut}
                    className={errors.dateFin ? 'error' : ''}
                  />
                  {errors.dateFin && <span className="error-message">{errors.dateFin}</span>}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombreAdultes">Nombre d'adultes *</label>
                <input
                  type="number"
                  id="nombreAdultes"
                  name="nombreAdultes"
                  value={formData.nombreAdultes}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className={errors.nombreAdultes ? 'error' : ''}
                />
                {errors.nombreAdultes && <span className="error-message">{errors.nombreAdultes}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nombreEnfants">Nombre d'enfants</label>
                <input
                  type="number"
                  id="nombreEnfants"
                  name="nombreEnfants"
                  value={formData.nombreEnfants}
                  onChange={handleChange}
                  min="0"
                  max="10"
                />
                <small>Tarif réduit -40% pour les moins de 12 ans</small>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="messageSpecial">Message spécial</label>
              <textarea
                id="messageSpecial"
                name="messageSpecial"
                value={formData.messageSpecial}
                onChange={handleChange}
                rows="4"
                placeholder="Demandes particulières, besoins spécifiques..."
              />
            </div>
          </section>

          {errors.submit && (
            <div className="alert alert-error">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <div className="total-price">
              <span>Total estimé:</span>
              <strong>{calculateTotal()}€</strong>
            </div>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Réservation en cours...' : 'Confirmer la réservation'}
            </button>
          </div>
        </form>

        <aside className="reservation-info">
          <div className="info-card">
            <h3>Informations importantes</h3>
            <ul>
              <li>✓ Confirmation immédiate par email</li>
              <li>✓ Annulation gratuite jusqu'à 48h avant</li>
              <li>✓ Forfait valable dans 3 domaines skiables</li>
              <li>✓ Assurance incluse</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Tarifs</h3>
            <ul>
              <li>Adulte: tarif plein</li>
              <li>Enfant (-12 ans): -40%</li>
              <li>Senior (+65 ans): -20%</li>
              <li>Étudiant: -15%</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Besoin d'aide ?</h3>
            <p>Notre équipe est disponible</p>
            <p><strong>+33 4 50 12 34 56</strong></p>
            <p>contact@aventures-alpines.fr</p>
            <p>Lun-Dim: 8h - 20h</p>
          </div>
        </aside>
      </div>

      <style jsx="true">{`
        .reservation-page {
          min-height: 100vh;
          padding: 2rem 1rem;
        }

        .reservation-header {
          max-width: 1200px;
          margin: 0 auto 2rem;
          text-align: center;
        }

        .reservation-header h1 {
          font-size: 2.5rem;
          color: #1a202c;
          margin-bottom: 1rem;
        }

        .offer-summary {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 0;
          display: inline-block;
          position: relative;
        }

        .offer-summary h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }

        .offer-summary p {
          margin: 0;
          opacity: 0.9;
        }

        .discount-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #f59e0b;
          color: white;
          padding: 0.5rem 1rem;
          font-weight: bold;
          border-radius: 0;
        }

        .reservation-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }

        .reservation-form {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .form-section h2 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-group input,
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 0;
          font-size: 1rem;
          transition: border-color 0.3s;
          background: #1a1f3a !important;
          color: #fff !important;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #6366f1;
        }

        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
          border-color: #ef4444;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }

        .form-group small {
          color: #64748b;
          font-size: 0.875rem;
          display: block;
          margin-top: 0.25rem;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid #e2e8f0;
        }

        .total-price {
          font-size: 1.5rem;
          color: #1a202c;
        }

        .total-price strong {
          color: #6366f1;
          font-size: 2rem;
          margin-left: 0.5rem;
        }

        .btn-submit {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 0;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .btn-submit:hover {
          transform: scale(1.05);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .alert {
          padding: 1rem;
          border-radius: 0;
          margin-bottom: 1rem;
        }

        .alert-error {
          background: #fee2e2;
          color: #991b1b;
          border: 2px solid #ef4444;
        }

        .reservation-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }

        .info-card h3 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .info-card ul {
          list-style: none;
          padding: 0;
        }

        .info-card li {
          padding: 0.5rem 0;
          color: #4a5568;
        }

        .info-card p {
          margin: 0.5rem 0;
          color: #4a5568;
        }

        .info-card strong {
          color: #6366f1;
          font-size: 1.1rem;
        }

        @media (max-width: 968px) {
          .reservation-container {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .btn-submit {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
