# API publique Vercel

Les endpoints suivants sont disponibles sur Vercel :

- `/api/public-articles` : articles (JSON)
- `/api/public-videos` : vidéos (JSON)
- `/api/public-sports` : sports (JSON)
- `/api/public-routes` : itinéraires (JSON)

Exemple :
https://aventure-alpine.vercel.app/api/public-articles
# Aventures Alpines

## Plateforme web moderne pour les passionnés de sports de montagne

[![Vercel](https://img.shields.io/badge/vercel-deployed-success?style=flat&logo=vercel)](https://aventure-alpine.vercel.app)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat&logo=node.js)](https://nodejs.org)
[![Tests](https://img.shields.io/badge/tests-43%20E2E-success?style=flat&logo=selenium)](tests/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](LICENSE)

[Demo](https://aventure-alpine.vercel.app) • [Signaler un bug](../../issues)

---

## Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Démarrage rapide](#démarrage-rapide)
- [Installation](#installation)
- [Configuration](#configuration)
- [Déploiement](#déploiement)
- [Performance](#performance)
- [API](#api)
- [Structure](#structure)
- [Contribution](#contribution)
- [Licence](#licence)

---

## À propos

**Aventures Alpines** est une plateforme web full-stack pour découvrir les sports de montagne (ski, escalade, randonnée, VTT) avec système d'authentification et réservation.

**Architecture Progressive** : Frontend autonome (localStorage) + Backend/DB optionnels.

**Highlights** : Mobile-first • SEO optimisé • Bundle 16KB • 43 tests E2E • Déployé sur Vercel + Render

---

## Fonctionnalités

**Authentification** : Inscription/Connexion JWT • Dashboard • Réservations • Routes protégées

**Pages** : Accueil • Activités (ski, escalade, randonnée, VTT) • Sites d'escalade • Stations de ski • Itinéraires • Blog • Vidéos • Contact

**Réservation** : Catalogue prestations • Booking en ligne • Suivi réservations (en attente, confirmée, annulée)

**Tests E2E** : 43 tests Selenium (15 navigation + 16 filtres + 12 auth) - Mocha + Chai

### Architecture

```text
Utilisateur → Vercel (CDN) → React SPA (HashRouter)
                                ├─→ localStorage (fallback)
                                └─→ API Express → PostgreSQL (Supabase)
```

**Progressive Enhancement** : Frontend autonome avec localStorage. API optionnelle (`VITE_API_URL`).

---

## Technologies

**Frontend** : React 18.2 • Vite 5.0 • React Router 7.x • Axios • Leaflet • React-Leaflet

**Backend** : Node.js ≥18 • Express 4.19 • PostgreSQL (pg 8.11) • bcryptjs • JWT • CORS

**Infrastructure** : Vercel (Frontend CDN) • Render (API) • Supabase (PostgreSQL 500MB) • Selenium 4.16 (Tests E2E)

---

## Démarrage rapide

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

# (Optionnel) Lancer les tests E2E
cd tests && npm install && npm test
```

Ouvrez <http://localhost:5173> dans votre navigateur

---

## Installation

**Mode standalone** (frontend uniquement) :

```bash
npm run dev  # Utilise localStorage
```

**Mode full-stack** (avec PostgreSQL) :

1. Créer projet Supabase gratuit
2. Créer `.env` avec identifiants DB
3. Initialiser schéma : `npm run init-db`
4. Lancer : `npm run dev` + `npm run server`

---

## Configuration

**Frontend** : `VITE_API_URL` (optionnel) - URL de l'API backend

**Backend** : 
- `JWT_SECRET` (requis) - Secret JWT min. 32 chars
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` (optionnels) - PostgreSQL
- Sans DB : API retourne 503, frontend utilise localStorage

---

## Déploiement

**Vercel (Frontend)** : Importer repo → Config auto-détectée (Vite) → Ajouter `VITE_API_URL` (optionnel) → Déployer

**Render (Backend optionnel)** : 
- Mode standalone : Variables `NODE_ENV`, `PORT`
- Mode full-stack : Ajouter variables Supabase → `npm run init-db`

**URLs** : <https://aventure-alpine.vercel.app> • <https://aventure-alpine.onrender.com>

**Note** : Render Free = cold start 15min (~30s latence)

---

## Performance

**Optimisations** : Code splitting (React 175KB, Leaflet 154KB) • Lazy loading (14 composants) • Preconnect fonts • Meta SEO

**Résultats** : Bundle 16KB (↓97%) • FCP ↑70% • TTI ↑60% • Lighthouse 95+

---

## API

**Base URL** : <https://aventure-alpine.onrender.com>

**Format** : JSON • CORS activé

### Endpoints principaux

**Auth** : `POST /api/auth/register` • `POST /api/auth/login` • `GET /api/auth/me` (JWT)

**Publics** : `GET /api/activities` • `GET /api/sites-escalade` • `GET /api/stations-ski` • `GET /api/prestations` • `GET /api/articles` • `GET /api/videos` • `GET /api/routes` • `GET /api/experiences` • `POST /api/contact-messages`

**Protégés** : `POST /api/reservations` • `GET /api/reservations`

**Gestion erreurs** : API retourne 503 sans DB → Frontend bascule sur localStorage automatiquement

---

## Structure

```text
aventure-alpine/
├── src/                  # Frontend React (pages/, components/, data/, api/)
├── server/               # Backend Express (index.js, middleware/, db/)
├── tests/                # Tests E2E Selenium (43 tests)
├── index.html            # HTML entry point
├── vite.config.js        # Config Vite + code splitting
└── package.json          # Scripts & dépendances
```

**Base de données** : 13 tables (utilisateurs, guides, clients, activities, sites_escalade, stations_ski, routes, prestations, reservations, articles_blog, videos, experiences, contact_messages)

Voir [server/db/schema.sql](server/db/schema.sql)

---

## Contribution

1. Fork → Créer branche `feature/NomFeature`
2. Commit (format [Conventional Commits](https://www.conventionalcommits.org/))
3. Push → Ouvrir PR

**Vérifications** : `npm run lint` • `cd tests && npm test`

**Style** : 2 espaces • Single quotes • Trailing commas

---

## Licence

**MIT License** © 2025 Aventures Alpines - Voir [LICENSE](LICENSE)

---

## Crédits

Développé par l'équipe Aventures Alpines

[Retour en haut](#aventures-alpines)
