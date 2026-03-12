import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <p>La page que vous cherchez n'existe pas ou n'est pas disponible.</p>
        <Link to="/" className="notfound-btn">Retour à l'accueil</Link>
      </div>

      <style jsx="true">{`
        .notfound-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .notfound-card {
          text-align: center;
          background: var(--bg-card);
          color: var(--text-primary);
          border-radius: 12px;
          padding: 3rem;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border);
        }

        .notfound-card h1 {
          font-size: 5rem;
          margin: 0 0 0.5rem;
          background: linear-gradient(135deg, var(--accent) 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .notfound-card p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .notfound-btn {
          padding: 0.75rem 2rem;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--accent) 0%, #0ea5e9 100%);
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .notfound-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }
      `}</style>
    </div>
  );
}
