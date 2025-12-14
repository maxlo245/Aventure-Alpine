# 🗄️ Configuration Supabase - Base de données PostgreSQL gratuite

## Pourquoi Supabase?

✅ **Gratuit** - 500MB storage, illimité pour lectures/écritures  
✅ **PostgreSQL** - Plus robuste que MySQL  
✅ **Serverless** - Pas de serveur à gérer  
✅ **SSL automatique** - Sécurisé par défaut  
✅ **Backup quotidien** - Vos données protégées  
✅ **Auth + Realtime** - Bonus utiles inclus  

## Étape 1: Créer un compte Supabase

1. Allez sur https://supabase.com
2. Cliquez sur **"Start your project"**
3. Inscrivez-vous avec GitHub (recommandé)
4. Pas de carte bancaire requise ✅

## Étape 2: Créer une nouvelle base de données

1. Dans le dashboard Supabase, cliquez sur **"New Project"**
2. Configurez:
   - **Name**: `aventures-alpines`
   - **Database Password**: Créez un mot de passe fort (12+ caractères)
   - **Region**: `Europe (Frankfurt)` ou la plus proche
   - **Plan**: Laissez sur le plan gratuit
3. Cliquez sur **"Create new project"**
4. Attendez 3-5 minutes que la base soit initialisée

## Étape 3: Obtenir les credentials de connexion

Une fois la base créée:
1. Allez dans **Settings** → **Database**
2. Copiez les informations:
   ```
   Host: xxxxx.supabase.co
   Username: postgres
   Password: [Celui que vous avez créé]
   Database: postgres
   Port: 5432
   ```
3. Vous aurez besoin de la **Connection String** complète:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
   ```

## Étape 4: Configuration locale

### 4.1 Créer le fichier `.env`

À la racine de votre projet, créez un fichier `.env`:

```bash
cp .env.supabase.example .env
```

### 4.2 Remplir le `.env` avec vos credentials

```env
# Base de données Supabase
DB_HOST=xxxxx.supabase.co
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe_ici
DB_NAME=postgres
DB_PORT=5432
PORT=5000
```

## Étape 5: Installer les dépendances

```bash
npm install
```

Cela installera le driver PostgreSQL `pg` à la place de `mysql2`.

## Étape 6: Initialiser la base de données

Exécutez le script d'initialisation:

```bash
npm run init-db
```

Vous devriez voir:
```
Connexion à Supabase...
✅ Connexion réussie à Supabase
✅ Table activities créée
✅ Table articles_blog créée
✅ Table videos créée
✅ Table routes créée
✅ Table experiences créée
✅ Table contact_messages créée
✅ Données de démonstration ajoutées
🎉 Base de données Supabase initialisée avec succès!
```

## Étape 7: Tester l'API localement

```bash
npm run server
```

Testez dans votre navigateur:
- http://localhost:5000/ → Info API
- http://localhost:5000/api/health → Status base de données
- http://localhost:5000/api/activities → Liste des activités

## Étape 8: Configurer Render avec Supabase

1. Allez sur https://dashboard.render.com
2. Trouvez votre service **aventure-alpine**
3. Allez dans **"Environment"**
4. **Supprimez** les anciennes variables (si vous aviez PlanetScale):
   - DB_HOST (ancien)
   - DB_USER (ancien)
   - DB_PASSWORD (ancien)
   - DB_NAME (ancien)
   - DB_PORT (ancien)

5. Ajoutez les NOUVELLES variables Supabase:
   ```
   DB_HOST = xxxxx.supabase.co
   DB_USER = postgres
   DB_PASSWORD = votre_mot_de_passe_ici
   DB_NAME = postgres
   DB_PORT = 5432
   ```

6. Cliquez sur **"Save Changes"**
7. Render va automatiquement redéployer votre API (2-3 minutes)

## Étape 9: Vérification finale

Une fois Render redéployé:
- https://aventure-alpine.onrender.com/ → Devrait fonctionner
- https://aventure-alpine.onrender.com/api/health → `{"status":"ok"}`
- https://aventure-alpine.onrender.com/api/activities → Liste JSON

## Étape 10: Connecter le frontend Vercel

1. Allez sur https://vercel.com/maxlo245/aventure-alpine
2. Settings → **Environment Variables**
3. **Supprimez** les anciennes variables (si elles existent)
4. Ajoutez:
   ```
   VITE_API_URL = https://aventure-alpine.onrender.com
   ```
5. Cliquez sur **"Save"**
6. Redéployez sur Vercel (ou attendez le prochain push)

## ✅ Résultat final

Votre application complète sera fonctionnelle:
- **Frontend**: https://aventure-alpine.vercel.app
- **API**: https://aventure-alpine.onrender.com
- **Base de données**: Supabase PostgreSQL (gratuit 500MB)
- **Formulaire de contact**: Sauvegarde dans la base de données ✨

## 🆘 Dépannage

### Erreur: "connect ENOTFOUND"
- Vérifiez que `DB_HOST` est correct (doit finir par `.supabase.co`)
- Attendez quelques minutes après création de la base

### Erreur: "password authentication failed"
- Vérifiez que le mot de passe est correct
- Vérifiez qu'il n'y a pas d'espaces avant/après

### Erreur: "relation does not exist"
- Les tables n'ont pas été créées
- Exécutez `npm run init-db` à nouveau

### Erreur: "Connexion refusée" en local
- Vérifiez que les variables `.env` sont correctes
- Vérifiez que votre IP est autorisée dans Supabase (Settings → Network)

## 📊 Limites du plan gratuit Supabase

- ✅ 500 MB de stockage
- ✅ Illimité pour lectures/écritures
- ✅ Connexions simultanées: 2 (suffisant pour un site)
- ✅ Pause après 1 semaine d'inactivité (réveille automatiquement)
- ✅ Largement suffisant pour votre projet!

## 🔧 Gestion Supabase (Avancé)

### Voir les tables et données en Supabase

1. Allez dans votre projet Supabase
2. Cliquez sur **"SQL Editor"**
3. Exécutez vos requêtes SQL

### Sauvegarder votre base de données

1. Allez dans **Settings** → **Database** → **Backups**
2. Cliquez sur **"Download"** pour télécharger une sauvegarde

### Gérer les utilisateurs PostgreSQL

1. Allez dans **Settings** → **Database**
2. Vous pouvez voir les utilisateurs et permissions

## 📚 Ressources

- Docs Supabase: https://supabase.com/docs
- Docs PostgreSQL: https://www.postgresql.org/docs
- Comparaison MySQL vs PostgreSQL: https://supabase.com/docs/guides/database/postgresql-vs-mysql
