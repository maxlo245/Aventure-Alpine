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

### 🔐 Authentification & Compte utilisateur

- **Inscription/Connexion** - Système JWT sécurisé avec hashage bcrypt
- **Dashboard personnel** - Profil utilisateur et gestion de compte
- **Réservations** - Système complet de réservation de prestations
- **Routes protégées** - Accès sécurisé aux fonctionnalités membres

### 🏠 Pages principales

- **Accueil** - Hero section, présentation générale
- **Activités** - Catalogue des sports alpins (ski, escalade, randonnée, VTT)
- **Sites d'escalade** - Base de données complète des voies et falaises
- **Stations de ski** - Conditions en temps réel, domaines skiables
- **Itinéraires** - Parcours détaillés avec niveaux de difficulté et guides
- **Articles** - Blog sur les techniques, matériel et conseils
- **Vidéos** - Galerie multimédia de documentaires et tutoriels
- **Contact** - Formulaire avec validation et persistance localStorage

### 🎫 Système de réservation

- **Prestations** - Catalogue d'activités et stages disponibles
- **Booking** - Réservation en ligne avec validation dates
- **Gestion** - Suivi des réservations (en attente, confirmée, annulée)
- **Clients** - Profil client lié au compte utilisateur

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
| **bcryptjs** | 2.4 | Hashage sécurisé des mots de passe |
| **jsonwebtoken** | 9.0 | Authentification JWT |
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

**Remarque** : Sans cette variable, l'application fonctionne en mode autonome avec localStorage.

#### Backend (Render)

| Variable | Requis | Description | Exemple |
|----------|--------|-------------|---------|
| `NODE_ENV` | Oui | Environnement d'exécution | `production` |
| `PORT` | Non | Port d'écoute du serveur | `5000` |
| `JWT_SECRET` | **Oui** | Secret pour tokens JWT (min. 32 chars) | - |
| `DB_HOST` | Non* | Hôte PostgreSQL | `xxxxx.supabase.co` |
| `DB_USER` | Non* | Utilisateur base de données | `postgres` |
| `DB_PASSWORD` | Non* | Mot de passe base de données | - |
| `DB_NAME` | Non* | Nom de la base de données | `postgres` |
| `DB_PORT` | Non* | Port PostgreSQL | `5432` |

***Variables DB optionnelles** : L'API démarre sans ces variables et retourne HTTP 503 pour les endpoints nécessitant la base de données.

**⚠️ IMPORTANT** : En production, générez un `JWT_SECRET` unique et sécurisé !

---

## 🚢 Déploiement

### Déploiement Vercel (Frontend)

**Prérequis** : Compte Vercel connecté à GitHub

