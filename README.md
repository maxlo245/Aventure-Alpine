# Aventures Alpines

Plateforme web moderne dédiée aux sports de montagne, construite avec React et Express. Offre la découverte d'activités, la planification d'itinéraires, du contenu multimédia et des fonctionnalités communautaires.

[![Deploy Status](https://img.shields.io/badge/vercel-deployed-success)](https://aventure-alpine.vercel.app)
[![API Status](https://img.shields.io/badge/api-online-brightgreen)](https://aventure-alpine.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Vue d'ensemble

Cette application propose une solution complète pour découvrir des activités alpines, planifier des itinéraires en montagne et accéder à du contenu multimédia. Elle comporte un frontend SPA React avec intégration API côté serveur et stockage persistant des données.

**Fonctionnalités principales :**
- Catalogue d'activités avec filtrage avancé
- Planification d'itinéraires avec métriques de difficulté
- Galerie vidéo et contenu blog
- Formulaire de contact avec sauvegarde localStorage
- Design responsive avec thème sombre
- Architecture découplée (frontend statique + API optionnelle)

## Stack technique

**Frontend :**
- React 18.2 avec composants fonctionnels
- Vite 5.0 pour le build
- React Router DOM 7 pour le routing côté client
- Animations CSS3

**Backend :**
- Runtime Node.js 22+
- Framework Express 4.19
- Base de données PostgreSQL (Supabase - optionnel)
- Driver pg avec async/await

**Infrastructure :**
- Vercel pour l'hébergement frontend (CDN + Edge)
- Render pour l'API backend (Free Tier - optionnel)
- Supabase pour PostgreSQL serverless (optionnel)
- GitHub Actions pour CI/CD

## Installation

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 13 (optionnel - uniquement si base de données souhaitée)

### Développement local

Cloner le dépôt :
```bash
git clone https://github.com/maxlo245/Aventure-Alpine.git
cd Aventure-Alpine
```

Installer les dépendances :
```bash
npm install
```

Configurer les variables d'environnement (optionnel - uniquement pour utiliser la base de données) :
```bash
cp .env.supabase.example .env
```

Éditer `.env` avec vos identifiants Supabase (optionnel) :
```env
DB_HOST=xxxxx.supabase.co
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=postgres
DB_PORT=5432
PORT=5000
```

Initialiser le schéma de base de données (optionnel) :
```bash
npm run init-db
```

> **Note :** L'application fonctionne parfaitement **sans base de données**. Le formulaire de contact utilise localStorage par défaut.

Démarrer les serveurs de développement :

Terminal 1 (Frontend uniquement - recommandé) :
```bash
npm run dev
```

Terminal 2 (API - optionnel) :
```bash
npm run server
```

Accéder à l'application sur `http://localhost:5173`

> **L'application fonctionne sans l'API.** Le formulaire de contact sauvegarde dans localStorage.

## Déploiement

### Architecture de production

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Client     │─────▶│  Vercel CDN  │─────▶│  React SPA   │
└──────────────┘      └──────────────┘      └──────┬───────┘
                                                    │
                                                    │ localStorage
                                                    ▼
                                            ┌──────────────┐
                                            │   Messages   │
                                            │  de contact  │
                                            └──────────────┘
                              
                              (Optionnel)
                              
                      ┌──────────────┐
                      │  Render API  │
                      └──────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │  Supabase    │
                      │  PostgreSQL  │
                      └──────────────┘
```

### Déploiement frontend (Vercel)

1. Importer le dépôt sur Vercel
2. Configurer les paramètres de build (auto-détectés pour Vite)
3. (Optionnel) Définir la variable d'environnement si vous utilisez l'API :
   ```
   VITE_API_URL=https://aventure-alpine.onrender.com
   ```
4. Déployer

> **Sans API :** Le site fonctionne parfaitement sans cette variable. Les messages de contact seront sauvegardés dans localStorage du navigateur.

### Déploiement backend (Render) - Optionnel

> **Note :** Le backend est optionnel. Le frontend fonctionne de manière autonome avec localStorage.

1. Créer un nouveau Web Service depuis le dépôt GitHub
2. Configurer le service :
   - **Build Command** : `npm install`
   - **Start Command** : `node server/index.js`
3. (Optionnel) Définir les variables d'environnement pour activer la base de données :
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=<supabase_host>
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=<supabase_password>
   DB_NAME=postgres
   ```

> **Sans base de données :** L'API démarrera en mode dégradé et retournera 503 pour les endpoints nécessitant la base. Le frontend utilisera localStorage automatiquement.

### Configuration base de données (Supabase) - Optionnel

Pour activer la persistance centralisée des données :

1. Créer une base de données gratuite sur https://supabase.com
2. Obtenir les identifiants de connexion (Settings → Database)
3. Configurer le fichier `.env` localement
4. Initialiser le schéma :
   ```bash
   npm run init-db
   ```
5. Configurer les mêmes variables sur Render (voir section précédente)

**Guide complet :** Voir [SUPABASE_SETUP.md](SUPABASE_SETUP.md) pour les instructions détaillées.

> **Plan gratuit Supabase :** 500MB storage, connexions illimitées, pause après 1 semaine d'inactivité.

## Référence API

**URL de base :** `https://aventure-alpine.onrender.com`

> **Note :** L'API est optionnelle. Sans base de données configurée, elle retourne 503 pour les endpoints nécessitant la persistance.

### Endpoints

| Méthode | Endpoint | Description | Statut sans DB |
|---------|----------|-------------|----------------|
| GET | `/` | Info API et statut | ✅ Fonctionne |
| GET | `/api/health` | Vérification santé | ⚠️ Mode dégradé |
| GET | `/api/activities` | Récupérer activités | ❌ 503 |
| GET | `/api/articles` | Récupérer articles | ❌ 503 |
| GET | `/api/videos` | Récupérer vidéos | ❌ 503 |
| GET | `/api/routes` | Récupérer itinéraires | ❌ 503 |
| GET | `/api/experiences` | Récupérer expériences | ❌ 503 |
| POST | `/api/experiences` | Créer expérience | ❌ 503 |
| GET | `/api/contact-messages` | Récupérer messages | ❌ 503 |
| POST | `/api/contact-messages` | Soumettre message | ❌ 503 |

**Formulaire de contact :** Utilise **localStorage** automatiquement quand l'API n'est pas disponible.

### Exemple de requête

```javascript
// L'API retourne 503 sans base de données configurée
const response = await fetch('https://aventure-alpine.onrender.com/api/activities');
if (response.ok) {
  const data = await response.json();
  // Utiliser les données
} else {
  // Fallback : utiliser les données statiques ou localStorage
  console.log('API non disponible - mode local');
}
```

## Structure du projet

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── server/
│   ├── db/
│   │   ├── pool.js              # Connexion PostgreSQL
│   │   ├── init-supabase.js     # Script d'initialisation
│   │   └── schema.sql           # Schéma (legacy MySQL)
│   └── index.js                 # API Express
├── src/
│   ├── data/                    # Données statiques
│   ├── pages/
│   │   ├── Activities.jsx
│   │   ├── Articles.jsx
│   │   ├── Videos.jsx
│   │   ├── RoutesPage.jsx
│   │   ├── Blog.jsx
│   │   └── Adventures.jsx
│   ├── components/
│   │   ├── ArticleCard.jsx
│   │   ├── ExperienceFeed.jsx
│   │   ├── HikingRouteCard.jsx
│   │   └── VideoCard.jsx
│   ├── App.jsx
│   ├── Contact.jsx              # Formulaire avec localStorage
│   ├── Home.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── .env.supabase.example        # Template de configuration
├── package.json
├── vite.config.js
├── vercel.json
├── render.yaml
├── SUPABASE_SETUP.md            # Guide Supabase
└── README.md
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer le serveur de développement Vite |
| `npm run build` | Build pour la production |
| `npm run preview` | Prévisualiser le build de production |
| `npm run server` | Démarrer le serveur API Express (optionnel) |
| `npm run init-db` | Initialiser le schéma Supabase (optionnel) |
| `npm run lint` | Exécuter ESLint |

## Sécurité

- Variables d'environnement pour les données sensibles
- Configuration CORS pour les domaines autorisés
- Prévention des injections SQL via requêtes paramétrées
- Validation des entrées sur les endpoints API
- Application HTTPS en production

## Contribution

Les contributions sont les bienvenues. Veuillez suivre ces directives :

1. Fork le dépôt
2. Créer une branche de fonctionnalité (`git checkout -b feature/nom-fonctionnalite`)
3. Commit les changements (`git commit -m 'Add feature'`)
4. Push vers la branche (`git push origin feature/nom-fonctionnalite`)
5. Ouvrir une Pull Request

### Convention de commit

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Modifications de documentation
- `style:` Modifications de style de code (formatage, etc.)
- `refactor:` Refactorisation du code
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Liens

- **Production :** https://aventure-alpine.vercel.app
- **API :** https://aventure-alpine.onrender.com
- **Dépôt :** https://github.com/maxlo245/Aventure-Alpine

## Remerciements

Construit avec :
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

---

**Mode actuel :** Frontend autonome avec localStorage  
**Base de données :** Optionnelle (Supabase disponible)  
**Messages de contact :** Sauvegardés localement dans le navigateur
