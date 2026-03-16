import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Bouton "Réserver cette activité" affiché dans les pages d'activité.
 * - Connecté  → lien vers /inscription-activite?activite=<slug>
 * - Non connecté → lien vers /login
 */
export default function ReservationCTA({ activite, label }) {
  const isLoggedIn = !!localStorage.getItem('token');
  const btnLabel = label || 'Réserver cette activité';

  if (isLoggedIn) {
    return (
      <Link
        to={`/inscription-activite${activite ? `?activite=${activite}` : ''}`}
        className="reservation-cta-btn"
        style={{
          display: 'inline-block',
          marginTop: '1.2rem',
          padding: '0.75rem 2rem',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '1rem',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(16,185,129,0.35)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(16,185,129,0.35)'; }}
      >
        📅 {btnLabel}
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      state={{ from: `/inscription-activite${activite ? `?activite=${activite}` : ''}` }}
      className="reservation-cta-btn"
      style={{
        display: 'inline-block',
        marginTop: '1.2rem',
        padding: '0.75rem 2rem',
        background: 'rgba(255,255,255,0.15)',
        color: '#fff',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '1rem',
        textDecoration: 'none',
        border: '2px solid rgba(255,255,255,0.6)',
        backdropFilter: 'blur(4px)',
        transition: 'background 0.15s',
      }}
    >
      🔒 Connectez-vous pour réserver
    </Link>
  );
}
