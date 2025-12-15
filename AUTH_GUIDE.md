# Guide d'Authentification - Aventures Alpines

## 🔐 Système d'authentification JWT

### Fonctionnalités implémentées

- ✅ Inscription utilisateurs avec hashage bcrypt
- ✅ Connexion avec tokens JWT (validité 24h)
- ✅ Dashboard utilisateur personnel
- ✅ Système de réservations
- ✅ Protection des routes sensibles
- ✅ Tables utilisateurs, clients, prestations, reservations

### Architecture

```
┌─────────────┐      ┌──────────────┐      ┌───────────────┐
│   Client    │──────│  JWT Token   │──────│   API Server  │
│  (React)    │      │ (localStorage)│      │  (Express)    │
└─────────────┘      └──────────────┘      └───────────────┘
       │                                            │
       │                                            │
       └────────────────────────────────────────────┘
                        Supabase PostgreSQL
```

### Endpoints API

#### Authentification

**POST /api/auth/register**
```json
{
  "nom_utilisateur": "jeandupont",
  "email": "jean@email.com",
  "mot_de_passe": "motdepasse123",
  "nom": "Dupont",
  "prenom": "Jean"
}
```

**Réponse:**
```json
{
  "message": "Inscription réussie",
  "user": {
    "id": 1,
    "nom_utilisateur": "jeandupont",
    "email": "jean@email.com",
    "nom": "Dupont",
    "prenom": "Jean",
    "date_inscription": "2025-12-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**POST /api/auth/login**
```json
{
  "email": "jean@email.com",
  "mot_de_passe": "motdepasse123"
}
```

**GET /api/auth/me** (Protégé)
```
Headers: Authorization: Bearer <token>
```

#### Sites d'escalade

**GET /api/sites-escalade** - Récupérer tous les sites
**POST /api/sites-escalade** (Protégé) - Créer un site

```json
{
  "name": "Voie du Pilier Sud",
  "description": "Grande voie mythique sur granite",
  "difficulty": "experimente",
  "location": "Massif du Mont-Blanc",
  "site": "Aiguille du Midi",
  "duration": "6h00",
  "image": "url..."
}
```

#### Stations de ski

**GET /api/stations-ski** - Récupérer toutes les stations
**POST /api/stations-ski** (Protégé) - Créer une station

```json
{
  "name": "Les Grands Montets",
  "description": "Station pour skieurs confirmés",
  "skiDomain": "Chamonix Mont-Blanc",
  "snowConditions": "Excellent - 180cm base",
  "location": "Chamonix, Haute-Savoie",
  "hasLifts": true,
  "slopeType": "noire",
  "image": "url..."
}
```

#### Prestations

**GET /api/prestations** - Récupérer toutes les prestations
**POST /api/prestations** (Protégé) - Créer une prestation

```json
{
  "name": "Stage Escalade Débutant",
  "description": "Initiation escalade sur 2 jours",
  "activityType": "escalade",
  "basePrice": 180.00,
  "durationDays": 2
}
```

#### Réservations

**GET /api/reservations** (Protégé) - Mes réservations
**POST /api/reservations** (Protégé) - Créer une réservation

```json
{
  "prestationId": 1,
  "startDate": "2025-07-15",
  "endDate": "2025-07-17",
  "numPeople": 2,
  "totalPrice": 360.00
}
```

### Utilisation Frontend

#### Connexion

```jsx
import axios from 'axios';

const login = async (email, mot_de_passe) => {
  const response = await axios.post('/api/auth/login', {
    email,
    mot_de_passe
  });
  
  // Stocker le token
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
};
```

#### Requêtes authentifiées

```jsx
const token = localStorage.getItem('token');

