import React, { useEffect } from 'react';

export default function PolitiqueConfidentialite() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Politique de confidentialité</h1>
        <p className="legal-updated">Dernière mise à jour : 12 mars 2026</p>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Aventures Alpines s'engage à protéger la vie privée de ses utilisateurs. Cette politique de
            confidentialité décrit les informations que nous collectons, comment nous les utilisons et les
            choix dont vous disposez concernant vos données personnelles.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Données collectées</h2>
          <p>Nous pouvons collecter les données suivantes :</p>
          <ul>
            <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
            <li><strong>Données de compte :</strong> nom d'utilisateur, mot de passe (chiffré)</li>
            <li><strong>Données de réservation :</strong> dates, nombre de participants, type de forfait</li>
            <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages consultées</li>
            <li><strong>Données de contact :</strong> messages envoyés via le formulaire de contact</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Utilisation des données</h2>
          <p>Vos données personnelles sont utilisées pour :</p>
          <ul>
            <li>Gérer votre compte utilisateur et vos réservations</li>
            <li>Vous envoyer des confirmations de réservation par email</li>
            <li>Améliorer nos services et votre expérience utilisateur</li>
            <li>Répondre à vos demandes via le formulaire de contact</li>
            <li>Assurer la sécurité de notre plateforme</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Base légale du traitement</h2>
          <p>
            Le traitement de vos données repose sur les bases légales suivantes, conformément au RGPD :
          </p>
          <ul>
            <li><strong>Exécution du contrat :</strong> traitement des réservations et gestion de compte</li>
            <li><strong>Consentement :</strong> envoi de communications marketing (si applicable)</li>
            <li><strong>Intérêt légitime :</strong> amélioration de nos services, sécurité de la plateforme</li>
            <li><strong>Obligation légale :</strong> conservation des données de facturation</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Partage des données</h2>
          <p>
            Nous ne vendons jamais vos données personnelles. Vos informations peuvent être partagées
            uniquement avec :
          </p>
          <ul>
            <li>Nos prestataires de services (hébergement, paiement) dans le cadre strict de leur mission</li>
            <li>Les autorités compétentes si la loi l'exige</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Durée de conservation</h2>
          <ul>
            <li>Données de compte : conservées tant que le compte est actif, puis supprimées sous 12 mois après clôture</li>
            <li>Données de réservation : conservées 3 ans à des fins comptables</li>
            <li>Messages de contact : conservés 2 ans</li>
            <li>Données de navigation : conservés 13 mois maximum</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des
            droits suivants :
          </p>
          <ul>
            <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit de limitation :</strong> demander la limitation du traitement</li>
          </ul>
          <p>
            Pour exercer vos droits, contactez-nous à{' '}
            <a href="mailto:contact@aventures-alpines.fr">contact@aventures-alpines.fr</a>.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Cookies</h2>
          <p>
            Notre site utilise des cookies fonctionnels pour mémoriser vos préférences (thème, session).
            Aucun cookie publicitaire ou de suivi tiers n'est utilisé.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
            vos données : chiffrement des mots de passe, connexion HTTPS, contrôle d'accès strict.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Contact</h2>
          <p>
            Pour toute question relative à cette politique, vous pouvez nous contacter :
          </p>
          <ul>
            <li>Email : <a href="mailto:contact@aventures-alpines.fr">contact@aventures-alpines.fr</a></li>
            <li>Adresse : 123 Rue de la Montagne, 74400 Chamonix-Mont-Blanc, France</li>
            <li>Téléphone : +33 4 50 12 34 56</li>
          </ul>
        </section>
      </div>

      <style jsx="true">{`
        .legal-page {
          min-height: 100vh;
          padding: 2rem 1rem;
          background: var(--bg-main);
        }

        .legal-container {
          max-width: 900px;
          margin: 0 auto;
          background: var(--bg-card);
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .legal-container h1 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .legal-updated {
          text-align: center;
          color: var(--text-muted);
          margin-bottom: 3rem;
          font-size: 0.9rem;
        }

        .legal-section {
          margin-bottom: 2.5rem;
        }

        .legal-section h2 {
          font-size: 1.4rem;
          color: var(--accent, #3b82f6);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--border-light);
        }

        .legal-section p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        .legal-section ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .legal-section li {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 0.5rem;
        }

        .legal-section a {
          color: var(--accent, #3b82f6);
          text-decoration: none;
          font-weight: 600;
        }

        .legal-section a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .legal-container {
            padding: 1.5rem;
          }

          .legal-container h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
