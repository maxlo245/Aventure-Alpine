# Documentation Technique - Aventures Alpines

**Version :** 2.0  
**Date :** 15 décembre 2025  
**Auteur :** Équipe Aventures Alpines  
**Statut :** Production Ready

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du projet](#architecture-du-projet)
3. [Base de données](#base-de-données)
4. [API REST](#api-rest)
5. [Frontend](#frontend)
6. [Authentification](#authentification)
7. [Déploiement](#déploiement)
8. [Tests](#tests)
9. [Maintenance](#maintenance)

---

## Vue d'ensemble

### Description du projet

**Aventures Alpines** est une plateforme web interactive dédiée aux activités de montagne (randonnée, escalade, ski) dans les Alpes françaises. Le projet permet aux utilisateurs de :

- 🥾 Découvrir des itinéraires de randonnée avec carte interactive
- 🧗 Explorer des sites d'escalade classés par difficulté
- ⛷️ Consulter les conditions d'enneigement en temps réel
- 📚 Lire des articles et visionner des vidéos
- 🔐 Créer un compte et gérer des réservations
- 📅 Réserver des prestations avec guides professionnels

### Stack technologique

#### Frontend
- **React 18.3** - Framework UI avec hooks
- **React Router 6** - Navigation SPA
- **Axios 1.7** - Client HTTP
- **Leaflet + React-Leaflet 4.2** - Cartographie interactive
- **Vite 5.0** - Build tool moderne

#### Backend
- **Node.js 20+** - Runtime JavaScript
- **Express 4.19** - Framework web
- **PostgreSQL 15** - Base de données relationnelle
- **Supabase** - BaaS pour PostgreSQL hosted
- **bcryptjs 2.4** - Hachage de mots de passe
- **jsonwebtoken 9.0** - Authentification JWT

#### Déploiement
- **Vercel** - Hébergement frontend
- **Render** - Hébergement backend API
- **Supabase Cloud** - Base de données PostgreSQL

---

## Architecture du projet

### Architecture globale

```
┌─────────────────────────────────────────────────────────────┐
│                    UTILISATEUR (Navigateur)                  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (React + Vite)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │   Pages     │  │ Components  │  │   React Router     │  │
│  │ - Home      │  │ - Cards     │  │   Navigation       │  │
│  │ - Randonnée │  │ - Leaflet   │  │   Protected Routes │  │
│  │ - Escalade  │  │ - Forms     │  │                    │  │
│  │ - Ski       │  │             │  │                    │  │
│  └─────────────┘  └─────────────┘  └────────────────────┘  │
│                            │                                 │
│                    ┌───────┴────────┐                       │
│                    │  Axios Client   │                       │
│                    │  + JWT Tokens   │                       │
│                    └───────┬────────┘                       │
└────────────────────────────┼─────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND API (Express + Node.js)                 │
│  ┌──────────────────┐  ┌──────────────────────────────┐    │
│  │   Middlewares    │  │       Routes & Controllers    │    │
│  │ - CORS           │  │ - /api/auth/*                │    │
│  │ - Body Parser    │  │ - /api/routes                │    │
│  │ - JWT Auth       │  │ - /api/articles              │    │
│  │                  │  │ - /api/videos                │    │
│  └──────────────────┘  │ - /api/sites-escalade        │    │
│                        │ - /api/stations-ski          │    │
│                        │ - /api/reservations          │    │
│                        │ - /api/prestations           │    │
│                        └──────────┬───────────────────┘    │
└───────────────────────────────────┼─────────────────────────┘
                                    │ SQL
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│            BASE DE DONNÉES (PostgreSQL - Supabase)           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  13 Tables relationnelles :                          │  │
│  │  - utilisateurs, guides, clients                     │  │
│  │  - activities, sites_escalade, stations_ski          │  │
│  │  - routes, prestations, reservations                 │  │
│  │  - articles_blog, videos, experiences                │  │
│  │  - contact_messages                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Structure des dossiers

```
Aventure-Alpine/
│
├── server/                     # Backend Express
│   ├── index.js               # Point d'entrée API
│   ├── db/
│   │   ├── schema.sql        # Schéma complet PostgreSQL (13 tables)
│   │   ├── pool.js           # Configuration pool PostgreSQL
│   │   └── init-supabase.js  # Script d'initialisation DB
│   └── middleware/
│       └── auth.js           # Middleware JWT authentification
│
├── src/                       # Frontend React
│   ├── main.jsx              # Point d'entrée React
│   ├── App.jsx               # Router principal
│   ├── pages/                # Pages principales
│   │   ├── Home.jsx
│   │   ├── Randonnee.jsx     # Page randonnée + Leaflet
│   │   ├── Escalade.jsx      # Page escalade + filtres
│   │   ├── Ski.jsx           # Page ski + conditions neige
│   │   ├── Articles.jsx      # Articles avec filtres avancés
│   │   ├── Videos.jsx        # Vidéos avec recherche
│   │   ├── Login.jsx         # Authentification
│   │   ├── Register.jsx      # Inscription
│   │   └── Dashboard.jsx     # Tableau de bord utilisateur
│   ├── components/           # Composants réutilisables
│   │   ├── ArticleCard.jsx
│   │   ├── VideoCard.jsx
│   │   ├── HikingRouteCard.jsx
│   │   └── ExperienceFeed.jsx
│   ├── data/                 # Données de fallback
│   │   ├── articles.js
│   │   ├── videos.js
│   │   ├── routes.js
│   │   └── sports.js
│   └── api/
│       └── client.js         # Configuration Axios
│
├── public/                    # Assets statiques
├── AUTH_GUIDE.md             # Documentation authentification
├── README.md                 # Guide utilisateur
├── TECHNICAL_DOCUMENTATION.md # Ce fichier
├── package.json              # Dépendances frontend
├── vite.config.js            # Configuration Vite
└── vercel.json              # Configuration déploiement Vercel
```

---

## Base de données

### Modèle Conceptuel de Données (MCD)

#### Diagramme de relations

```mermaid
erDiagram
    UTILISATEURS ||--o{ GUIDES : "peut_etre"
    UTILISATEURS ||--o{ CLIENTS : "peut_etre"
    UTILISATEURS ||--o{ RESERVATIONS : "effectue"
    UTILISATEURS ||--o{ ARTICLES_BLOG : "ecrit"
    UTILISATEURS ||--o{ EXPERIENCES : "partage"
    UTILISATEURS ||--o{ CONTACT_MESSAGES : "envoie"
    
    GUIDES ||--o{ PRESTATIONS : "propose"
    CLIENTS ||--o{ RESERVATIONS : "reserve"
    
    ACTIVITIES ||--o{ SITES_ESCALADE : "concerne"
    ACTIVITIES ||--o{ STATIONS_SKI : "concerne"
    ACTIVITIES ||--o{ ROUTES : "concerne"
    ACTIVITIES ||--o{ PRESTATIONS : "concerne"
    
    PRESTATIONS ||--o{ RESERVATIONS : "est_reservee"
    
    SITES_ESCALADE ||--o{ VIDEOS : "possede"
    STATIONS_SKI ||--o{ VIDEOS : "possede"
    ROUTES ||--o{ VIDEOS : "possede"

    UTILISATEURS {
        SERIAL id_utilisateur PK
        VARCHAR nom_utilisateur UK
        VARCHAR email UK
        VARCHAR mot_de_passe_hash
        ENUM role
        TIMESTAMP created_at
    }
    
    GUIDES {
        SERIAL id_guide PK
        INT id_utilisateur FK
        VARCHAR specialite
        TEXT bio
        INT tarif_journalier
    }
    
    CLIENTS {
        SERIAL id_client PK
        INT id_utilisateur FK
        VARCHAR telephone
        TEXT preferences
    }
    
    ACTIVITIES {
        SERIAL id_activity PK
        VARCHAR name UK
        TEXT description
    }
    
    SITES_ESCALADE {
        SERIAL id_site PK
        VARCHAR name
        VARCHAR location
        INT id_activity FK
        VARCHAR difficulty
        INT height
        BOOLEAN equipped
    }
    
    STATIONS_SKI {
        SERIAL id_station PK
        VARCHAR name
        VARCHAR location
        INT id_activity FK
        VARCHAR snowConditions
        VARCHAR slopeType
        BOOLEAN hasLifts
    }
    
    ROUTES {
        SERIAL id_route PK
        VARCHAR name
        VARCHAR region
        INT id_activity FK
        VARCHAR difficulty
        VARCHAR duration
        VARCHAR distance
        DECIMAL latitude
        DECIMAL longitude
    }
    
    PRESTATIONS {
        SERIAL id_prestation PK
        INT id_guide FK
        INT id_activity FK
        VARCHAR titre
        TEXT description
        INT prix
        INT duree_heures
    }
    
    RESERVATIONS {
        SERIAL id_reservation PK
        INT id_client FK
        INT id_prestation FK
        DATE date_reservation
        INT nombre_personnes
        ENUM statut
        TIMESTAMP created_at
    }
    
    ARTICLES_BLOG {
        SERIAL id_article PK
        INT id_auteur FK
        VARCHAR titre
        TEXT contenu
        VARCHAR categorie
        TIMESTAMP date_publication
    }
    
    VIDEOS {
        SERIAL id_video PK
        VARCHAR title
        TEXT description
        VARCHAR url
        VARCHAR sport
        VARCHAR duration
        TIMESTAMP uploadDate
    }
    
    EXPERIENCES {
        SERIAL id_experience PK
        INT id_utilisateur FK
        VARCHAR titre
        TEXT description
        VARCHAR image_url
        DATE date_experience
    }
    
    CONTACT_MESSAGES {
        SERIAL id_message PK
        INT id_utilisateur FK
        VARCHAR nom
        VARCHAR email
        TEXT message
        TIMESTAMP date_envoi
    }
```

### Description des tables

#### 1. `utilisateurs` (Table centrale)
Gère tous les comptes utilisateurs avec authentification JWT.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id_utilisateur | SERIAL | PRIMARY KEY | Identifiant unique |
| nom_utilisateur | VARCHAR(100) | UNIQUE, NOT NULL | Nom d'utilisateur |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email de connexion |
| mot_de_passe_hash | VARCHAR(255) | NOT NULL | Mot de passe bcrypt |
| role | ENUM | DEFAULT 'client' | Role: admin/guide/client |
| created_at | TIMESTAMP | DEFAULT NOW() | Date de création |

#### 2. `guides`
Profils des guides professionnels.

#### 3. `clients`
Profils des clients avec préférences.

#### 4. `activities`
Activités disponibles (randonnée, escalade, ski).

#### 5. `sites_escalade`
Sites d'escalade avec difficulté et équipement.

#### 6. `stations_ski`
Stations de ski avec conditions d'enneigement.

#### 7. `routes`
Itinéraires de randonnée avec coordonnées GPS.

#### 8. `prestations`
Services proposés par les guides.

#### 9. `reservations`
Réservations de prestations par les clients.

#### 10. `articles_blog`
Articles de blog écrits par les utilisateurs.

#### 11. `videos`
Vidéos de sports de montagne.

#### 12. `experiences`
Expériences partagées par la communauté.

#### 13. `contact_messages`
Messages du formulaire de contact.

### Contraintes et index

```sql
-- Index pour performance
CREATE INDEX idx_reservations_client ON reservations(id_client);
CREATE INDEX idx_reservations_prestation ON reservations(id_prestation);
CREATE INDEX idx_articles_auteur ON articles_blog(id_auteur);
CREATE INDEX idx_sites_activity ON sites_escalade(id_activity);
CREATE INDEX idx_stations_activity ON stations_ski(id_activity);

-- Contraintes de clés étrangères avec CASCADE
ALTER TABLE guides ADD CONSTRAINT fk_guides_utilisateur 
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur) 
    ON DELETE CASCADE;

ALTER TABLE reservations ADD CONSTRAINT fk_reservations_client 
    FOREIGN KEY (id_client) REFERENCES clients(id_client) 
    ON DELETE CASCADE;
```

---

## API REST

### Endpoints d'authentification

#### `POST /api/auth/register`
Inscription d'un nouvel utilisateur.

**Request :**
```json
{
  "nom_utilisateur": "jean_dupont",
  "email": "jean@example.com",
  "mot_de_passe": "SecurePass123!",
  "role": "client"
}
```

**Response (201) :**
```json
{
  "message": "Utilisateur créé avec succès",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id_utilisateur": 1,
    "nom_utilisateur": "jean_dupont",
    "email": "jean@example.com",
    "role": "client"
  }
}
```

#### `POST /api/auth/login`
Connexion utilisateur.

**Request :**
```json
{
  "email": "jean@example.com",
  "mot_de_passe": "SecurePass123!"
}
```

**Response (200) :**
```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id_utilisateur": 1,
    "nom_utilisateur": "jean_dupont",
    "email": "jean@example.com",
    "role": "client"
  }
}
```

#### `GET /api/auth/me` 🔒
Récupère le profil de l'utilisateur connecté (nécessite JWT).

**Headers :**
```
Authorization: Bearer <token>
```

**Response (200) :**
```json
{
  "id_utilisateur": 1,
  "nom_utilisateur": "jean_dupont",
  "email": "jean@example.com",
  "role": "client",
  "created_at": "2025-12-15T10:30:00Z"
}
```

### Endpoints publics

#### `GET /api/routes`
Liste des itinéraires de randonnée.

**Response (200) :**
```json
[
  {
    "id": 1,
    "name": "Tour du Mont Blanc",
    "region": "Haute-Savoie",
    "difficulty": "Difficile",
    "duration": "10 jours",
    "distance": "170 km",
    "latitude": 45.8326,
    "longitude": 6.8652
  }
]
```

#### `GET /api/articles`
Liste des articles avec pagination.

**Query params :**
- `category` - Filtre par catégorie
- `limit` - Nombre de résultats (défaut: 50)
- `offset` - Pagination

#### `GET /api/videos`
Liste des vidéos.

#### `GET /api/sites-escalade`
Sites d'escalade avec difficulté.

**Response (200) :**
```json
[
  {
    "id_site": 1,
    "name": "Falaise de Presles",
    "location": "Vercors",
    "difficulty": "difficile",
    "height": 300,
    "equipped": true
  }
]
```

#### `GET /api/stations-ski`
Stations de ski avec conditions.

**Response (200) :**
```json
[
  {
    "id_station": 1,
    "name": "Les Grands Montets",
    "location": "Chamonix",
    "snowconditions": "Excellent - 180cm base",
    "slopetype": "noire",
    "haslifts": true
  }
]
```

### Endpoints protégés (JWT requis)

#### `GET /api/prestations` 🔒
Liste des prestations de guides.

#### `POST /api/reservations` 🔒
Créer une réservation.

**Request :**
```json
{
  "id_prestation": 5,
  "date_reservation": "2025-12-20",
  "nombre_personnes": 2
}
```

**Response (201) :**
```json
{
  "id_reservation": 12,
  "statut": "en_attente",
  "message": "Réservation créée avec succès"
}
```

#### `GET /api/reservations/user/:id` 🔒
Réservations d'un utilisateur.

#### `POST /api/contact` 🔒
Envoyer un message de contact.

### Codes d'erreur

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Succès |
| 201 | Created | Ressource créée |
| 400 | Bad Request | Données invalides |
| 401 | Unauthorized | Token manquant/invalide |
| 403 | Forbidden | Accès refusé |
| 404 | Not Found | Ressource introuvable |
| 409 | Conflict | Email/nom déjà utilisé |
| 500 | Internal Server Error | Erreur serveur |

---

## Frontend

### Structure des pages

#### Pages sportives
Les trois pages dédiées (Randonnée, Escalade, Ski) suivent une structure cohérente :

1. **Hero Section** - Image/gradient + titre
2. **Introduction** - Présentation de l'activité
3. **Conseils/Sécurité** - Informations pratiques
4. **Filtres** - Recherche et tri par difficulté
5. **Contenu principal** - Grille de cartes
6. **Galerie/Vidéos** - Médias complémentaires
7. **Carte interactive (Randonnée)** - Leaflet avec marqueurs

#### Composants réutilisables

**ArticleCard.jsx**
```jsx
<ArticleCard article={article} />
// Affiche: titre, catégorie, date, description, image
```

**VideoCard.jsx**
```jsx
<VideoCard video={video} />
// Affiche: thumbnail, titre, durée, sport, bouton play
```

**HikingRouteCard.jsx**
```jsx
<HikingRouteCard route={route} />
// Affiche: nom, région, difficulté, durée, distance
```

### Gestion de l'état

#### Authentification
```javascript
// Stockage du token
localStorage.setItem('token', jwtToken);
localStorage.setItem('user', JSON.stringify(userData));

// Vérification
const isLoggedIn = !!localStorage.getItem('token');

// Déconnexion
localStorage.removeItem('token');
localStorage.removeItem('user');
```

#### Requêtes API avec Axios
```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Requête protégée
const token = localStorage.getItem('token');
const response = await axios.get(`${API_URL}/api/auth/me`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Leaflet - Carte interactive

```javascript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

<MapContainer center={[45.9237, 6.8694]} zoom={10}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {routes.map(route => (
    <Marker key={route.id} position={[route.latitude, route.longitude]}>
      <Popup>{route.name}</Popup>
    </Marker>
  ))}
</MapContainer>
```

### Filtres avancés

Les pages Articles et Vidéos implémentent :
- **Recherche textuelle** - Par titre, description, contenu
- **Tri multiple** - Date, popularité, alphabétique, durée
- **Filtres catégories/sports** - Dropdowns dynamiques
- **Compteur de résultats** - Mise à jour en temps réel
- **Reset automatique** - Bouton affiché si filtres actifs

---

## Authentification

### Flux d'authentification JWT

```
1. INSCRIPTION/CONNEXION
   User → Frontend → POST /api/auth/register ou /login
   
2. VALIDATION
   Backend vérifie données + bcrypt pour mot de passe
   
3. GÉNÉRATION TOKEN
   Backend crée JWT signé (secret: JWT_SECRET, expiration: 24h)
   
4. STOCKAGE CLIENT
   Frontend stocke token dans localStorage
   
5. REQUÊTES PROTÉGÉES
   Frontend envoie: Authorization: Bearer <token>
   
6. VÉRIFICATION
   Middleware authenticateToken valide le token
   
7. ACCÈS RESSOURCE
   Si valide → req.user = payload → next()
   Si invalide → 401 Unauthorized
```

### Middleware auth.js

```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
}
```

### Sécurité

- **Bcrypt** - Salt rounds: 10
- **JWT** - Expiration: 24h
- **HTTPS** - Obligatoire en production
- **CORS** - Configuré pour domaines autorisés
- **Validation** - Données entrantes vérifiées
- **SQL Injection** - Requêtes paramétrées

---

## Déploiement

### Variables d'environnement

#### Frontend (.env)
```bash
VITE_API_URL=https://aventure-alpine-api.onrender.com
```

#### Backend (.env)
```bash
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=votre_secret_ultra_securise_minimum_32_caracteres
NODE_ENV=production
```

### Déploiement Vercel (Frontend)

1. **Build settings :**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Fichier vercel.json :**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

3. **Déploiement :**
```bash
npm run build
vercel --prod
```

### Déploiement Render (Backend)

1. **Service settings :**
   - Environment: Node
   - Build command: `npm install`
   - Start command: `node server/index.js`

2. **Variables d'environnement :**
   - Ajouter DATABASE_URL, JWT_SECRET, PORT

### Supabase (Base de données)

1. **Initialisation :**
```bash
cd server/db
node init-supabase.js
```

2. **Migration :**
```sql
-- Exécuter schema.sql dans SQL Editor
\i schema.sql
```

---

## Tests

### Tests manuels (à automatiser avec Selenium)

#### Test d'authentification
```
1. Aller sur /register
2. Remplir formulaire avec données valides
3. Vérifier redirection vers /dashboard
4. Vérifier présence du token dans localStorage
5. Se déconnecter
6. Vérifier suppression du token
```

#### Test de réservation
```
1. Se connecter
2. Aller sur /prestations
3. Sélectionner une prestation
4. Remplir formulaire de réservation
5. Valider
6. Vérifier statut "en_attente" dans /dashboard
```

#### Test de filtres
```
1. Aller sur /articles
2. Rechercher "montagne"
3. Vérifier mise à jour du compteur
4. Sélectionner catégorie "Techniques"
5. Vérifier filtrage correct
6. Trier par "Popularité"
7. Vérifier ordre décroissant
```

### Tests d'API (curl)

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nom_utilisateur":"test","email":"test@test.com","mot_de_passe":"Test123!"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","mot_de_passe":"Test123!"}'

# Get profile (avec token)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

---

## Maintenance

### Logs et monitoring

```javascript
// Logging dans server/index.js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: 'Erreur serveur' });
});
```

### Backup base de données

```bash
# Backup PostgreSQL
pg_dump -h hostname -U username -d aventure_alpine > backup_$(date +%Y%m%d).sql

# Restore
psql -h hostname -U username -d aventure_alpine < backup.sql
```

### Mise à jour des dépendances

```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour (attention breaking changes)
npm update

# Audit de sécurité
npm audit
npm audit fix
```

### Performance

- **Cache** - Utiliser Redis pour cache API
- **CDN** - Images via Cloudinary ou Vercel
- **Lazy loading** - Images et composants React
- **Compression** - gzip sur Express
- **Minification** - Build production Vite

---

## Annexes

### Ressources externes

- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io)
- [Leaflet Docs](https://leafletjs.com)

### Support et contact

- **GitHub Repository :** [maxlo245/Aventure-Alpine](https://github.com/maxlo245/Aventure-Alpine)
- **Documentation Auth :** Voir `AUTH_GUIDE.md`
- **README :** Voir `README.md`

---

**Fin de la documentation technique**  
*Document généré automatiquement - Version 2.0 - 15/12/2025*
