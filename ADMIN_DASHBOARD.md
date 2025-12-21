# Dashboard Admin - Aventures Alpines

## 🔐 Accès Admin

Le dashboard administrateur est maintenant accessible via :

**URL** : `/admin/login`

### Identifiants par défaut

- **Identifiant** : `admin`
- **Mot de passe** : `AdminAlpine2025!`

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

- Authentification requise pour accéder au dashboard
- Session stockée dans localStorage
- Redirection automatique si non authentifié
- Déconnexion sécurisée

## 🚀 Prochaines étapes

1. **Intégration base de données** : Connecter le dashboard à une vraie base de données
2. **Hash des mots de passe** : Implémenter bcrypt pour sécuriser les mots de passe
3. **API REST** : Créer des endpoints pour toutes les opérations CRUD
4. **Gestion des permissions** : Système de rôles avancé
5. **Logs d'audit** : Tracer toutes les actions admin

## 📝 Notes importantes

⚠️ **Pour la production** :
- Changer le mot de passe par défaut
- Stocker les identifiants dans une base de données avec hash
- Implémenter JWT pour les sessions
- Ajouter une authentification à deux facteurs (2FA)
- Utiliser HTTPS obligatoirement
