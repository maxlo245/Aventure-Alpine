<div align="center">

# 🏔️ Aventures Alpines

### Plateforme web dédiée aux passionnés de sports de montagne

[![Live Demo](https://img.shields.io/badge/🌐_Demo-Live-success?style=for-the-badge)](https://aventure-alpine.vercel.app)
[![API Status](https://img.shields.io/badge/API-Online-brightgreen?style=for-the-badge)](https://aventure-alpine.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Démo](https://aventure-alpine.vercel.app) • [API Documentation](#-api-endpoints) • [Installation](#-installation) • [Contribution](#-contribution)

</div>

---

## 📋 À propos du projet

**Aventures Alpines** est une application web moderne développée avec React et Express, offrant une plateforme complète pour les amateurs de sports de montagne. Elle permet de découvrir des activités, consulter des guides, visionner des vidéos immersives et planifier des itinéraires en altitude.

### ✨ Caractéristiques principales

- 🎨 **Interface moderne** avec thème sombre et animations fluides
- 📱 **Design responsive** optimisé pour tous les écrans
- ⚡ **Performance élevée** grâce à Vite et React 18
- 🔒 **API sécurisée** avec validation des données
- 💾 **Persistance hybride** (localStorage + base de données)
- 🚀 **Déploiement continu** via GitHub Actions

---

## 🛠️ Stack Technique

### Frontend
- **Framework**: React 18.2 avec Hooks
- **Build Tool**: Vite 5.0 (HMR ultra-rapide)
- **Routing**: React Router DOM v7
- **Styling**: CSS3 avec animations avancées
- **HTTP Client**: Axios pour les requêtes API

### Backend
- **Runtime**: Node.js 22+
- **Framework**: Express 4.19
- **Base de données**: MySQL 8.0 (PlanetScale)
- **ORM**: mysql2 avec Promises
- **Sécurité**: CORS, dotenv pour les variables d'environnement

### DevOps & Hébergement
- **Frontend**: Vercel (CI/CD automatique)
- **Backend**: Render (Free Tier)
- **Database**: PlanetScale (Serverless MySQL)
- **Version Control**: Git + GitHub
- **Workflow**: GitHub Actions

---

## 🚀 Démarrage rapide

### Prérequis

```bash
node --version  # v18.0.0 ou supérieur
npm --version   # v9.0.0 ou supérieur
mysql --version # v8.0 ou supérieur (optionnel en local)
```

### Installation

```bash
# Cloner le repository
git clone https://github.com/maxlo245/Aventure-Alpine.git
cd Aventure-Alpine

# Installer les dépendances
npm install

# Configurer l'environnement
cp server/.env.example server/.env
# Éditer server/.env avec vos identifiants MySQL
```

### Développement local

**Terminal 1 - Backend API**
```bash
npm run server
# API accessible sur http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
npm run dev
# Interface accessible sur http://localhost:5173
```

### Build de production

```bash
npm run build
# Génère le dossier dist/ prêt pour le déploiement
```

---

## 🌐 Déploiement

### Architecture de production

```
┌─────────────────┐      HTTPS      ┌──────────────────┐
│   Utilisateur   │ ────────────────▶│  Vercel (CDN)    │
│    (Browser)    │                  │  Frontend React  │
└─────────────────┘                  └──────────────────┘
         │                                     │
         │ API Calls                           │
         ▼                                     ▼
┌─────────────────┐                  ┌──────────────────┐
│  Render.com     │◀─────────────────│  Vercel Edge     │
│  Express API    │     Serverless   │  Functions       │
└─────────────────┘                  └──────────────────┘
         │
         │ MySQL Protocol
         ▼
┌─────────────────┐
│  PlanetScale    │
│  MySQL Database │
└─────────────────┘
```

### Frontend (Vercel)

1. Importez le repo sur [Vercel](https://vercel.com)
2. Configuration automatique (Vite détecté)
3. Déploiement en 1 clic

**Variables d'environnement:**
```env
VITE_API_URL=https://aventure-alpine.onrender.com
```

### Backend (Render + PlanetScale)

**1. Base de données PlanetScale**

```bash
# Créer une base sur https://planetscale.com
# Récupérer les credentials de connexion
# Initialiser le schéma
mysql -h <HOST> -u <USER> -p < server/db/schema.sql
```

**2. Service Render**

- Runtime: Node
- Build: `npm install`
- Start: `node server/index.js`

**Variables d'environnement:**
```env
NODE_ENV=production
PORT=5000
DB_HOST=<planetscale_host>
DB_PORT=3306
DB_USER=<planetscale_user>
DB_PASSWORD=<planetscale_password>
DB_NAME=aventures_alpines
```

---

## 📡 API Endpoints

### Base URL
```
Production: https://aventure-alpine.onrender.com
Local:      http://localhost:5000
```

### Endpoints disponibles

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/api/health` | Status de l'API | - |
| `GET` | `/api/activities` | Liste des activités | - |
| `GET` | `/api/articles` | Articles du blog | - |
| `GET` | `/api/videos` | Galerie vidéos | - |
| `GET` | `/api/routes` | Itinéraires montagne | - |
| `GET` | `/api/experiences` | Expériences utilisateurs | - |
| `POST` | `/api/experiences` | Créer une expérience | `{ author, title, body }` |
| `GET` | `/api/contact-messages` | Messages de contact | - |
| `POST` | `/api/contact-messages` | Nouveau message | `{ name, email, message }` |
| `PATCH` | `/api/contact-messages/:id` | Modifier statut | `{ status }` |

### Exemple d'utilisation

```javascript
// Récupérer les activités
const response = await fetch('https://aventure-alpine.onrender.com/api/activities');
const activities = await response.json();

// Envoyer un message de contact
await fetch('https://aventure-alpine.onrender.com/api/contact-messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Jean Dupont',
    email: 'jean@example.com',
    message: 'Demande d\'information'
  })
});
```

---

## 📂 Structure du projet

```
Aventure-Alpine/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── server/
│   ├── db/
│   │   ├── pool.js             # Configuration MySQL
│   │   └── schema.sql          # Schéma de base de données
│   ├── index.js                # Serveur Express
│   └── .env.example            # Template variables d'environnement
├── src/
│   ├── data/                   # Données mock pour fallback
│   ├── pages/
│   │   ├── Activities.jsx
│   │   ├── Articles.jsx
│   │   ├── Videos.jsx
│   │   ├── Routes.jsx
│   │   ├── Blog.jsx
│   │   └── Adventures.jsx
│   ├── App.jsx                 # Composant racine + routing
│   ├── Contact.jsx             # Formulaire de contact
│   ├── Home.jsx                # Page d'accueil
│   ├── main.jsx                # Point d'entrée React
│   ├── App.css                 # Styles globaux
│   └── index.css               # Reset CSS
├── public/                     # Assets statiques
├── dist/                       # Build de production (généré)
├── .env.local                  # Variables locales (non versionné)
├── .env.production             # Variables de production
├── package.json                # Dépendances et scripts
├── vite.config.js              # Configuration Vite
├── vercel.json                 # Configuration Vercel
├── render.yaml                 # Configuration Render
└── README.md                   # Documentation
```

---

## 🧪 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Compile l'application pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run server` | Lance le serveur API Express |
| `npm run lint` | Vérifie la qualité du code avec ESLint |

---

## 🔒 Sécurité

- ✅ Variables d'environnement pour les secrets
- ✅ CORS configuré pour les domaines autorisés
- ✅ Validation des données côté serveur
- ✅ Requêtes paramétrées pour éviter les injections SQL
- ✅ HTTPS obligatoire en production

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. **Fork** le projet
2. **Créez** votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add: Amazing Feature'`)
4. **Pushez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Convention de commits

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactorisation du code
- `test:` Ajout de tests
- `chore:` Maintenance

---

## 📜 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📞 Contact & Support

- **Site web**: [aventure-alpine.vercel.app](https://aventure-alpine.vercel.app)
- **Repository**: [github.com/maxlo245/Aventure-Alpine](https://github.com/maxlo245/Aventure-Alpine)
- **API**: [aventure-alpine.onrender.com](https://aventure-alpine.onrender.com)
- **Email**: info@aventuresalpines.com

---

## 🙏 Remerciements

- [React](https://reactjs.org/) - Bibliothèque UI
- [Vite](https://vitejs.dev/) - Build tool ultra-rapide
- [Vercel](https://vercel.com/) - Hébergement frontend
- [Render](https://render.com/) - Hébergement backend
- [PlanetScale](https://planetscale.com/) - Base de données serverless
- [Unsplash](https://unsplash.com/) - Images de qualité

---

<div align="center">

**Développé avec ❤️ par Maxime Laurent**

⭐ **N'oubliez pas de mettre une étoile si ce projet vous a plu !**

</div>
