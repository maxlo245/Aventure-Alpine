import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function APropos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const equipe = [
    { nom: 'Lucas Montagnard', role: 'Fondateur & Guide', description: 'Passionné de montagne depuis 20 ans, guide certifié UIAGM.' },
    { nom: 'Sophie Dufresne', role: 'Responsable Activités', description: 'Monitrice de ski et d\'escalade, elle organise toutes nos sorties.' },
    { nom: 'Marc Bellevue', role: 'Responsable Logistique', description: 'Gère les réservations et veille au bon déroulement de chaque aventure.' },
    { nom: 'Julie Alpin', role: 'Chargée de Communication', description: 'Partage nos aventures à travers articles, vidéos et réseaux sociaux.' }
  ];

  const valeurs = [
    { titre: 'Sécurité', icon: '🛡️', description: 'La sécurité de nos clients est notre priorité absolue. Tous nos guides sont certifiés et notre matériel est contrôlé régulièrement.' },
    { titre: 'Passion', icon: '🏔️', description: 'Nous vivons pour la montagne. Chaque sortie est une occasion de partager notre passion et de créer des souvenirs inoubliables.' },
    { titre: 'Respect', icon: '🌿', description: 'Nous pratiquons un tourisme responsable, respectueux de l\'environnement montagnard et des communautés locales.' },
    { titre: 'Accessibilité', icon: '🤝', description: 'Nous proposons des activités pour tous les niveaux, du débutant à l\'expert, afin que chacun puisse vivre l\'aventure.' }
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <h1>À propos d'Aventures Alpines</h1>
        <p>Votre partenaire pour les aventures en montagne depuis 2015</p>
      </section>

      {/* Notre histoire */}
      <section className="about-section">
        <div className="about-container">
          <h2>Notre histoire</h2>
          <div className="story-content">
            <p>
              Fondée en 2015 au cœur de Chamonix-Mont-Blanc, <strong>Aventures Alpines</strong> est née de la
              passion d'un groupe d'amoureux de la montagne. Ce qui a commencé comme un petit collectif de
              guides partageant leur amour des sommets est devenu une référence dans l'organisation
              d'activités de montagne dans les Alpes françaises.
            </p>
            <p>
              Depuis nos débuts, nous avons accompagné plus de <strong>5 000 aventuriers</strong> sur les
              sentiers, les parois et les pistes des plus beaux massifs alpins. Notre mission reste la
              même : rendre la montagne accessible à tous, dans le respect de la nature et en toute sécurité.
            </p>
            <p>
              Basés à Chamonix, nous opérons dans les principaux massifs des Alpes du Nord : Mont-Blanc,
              Aiguilles Rouges, Aravis, Beaufortain et le domaine des Portes du Soleil.
            </p>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="about-section values-section">
        <div className="about-container">
          <h2>Nos valeurs</h2>
          <div className="values-grid">
            {valeurs.map((valeur, idx) => (
              <div key={idx} className="value-card">
                <span className="value-icon">{valeur.icon}</span>
                <h3>{valeur.titre}</h3>
                <p>{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="about-section">
        <div className="about-container">
          <h2>Notre équipe</h2>
          <p className="section-intro">
            Une équipe de passionnés, diplômés et expérimentés, à votre service pour des aventures mémorables.
          </p>
          <div className="team-grid">
            {equipe.map((membre, idx) => (
              <div key={idx} className="team-card">
                <div className="team-avatar">{membre.nom.charAt(0)}</div>
                <h3>{membre.nom}</h3>
                <span className="team-role">{membre.role}</span>
                <p>{membre.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="about-section stats-section">
        <div className="about-container">
          <h2>Nos chiffres clés</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">10+</span>
              <span className="stat-label">Années d'expérience</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">5 000+</span>
              <span className="stat-label">Aventuriers accompagnés</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">50+</span>
              <span className="stat-label">Itinéraires proposés</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">4.8/5</span>
              <span className="stat-label">Note moyenne clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-section cta-section">
        <div className="about-container" style={{ textAlign: 'center' }}>
          <h2>Prêt pour l'aventure ?</h2>
          <p>Rejoignez-nous et découvrez les Alpes comme jamais auparavant.</p>
          <div className="cta-buttons">
            <Link to="/activities" className="cta-btn primary">Découvrir nos activités</Link>
            <Link to="/contact" className="cta-btn secondary">Nous contacter</Link>
          </div>
        </div>
      </section>

      <style jsx="true">{`
        .about-page {
          min-height: 100vh;
        }

        .about-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .about-hero h1 {
          font-size: 2.8rem;
          margin: 0 0 1rem 0;
        }

        .about-hero p {
          font-size: 1.25rem;
          opacity: 0.9;
        }

        .about-section {
          padding: 3rem 2rem;
          background: var(--bg-card);
        }

        .about-section:nth-child(odd) {
          background: var(--bg-soft);
        }

        .about-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .about-section h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .section-intro {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.05rem;
        }

        .story-content p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1rem;
          font-size: 1.05rem;
        }

        .story-content strong {
          color: var(--text-primary);
        }

        /* Valeurs */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
        }

        .value-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.2s;
        }

        .value-card:hover {
          transform: translateY(-4px);
        }

        .value-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .value-card h3 {
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
        }

        .value-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
        }

        /* Équipe */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .team-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .team-avatar {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
          color: white;
          font-size: 2rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .team-card h3 {
          color: var(--text-primary);
          margin: 0 0 0.25rem 0;
        }

        .team-role {
          color: var(--accent, #3b82f6);
          font-weight: 600;
          font-size: 0.9rem;
          display: block;
          margin-bottom: 0.75rem;
        }

        .team-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }

        /* Chiffres */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          background: var(--bg-card);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent, #3b82f6);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        /* CTA */
        .cta-section p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
          color: white;
        }

        .cta-btn.secondary {
          background: var(--bg-soft);
          color: var(--text-primary);
          border: 2px solid var(--border);
        }

        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
