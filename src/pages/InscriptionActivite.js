import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ACTIVITES = [
  {
    slug: 'randonnee',
    nom: 'Randonnée',
    emoji: '🥾',
    prix: 45,
    description: 'Sentiers balisés, balades familiales ou treks multi-jours',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=60',
    niveaux: ['Débutant', 'Intermédiaire', 'Confirmé'],
  },
  {
    slug: 'escalade',
    nom: 'Escalade',
    emoji: '🧗',
    prix: 65,
    description: 'Sites écoles et grandes voies, du 4a au 7b+',
    image: 'https://images.unsplash.com/photo-1509644851169-2acc09a45ca0?auto=format&fit=crop&w=600&q=60',
    niveaux: ['Débutant (4a-5b)', 'Intermédiaire (5c-6b)', 'Confirmé (6c+)'],
  },
  {
    slug: 'ski',
    nom: 'Ski',
    emoji: '⛷️',
    prix: 85,
    description: 'Ski alpin, freeride et ski de randonnée',
    image: 'https://images.unsplash.com/photo-1456120573098-9d5db83386f0?auto=format&fit=crop&w=600&q=60',
    niveaux: ['Débutant (vert/bleu)', 'Intermédiaire (rouge)', 'Confirmé (noir/hors-piste)'],
  },
  {
    slug: 'alpinisme',
    nom: 'Alpinisme',
    emoji: '🏔️',
    prix: 120,
    description: 'Courses d\'altitude et sommets mythiques avec guides UIAGM',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=60',
    niveaux: ['F (Facile)', 'PD (Peu Difficile)', 'AD/D (Difficile)'],
  },
  {
    slug: 'via-ferrata',
    nom: 'Via Ferrata',
    emoji: '⛰️',
    prix: 55,
    description: 'Parcours aériens équipés entre randonnée et escalade',
    image: 'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=600&q=60',
    niveaux: ['Facile', 'Intermédiaire', 'Difficile'],
  },
  {
    slug: 'trail',
    nom: 'Trail Running',
    emoji: '🏃',
    prix: 40,
    description: 'Courses en montagne, de la sortie matinale aux ultras',
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=600&q=60',
    niveaux: ['Court (<15 km)', 'Moyen (15-40 km)', 'Long/Ultra (40 km+)'],
  },
];

const NIVEAU_MULTIPLICATEUR = {
  0: 1.0,   // Débutant / premier niveau
  1: 1.2,   // Intermédiaire
  2: 1.5,   // Confirmé
};

