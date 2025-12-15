<div align="center">

# 🗄️ Guide de configuration Supabase

**Configuration de la base de données PostgreSQL pour Aventures Alpines**

[![Supabase](https://img.shields.io/badge/supabase-serverless-success?style=flat&logo=supabase)](https://supabase.com)
[![PostgreSQL](https://img.shields.io/badge/postgresql-13+-blue?style=flat&logo=postgresql)](https://www.postgresql.org)

[Documentation Supabase](https://supabase.com/docs) • [Retour au README](README.md)

</div>

---

## 📖 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Prérequis](#-prérequis)
- [Création du projet Supabase](#-création-du-projet-supabase)
- [Configuration locale](#️-configuration-locale)
- [Initialisation du schéma](#-initialisation-du-schéma)
- [Déploiement en production](#-déploiement-en-production)
- [Vérification et tests](#-vérification-et-tests)
- [Dépannage](#-dépannage)
- [Gestion avancée](#-gestion-avancée)
- [Limites et quotas](#-limites-et-quotas)

---

## 🎯 Vue d'ensemble

**Supabase** fournit une base de données PostgreSQL serverless gratuite, parfaite pour ce projet. Cette solution remplace l'ancienne configuration MySQL/PlanetScale.

### Pourquoi Supabase ?

| Avantage | Description |
|----------|-------------|
| **🆓 Gratuit** | 500 MB de stockage, requêtes illimitées |
| **⚡ Serverless** | Pas de serveur à gérer, mise à l'échelle automatique |
| **🔒 Sécurisé** | SSL/TLS par défaut, accès contrôlé par IP |
| **💾 Backups** | Sauvegardes automatiques quotidiennes |
| **🌍 Edge Network** | Faible latence, déploiement global |
| **🔧 Compatible** | PostgreSQL standard, migration facile |

### Architecture

```
┌─────────────────────────────────────────┐
│         Aventures Alpines               │
│                                         │
│  ┌─────────┐         ┌──────────────┐  │
│  │ Vercel  │────────▶│ Render API   │  │
│  │(Frontend)│         │(Express)     │  │
│  └─────────┘         └──────┬───────┘  │
│                              │          │
│                              ▼          │
│                    ┌──────────────────┐ │
│                    │   Supabase       │ │
│                    │  PostgreSQL DB   │ │
│                    └──────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Compte GitHub (pour connexion SSO Supabase)
- ✅ Node.js ≥ 18.0.0 installé localement
- ✅ Projet Aventures Alpines cloné
- ✅ Gestionnaire de mots de passe (pour stocker les credentials)

---

## 🚀 Création du projet Supabase

### Étape 1 : Inscription

1. Rendez-vous sur **[supabase.com](https://supabase.com)**
2. Cliquez sur **"Start your project"**
3. Sélectionnez **"Continue with GitHub"** (recommandé)
4. Autorisez l'accès à votre compte GitHub

**Note** : Aucune carte bancaire n'est requise pour le plan gratuit.

### Étape 2 : Création du projet

1. Dans le dashboard, cliquez sur **"New Project"**
2. Sélectionnez votre organisation (ou créez-en une)
3. Configurez le projet :

| Champ | Valeur recommandée | Description |
|-------|-------------------|-------------|
| **Name** | `aventures-alpines` | Nom identifiable du projet |
| **Database Password** | Fort (16+ caractères) | Généré automatiquement ou personnalisé |
| **Region** | `Europe (Frankfurt)` | La plus proche de vos utilisateurs |
| **Pricing Plan** | `Free` | Suffisant pour ce projet |

4. Cliquez sur **"Create new project"**
5. Attendez 2-3 minutes (initialisation automatique)

### Étape 3 : Récupération des credentials

Une fois le projet créé :

1. Naviguez vers **Settings** → **Database**
2. Scrollez jusqu'à **"Connection string"**
3. Sélectionnez l'onglet **"URI"**
4. Cliquez sur **"Copy"** pour copier la chaîne complète

**Format de la chaîne** :
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

5. Notez également les **credentials individuels** :

| Variable | Exemple | Localisation |
|----------|---------|--------------|
| `Host` | `db.xxxxx.supabase.co` | Section "Connection string" |
| `Database` | `postgres` | Par défaut |
| `Port` | `5432` | PostgreSQL standard |
| `User` | `postgres` | Par défaut |
| `Password` | `[Votre mot de passe]` | Défini à l'étape 2 |

---

## ⚙️ Configuration locale

### Étape 1 : Création du fichier d'environnement

À la racine du projet, créez un fichier `.env` depuis le template :

```bash
cd Aventure-Alpine
cp .env.supabase.example .env
```

**Sous Windows PowerShell** :
```powershell
Copy-Item .env.supabase.example .env
```

### Étape 2 : Remplir les variables

Ouvrez le fichier `.env` et remplissez avec vos credentials Supabase :

```env
# ====================================
# Backend Configuration
# ====================================
NODE_ENV=development
PORT=5000

# ====================================
# Supabase PostgreSQL Database
# ====================================
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe_supabase_ici
DB_NAME=postgres
```

**⚠️ Important** :
- Remplacez `xxxxx` par votre identifiant de projet Supabase
- Remplacez le mot de passe par celui créé à l'étape 2
- Ne commitez **jamais** le fichier `.env` (déjà dans `.gitignore`)

### Étape 3 : Installation des dépendances

Si ce n'est pas déjà fait :

```bash
npm install
```

Cette commande installe notamment `pg` (driver PostgreSQL natif).

---

## 🔨 Initialisation du schéma

### Exécution du script d'initialisation

Le projet inclut un script automatisé pour créer toutes les tables nécessaires :

```bash
npm run init-db
```

**Sortie attendue** :

```
🚀 Initialisation de la base de données Supabase...

Connexion à Supabase (db.xxxxx.supabase.co)...
✅ Connexion réussie à PostgreSQL

📦 Création des tables...
✅ Table "activities" créée
✅ Table "articles_blog" créée
✅ Table "videos" créée
✅ Table "routes" créée
✅ Table "experiences" créée
✅ Table "contact_messages" créée

🌱 Insertion des données de démonstration...
✅ 4 activités ajoutées
✅ 3 articles ajoutés
✅ 3 vidéos ajoutées
✅ 2 itinéraires ajoutés

🎉 Base de données initialisée avec succès!
Fermé proprement
```

### Schéma créé

Le script crée 6 tables :

| Table | Description | Colonnes principales |
|-------|-------------|---------------------|
| `activities` | Sports de montagne | id, name, description, icon, popularity |
| `articles_blog` | Articles du blog | id, title, excerpt, content, image_url, date |
| `videos` | Galerie vidéo | id, title, description, url, thumbnail, duration |
| `routes` | Itinéraires de randonnée | id, name, difficulty, distance, elevation, description |
| `experiences` | Récits utilisateurs | id, author, title, body, created_at |
| `contact_messages` | Messages de contact | id, name, email, message, created_at |

### Vérification dans Supabase

1. Allez dans **Table Editor** (menu de gauche)
2. Vous devriez voir les 6 tables créées
3. Cliquez sur une table pour voir les données de démonstration

---

## 🚢 Déploiement en production

### Configuration Render (API Backend)

1. Connectez-vous à **[dashboard.render.com](https://dashboard.render.com)**
2. Sélectionnez votre service **aventure-alpine**
3. Allez dans **Environment** (menu de gauche)

#### Option A : Ajouter les variables une par une

Cliquez sur **"Add Environment Variable"** pour chaque :

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DB_HOST` | `db.xxxxx.supabase.co` |
| `DB_PORT` | `5432` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | `[Votre mot de passe]` |
| `DB_NAME` | `postgres` |

#### Option B : Importer depuis un fichier `.env`

1. Préparez un fichier avec :
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=postgres
   ```
2. Cliquez sur **"Import from .env"**
3. Collez le contenu
4. Cliquez sur **"Import"**

#### Déploiement

1. Cliquez sur **"Save Changes"**
2. Render redémarre automatiquement le service (2-3 minutes)
3. Surveillez les logs dans **"Logs"**

**Logs de succès** :
```
Server running on port 5000
✅ Connexion réussie à PostgreSQL
```

### Configuration Vercel (Frontend)

1. Connectez-vous à **[vercel.com](https://vercel.com)**
2. Sélectionnez le projet **aventure-alpine**
3. Allez dans **Settings** → **Environment Variables**

#### Ajout de la variable API

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_API_URL` | `https://aventure-alpine.onrender.com` | Production, Preview, Development |

4. Cliquez sur **"Save"**
5. Allez dans **Deployments** → **Redeploy** (ou attendez le prochain push)

---

## ✅ Vérification et tests

### Tests locaux

**Terminal 1** - Lancer l'API :
```bash
npm run server
```

**Terminal 2** - Tester les endpoints :
```bash
# Health check
curl http://localhost:5000/api/health

# Activités
curl http://localhost:5000/api/activities

# Articles
curl http://localhost:5000/api/articles
```

**Sortie attendue** :
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-12-15T14:30:00.000Z"
}
```

### Tests en production

**API Render** :
```bash
curl https://aventure-alpine.onrender.com/api/health
```

**Frontend Vercel** :
1. Ouvrez https://aventure-alpine.vercel.app
2. Naviguez vers **"Contact"**
3. Remplissez le formulaire
4. Vérifiez dans Supabase (Table Editor → contact_messages)

---

## 🆘 Dépannage

### Erreur : `connect ENOTFOUND`

**Symptôme** :
```
Error: getaddrinfo ENOTFOUND db.xxxxx.supabase.co
```

**Causes possibles** :
- Host incorrect dans `.env`
- Projet Supabase en pause (après 7 jours d'inactivité)

**Solution** :
1. Vérifiez que `DB_HOST` se termine par `.supabase.co`
2. Allez sur Supabase → Votre projet → **Settings** → **General**
3. Si le projet est en pause, cliquez sur **"Resume project"**
4. Attendez 1-2 minutes puis réessayez

---

### Erreur : `password authentication failed`

**Symptôme** :
```
error: password authentication failed for user "postgres"
```

**Causes possibles** :
- Mot de passe incorrect
- Espaces avant/après le mot de passe
- Copier-coller incomplet

**Solution** :
1. Allez sur Supabase → **Settings** → **Database**
2. Cliquez sur **"Reset database password"**
3. Générez un nouveau mot de passe
4. Mettez à jour `.env` et Render
5. Redémarrez le serveur

---

### Erreur : `relation "activities" does not exist`

**Symptôme** :
```
error: relation "activities" does not exist
```

**Cause** :
- Les tables n'ont pas été créées

**Solution** :
```bash
npm run init-db
```

Si l'erreur persiste :
1. Connectez-vous à Supabase
2. Allez dans **SQL Editor**
3. Exécutez manuellement les requêtes depuis `server/db/schema.sql`

---

### Erreur : `too many connections`

**Symptôme** :
```
Error: sorry, too many clients already
```

**Cause** :
- Plan gratuit Supabase : 2 connexions simultanées maximum
- Connection pool non fermé

**Solution** :
1. Vérifiez que `server/db/pool.js` utilise bien `max: 2`
2. Fermez les anciens processus Node.js :
   ```bash
   # Windows
   taskkill /F /IM node.exe
   
   # Linux/Mac
   killall node
   ```
3. Redémarrez le serveur

---

### Connexion refusée en local

**Symptôme** :
```
Error: Connection refused
```

**Causes possibles** :
- Variables `.env` manquantes ou incorrectes
- IP bloquée par Supabase

**Solution** :
1. Vérifiez que `.env` existe et contient toutes les variables
2. Allez sur Supabase → **Settings** → **Database** → **Connection pooling**
3. Désactivez temporairement **"Enforce SSL"** pour tester
4. Ajoutez votre IP dans **Settings** → **Network** → **Allowed IP addresses**

---

## 🔧 Gestion avancée

### Visualiser les données

#### Via Supabase Table Editor

1. Connectez-vous à Supabase
2. Cliquez sur **Table Editor**
3. Sélectionnez une table
4. Consultez, modifiez, ou supprimez les lignes

#### Via SQL Editor

1. Cliquez sur **SQL Editor**
2. Créez une nouvelle query
3. Exécutez du SQL personnalisé :

```sql
-- Statistiques des messages de contact
SELECT 
  DATE(created_at) as date,
  COUNT(*) as messages
FROM contact_messages
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Articles les plus longs
SELECT title, LENGTH(content) as content_length
FROM articles_blog
ORDER BY content_length DESC
LIMIT 5;
```

### Sauvegardes

#### Sauvegardes automatiques

Supabase effectue des sauvegardes quotidiennes automatiques (rétention 7 jours).

**Accès** :
1. **Settings** → **Database** → **Backups**
2. Consultez l'historique des sauvegardes
3. Cliquez sur **"Restore"** pour restaurer une version

#### Sauvegarde manuelle (export SQL)

1. **SQL Editor** → Nouvelle query
2. Exécutez :
   ```sql
   -- Export toutes les tables
   COPY (SELECT * FROM activities) TO STDOUT WITH CSV HEADER;
   ```
3. Ou utilisez `pg_dump` en local :
   ```bash
   pg_dump "postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres" > backup.sql
   ```

### Monitoring et métriques

1. Allez dans **Reports** (menu de gauche)
2. Consultez :
   - **Database Health** : CPU, mémoire, stockage
   - **API Requests** : Nombre de requêtes par jour
   - **Database Size** : Utilisation du quota 500MB

### Gestion des connexions

**Voir les connexions actives** :
```sql
SELECT 
  pid,
  usename,
  application_name,
  client_addr,
  state,
  query_start
FROM pg_stat_activity
WHERE datname = 'postgres';
```

**Fermer une connexion** :
```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE pid = 12345;  -- Remplacez par le PID
```

### Migration vers un plan payant

Si vous dépassez les limites gratuites :

1. **Settings** → **Billing**
2. Sélectionnez **"Pro Plan"** ($25/mois) :
   - 8 GB de stockage
   - 100 connexions simultanées
   - Support prioritaire
   - Backups illimités

---

## 📊 Limites et quotas

### Plan gratuit (Free Tier)

| Ressource | Limite | Notes |
|-----------|--------|-------|
| **Stockage** | 500 MB | Base de données + fichiers |
| **Bande passante** | 2 GB / mois | Transfer de données |
| **Connexions** | 2 simultanées | Connection pool recommandé |
| **Backups** | 7 jours | Rétention automatique |
| **Pause automatique** | 7 jours d'inactivité | Réveil instantané à la requête |
| **Requêtes** | Illimitées | Pas de limite de READ/WRITE |

### Estimation pour ce projet

**Avec trafic moyen** (100 visiteurs/jour) :

| Métrique | Utilisation estimée | % du quota |
|----------|---------------------|------------|
| Stockage DB | ~5 MB | 1% |
| Connexions | 1-2 | 100% (mais suffisant) |
| Bande passante | ~200 MB/mois | 10% |

**Conclusion** : Le plan gratuit est largement suffisant pour cette application. 🎉

---

## 📚 Ressources complémentaires

### Documentation officielle

- **Supabase Docs** : https://supabase.com/docs
- **PostgreSQL Docs** : https://www.postgresql.org/docs/current/
- **pg (Node.js driver)** : https://node-postgres.com

### Guides utiles

- **Comparaison MySQL vs PostgreSQL** : https://supabase.com/docs/guides/database/postgresql-vs-mysql
- **Connection Pooling** : https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pool
- **Security Best Practices** : https://supabase.com/docs/guides/database/database-security

### Support

- **Discord Supabase** : https://discord.supabase.com
- **GitHub Issues** : https://github.com/supabase/supabase/issues
- **Stack Overflow** : Tag `supabase`

---

<div align="center">

**Configuration réussie ! 🎉**

[⬆️ Retour en haut](#️-guide-de-configuration-supabase) • [Retour au README](README.md)

</div>
