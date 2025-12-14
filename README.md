# 🏔️ Aventures Alpines

> **Plateforme web moderne dédiée aux passionnés de sports de montagne**

Une application React immersive avec un design sombre animé, permettant de découvrir des activités alpines, consulter des articles détaillés, visionner des vidéos et planifier des itinéraires en montagne.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://maxlo245.github.io/Aventure-Alpine/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)

---

## ✨ Fonctionnalités

- 🎯 **Navigation intuitive** avec React Router
- 🎨 **Design moderne** : thème sombre avec fond animé en dégradé
- 📱 **Responsive** : adapté mobile, tablette et desktop
- 🔍 **Filtres avancés** : tri par catégorie, difficulté, date
- 📊 **API REST** : backend Express + MySQL pour données dynamiques
- 💬 **Partage d'expérience** : communauté interactive
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
| **Contact** | Formulaire de contact |

---

## 🚀 Démo en ligne

👉 **[maxlo245.github.io/Aventure-Alpine](https://maxlo245.github.io/Aventure-Alpine/)**

---

## 🛠️ Technologies

| Frontend | Backend | Outils |
|----------|---------|--------|
| React 18.2 | Node.js | Vite |
| React Router DOM | Express | Git |
| Axios | MySQL | GitHub Actions |
| CSS3 (animations) | dotenv | |

---

## 📦 Installation

### Prérequis

- Node.js 18+ → `node -v` et `npm -v`
- MySQL (port 3306)
- Windows : ajouter `C:\Program Files\nodejs` au PATH

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

**3. Configurer MySQL**
```bash
mysql -u root -p < server/db/schema.sql
```
Copier `server/.env.example` → `server/.env` et configurer vos identifiants.

**4. Lancer l'API**
```bash
npm run server
```

**5. Lancer le front**
```bash
npm run dev
```

✅ API : http://localhost:5000/api  
✅ Front : http://localhost:5173

---

## 🌐 Déploiement sur Vercel (gratuit - repos privés ✅)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Déploiement en 3 minutes

**1. Créer un compte Vercel**
   - Allez sur https://vercel.com
   - Cliquez "Sign Up" et connectez-vous avec GitHub

**2. Importer le projet**
   - Cliquez "Add New..." → "Project"
   - Sélectionnez votre repo `Aventure-Alpine` (fonctionne même en privé ✅)
   - Vercel détecte automatiquement Vite

**3. Configurer (optionnel - tout est pré-configuré)**
   - Framework Preset: **Vite** (auto-détecté)
   - Build Command: `npm run build`
   - Output Directory: `dist`

**4. Déployer**
   - Cliquez "Deploy"
   - Attendez 1-2 minutes ⏱️
   - Votre site sera sur `https://aventure-alpine.vercel.app`

### 🚀 Déploiements automatiques

Chaque `git push` sur `main` déclenche un nouveau déploiement !

### Variables d'environnement (optionnel)

Pour connecter l'API hébergée ailleurs:
1. Vercel → Settings → Environment Variables
2. Ajoutez `VITE_API_URL` avec l'URL de votre API
3. Redéployez

---

## Note : API Backend

Vercel héberge le **front-end statique**. Pour l'API MySQL :
- **Option 1**: Héberger sur Railway, Render ou Fly.io (gratuit)
- **Option 2**: Mode local avec fallback vers `src/data/`

---

## Technologies

- React
- Vite
- React Router DOM