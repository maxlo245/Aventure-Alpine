import { useLocation, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ReservationConfirmation() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Si pas de données de réservation, rediriger vers la page de réservation
  if (!reservation) {
    return <Navigate to="/reservation" replace />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getForfaitLabel = (type) => {
    const labels = {
      journee: 'Forfait journée',
      semaine: 'Forfait semaine',
      saison: 'Forfait saison'
    };
    return labels[type] || type;
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2"/>
            <path d="M8 12l3 3 5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1>Réservation confirmée !</h1>
        <p className="confirmation-subtitle">
          Merci {reservation.prenom} {reservation.nom} pour votre réservation.
          Un email de confirmation a été envoyé à <strong>{reservation.email}</strong>
        </p>

        <div className="reservation-number">
          <span>Numéro de réservation</span>
          <strong>{reservation.numeroReservation}</strong>
        </div>

        <div className="confirmation-details">
          <h2>Détails de votre réservation</h2>
          
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Type de forfait</span>
              <span className="detail-value">{getForfaitLabel(reservation.typeForfait)}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Date de début</span>
              <span className="detail-value">{formatDate(reservation.dateDebut)}</span>
            </div>

            {reservation.dateFin && (
              <div className="detail-item">
                <span className="detail-label">Date de fin</span>
                <span className="detail-value">{formatDate(reservation.dateFin)}</span>
              </div>
            )}

            <div className="detail-item">
              <span className="detail-label">Participants</span>
              <span className="detail-value">
                {reservation.nombreAdultes} adulte{reservation.nombreAdultes > 1 ? 's' : ''}
                {reservation.nombreEnfants > 0 && ` + ${reservation.nombreEnfants} enfant${reservation.nombreEnfants > 1 ? 's' : ''}`}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Téléphone</span>
              <span className="detail-value">{reservation.telephone}</span>
            </div>

            <div className="detail-item highlight">
              <span className="detail-label">Montant total</span>
              <span className="detail-value">{reservation.montantTotal}€</span>
            </div>
          </div>

          {reservation.messageSpecial && (
            <div className="special-message">
              <strong>Votre message :</strong>
              <p>{reservation.messageSpecial}</p>
            </div>
          )}
        </div>

        <div className="next-steps">
          <h2>Prochaines étapes</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Vérifiez votre email</h3>
              <p>Vous allez recevoir un email de confirmation avec tous les détails de votre réservation et votre e-billet.</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Préparez votre matériel</h3>
              <p>Assurez-vous d'avoir tout l'équipement nécessaire. Location possible sur place.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Présentez-vous aux caisses</h3>
              <p>Montrez votre e-billet aux caisses pour retirer vos forfaits physiques.</p>
            </div>
          </div>
        </div>

        <div className="info-boxes">
          <div className="info-box">
            <h3>Email de confirmation</h3>
            <p>Un email récapitulatif vous a été envoyé. Vérifiez vos spams si vous ne le recevez pas.</p>
          </div>

          <div className="info-box">
            <h3>Location de matériel</h3>
            <p>Besoin de louer du matériel ? Réservez en ligne pour bénéficier de -10%.</p>
          </div>

          <div className="info-box">
            <h3>Conditions météo</h3>
            <p>Consultez les conditions d'enneigement avant votre venue sur notre site.</p>
          </div>

          <div className="info-box">
            <h3>Besoin d'aide ?</h3>
            <p>Notre équipe est disponible au +33 4 50 12 34 56</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => window.print()} className="btn-secondary">
            Imprimer la confirmation
          </button>
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>

      <style jsx="true">{`
        .confirmation-page {
          min-height: 100vh;
          padding: 2rem 1rem;
          background: var(--bg-main);
        }

        .confirmation-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .success-icon {
          text-align: center;
          margin-bottom: 2rem;
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .confirmation-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .confirmation-subtitle strong {
          color: var(--text-primary);
        }

        .reservation-number {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 0;
          text-align: center;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .reservation-number span {
          display: block;
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .reservation-number strong {
          font-size: 1.8rem;
          color: #6366f1;
          letter-spacing: 2px;
        }

        .confirmation-details {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 0;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .confirmation-details h2 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item.highlight {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          padding: 1rem;
          border-radius: 0;
        }

        .detail-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .detail-item.highlight .detail-label {
          color: white;
          opacity: 0.9;
        }

        .detail-value {
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
        }

        .detail-item.highlight .detail-value {
          color: white;
          font-size: 1.5rem;
        }

        .special-message {
          background: var(--bg-soft);
          padding: 1rem;
          border-radius: 0;
          border-left: 4px solid #6366f1;
        }

        .special-message strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.5rem;
        }

        .special-message p {
          color: var(--text-secondary);
          margin: 0;
        }

        .next-steps {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 0;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .next-steps h2 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .step-card {
          text-align: center;
          padding: 1.5rem;
          background: var(--bg-soft);
          border-radius: 0;
        }

        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        .step-card h3 {
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .step-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .info-boxes {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .info-box {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .info-box h3 {
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .info-box p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-primary,
        .btn-secondary {
          padding: 1rem 2rem;
          border: none;
          border-radius: 0;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
        }

        .btn-secondary {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 2px solid #e2e8f0;
        }

        .btn-primary:hover,
        .btn-secondary:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }

          .info-boxes {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            text-align: center;
          }
        }

        @media print {
          .action-buttons {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
