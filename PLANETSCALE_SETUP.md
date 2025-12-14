# 🗄️ Configuration PlanetScale - Base de données MySQL gratuite

## Étape 1: Créer un compte PlanetScale

1. Allez sur https://auth.planetscale.com/sign-up
2. Inscrivez-vous avec GitHub (recommandé) ou email
3. Pas de carte bancaire requise ✅

## Étape 2: Créer une base de données

1. Dans le dashboard PlanetScale, cliquez sur **"Create a database"**
2. Configurez:
   - **Name**: `aventures-alpines`
   - **Region**: `AWS eu-west-1 (Europe)` ou la plus proche
   - **Plan**: `Hobby` (gratuit - 5GB storage)
3. Cliquez sur **"Create database"**
4. Attendez 30 secondes que la base soit prête

## Étape 3: Obtenir les credentials

1. Dans votre base de données, cliquez sur **"Connect"**
2. Sélectionnez **"Connect with"** → **Node.js**
3. Cliquez sur **"New password"** pour générer un mot de passe
4. ⚠️ **IMPORTANT**: Copiez immédiatement toutes les informations affichées:
   ```
   HOST: xxxxx.connect.psdb.cloud
   USERNAME: xxxxx
   PASSWORD: pscale_pw_xxxxx (vous ne pourrez plus le voir après!)
   DATABASE: aventures-alpines
   ```

## Étape 4: Configuration locale

1. Créez un fichier `.env` à la racine du projet:
   ```bash
   cp .env.planetscale.example .env
   ```

2. Modifiez `.env` avec vos vrais credentials PlanetScale:
   ```env
   DB_HOST=xxxxx.connect.psdb.cloud
   DB_USER=xxxxx
   DB_PASSWORD=pscale_pw_xxxxx
   DB_NAME=aventures-alpines
   DB_PORT=3306
   PORT=5000
   ```

## Étape 5: Initialiser la base de données

Exécutez le script d'initialisation:

```bash
npm run init-db
```

Vous devriez voir:
```
✅ Connexion réussie à PlanetScale
✅ Table activities créée
✅ Table articles_blog créée
✅ Table videos créée
✅ Table routes créée
✅ Table experiences créée
✅ Table contact_messages créée
✅ Données de démonstration ajoutées
🎉 Base de données initialisée avec succès!
```

## Étape 6: Tester l'API localement

```bash
npm run server
```

Testez dans votre navigateur:
- http://localhost:5000/ → Info API
- http://localhost:5000/api/health → Status base de données
- http://localhost:5000/api/activities → Liste des activités

## Étape 7: Configurer Render avec PlanetScale

1. Allez sur https://dashboard.render.com
2. Trouvez votre service **aventure-alpine**
3. Allez dans **"Environment"**
4. Ajoutez ces variables d'environnement:
   ```
   DB_HOST = xxxxx.connect.psdb.cloud
   DB_USER = xxxxx
   DB_PASSWORD = pscale_pw_xxxxx
   DB_NAME = aventures-alpines
   DB_PORT = 3306
   ```
5. Cliquez sur **"Save Changes"**
6. Render va automatiquement redéployer votre API

## Étape 8: Vérification finale

Une fois Render redéployé (environ 2 minutes):
- https://aventure-alpine.onrender.com/ → Devrait fonctionner
- https://aventure-alpine.onrender.com/api/health → `{"status":"ok"}`
- https://aventure-alpine.onrender.com/api/activities → Liste JSON

## Étape 9: Connecter le frontend

1. Allez sur https://vercel.com/maxlo245/aventure-alpine
2. Settings → Environment Variables
3. Ajoutez:
   ```
   VITE_API_URL = https://aventure-alpine.onrender.com
   ```
4. Redéployez sur Vercel

## ✅ Résultat final

Votre application complète sera fonctionnelle:
- **Frontend**: https://aventure-alpine.vercel.app
- **API**: https://aventure-alpine.onrender.com
- **Base de données**: PlanetScale (MySQL gratuit)
- **Formulaire de contact**: Sauvegarde dans la base de données ✨

## 🆘 Dépannage

### Erreur: "Access denied"
- Vérifiez que vous avez copié le bon mot de passe (commence par `pscale_pw_`)
- Régénérez un nouveau mot de passe dans PlanetScale si nécessaire

### Erreur: "ENOTFOUND"
- Vérifiez que `DB_HOST` contient bien `.connect.psdb.cloud`
- Pas de `https://` dans le host

### Erreur SSL
- Assurez-vous que `pool.js` contient la configuration SSL

## 📊 Limites du plan gratuit PlanetScale

- ✅ 5 GB de stockage
- ✅ 1 milliard de lectures par mois
- ✅ 10 millions d'écritures par mois
- ✅ Largement suffisant pour votre projet!
