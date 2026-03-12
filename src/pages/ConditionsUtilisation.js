import React, { useEffect } from 'react';

export default function ConditionsUtilisation() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Conditions générales d'utilisation</h1>
        <p className="legal-updated">Dernière mise à jour : 12 mars 2026</p>

        <section className="legal-section">
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités
            d'accès et d'utilisation du site <strong>aventures-alpines.fr</strong> (ci-après « le Site »),
            édité par Aventures Alpines, société basée à Chamonix-Mont-Blanc.
          </p>
          <p>
            L'utilisation du Site implique l'acceptation pleine et entière des présentes CGU.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Accès au site</h2>
          <p>
            Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.
            L'ensemble des coûts liés à l'accès au Site (matériel, logiciel, abonnement Internet)
            restent à la charge de l'utilisateur.
          </p>
          <p>
            Aventures Alpines se réserve le droit de suspendre ou d'interrompre l'accès au Site pour des
            raisons de maintenance, de mise à jour ou pour toute autre raison, sans préavis ni indemnité.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Inscription et compte utilisateur</h2>
          <p>
            Certaines fonctionnalités du Site (réservation, tableau de bord) nécessitent la création d'un
            compte utilisateur. Lors de l'inscription, l'utilisateur s'engage à :
          </p>
          <ul>
            <li>Fournir des informations exactes et à jour</li>
            <li>Maintenir la confidentialité de ses identifiants de connexion</li>
            <li>Ne pas céder ou transférer son compte à un tiers</li>
            <li>Informer immédiatement Aventures Alpines en cas d'utilisation non autorisée</li>
          </ul>
          <p>
            Aventures Alpines se réserve le droit de supprimer tout compte ne respectant pas les
            présentes conditions.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Réservations</h2>
          <p>
            Les réservations effectuées via le Site sont soumises aux conditions suivantes :
          </p>
          <ul>
            <li>La réservation n'est définitive qu'après confirmation par email</li>
            <li>Les tarifs affichés sont indicatifs et peuvent varier selon la saison</li>
            <li><strong>Annulation gratuite</strong> jusqu'à 48 heures avant la date de début de l'activité</li>
            <li>Au-delà de ce délai, des frais d'annulation de 50% du montant total seront appliqués</li>
            <li>En cas de conditions météorologiques dangereuses, Aventures Alpines se réserve le droit d'annuler ou reporter l'activité sans frais</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du Site (textes, images, vidéos, logos, graphismes, logiciels) est
            protégé par le droit de la propriété intellectuelle et reste la propriété exclusive
            d'Aventures Alpines ou de ses partenaires.
          </p>
          <p>
            Toute reproduction, représentation, diffusion ou exploitation, totale ou partielle, du
            contenu du Site sans autorisation écrite préalable est strictement interdite et constitue
            une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Responsabilité</h2>
          <p>
            Aventures Alpines s'efforce d'assurer l'exactitude des informations diffusées sur le Site.
            Toutefois, elle ne saurait être tenue responsable :
          </p>
          <ul>
            <li>Des erreurs ou omissions dans les contenus publiés</li>
            <li>Des dommages résultant d'une utilisation inappropriée du Site</li>
            <li>Des interruptions temporaires du Site</li>
            <li>De l'utilisation faite par les utilisateurs des informations disponibles</li>
          </ul>
          <p>
            <strong>Activités de montagne :</strong> les activités proposées comportent des risques
            inhérents à la pratique sportive en milieu montagnard. Les participants doivent respecter
            les consignes de sécurité et les recommandations des guides.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Obligations de l'utilisateur</h2>
          <p>L'utilisateur s'engage à :</p>
          <ul>
            <li>Utiliser le Site de manière conforme à sa destination et aux lois en vigueur</li>
            <li>Ne pas diffuser de contenu illicite, diffamatoire, injurieux ou discriminatoire</li>
            <li>Ne pas tenter d'accéder de manière non autorisée aux systèmes informatiques du Site</li>
            <li>Ne pas collecter des données personnelles d'autres utilisateurs</li>
            <li>Respecter les droits de propriété intellectuelle</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. Liens hypertextes</h2>
          <p>
            Le Site peut contenir des liens vers des sites tiers. Aventures Alpines n'exerce aucun
            contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs
            pratiques en matière de protection des données.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Protection des données</h2>
          <p>
            Le traitement des données personnelles est régi par notre{' '}
            <a href="/confidentialite">Politique de confidentialité</a>.
            Conformément au RGPD, vous disposez de droits sur vos données personnelles
            que vous pouvez exercer en nous contactant.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Modification des CGU</h2>
          <p>
            Aventures Alpines se réserve le droit de modifier les présentes CGU à tout moment.
            Les modifications prennent effet dès leur publication sur le Site. L'utilisateur est
            invité à consulter régulièrement cette page.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Droit applicable et juridiction</h2>
          <p>
            Les présentes CGU sont régies par le droit français. En cas de litige, les parties
            s'engagent à rechercher une solution amiable. À défaut, les tribunaux compétents de
            Bonneville (Haute-Savoie) seront seuls compétents.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
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
