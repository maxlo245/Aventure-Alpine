# 🏔️ Aventures Alpines

> **Plateforme web moderne dédiée aux passionnés de sports de montagne**

Une application React immersive avec un design sombre animé, permettant de découvrir des activités alpines, consulter des articles détaillés, visionner des vidéos et planifier des itinéraires en montagne.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://aventure-alpine.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)

---

## ✨ Fonctionnalités

- 🎯 **Navigation intuitive** avec React Router
- 🎨 **Design moderne** : thème sombre avec fond animé en dégradé
- 📱 **Responsive** : adapté mobile, tablette et desktop
- 🔍 **Filtres avancés** : tri par catégorie, difficulté, date
- 📊 **API REST** : backend Express + MySQL pour données dynamiques
- 💬 **Formulaire de contact** : enregistrement des messages
- ⚡ **Performance optimale** : Hot Module Replacement (HMR)

### Pages disponibles

| Page | Description |
|------|-------------|
| **Accueil** | Statistiques et appels à l'action |
| **Activités** | Sports de montagne (randonnée, escalade, ski) |
| **Articles** | Guides pratiques et retours d'expérience |
| **Vidéos** | Galerie de vidéos immersives |
| **Itinéraires** | Parcours détaillés avec niveaux de difficulté |
| **Blog** | Articles communautaires et expériences terrain |
| **Contact** | Formulaire de contact avec sauvegarde |

---

## 🚀 Démos en ligne

| Service | URL |
|---------|-----|
| **Frontend** | https://aventure-alpine.vercel.app |
| **Backend API** | https://aventure-alpine.onrender.com |
| **Repo GitHub** | https://github.com/maxlo245/Aventure-Alpine |

---

## 🛠️ Technologies

| Frontend | Backend | Base de Données | Déploiement |
|----------|---------|-----------------|-------------|
| React 18.2 | Node.js 22+ | MySQL 8.0 | Vercel |
| React Router DOM 7 | Express 4.19 | PlanetScale | Render |
| Vite 5.0 | cors, dotenv | mysql2/promise | GitHub |
| CSS3 animations | | | |

---

## 📦 Installation locale

### Prérequis

- Node.js 18+ → `node -v` et `npm -v`
- MySQL 8.0 (ou PlanetScale distant)

### Étapes

**1. Cloner le projet**
```bash
git clone https://github.com/maxlo245/Aventure-Alpine.git
cd Aventure-Alpine
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer l'environnement backend**
```bash
cp server/.env.example server/.env
```
Édite `server/.env` avec tes identifiants MySQL.

**4. Initialiser la base de données (local)**
```bash
mysql -u root -p < server/db/schema.sql
```

**5. Lancer l'API (terminal 1)**
```bash
npm run server
```
✅ API disponible sur http://localhost:5000

**6. Lancer le front (terminal 2)**
```bash
npm run dev
```
✅ Front disponible sur http://localhost:5173

---

## 🌐 Déploiement

### Frontend sur Vercel (gratuit)

1. Va sur https://vercel.com et crée un compte
2. Importe le repo GitHub `maxlo245/Aventure-Alpine`
3. Vercel auto-détecte Vite → Déploie ! 🚀
4. Chaque `git push main` redéploie automatiquement

**URL:** https://aventure-alpine.vercel.app

---

### Backend + DB sur Render + PlanetScale (gratuit)

#### Étape 1 : Créer une BD PlanetScale
1. Va sur https://planetscale.com
2. Crée une base `aventures_alpines`
3. Clique "Connect" → copie l'URL MySQL
4. Initialise le schema :
   ```bash
   mysql -h <host> -u <user> -p < server/db/schema.sql
   ```

#### Étape 2 : Créer un service Render
1. Va sur https://render.com
2. Crée un "Web Service" depuis le repo
3. Runtime: Node
4. Build Command: `npm install`
5. Start Command: `node server/index.js`
6. Ajoute les variables d'environnement :
   - `DB_HOST` = host PlanetScale
   - `DB_PORT` = 3306
   - `DB_USER` = user PlanetScale
   - `DB_PASSWORD` = password PlanetScale
   - `DB_NAME` = aventures_alpines
   - `NODE_ENV` = production
   - `PORT` = 5000

**URL API:** https://aventure-alpine.onrender.com

#### Étape 3 : Brancher le front à l'API
1. Va sur Vercel → Settings → Environment Variables
2. Ajoute `VITE_API_URL` = `https://aventure-alpine.onrender.com`
3. Redéploie le front

---

## 📡 Endpoints API

```
GET  /api/health                      → Statut API
GET  /api/activities                  → Activités
GET  /api/articles                    → Articles blog
GET  /api/videos                      → Vidéos
GET  /api/routes                      → Itinéraires
GET  /api/experiences                 → Expériences utilisateurs
POST /api/experiences                 → Créer une expérience
GET  /api/contact-messages            → Tous les messages
POST /api/contact-messages            → Créer un message { name, email, message }
PATCH /api/contact-messages/:id       → Mettre à jour status
```

---

## 🧪 Scripts

```bash
npm run dev       # Lancer le front en développement
npm run build     # Build Vite pour production
npm run server    # Lancer l'API Express (local)
npm run lint      # Linter le code
npm run preview   # Prévisualiser le build prod
```

---

## 💾 Stockage des messages

- **Local** (sans API) : localStorage du navigateur
- **Distant** (avec API) : Base de données PlanetScale via l'API Render
- **Fallback** : Si l'API échoue, les messages sont automatiquement sauvegardés en localStorage

---

## 📝 Structure du projet

```
Aventure-Alpine/
├── src/
│   ├── pages/
│   │   ├── Activities.jsx
│   │   ├── Articles.jsx
│   │   ├── Videos.jsx
│   │   ├── Routes.jsx
│   ├── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── db/
│   │   ├── pool.js
│   │   └── schema.sql
│   ├── index.js
│   └── .env.example
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## 🤝 Contribution

1. Fork le projet
2. Crée une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

---

## 📄 Licence

Ce projet est open source. Libre de l'utiliser et le modifier.

---

## 📞 Support

- 📧 Email: info@aventuresalpines.com
- 🐙 GitHub: https://github.com/maxlo245/Aventure-Alpine
- 🌐 Site: https://aventure-alpine.vercel.app

---

**Last updated:** 14 Décembre 2025
