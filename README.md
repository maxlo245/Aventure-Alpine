# Aventures Alpines

Un site web React pour découvrir les aventures en montagne.

## Fonctionnalités

- Page d'accueil avec introduction et bouton interactif.
- Page des aventures avec images et descriptions.
- Page de contact avec formulaire.
- Navigation avec React Router.

## Installation

1) Prérequis
- Node.js 18+ (inclut npm). Vérifiez avec `node -v` et `npm -v`.
- MySQL en local (port 3306) ou accessible sur le réseau.
- Si `node` n'est pas reconnu sous Windows, ajoutez `C:\Program Files\nodejs` au `PATH` ou utilisez les commandes avec le chemin complet ci-dessous.

2) Installer les dépendances (client + serveur Express)
- Depuis le dossier du projet : `npm install`

3) Préparer la base MySQL
- Créez la base et les tables avec le script : `mysql -u root -p < server/db/schema.sql`
- Copiez `server/.env.example` en `server/.env` et ajustez DB_USER / DB_PASSWORD / DB_NAME au besoin.

4) Lancer l'API Express (port 5000 par défaut)
- `npm run server`

5) Lancer le front Vite (port 5173 par défaut)
- `npm run dev`
- Ou, si `node` n'est pas dans le PATH : `& "C:\\Program Files\\nodejs\\npm.cmd" run dev`

L'API répond sur http://localhost:5000/api et le front sur http://localhost:5173.

## Déploiement sur GitHub Pages (gratuit)

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

### Note importante : API Backend

GitHub Pages héberge uniquement le **front-end statique**. Pour l'API MySQL :
- Option 1 : Héberger l'API sur Railway, Render ou Fly.io (gratuit aussi)
- Option 2 : Le site fonctionne en mode local (fallback sur données locales)

## Technologies

- React
- Vite
- React Router DOM