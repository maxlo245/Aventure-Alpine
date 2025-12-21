# Dashboard Admin - Aventures Alpines

## 🔐 Accès Admin

Le dashboard administrateur est maintenant accessible via un compte utilisateur avec le rôle "admin".

**URL** : `/admin/login`

### Configuration initiale

#### 1. Configuration de la base de données

Assurez-vous que votre fichier `.env` est configuré avec les bonnes informations :

```env
DATABASE_URL=votre_url_de_connexion_postgresql
JWT_SECRET=votre_secret_jwt
```

#### 2. Mise à jour du schéma

Le schéma a été mis à jour pour inclure un champ `role` dans la table utilisateurs :

```sql
role VARCHAR(20) DEFAULT 'user' -- 'user' ou 'admin'
```

#### 3. Création du compte admin

**Option A : Avec la base de données configurée**

Exécutez le script de configuration :
```bash
npm run setup-admin
```

Ce script va :
- Ajouter la colonne `role` si elle n'existe pas
- Mettre à jour les utilisateurs existants avec role='user'
- Créer un compte admin avec les identifiants suivants :

**Identifiants par défaut** :
- **Email** : `admin@aventures-alpines.fr`
- **Mot de passe** : `AdminAlpine2025!`

**Option B : Manuellement dans votre base de données**

Si vous préférez créer le compte manuellement :

```sql
-- 1. Ajouter la colonne role
ALTER TABLE utilisateurs 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

-- 2. Créer un compte admin (remplacez le hash par un vrai bcrypt hash)
INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, nom, prenom, role)
VALUES (
  'admin',
  'admin@aventures-alpines.fr',
  '$2a$10$...', -- Hash bcrypt de 'AdminAlpine2025!'
  'Admin',
  'Système',
  'admin'
);

-- 3. Ou mettre à jour un utilisateur existant pour le rendre admin
UPDATE utilisateurs SET role = 'admin' WHERE email = 'votre_email@exemple.com';
```

## 📊 Fonctionnalités du Dashboard

### 1. Vue d'ensemble
- Statistiques en temps réel (utilisateurs, réservations, articles, vidéos)
- Activité récente
- Graphiques de tendances

### 2. Gestion des utilisateurs
- Liste des utilisateurs inscrits
- Gestion des rôles et permissions
- Activation/désactivation de comptes

### 3. Gestion du contenu
- Ajout/modification/suppression d'articles
- Gestion des vidéos
- Gestion des itinéraires de randonnée

### 4. Gestion des réservations
- Vue d'ensemble des réservations
- Confirmation/annulation
- Statistiques de réservation

### 5. Paramètres
- Configuration générale du site
- Sécurité et changement de mot de passe
- Intégrations tierces

## 🔒 Sécurité

- **Authentification JWT** : Les admins doivent se connecter via l'API
- **Rôle vérifié** : Le serveur vérifie le rôle 'admin' avant d'accorder l'accès
- **Session sécurisée** : Token JWT stocké dans localStorage
- **Routes protégées** : Middleware `requireAdmin` sur toutes les routes admin
- **Redirection automatique** : Si non admin, accès refusé

## 🚀 Utilisation

### Se connecter en tant qu'admin

1. Allez sur `http://localhost:5173/admin/login`
2. Entrez vos identifiants d'admin
3. Vous serez redirigé vers le dashboard si vous avez le rôle admin
4. Si vous n'êtes pas admin, un message d'erreur s'affichera

### Créer d'autres comptes admin

Pour promouvoir un utilisateur existant en admin :

```sql
UPDATE utilisateurs 
SET role = 'admin' 
WHERE email = 'email_de_utilisateur@exemple.com';
```

Ou via l'interface admin (à développer) :
- Liste des utilisateurs
- Bouton "Promouvoir en admin"

## 🔧 Configuration technique

### Routes API

- `POST /api/auth/login` - Connexion (retourne le rôle dans user)
- `POST /api/auth/register` - Inscription (role='user' par défaut)
- `GET /api/auth/check-admin` - Vérifier si l'utilisateur est admin (protégée)
- `GET /api/auth/me` - Informations utilisateur avec rôle

### Middleware

- `authenticateToken` - Vérifie le token JWT
- `requireAdmin` - Vérifie que l'utilisateur a le rôle 'admin'

Exemple d'utilisation :
```javascript
app.get('/api/admin/stats', authenticateToken, requireAdmin, (req, res) => {
  // Seulement accessible aux admins
});
```

## 📝 Prochaines étapes

1. ✅ **Intégration base de données** - Fait !
2. ✅ **Hash des mots de passe** - bcrypt implémenté
3. ✅ **API REST** - Routes d'authentification créées
4. ✅ **Système de rôles** - Rôle admin implémenté
5. 🔄 **Interface de gestion des utilisateurs** - À développer
6. 🔄 **Logs d'audit** - À implémenter
7. 🔄 **2FA** - À ajouter pour plus de sécurité

## ⚠️ Notes importantes

**Pour la production** :
- ✅ Mots de passe hashés avec bcrypt
- ✅ Authentification JWT
- ⚠️ **Changer le mot de passe par défaut après première connexion**
- ⚠️ Utiliser HTTPS obligatoirement
- ⚠️ Configurer un JWT_SECRET fort et unique
- 🔄 Ajouter une authentification à deux facteurs (2FA)
- 🔄 Limiter les tentatives de connexion
- 🔄 Logger toutes les actions admin
