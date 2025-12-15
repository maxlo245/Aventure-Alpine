<div align="center">

# ⛰️ Aventures Alpines

**Plateforme web moderne pour les passionnés de sports de montagne**

[![Vercel](https://img.shields.io/badge/vercel-deployed-success?style=flat&logo=vercel)](https://aventure-alpine.vercel.app)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat&logo=node.js)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](LICENSE)

[Demo](https://aventure-alpine.vercel.app) • [Guide de déploiement](SUPABASE_SETUP.md) • [Signaler un bug](../../issues)

</div>

---

## 📖 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Démarrage rapide](#-démarrage-rapide)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Déploiement](#-déploiement)
- [API](#-api)
- [Structure du projet](#-structure-du-projet)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## 🎯 À propos

**Aventures Alpines** est une application web full-stack offrant une vitrine interactive pour découvrir les sports de montagne (ski, escalade, randonnée, VTT) et permettre aux utilisateurs de contacter l'équipe via un formulaire optimisé.

L'architecture découplée garantit une **haute disponibilité** : le frontend fonctionne de manière autonome avec localStorage, tandis que le backend et la base de données restent optionnels.

### Points clés

✅ **Progressive Enhancement** - Fonctionne sans backend  
✅ **Mobile-first** - Responsive sur tous les appareils  
✅ **SEO-ready** - Métadonnées optimisées  
✅ **Production-grade** - Déployé sur Vercel + Render

---

## ✨ Fonctionnalités

## Stack technique

### 🏠 Pages principales

- **Accueil** - Hero section, présentation générale
- **Activités** - Catalogue des sports alpins (ski, escalade, randonnée, VTT)
- **Itinéraires** - Parcours détaillés avec niveaux de difficulté et cartographie
- **Articles** - Blog sur les techniques, matériel et conseils
- **Vidéos** - Galerie multimédia de documentaires et tutoriels
- **Contact** - Formulaire avec validation et persistance localStorage

### 🛡️ Architecture

```
┌─────────────────┐
│   Utilisateur   │
└────────┬────────┘
         │
    ┌────▼─────┐
    │  Vercel  │ (CDN global)
    └────┬─────┘
         │
    ┌────▼─────────────────┐
    │   React SPA          │
    │  (HashRouter)        │
    └──┬────────────────┬──┘
       │                │
┌──────▼───────┐   ┌───▼──────────────┐
│ localStorage │   │  API (optionnel) │
└──────────────┘   └───┬──────────────┘
                       │
              ┌────────▼──────────┐
              │  PostgreSQL       │
              │  (Supabase)       │
              └───────────────────┘
```

**Progressive Enhancement** : Le frontend fonctionne sans backend. Si l'API est configurée (`VITE_API_URL`), les données sont synchronisées avec PostgreSQL.

---

## 🚀 Technologies

### Frontend

| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 18.2 | Interface utilisateur avec hooks et state management |
| **Vite** | 5.0 | Build tool ultra-rapide (HMR, ESM) |
| **React Router** | 7.x | Routing côté client avec HashRouter |
| **Axios** | 1.7 | Client HTTP pour appels API |

### Backend

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Node.js** | ≥18.0 | Runtime JavaScript serveur |
| **Express** | 4.19 | API REST minimaliste |
| **pg** | 8.11 | Driver PostgreSQL natif |
| **CORS** | 2.8 | Gestion Cross-Origin Resource Sharing |
| **dotenv** | 16.4 | Variables d'environnement |

### Infrastructure

| Service | Rôle | Plan |
|---------|------|------|
| **Vercel** | Hosting frontend | Free (CDN global, auto-deploy) |
| **Render** | Hosting API | Free (cold start après inactivité) |
| **Supabase** | Database PostgreSQL | Free (500MB, optionnel) |

---

## 🏁 Démarrage rapide

### Prérequis

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Git**

### Installation en 3 étapes

```bash
# 1. Cloner le projet
git clone https://github.com/maxlo245/Aventure-Alpine.git
cd Aventure-Alpine

# 2. Installer les dépendances
npm install

# 3. Lancer le développement
npm run dev
```

✅ Ouvrez http://localhost:5173 dans votre navigateur

---

## 📦 Installation

### Mode standalone (frontend uniquement)

Le plus simple pour débuter. Aucune configuration requise.

```bash
npm run dev
```

Le formulaire de contact sauvegarde les messages dans **localStorage** (navigateur local).

### Mode full-stack (frontend + backend + base de données)

Pour activer la synchronisation avec PostgreSQL :

#### Étape 1 : Configuration de la base de données

Consultez le guide complet : **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)**

Résumé :
1. Créer un compte Supabase gratuit
2. Créer un nouveau projet
3. Récupérer les identifiants de connexion

#### Étape 2 : Variables d'environnement

Créez un fichier `.env` à la racine :

```bash
cp .env.supabase.example .env
```

Remplissez les variables :

```env
# Backend - API Server
PORT=5000

# Database - Supabase PostgreSQL
DB_HOST=xxxxx.supabase.co
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe_supabase
DB_NAME=postgres
DB_PORT=5432
```

#### Étape 3 : Initialisation du schéma

```bash
npm run init-db
```

Cette commande crée les tables nécessaires dans Supabase.

#### Étape 4 : Lancement des serveurs

**Terminal 1** (Frontend) :
```bash
npm run dev
```

**Terminal 2** (API) :
```bash
npm run server
```

---

## ⚙️ Configuration

### Variables d'environnement

#### Frontend (Vercel)

| Variable | Requis | Description | Valeur par défaut |
|----------|--------|-------------|-------------------|
| `VITE_API_URL` | Non | URL de l'API backend | - |

Remarque : en l'absence de cette variable, l'application fonctionne en mode autonome avec localStorage.

#### Backend (Render)

| Variable | Requis | Description | Exemple |
|----------|--------|-------------|---------|
| `NODE_ENV` | Oui | Environnement d'exécution | `production` |
| `PORT` | Non | Port d'écoute du serveur | `5000` |
| `DB_HOST` | Non* | Hôte PostgreSQL | `xxxxx.supabase.co` |
| `DB_USER` | Non* | Utilisateur base de données | `postgres` |
| `DB_PASSWORD` | Non* | Mot de passe base de données | - |
| `DB_NAME` | Non* | Nom de la base de données | `postgres` |
| `DB_PORT` | Non* | Port PostgreSQL | `5432` |

***Variables DB** : L'API démarre sans ces variables et opère en mode dégradé (retourne HTTP 503 pour les endpoints nécessitant la base).

## Déploiement

### Architecture de production

L'architecture de production adopte une approche progressive permettant de déployer uniquement le frontend ou l'ensemble du stack complet.

```
Client Application
       │
       ▼
   Vercel CDN (Global Edge Network)
       │
       ▼
   React SPA (Static Assets)
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
   localStorage    API REST (Optionnel)
   (Messages)           │
                        ▼
                 Render Platform
                        │
                        ▼
              PostgreSQL Database
               (Supabase - Optionnel)
```

### Déploiement du frontend

**Plateforme :** Vercel  
**Prérequis :** Compte Vercel connecté au repository GitHub

**Procédure :**

1. Connecter le repository sur la plateforme Vercel
2. Configuration de build (auto-détectée) :
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Variables d'environnement (optionnel) :
   ```
   VITE_API_URL=https://votre-api.onrender.com
   ```
4. Démarrer le déploiement

**Résultat :** Application accessible via URL Vercel avec distribution CDN globale.

### Déploiement du backend (optionnel)

**Plateforme :** Render  
**Prérequis :** Compte Render, repository GitHub  
**Tier :** Free (limitations : démarrage à froid après inactivité)

**Plateforme :** Render  
**Prérequis :** Compte Render, repository GitHub  
**Tier :** Free (limitations : démarrage à froid après inactivité)

**Procédure :**

1. Créer un nouveau Web Service depuis le repository GitHub
2. Configuration du service :
   - Type: `Web Service`
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
   - Instance Type: `Free`

3. Configuration des variables d'environnement (optionnel) :

   **Mode minimal (API sans base de données) :**
   ```
   NODE_ENV=production
   PORT=5000
   ```

   **Mode complet (avec PostgreSQL) :**
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=xxxxx.supabase.co
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=<credential_supabase>
   DB_NAME=postgres
   ```

4. Déployer le service

**Comportement :**
- Sans variables DB : L'API démarre en mode dégradé (HTTP 503 sur endpoints base de données)
- Avec variables DB : Fonctionnalité complète avec persistance PostgreSQL

### Configuration de la base de données (Supabase)

**Service :** Supabase PostgreSQL  
**Plan :** Free Tier (500MB, connexions illimitées)  
**Documentation complète :** Consulter [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

**Procédure abrégée :**

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Configurer la région et le mot de passe
3. Récupérer les credentials (Settings → Database → Connection String)
4. Initialiser le schéma :
   ```bash
   npm run init-db
   ```
5. Configurer les variables d'environnement sur Render

Remarque : la base de données peut se mettre en pause après inactivité prolongée et se réactiver automatiquement à la première requête.

**Note :** La base de données entre en pause après 7 jours d'inactivité et se réactive automatiquement à la première requête.

## Référence API

### Informations générales

**URL de base :** `https://aventure-alpine.onrender.com`  
**Format des réponses :** JSON  
**Authentification :** Aucune (API publique)  
**Rate limiting :** Aucun

### Comportement sans base de données

L'API peut fonctionner en mode dégradé sans configuration de base de données. Les endpoints nécessitant une persistance retournent HTTP 503 (Service Unavailable). Le frontend bascule automatiquement sur localStorage dans ce cas.

### Endpoints disponibles

| Méthode | Endpoint | Description | Réponse sans DB | Paramètres |
|---------|----------|-------------|-----------------|------------|
| GET | `/` | Métadonnées de l'API | 200 OK | - |
| GET | `/api/health` | État de santé du service | 200 (degraded) | - |
| GET | `/api/activities` | Liste des activités alpines | 503 | - |
| GET | `/api/articles` | Articles du blog | 503 | - |
| GET | `/api/videos` | Bibliothèque vidéo | 503 | - |
| GET | `/api/routes` | Itinéraires de montagne | 503 | - |
| GET | `/api/experiences` | Récits d'expériences | 503 | - |
| POST | `/api/experiences` | Créer une expérience | 503 | `{author, title, body}` |
| GET | `/api/contact-messages` | Messages de contact | 503 | - |
| POST | `/api/contact-messages` | Soumettre un message | 503 | `{name, email, message}` |

### Exemples d'utilisation

**Health check :**
```javascript
fetch('https://aventure-alpine.onrender.com/api/health')
  .then(response => response.json())
  .then(data => console.log(data))
  // { status: 'degraded', message: 'Base de données non configurée - Mode localStorage' }
```

**Récupération des activités avec fallback :**

**Récupération des activités avec fallback :**
```javascript
async function loadActivities() {
  try {
    const response = await fetch('https://aventure-alpine.onrender.com/api/activities');
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    
    // Fallback : utiliser les données statiques ou localStorage
    console.warn('API indisponible - Utilisation des données locales');
    return loadLocalData();
    
  } catch (error) {
    console.error('Erreur réseau:', error);
    return loadLocalData();
  }
}
```

**Soumission d'un message de contact :**
```javascript
const payload = {
  name: "John Doe",
  email: "john@example.com",
  message: "Demande d'information"
};

fetch('https://aventure-alpine.onrender.com/api/contact-messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(response => {
  if (response.status === 503) {
    // Base de données non configurée : sauvegarde locale
    localStorage.setItem('messages', JSON.stringify([payload, ...existing]));
  }
  return response.json();
})
.then(data => console.log('Message enregistré:', data))
.catch(error => console.error('Erreur:', error));
```

## Structure du projet

```
aventure-alpine/
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD GitHub Actions
│
├── server/                      # Backend Express
│   ├── db/
│   │   ├── pool.js              # Configuration pool PostgreSQL
│   │   ├── init-supabase.js     # Script d'initialisation DB
│   │   └── schema.sql           # Schéma SQL (référence legacy)
│   └── index.js                 # Point d'entrée API Express
│
├── src/                         # Frontend React
│   ├── api/
│   │   └── client.js            # Client HTTP Axios
│   ├── components/              # Composants réutilisables
│   │   ├── ArticleCard.jsx
│   │   ├── ExperienceFeed.jsx
│   │   ├── HikingRouteCard.jsx
│   │   └── VideoCard.jsx
│   ├── data/                    # Données statiques (activités, routes)
│   │   ├── activities.js
│   │   ├── articles.js
│   │   ├── routes.js
│   │   ├── sports.js
│   │   └── videos.js
│   ├── pages/                   # Composants de pages
│   │   ├── Activities.jsx
│   │   ├── Articles.jsx
│   │   ├── Blog.jsx
│   │   ├── RoutesPage.jsx
│   │   └── Videos.jsx
│   ├── App.jsx                  # Composant racine
│   ├── App.css                  # Styles globaux
│   ├── Adventures.jsx           # Page aventures
│   ├── Contact.jsx              # Formulaire de contact
│   ├── Home.jsx                 # Page d'accueil
│   ├── index.css                # Reset CSS
│   └── main.jsx                 # Point d'entrée React
│
├── .env.supabase.example        # Template configuration DB
├── .gitignore                   # Exclusions Git
├── index.html                   # Template HTML principal
├── LICENSE                      # Licence MIT
├── package.json                 # Dépendances et scripts npm
├── package-lock.json            # Lock file des dépendances
├── README.md                    # Documentation principale
├── render.yaml                  # Configuration Render
├── SUPABASE_SETUP.md            # Guide détaillé Supabase
├── vercel.json                  # Configuration Vercel
└── vite.config.js               # Configuration Vite
```
│   │   └── VideoCard.jsx
│   ├── App.jsx
│   ├── Contact.jsx              # Formulaire avec localStorage
│   ├── Home.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── .env.supabase.example        # Template de configuration
├── package.json
└── vite.config.js               # Configuration Vite
```

## Scripts npm

| Commande | Description | Utilisation |
|----------|-------------|-------------|
| `npm run dev` | Serveur de développement Vite | Développement frontend avec HMR |
| `npm run build` | Build de production | Compilation optimisée pour production |
| `npm run preview` | Preview du build | Test du build avant déploiement |
| `npm run server` | Serveur API Express | Développement backend (optionnel) |
| `npm run init-db` | Initialisation base de données | Setup schéma PostgreSQL (optionnel) |
| `npm run lint` | Analyse statique ESLint | Vérification de la qualité du code |

## Considérations de sécurité

### Gestion des secrets

- Utilisation exclusive de variables d'environnement pour les credentials
- Fichier `.env` exclu du versioning via `.gitignore`
- Secrets configurés via interfaces sécurisées (Vercel, Render, Supabase)

### API et backend

- Configuration CORS restrictive limitée aux domaines autorisés
- Requêtes paramétrées pour prévenir les injections SQL
- Validation des entrées utilisateur sur tous les endpoints
- Gestion d'erreurs n'exposant pas d'informations sensibles

### Production

- Transmission HTTPS obligatoire (TLS 1.2+)
- Headers de sécurité configurés (CSP, X-Frame-Options, etc.)
- Dépendances régulièrement auditées (`npm audit`)

## Contribution

Ce projet accepte les contributions selon les principes de l'open source. Veuillez respecter les conventions suivantes :

### Workflow de contribution

1. Fork du repository
2. Création d'une branche feature : `git checkout -b feature/description`
3. Commits suivant la convention Conventional Commits
4. Push de la branche : `git push origin feature/description`
5. Ouverture d'une Pull Request avec description détaillée
2. Créer une branche de fonctionnalité (`git checkout -b feature/nom-fonctionnalite`)
3. Commit les changements (`git commit -m 'Add feature'`)
4. Push vers la branche (`git push origin feature/nom-fonctionnalite`)
5. Ouvrir une Pull Request

5. Ouverture d'une Pull Request avec description détaillée

### Convention de messages de commit (Conventional Commits)

```
<type>(<scope>): <description>

[corps optionnel]

[pied optionnel]
```

**Types acceptés :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (sans modification logique)
- `refactor`: Refactorisation du code
- `test`: Ajout ou modification de tests
- `chore`: Tâches de maintenance (build, config, etc.)
- `perf`: Amélioration des performances

**Exemples :**
```
feat(contact): add email validation
fix(api): resolve CORS configuration issue
docs(readme): update deployment instructions
```

### Standards de code

- **JavaScript/JSX** : ESLint avec configuration React
- **Style** : Indentation 2 espaces, point-virgules optionnels
- **Composants React** : Composants fonctionnels avec hooks
- **Nommage** : camelCase pour variables/fonctions, PascalCase pour composants

## Licence

Ce projet est distribué sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour les termes complets.

## Ressources et liens

### Application

- **Production (Frontend)** : https://aventure-alpine.vercel.app
- **API (Backend)** : https://aventure-alpine.onrender.com  
- **Repository GitHub** : https://github.com/maxlo245/Aventure-Alpine

### Documentation

- [Guide de configuration Supabase](SUPABASE_SETUP.md)
- [Configuration Vercel](vercel.json)
- [Configuration Render](render.yaml)

## Dépendances principales

## Dépendances principales

### Production

| Package | Version | Rôle |
|---------|---------|------|
| react | ^18.2.0 | Bibliothèque UI |
| react-dom | ^18.2.0 | Rendu DOM React |
| react-router-dom | ^7.10.1 | Routing applicatif |
| express | ^4.19.2 | Framework web backend |
| pg | ^8.11.3 | Client PostgreSQL |
| axios | ^1.7.7 | Client HTTP |
| cors | ^2.8.5 | Middleware CORS |
| dotenv | ^16.4.7 | Variables d'environnement |

### Développement

| Package | Version | Rôle |
|---------|---------|------|
| vite | ^5.0.8 | Build tool et dev server |
| @vitejs/plugin-react | ^4.2.1 | Plugin React pour Vite |
| eslint | ^8.55.0 | Linter JavaScript |

---

Pour toute question ou suggestion, veuillez ouvrir une issue sur GitHub.
