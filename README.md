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
- Formulaire de contact avec persistance des messages
- Design responsive avec thème sombre
- API RESTful avec backend MySQL

## Stack technique

**Frontend :**
- React 18.2 avec composants fonctionnels
- Vite 5.0 pour le build
- React Router DOM 7 pour le routing côté client
- Animations CSS3

**Backend :**
- Runtime Node.js 22+
- Framework Express 4.19
- Base de données MySQL 8.0 (PlanetScale)
- Driver mysql2 avec Promise API

**Infrastructure :**
- Vercel pour l'hébergement frontend (CDN + Edge)
- Render pour l'API backend (Free Tier)
- PlanetScale pour MySQL serverless
- GitHub Actions pour CI/CD

## Installation

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- MySQL >= 8.0 (ou compte PlanetScale)

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

Configurer les variables d'environnement :
```bash
cp server/.env.example server/.env
```

Éditer `server/.env` avec vos identifiants de base de données :
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=aventures_alpines
PORT=5000
```

Initialiser le schéma de base de données :
```bash
mysql -u root -p < server/db/schema.sql
```

Démarrer les serveurs de développement :

Terminal 1 (API) :
```bash
npm run server
```

Terminal 2 (Frontend) :
```bash
npm run dev
```

Accéder à l'application sur `http://localhost:5173`

## Déploiement

### Architecture de production

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Client     │─────▶│  Vercel CDN  │─────▶│  React SPA   │
└──────────────┘      └──────────────┘      └──────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │  Render API  │
                      └──────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │ PlanetScale  │
                      │    MySQL     │
                      └──────────────┘
```

### Déploiement frontend (Vercel)

1. Importer le dépôt sur Vercel
2. Configurer les paramètres de build (auto-détectés pour Vite)
3. Définir la variable d'environnement :
   ```
   VITE_API_URL=https://aventure-alpine.onrender.com
   ```
4. Déployer

### Déploiement backend (Render)

1. Créer un nouveau Web Service depuis le dépôt GitHub
2. Configurer le service :
   - **Build Command** : `npm install`
   - **Start Command** : `node server/index.js`
3. Définir les variables d'environnement :
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=<planetscale_host>
   DB_PORT=3306
   DB_USER=<planetscale_user>
   DB_PASSWORD=<planetscale_password>
   DB_NAME=aventures_alpines
   ```

### Configuration base de données (PlanetScale)

1. Créer une base de données sur https://planetscale.com
2. Obtenir les identifiants de connexion
3. Initialiser le schéma :
   ```bash
   mysql -h <host> -u <user> -p < server/db/schema.sql
   ```

## Référence API

**URL de base :** `https://aventure-alpine.onrender.com`

### Endpoints

| Méthode | Endpoint | Description | Corps de requête |
|---------|----------|-------------|------------------|
| GET | `/api/health` | Vérification santé API | - |
| GET | `/api/activities` | Récupérer toutes les activités | - |
| GET | `/api/articles` | Récupérer les articles du blog | - |
| GET | `/api/videos` | Récupérer la galerie vidéo | - |
| GET | `/api/routes` | Récupérer les itinéraires montagne | - |
| GET | `/api/experiences` | Récupérer les expériences utilisateurs | - |
| POST | `/api/experiences` | Créer une nouvelle expérience | `{ author, title, body }` |
| GET | `/api/contact-messages` | Récupérer les messages de contact | - |
| POST | `/api/contact-messages` | Soumettre un message de contact | `{ name, email, message }` |
| PATCH | `/api/contact-messages/:id` | Mettre à jour le statut du message | `{ status }` |

### Exemple de requête

```javascript
const response = await fetch('https://aventure-alpine.onrender.com/api/activities');
const data = await response.json();
```

## Structure du projet

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── server/
│   ├── db/
│   │   ├── pool.js
│   │   └── schema.sql
│   ├── index.js
│   └── .env.example
├── src/
│   ├── data/
│   ├── pages/
│   │   ├── Activities.jsx
│   │   ├── Articles.jsx
│   │   ├── Videos.jsx
│   │   ├── Routes.jsx
│   │   ├── Blog.jsx
│   │   └── Adventures.jsx
│   ├── App.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── package.json
├── vite.config.js
├── vercel.json
├── render.yaml
└── README.md
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer le serveur de développement Vite |
| `npm run build` | Build pour la production |
| `npm run preview` | Prévisualiser le build de production |
| `npm run server` | Démarrer le serveur API Express |
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
- [MySQL](https://www.mysql.com/)
- [PlanetScale](https://planetscale.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)