export default function InscriptionActivite() {
  const [etape, setEtape] = useState(1); // 1: choix activité, 2: formulaire, 3: succès
  const [activiteChoisie, setActiviteChoisie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numeroInscription, setNumeroInscription] = useState('');

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    date_debut: '',
    date_fin: '',
    nombre_personnes: 1,
    niveau_index: 0,
    commentaire: '',
  });

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const handleChoixActivite = (activite) => {
    setActiviteChoisie(activite);
    setForm(prev => ({ ...prev, niveau_index: 0 }));
    setEtape(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const calculerPrix = () => {
    if (!activiteChoisie) return 0;
    const mult = NIVEAU_MULTIPLICATEUR[form.niveau_index] ?? 1;
    const jours = form.date_fin && form.date_debut
      ? Math.max(1, Math.ceil((new Date(form.date_fin) - new Date(form.date_debut)) / 86400000) + 1)
      : 1;
    return (activiteChoisie.prix * mult * parseInt(form.nombre_personnes || 1) * jours).toFixed(2);
  };

  const valider = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'Nom requis';
    if (!form.prenom.trim()) e.prenom = 'Prénom requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Email invalide';
    if (!form.telephone.trim() || !/^[0-9\s+().–-]{8,}$/.test(form.telephone))
      e.telephone = 'Téléphone invalide';
    if (!form.date_debut) e.date_debut = 'Date de début requise';
    if (form.date_fin && form.date_fin < form.date_debut)
      e.date_fin = 'La date de fin doit être après le début';
    if (parseInt(form.nombre_personnes) < 1 || parseInt(form.nombre_personnes) > 20)
      e.nombre_personnes = 'Entre 1 et 20 personnes';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valider()) return;

    setLoading(true);
    try {
      const payload = {
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        email: form.email.trim(),
        telephone: form.telephone.trim(),
        activite: activiteChoisie.nom,
        date_debut: form.date_debut,
        date_fin: form.date_fin || null,
        nombre_personnes: parseInt(form.nombre_personnes),
        niveau: activiteChoisie.niveaux[form.niveau_index],
        commentaire: form.commentaire.trim() || null,
        prix_total: parseFloat(calculerPrix()),
      };

      const res = await fetch('/api/inscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur serveur');

      setNumeroInscription(data.numero);
      setEtape(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inscription-page">

      {/* ── ÉTAPE 1 : Choix de l'activité ── */}
      {etape === 1 && (
        <div className="inscription-choix">
          <div className="choix-header">
            <h1>Inscription à une activité</h1>
            <p>Choisissez votre aventure et complétez le formulaire d&apos;inscription</p>
          </div>

          <div className="activites-grid">
            {ACTIVITES.map(act => (
              <button
                key={act.slug}
                className="activite-card"
                onClick={() => handleChoixActivite(act)}
              >
                <img src={act.image} alt={act.nom} />
                <div className="activite-card-body">
                  <div className="activite-card-title">
                    <span className="activite-emoji">{act.emoji}</span>
                    <h2>{act.nom}</h2>
                  </div>
                  <p>{act.description}</p>
                  <div className="activite-prix">
                    À partir de <strong>{act.prix}€</strong> / pers / jour
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── ÉTAPE 2 : Formulaire ── */}
      {etape === 2 && activiteChoisie && (
        <div className="inscription-form-wrap">
          <div className="form-header">
            <button className="btn-retour" onClick={() => setEtape(1)}>
              ← Changer d&apos;activité
            </button>
            <div className="activite-choisie-badge">
              <span>{activiteChoisie.emoji}</span>
              <strong>{activiteChoisie.nom}</strong>
            </div>
          </div>

          <div className="inscription-layout">
            <form onSubmit={handleSubmit} className="inscription-form" noValidate>

              {/* Infos personnelles */}
              <section className="form-section">
                <h2>Vos informations</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nom">Nom *</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      className={errors.nom ? 'error' : ''}
                      autoComplete="family-name"
                    />
                    {errors.nom && <span className="error-msg">{errors.nom}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom *</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      className={errors.prenom ? 'error' : ''}
                      autoComplete="given-name"
                    />
                    {errors.prenom && <span className="error-msg">{errors.prenom}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      autoComplete="email"
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">Téléphone *</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className={errors.telephone ? 'error' : ''}
                      autoComplete="tel"
                    />
                    {errors.telephone && <span className="error-msg">{errors.telephone}</span>}
                  </div>
                </div>
              </section>

              {/* Détails activité */}
              <section className="form-section">
                <h2>Détails de la sortie</h2>

                <div className="form-group">
                  <label>Niveau *</label>
                  <div className="niveau-choices">
                    {activiteChoisie.niveaux.map((niv, i) => (
                      <label key={i} className={`niveau-choice ${parseInt(form.niveau_index) === i ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="niveau_index"
                          value={i}
                          checked={parseInt(form.niveau_index) === i}
                          onChange={handleChange}
                        />
                        {niv}
                        {i > 0 && <span className="maj-badge">+{i === 1 ? '20' : '50'}%</span>}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date_debut">Date de début *</label>
                    <input
                      type="date"
                      id="date_debut"
                      name="date_debut"
                      value={form.date_debut}
                      onChange={handleChange}
                      min={today}
                      className={errors.date_debut ? 'error' : ''}
                    />
                    {errors.date_debut && <span className="error-msg">{errors.date_debut}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="date_fin">Date de fin <span className="optional">(optionnel)</span></label>
                    <input
                      type="date"
                      id="date_fin"
                      name="date_fin"
                      value={form.date_fin}
                      onChange={handleChange}
                      min={form.date_debut || today}
                      className={errors.date_fin ? 'error' : ''}
                    />
                    {errors.date_fin && <span className="error-msg">{errors.date_fin}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="nombre_personnes">Nombre de participants *</label>
                  <div className="number-input-wrap">
                    <button
                      type="button"
                      className="nb-btn"
                      onClick={() => setForm(p => ({ ...p, nombre_personnes: Math.max(1, p.nombre_personnes - 1) }))}
                    >−</button>
                    <input
                      type="number"
                      id="nombre_personnes"
                      name="nombre_personnes"
                      value={form.nombre_personnes}
                      onChange={handleChange}
                      min="1"
                      max="20"
                      className={errors.nombre_personnes ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="nb-btn"
                      onClick={() => setForm(p => ({ ...p, nombre_personnes: Math.min(20, p.nombre_personnes + 1) }))}
                    >+</button>
                  </div>
                  {errors.nombre_personnes && <span className="error-msg">{errors.nombre_personnes}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="commentaire">Commentaire / Demandes spéciales <span className="optional">(optionnel)</span></label>
                  <textarea
                    id="commentaire"
                    name="commentaire"
                    value={form.commentaire}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Précisez vos besoins, contraintes médicales, équipement déjà disponible…"
                  />
                </div>
              </section>

              {errors.submit && (
                <div className="alert alert-error">{errors.submit}</div>
              )}

              <div className="form-actions">
                <div className="prix-total">
                  <span>Estimation totale</span>
                  <strong>{calculerPrix()} €</strong>
                  <small>
                    {activiteChoisie.prix}€ × ×{NIVEAU_MULTIPLICATEUR[form.niveau_index]} (niveau)
                    × {form.nombre_personnes} pers
                    {form.date_fin && form.date_debut ? ` × ${Math.max(1, Math.ceil((new Date(form.date_fin) - new Date(form.date_debut)) / 86400000) + 1)} j` : ''}
                  </small>
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Envoi en cours…' : "Valider l'inscription"}
                </button>
              </div>
            </form>

            {/* Sidebar */}
            <aside className="inscription-aside">
              <div className="aside-card">
                <h3>{activiteChoisie.emoji} {activiteChoisie.nom}</h3>
                <p>{activiteChoisie.description}</p>
                <hr />
                <ul>
                  <li>✓ Confirmation par email sous 24h</li>
                  <li>✓ Annulation gratuite 48h avant</li>
                  <li>✓ Guide certifié inclus</li>
                  <li>✓ Assurance montagne incluse</li>
                </ul>
              </div>
              <div className="aside-card">
                <h3>Besoin d&apos;aide ?</h3>
                <p><strong>+33 4 50 12 34 56</strong></p>
                <p>contact@aventures-alpines.fr</p>
                <p>Lun – Dim : 8h – 20h</p>
                <Link to="/contact" className="btn-contact">Nous contacter</Link>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ── ÉTAPE 3 : Succès ── */}
      {etape === 3 && (
        <div className="inscription-succes">
          <div className="succes-card">
            <div className="succes-icon">✅</div>
            <h1>Inscription enregistrée !</h1>
            <p>
              Votre inscription à <strong>{activiteChoisie?.nom}</strong> a bien été reçue.<br />
              Un email de confirmation vous sera envoyé sous 24h.
            </p>
            {numeroInscription && (
              <div className="numero-resa">
                Numéro d&apos;inscription : <strong>{numeroInscription}</strong>
              </div>
            )}
            <div className="succes-actions">
              <button
                className="btn-nouveau"
                onClick={() => { setEtape(1); setActiviteChoisie(null); setForm({ nom: '', prenom: '', email: '', telephone: '', date_debut: '', date_fin: '', nombre_personnes: 1, niveau_index: 0, commentaire: '' }); }}
              >
                Nouvelle inscription
              </button>
              <Link to="/activities" className="btn-activites">Voir toutes les activités</Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .inscription-page {
          min-height: 100vh;
          padding: 2rem 1rem;
          background: var(--bg-main);
        }

        /* ── Étape 1 ── */
        .choix-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .choix-header h1 {
          font-size: 2.2rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .choix-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        .activites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .activite-card {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 0;
          cursor: pointer;
          text-align: left;
          padding: 0;
          overflow: hidden;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .activite-card:hover {
          transform: translateY(-4px);
          border-color: #6366f1;
          box-shadow: 0 8px 24px rgba(99,102,241,0.2);
        }
        .activite-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .activite-card-body {
          padding: 1.25rem;
        }
        .activite-card-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .activite-emoji { font-size: 1.5rem; }
        .activite-card-title h2 {
          font-size: 1.3rem;
          color: var(--text-primary);
          margin: 0;
        }
        .activite-card-body p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0 0 1rem;
          line-height: 1.5;
        }
        .activite-prix {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .activite-prix strong {
          color: #6366f1;
          font-size: 1.1rem;
        }

        /* ── Étape 2 ── */
        .form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-retour {
          background: none;
          border: 2px solid var(--border);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.95rem;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-retour:hover { border-color: #6366f1; color: #6366f1; }
        .activite-choisie-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          padding: 0.5rem 1.25rem;
          font-size: 1rem;
        }
        .activite-choisie-badge span { font-size: 1.3rem; }

        .inscription-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }

        .inscription-form {
          background: var(--bg-card);
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid var(--border);
        }
        .form-section:last-of-type { border-bottom: none; }
        .form-section h2 {
          font-size: 1.3rem;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
          font-size: 0.95rem;
        }
        .optional {
          font-weight: 400;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border: 2px solid var(--border);
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 1rem;
          transition: border-color 0.2s;
          border-radius: 0;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #6366f1;
        }
        .form-group input.error,
        .form-group textarea.error { border-color: #ef4444; }
        .error-msg {
          color: #ef4444;
          font-size: 0.82rem;
          margin-top: 0.2rem;
          display: block;
        }

        /* Niveau radio */
        .niveau-choices {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }
        .niveau-choice {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border: 2px solid var(--border);
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: border-color 0.2s, background 0.2s;
          user-select: none;
        }
        .niveau-choice.active {
          border-color: #6366f1;
          background: rgba(99,102,241,0.08);
          color: var(--text-primary);
          font-weight: 600;
        }
        .niveau-choice input { display: none; }
        .maj-badge {
          background: #f59e0b;
          color: white;
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 99px;
          font-weight: 700;
        }

        /* Compteur personnes */
        .number-input-wrap {
          display: flex;
          align-items: stretch;
          gap: 0;
          width: fit-content;
        }
        .nb-btn {
          width: 2.5rem;
          height: 2.5rem;
          border: 2px solid var(--border);
          background: var(--bg-soft);
          color: var(--text-primary);
          font-size: 1.2rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          padding: 0;
        }
        .nb-btn:hover { background: #6366f1; color: white; border-color: #6366f1; }
        .number-input-wrap input {
          width: 4rem;
          text-align: center;
          border-left: none;
          border-right: none;
          height: 2.5rem;
          padding: 0;
          box-sizing: border-box;
        }

        /* Form actions */
        .form-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 2px solid var(--border);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .prix-total {
          display: flex;
          flex-direction: column;
        }
        .prix-total span {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .prix-total strong {
          font-size: 2rem;
          color: #6366f1;
          line-height: 1.2;
        }
        .prix-total small {
          color: var(--text-muted);
          font-size: 0.78rem;
        }
        .btn-submit {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          padding: 0.9rem 2rem;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-submit:hover { opacity: 0.9; transform: scale(1.02); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .alert-error {
          background: #fee2e2;
          color: #991b1b;
          border: 2px solid #ef4444;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        /* Aside */
        .inscription-aside {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .aside-card {
          background: var(--bg-card);
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .aside-card h3 {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin: 0 0 0.75rem;
        }
        .aside-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0.3rem 0;
        }
        .aside-card hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0.75rem 0;
        }
        .aside-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .aside-card li {
          color: var(--text-secondary);
          font-size: 0.88rem;
          padding: 0.3rem 0;
        }
        .btn-contact {
          display: block;
          margin-top: 0.75rem;
          text-align: center;
          background: var(--bg-soft);
          color: var(--text-primary);
          padding: 0.6rem;
          text-decoration: none;
          border: 2px solid var(--border);
          font-size: 0.9rem;
          transition: border-color 0.2s;
        }
        .btn-contact:hover { border-color: #6366f1; color: #6366f1; }

        /* Étape 3 */
        .inscription-succes {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 70vh;
        }
        .succes-card {
          background: var(--bg-card);
          padding: 3rem 2rem;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        }
        .succes-icon { font-size: 3.5rem; margin-bottom: 1rem; }
        .succes-card h1 {
          font-size: 1.8rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .succes-card p {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .numero-resa {
          background: var(--bg-soft);
          border: 2px solid var(--border);
          padding: 0.75rem 1rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .numero-resa strong { color: #6366f1; font-size: 1.1rem; }
        .succes-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-nouveau {
          background: none;
          border: 2px solid #6366f1;
          color: #6366f1;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: background 0.2s, color 0.2s;
        }
        .btn-nouveau:hover { background: #6366f1; color: white; }
        .btn-activites {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          padding: 0.7rem 1.5rem;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .inscription-layout { grid-template-columns: 1fr; }
          .inscription-aside { order: -1; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
          .form-actions { flex-direction: column; align-items: stretch; }
          .btn-submit { width: 100%; text-align: center; }
          .choix-header h1 { font-size: 1.6rem; }
        }
      `}</style>
    </div>
  );
}
