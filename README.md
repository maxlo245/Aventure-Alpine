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

## Démo & Déploiement GitHub Pages

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Status-blue)](https://maxlo245.github.io/Aventure-Alpine/)

👉 Démo: https://maxlo245.github.io/Aventure-Alpine/

### Déploiement sur GitHub Pages (gratuit)

### Première fois - Configuration GitHub

1) **Créer un dépôt GitHub**
   - Allez sur https://github.com/new
   - Nom du repo : `Aventure-Alpine` (exactement ce nom pour correspondre à vite.config.js)
   - Créez le repo (public)

2) **Configurer GitHub Pages**
   - Dans votre repo → Settings → Pages
   - Source : GitHub Actions

3) **Pusher votre code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/Aventure-Alpine.git
   git push -u origin main
   ```

4) **Déploiement automatique**
   - Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement
   - Attendez 2-3 minutes
   - Votre site sera disponible sur : `https://VOTRE_USERNAME.github.io/Aventure-Alpine/`

### Mises à jour futures

Chaque fois que vous faites un `git push`, le site se met à jour automatiquement :
```bash
git add .
git commit -m "Description des changements"
git push
```

### Dépannage GitHub Pages
- 404 sur les sous-routes: le site utilise `HashRouter` (`#/...`). Rafraîchissez avec Ctrl+F5 si vous voyez une page blanche.
- Actions échoue: vérifiez les permissions (Settings → Actions → Workflow permissions: Read and write) et relancez le job.
- Source Pages: assurez-vous que Pages est configuré sur "GitHub Actions".
- Cache navigateur: utilisez la navigation privée ou un hard refresh (Ctrl+F5).

### Note importante : API Backend

GitHub Pages héberge uniquement le **front-end statique**. Pour l'API MySQL :
- Option 1 : Héberger l'API sur Railway, Render ou Fly.io (gratuit aussi)
- Option 2 : Le site fonctionne en mode local (fallback sur données locales)

## Technologies

- React
- Vite
- React Router DOM