1. Importer le repository sur [vercel.com](https://vercel.com)
2. Configuration automatiquement détectée :
   - **Framework** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
3. Variables d'environnement (optionnel) :
   ```
   VITE_API_URL=https://aventure-alpine.onrender.com
   ```
4. Déployer

✅ **URL de production** : https://aventure-alpine.vercel.app

### Déploiement Render (Backend - optionnel)

**Prérequis** : Compte Render connecté à GitHub

#### Option 1 : Mode dégradé (sans base de données)

1. Créer un **Web Service**
2. Configurer :
   - **Build Command** : `npm install`
   - **Start Command** : `node server/index.js`
3. Variables d'environnement :
   ```
   NODE_ENV=production
   PORT=5000
   ```

L'API retournera 503 pour les endpoints DB. Le frontend utilisera localStorage automatiquement.

#### Option 2 : Mode complet (avec PostgreSQL)

Suivez **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** puis :

1. Créer le Web Service (comme ci-dessus)
2. Ajouter les variables Supabase :
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=xxxxx.supabase.co
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=votre_mot_de_passe_supabase
   DB_NAME=postgres
   ```
3. Initialiser le schéma (en local) :
   ```bash
   npm run init-db
   ```

✅ **URL de l'API** : https://aventure-alpine.onrender.com

**Note** : Render Free Tier = cold start après 15 min d'inactivité (~30s de latence au premier appel).

---

## 📡 API

### URL de base

```
https://aventure-alpine.onrender.com
```

### Format

- **Réponses** : JSON
- **Authentification** : Aucune
- **CORS** : Activé (toutes origines)

### Endpoints

#### Endpoints publics

#### `GET /`

Métadonnées de l'API et liste complète des endpoints.

**Réponse** :
```json
{
  "name": "Aventures Alpines API",
  "status": "running",
  "endpoints": [
    "/api/health",
    "/api/auth/register",
    "/api/auth/login",
    "/api/activities",
    "/api/sites-escalade",
    "/api/stations-ski",
    "..."
  ]
}
```

---

#### `GET /api/health`

État de santé du service.

**Réponse avec DB** :
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

#### `POST /api/auth/register`

Créer un nouveau compte utilisateur.

**Body** :
```json
{
  "nom_utilisateur": "jeandupont",
  "email": "jean@email.com",
  "mot_de_passe": "password123",
  "nom": "Dupont",
  "prenom": "Jean"
}
```

**Réponse 201** :
```json
{
  "message": "Inscription réussie",
  "user": {
    "id": 1,
    "nom_utilisateur": "jeandupont",
    "email": "jean@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### `POST /api/auth/login`

Se connecter avec un compte existant.

**Body** :
```json
{
  "email": "jean@email.com",
  "mot_de_passe": "password123"
}
```

**Réponse 200** :
```json
{
  "message": "Connexion réussie",
  "user": { "id": 1, "nom_utilisateur": "jeandupont" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### `GET /api/sites-escalade`

Liste de tous les sites d'escalade.

**Réponse 200** :
```json
[
  {
    "id": 1,
    "name": "Voie du Pilier Sud",
    "difficulty": "experimente",
    "location": "Massif du Mont-Blanc",
    "duration": "6h00"
  }
]
```

---

#### `GET /api/stations-ski`

Liste de toutes les stations de ski.

**Réponse 200** :
```json
[
  {
    "id": 1,
    "name": "Les Grands Montets",
    "snowConditions": "Excellent - 180cm base",
    "slopeType": "noire",
    "hasLifts": true
  }
]
```

---

#### `GET /api/prestations`

Liste des prestations disponibles (stages, activités).

**Réponse 200** :
```json
[
  {
    "id": 1,
    "name": "Stage Escalade Débutant",
    "activityType": "escalade",
    "basePrice": 180.00,
    "durationDays": 2
  }
]
```

---

#### Endpoints protégés (authentification requise)

**Headers requis** :
```
Authorization: Bearer <votre_token_jwt>
```

#### `GET /api/auth/me`

Récupérer les informations de l'utilisateur connecté.

**Réponse 200** :
```json
{
  "id": 1,
  "nom_utilisateur": "jeandupont",
  "email": "jean@email.com",
  "date_inscription": "2025-12-15T10:30:00Z"
}
```

---

#### `GET /api/reservations`

Liste des réservations de l'utilisateur connecté.

**Réponse 200** :
```json
[
  {
    "id": 1,
    "prestationName": "Stage Escalade Débutant",
    "startDate": "2025-07-15",
    "endDate": "2025-07-17",
    "numPeople": 2,
    "totalPrice": 360.00,
    "status": "confirmee"
  }
]
```

---

#### `POST /api/reservations`

Créer une nouvelle réservation.

**Body** :
```json
{
  "prestationId": 1,
  "startDate": "2025-07-15",
  "endDate": "2025-07-17",
  "numPeople": 2,
  "totalPrice": 360.00
}
```

**Réponse 201** :
```json
{
  "message": "Réservation créée avec succès",
  "reservation": {
    "id": 1,
    "startDate": "2025-07-15",
    "status": "en_attente"
  }
}
```

---

#### `POST /api/contact-messages`

Soumettre un message de contact.

**Body** :
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Demande d'information"
}
```

**Réponse 201** :
```json
{
  "id": 42,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Demande d'information",
  "created_at": "2025-12-15T10:30:00Z"
}
```

**Réponse 503** (sans DB) :
```json
{
  "error": "Base de données non configurée"
}
```

---

#### Autres endpoints

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|--------------|
| `POST` | `/api/auth/register` | Inscription utilisateur | Non |
| `POST` | `/api/auth/login` | Connexion utilisateur | Non |
| `GET` | `/api/auth/me` | Profil utilisateur | Oui |
| `GET` | `/api/activities` | Liste des sports de montagne | Non |
| `GET` | `/api/sites-escalade` | Sites d'escalade | Non |
| `POST` | `/api/sites-escalade` | Créer un site | Oui |
| `GET` | `/api/stations-ski` | Stations de ski | Non |
| `POST` | `/api/stations-ski` | Créer une station | Oui |
| `GET` | `/api/prestations` | Prestations disponibles | Non |
| `POST` | `/api/prestations` | Créer une prestation | Oui |
| `GET` | `/api/reservations` | Mes réservations | Oui |
| `POST` | `/api/reservations` | Créer une réservation | Oui |
| `GET` | `/api/articles` | Articles du blog | Non |
| `GET` | `/api/videos` | Galerie vidéo | Non |
| `GET` | `/api/routes` | Itinéraires de randonnée | Non |
| `GET` | `/api/experiences` | Récits utilisateurs | Non |
| `POST` | `/api/experiences` | Créer un récit | Non |
| `POST` | `/api/contact-messages` | Message de contact | Non |

### Gestion des erreurs

Le client frontend gère automatiquement les erreurs 503 en basculant sur localStorage.

**Exemple** :
```javascript
try {
  const res = await axios.post(`${API_URL}/api/contact-messages`, data);
  console.log('Sauvegardé sur serveur:', res.data);
} catch (error) {
  if (error.response?.status === 503) {
    // Fallback localStorage
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({ ...data, id: Date.now() });
    localStorage.setItem('messages', JSON.stringify(messages));
  }
}
```

---

## 📂 Structure du projet

```
aventure-alpine/
│
├── index.html                   # Point d'entrée HTML
├── package.json                 # Dépendances et scripts npm
├── vite.config.js               # Configuration Vite
├── vercel.json                  # Configuration Vercel
├── render.yaml                  # Configuration Render
├── LICENSE                      # Licence MIT
├── README.md                    # Documentation (ce fichier)
├── SUPABASE_SETUP.md            # Guide complet Supabase
│
├── server/                      # Backend Express
│   ├── index.js                 # API REST
│   ├── middleware/
│   │   └── auth.js              # Middleware JWT authentification
│   └── db/
│       ├── pool.js              # Connection pool PostgreSQL
│       ├── init-supabase.js     # Script d'initialisation DB
│       └── schema.sql           # Schéma SQL complet (13 tables)
│
└── src/                         # Frontend React
    ├── main.jsx                 # Point d'entrée React
    ├── App.jsx                  # Composant racine + routing + auth
    ├── index.css                # Styles globaux
    ├── App.css                  # Styles du composant App
    │
    ├── pages/
    │   ├── Activities.jsx       # Page activités (sports)
    │   ├── Articles.jsx         # Page blog articles
    │   ├── Blog.jsx             # Page récits utilisateurs
    │   ├── RoutesPage.jsx       # Page itinéraires
    │   ├── Videos.jsx           # Page galerie vidéo
    │   ├── Login.jsx            # Page connexion
    │   ├── Register.jsx         # Page inscription
    │   └── Dashboard.jsx        # Tableau de bord utilisateur
    │
    ├── components/
    │   ├── ArticleCard.jsx      # Carte article
    │   ├── VideoCard.jsx        # Carte vidéo
    │   ├── HikingRouteCard.jsx  # Carte itinéraire
    │   └── ExperienceFeed.jsx   # Fil d'expériences
    │
    ├── data/
    │   ├── sports.js            # Données statiques sports
    │   ├── articles.js          # Données statiques articles
    │   ├── videos.js            # Données statiques vidéos
    │   └── routes.js            # Données statiques itinéraires
    │
    ├── api/
    │   └── client.js            # Configuration axios
    │
    ├── Home.jsx                 # Page d'accueil
    ├── Adventures.jsx           # Page aventures
    └── Contact.jsx              # Formulaire de contact
```

### Tables de la base de données

**13 tables** avec relations complètes :

1. **utilisateurs** - Comptes utilisateurs (JWT auth)
2. **guides** - Guides de montagne
3. **clients** - Profils clients liés aux utilisateurs
4. **activities** - Activités génériques
5. **sites_escalade** - Sites d'escalade détaillés
6. **stations_ski** - Stations de ski avec conditions
7. **routes** - Itinéraires de randonnée
8. **prestations** - Services et stages disponibles
9. **reservations** - Réservations clients
10. **articles_blog** - Articles du blog
11. **videos** - Galerie vidéos
12. **experiences** - Récits partagés
13. **contact_messages** - Messages de contact

Voir [schema.sql](server/db/schema.sql) pour le schéma complet.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### Workflow de contribution

1. **Fork** le projet
2. **Créer une branche** pour votre fonctionnalité :
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** vos changements :
   ```bash
   git commit -m 'feat: add AmazingFeature'
   ```
4. **Push** vers votre fork :
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Ouvrir une Pull Request**

### Conventions de code

- **Commits** : Format [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` nouvelle fonctionnalité
  - `fix:` correction de bug
  - `docs:` documentation
  - `style:` formatage code
  - `refactor:` refactoring
  - `test:` ajout de tests
  - `chore:` tâches de maintenance

- **Code style** :
  - Indentation : 2 espaces
  - Quotes : single quotes `'` pour JS
  - Trailing commas : oui
  - Semicolons : non requis (sauf cas spéciaux)

### Bonnes pratiques

- ✅ Tester vos changements localement
- ✅ Vérifier ESLint : `npm run lint`
- ✅ Documenter les nouvelles fonctionnalités
- ✅ Garder les PR focalisées (1 feature = 1 PR)

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 Aventures Alpines

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Développé avec ❤️ par l'équipe Aventures Alpines**

[⬆️ Retour en haut](#️-aventures-alpines)

</div>
