import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

const PMA_URL = 'http://localhost:8080';
const CHECK_INTERVAL = 5000;

export default function PhpMyAdmin() {
  const [status, setStatus] = useState('checking'); // 'checking' | 'online' | 'offline'
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const intervalRef = useRef(null);

  const checkStatus = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      await fetch(PMA_URL, { mode: 'no-cors', signal: controller.signal });
      clearTimeout(timeout);
      setStatus('online');
    } catch {
      setStatus('offline');
    }
  };

  useEffect(() => {
    checkStatus().then(() => setInitialCheckDone(true));
    intervalRef.current = setInterval(checkStatus, CHECK_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  const statusLabel = {
    checking: 'Vérification…',
    online: 'En ligne',
    offline: 'Hors ligne',
  };

  const statusColor = {
    checking: '#f59e0b',
    online: '#10b981',
    offline: '#ef4444',
  };

  // Pendant la vérification initiale, afficher un loader
  if (!initialCheckDone) {
    return (
      <div className="pma-page">
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Vérification de phpMyAdmin…
        </div>
      </div>
    );
  }

  // Si hors ligne après la vérification initiale → 404
  if (initialCheckDone && status === 'offline') {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="pma-page">
      <div className="pma-card">
        <div className="pma-header">
          <h1>phpMyAdmin</h1>
          <div className="pma-status">
            <span
              className="pma-dot"
              style={{ background: statusColor[status] }}
              title={statusLabel[status]}
            />
            <span className="pma-status-text" style={{ color: statusColor[status] }}>
              {statusLabel[status]}
            </span>
          </div>
        </div>

        <p className="pma-desc">
          Interface d'administration de la base de données MySQL du projet Aventures Alpines.
        </p>

        <div className="pma-info">
          <div className="pma-info-row">
            <span className="pma-label">URL</span>
            <span className="pma-value">{PMA_URL}</span>
          </div>
          <div className="pma-info-row">
            <span className="pma-label">Port</span>
            <span className="pma-value">8080</span>
          </div>
          <div className="pma-info-row">
            <span className="pma-label">Statut</span>
            <span className="pma-value" style={{ color: statusColor[status], fontWeight: 600 }}>
              {statusLabel[status]}
            </span>
          </div>
        </div>

        <div className="pma-actions">
          <a
            href={PMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`pma-btn pma-btn-primary${status === 'offline' ? ' pma-btn-disabled' : ''}`}
            onClick={e => { if (status === 'offline') e.preventDefault(); }}
          >
            Ouvrir phpMyAdmin
          </a>
          <button className="pma-btn pma-btn-secondary" onClick={checkStatus}>
            Rafraîchir le statut
          </button>
        </div>

        {status === 'offline' && (
          <div className="pma-alert">
            phpMyAdmin n'est pas accessible. Assurez-vous que Docker est lancé avec :
            <code>docker compose up -d</code>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .pma-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .pma-card {
          background: var(--bg-card);
          color: var(--text-primary);
          border-radius: 12px;
          padding: 2.5rem;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border);
        }

        .pma-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .pma-header h1 {
          margin: 0;
          font-size: 1.75rem;
          color: var(--text-primary);
        }

        .pma-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pma-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px currentColor;
          animation: pma-pulse 2s infinite;
        }

        @keyframes pma-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .pma-status-text {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .pma-desc {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .pma-info {
          background: var(--bg-soft);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .pma-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pma-label {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .pma-value {
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: monospace;
        }

        .pma-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .pma-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
          flex: 1;
          min-width: 160px;
        }

        .pma-btn-primary {
          background: linear-gradient(135deg, var(--accent) 0%, #0ea5e9 100%);
          color: #fff;
        }

        .pma-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .pma-btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pma-btn-disabled:hover {
          transform: none;
          box-shadow: none;
        }

        .pma-btn-secondary {
          background: var(--bg-soft);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .pma-btn-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .pma-alert {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          border: 1px solid var(--danger);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .pma-alert code {
          display: block;
          margin-top: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: var(--bg-soft);
          border-radius: 4px;
          color: var(--text-primary);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .pma-card {
            padding: 1.5rem;
          }
          .pma-header h1 {
            font-size: 1.5rem;
          }
          .pma-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