const getReservations = async () => {
  const response = await axios.get('/api/reservations', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
```

#### Déconnexion

```jsx
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/login');
};
```

### Variables d'environnement

Ajouter dans `.env`:

```bash
# JWT Secret (IMPORTANT: Changer en production!)
JWT_SECRET=votre_secret_tres_securise_a_changer_en_production_min_32_caracteres
```

### Sécurité

#### ✅ Mesures implémentées

1. **Hashage des mots de passe** : bcrypt avec 10 salt rounds
2. **Tokens JWT** : Expiration 24h
3. **Validation des entrées** : Format email, longueur mot de passe
4. **Protection CSRF** : Tokens dans headers (pas de cookies)
5. **HTTPS obligatoire** en production (Vercel/Render)

#### ⚠️ À faire en production

1. Changer `JWT_SECRET` dans les variables d'environnement
2. Ajouter rate limiting (ex: express-rate-limit)
3. Implémenter refresh tokens
4. Ajouter validation email (envoi code confirmation)
5. Implémenter reset mot de passe
6. Ajouter 2FA (optionnel)

### Pages React

#### `/login` - Page de connexion
- Formulaire email/mot de passe
- Validation côté client
- Redirection vers dashboard après connexion

#### `/register` - Page d'inscription
- Formulaire complet avec validation
- Vérification confirmation mot de passe
- Création automatique du compte

#### `/dashboard` - Tableau de bord utilisateur
- Profil utilisateur
- Liste des réservations
- Prestations disponibles
- Liens rapides

### Base de données

#### Nouvelles tables

```sql
-- Utilisateurs
utilisateurs (
  id, nom_utilisateur, email, mot_de_passe, 
  nom, prenom, date_inscription
)

-- Guides
guides (
  id, nom, prenom, specialite, telephone, email, certification
)

-- Sites d'escalade
sites_escalade (
  id, nom, description, niveau_difficulte, emplacement,
  site, temps_ascension, image_url
)

-- Stations de ski
stations_ski (
  id, nom, description, domaine_skiable, conditions_enneigement,
  emplacement, remontees_mecaniques, type_piste, image_url
)

-- Clients
clients (
  id, utilisateur_id, nom, prenom, rue, 
  code_postal, ville, telephone
)

-- Prestations
prestations (
  id, nom, description, type_activite, prix_base, 
  duree_jours, activite_id, site_escalade_id, 
  station_ski_id, route_id
)

-- Réservations
reservations (
  id, client_id, prestation_id, date_debut, date_fin,
  nombre_personnes, prix_total, status, created_at
)
```

#### Relations clés

- `articles_blog.auteur_id` → `utilisateurs.id`
- `experiences.utilisateur_id` → `utilisateurs.id`
- `routes.guide_id` → `guides.id`
- `clients.utilisateur_id` → `utilisateurs.id`
- `reservations.client_id` → `clients.id`
- `reservations.prestation_id` → `prestations.id`

### Middleware d'authentification

```javascript
import { authenticateToken } from './middleware/auth.js';

// Route protégée
app.get('/api/protected', authenticateToken, (req, res) => {
  // req.user contient les données du token
  res.json({ userId: req.user.id });
});
```

### Tests

#### Tester l'inscription
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom_utilisateur": "testuser",
    "email": "test@example.com",
    "mot_de_passe": "password123"
  }'
```

#### Tester la connexion
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "mot_de_passe": "password123"
  }'
```

#### Tester une route protégée
```bash
TOKEN="votre_token_jwt"
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Troubleshooting

#### Erreur: "Token invalide ou expiré"
→ Le token JWT a expiré (24h). Reconnectez-vous.

#### Erreur: "Cet email est déjà utilisé"
→ Un compte existe avec cet email. Utilisez la page de connexion.

#### Erreur: "Base de données non configurée"
→ Vérifiez vos variables d'environnement Supabase.

### Documentation officielle

- **bcryptjs**: https://github.com/dcodeIO/bcrypt.js
- **jsonwebtoken**: https://github.com/auth0/node-jsonwebtoken
- **JWT.io**: https://jwt.io (Décodeur de tokens)
