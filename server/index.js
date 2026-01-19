// ==============================
// API CONTENU PUBLIC (JSON statique)
// ==============================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { pool, query, dbType } from './db/pool.js';
import { authenticateToken, generateToken, requireAdmin } from './middleware/auth.js';
import { articles } from '../src/data/articles.js';
import { videos } from '../src/data/videos.js';
import { sports } from '../src/data/sports.js';
import { routes } from '../src/data/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Articles
app.get('/api/public/articles', (req, res) => {
  res.json(articles);
});

// Vidéos
app.get('/api/public/videos', (req, res) => {
  res.json(videos);
});

// Sports
app.get('/api/public/sports', (req, res) => {
  res.json(sports);
});

// Itinéraires
app.get('/api/public/routes', (req, res) => {
  res.json(routes);
});
app.use(express.json());

const safeQuery = async (res, sql, params = []) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  try {
    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('DB error:', error.message);
    return res.status(500).json({ error: 'Erreur base de données' });
  }
};

app.get('/api/health', async (req, res) => {
  if (!pool) {
    return res.json({ status: 'degraded', message: 'Base de données non configurée - Mode localStorage' });
  }
  try {
    await query('SELECT 1');
    res.json({ status: 'ok', database: dbType, connected: true });
  } catch (error) {
    res.status(500).json({ status: 'down', message: error.message });
  }
});

// Root route for Render health checks and browser tests
app.get('/', (req, res) => {
  res.json({
    name: 'Aventures Alpines API',
    status: pool ? 'running' : 'running (database disabled)',
    database: dbType,
    mode: pool ? 'full' : 'localStorage-only',
    endpoints: [
      '/api/health',
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/me',
      '/api/activities',
      '/api/articles',
      '/api/videos',
      '/api/routes',
      '/api/experiences',
      '/api/contact-messages',
      '/api/sites-escalade',
      '/api/stations-ski',
      '/api/reservations',
      '/api/prestations'
    ],
    note: pool ? 'All endpoints available' : 'Database endpoints disabled - Use localStorage for contact form'
  });
});

// ============================================
// AUTHENTIFICATION
// ============================================

// Inscription
app.post('/api/auth/register', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { nom_utilisateur, email, mot_de_passe, nom, prenom } = req.body;
  
  // Validation
  if (!nom_utilisateur || !email || !mot_de_passe) {
    return res.status(400).json({ error: 'Nom d\'utilisateur, email et mot de passe requis' });
  }
  
  // Vérifier format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Format d\'email invalide' });
  }
  
  // Mot de passe minimum 6 caractères
  if (mot_de_passe.length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
  }
  
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await pool.query(
      'SELECT id FROM utilisateurs WHERE email = $1 OR nom_utilisateur = $2',
      [email, nom_utilisateur]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Cet email ou nom d\'utilisateur est déjà utilisé' });
    }
    
    // Hasher le mot de passe (salt rounds: 10)
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    
    // Créer l'utilisateur
    const result = await pool.query(
      `INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, nom, prenom, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nom_utilisateur, email, nom, prenom, role, date_inscription`,
      [nom_utilisateur, email, hashedPassword, nom || null, prenom || null, 'user']
    );
    
    const user = result.rows[0];
    
    // Générer le token JWT
    const token = generateToken(user);
    
    // Retourner l'utilisateur (sans le mot de passe) et le token
    res.status(201).json({
      message: 'Inscription réussie',
      user: {
        id: user.id,
        nom_utilisateur: user.nom_utilisateur,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        date_inscription: user.date_inscription
      },
      token
    });
  } catch (error) {
    console.error('Erreur inscription:', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

// Connexion
app.post('/api/auth/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;
  
  if (!email || !mot_de_passe) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  // Mode fallback sans base de données pour l'admin
  if (!pool) {
    // Identifiants admin en dur pour le mode sans BDD
    if (email === 'admin@aventures-alpines.fr' && mot_de_passe === 'AdminAlpine2025!') {
      const adminUser = {
        id: 1,
        nom_utilisateur: 'admin',
        email: 'admin@aventures-alpines.fr',
        nom: 'Admin',
        prenom: 'Système',
        role: 'admin',
        date_inscription: new Date()
      };
      
      const token = generateToken(adminUser);
      
      return res.json({
        message: 'Connexion réussie (mode sans BDD)',
        user: adminUser,
        token
      });
    }
    
    return res.status(503).json({ error: 'Base de données non configurée - Utilisez les identifiants admin par défaut' });
  }
  
  try {
    // Chercher l'utilisateur
    const result = await pool.query(
      'SELECT * FROM utilisateurs WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    const user = result.rows[0];
    
    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    // Générer le token
    const token = generateToken(user);
    
    // Retourner l'utilisateur et le token
    res.json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        nom_utilisateur: user.nom_utilisateur,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        date_inscription: user.date_inscription
      },
      token
    });
  } catch (error) {
    console.error('Erreur connexion:', error.message);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Récupérer les infos de l'utilisateur connecté (route protégée)
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  try {
    const result = await pool.query(
      'SELECT id, nom_utilisateur, email, nom, prenom, role, date_inscription FROM utilisateurs WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données utilisateur' });
  }
});

// Vérifier si l'utilisateur est admin
app.get('/api/auth/check-admin', authenticateToken, requireAdmin, (req, res) => {
  res.json({ 
    isAdmin: true,
    user: {
      id: req.user.id,
      nom_utilisateur: req.user.nom_utilisateur,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// ============================================
// SITES D'ESCALADE
// ============================================

app.get('/api/sites-escalade', (req, res) =>
  safeQuery(
    res,
    `SELECT id, nom AS name, description, niveau_difficulte AS difficulty,
            emplacement AS location, site, temps_ascension AS duration, image_url AS image
     FROM sites_escalade
     ORDER BY id DESC`
  )
);

app.post('/api/sites-escalade', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { name, description, difficulty, location, site, duration, image } = req.body;
  
  if (!name || !difficulty) {
    return res.status(400).json({ error: 'Nom et niveau de difficulté requis' });
  }
  
  try {
    const result = await pool.query(
      `INSERT INTO sites_escalade (nom, description, niveau_difficulte, emplacement, site, temps_ascension, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, nom AS name, description, niveau_difficulte AS difficulty,
                 emplacement AS location, site, temps_ascension AS duration, image_url AS image`,
      [name, description || null, difficulty, location || null, site || null, duration || null, image || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur création site escalade:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création du site' });
  }
});

// ============================================
// STATIONS DE SKI
// ============================================

app.get('/api/stations-ski', (req, res) =>
  safeQuery(
    res,
    `SELECT id, nom AS name, description, domaine_skiable AS skiDomain,
            conditions_enneigement AS snowConditions, emplacement AS location,
            remontees_mecaniques AS hasLifts, type_piste AS slopeType, image_url AS image
     FROM stations_ski
     ORDER BY id DESC`
  )
);

app.post('/api/stations-ski', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { name, description, skiDomain, snowConditions, location, hasLifts, slopeType, image } = req.body;
  
  if (!name || !slopeType) {
    return res.status(400).json({ error: 'Nom et type de piste requis' });
  }
  
  try {
    const result = await pool.query(
      `INSERT INTO stations_ski (nom, description, domaine_skiable, conditions_enneigement,
                                  emplacement, remontees_mecaniques, type_piste, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, nom AS name, description, domaine_skiable AS skiDomain,
                 conditions_enneigement AS snowConditions, emplacement AS location,
                 remontees_mecaniques AS hasLifts, type_piste AS slopeType, image_url AS image`,
      [name, description || null, skiDomain || null, snowConditions || null,
       location || null, hasLifts || false, slopeType, image || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur création station ski:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création de la station' });
  }
});

// ============================================
// PRESTATIONS
// ============================================

app.get('/api/prestations', (req, res) =>
  safeQuery(
    res,
    `SELECT id, nom AS name, description, type_activite AS activityType,
            prix_base AS basePrice, duree_jours AS durationDays
     FROM prestations
     ORDER BY id DESC`
  )
);

app.post('/api/prestations', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { name, description, activityType, basePrice, durationDays } = req.body;
  
  if (!name || !basePrice) {
    return res.status(400).json({ error: 'Nom et prix requis' });
  }
  
  try {
    const result = await pool.query(
      `INSERT INTO prestations (nom, description, type_activite, prix_base, duree_jours)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nom AS name, description, type_activite AS activityType,
                 prix_base AS basePrice, duree_jours AS durationDays`,
      [name, description || null, activityType || null, basePrice, durationDays || 1]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur création prestation:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création de la prestation' });
  }
});

// ============================================
// RESERVATIONS
// ============================================

app.get('/api/reservations', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  try {
    const result = await pool.query(
      `SELECT r.id, r.date_debut AS startDate, r.date_fin AS endDate,
              r.nombre_personnes AS numPeople, r.prix_total AS totalPrice,
              r.status, r.created_at AS createdAt,
              c.nom AS clientLastName, c.prenom AS clientFirstName, c.email AS clientEmail,
              p.nom AS prestationName, p.type_activite AS activityType
       FROM reservations r
       JOIN clients c ON r.client_id = c.id
       JOIN prestations p ON r.prestation_id = p.id
       WHERE c.utilisateur_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération réservations:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
});

app.post('/api/reservations', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { prestationId, startDate, endDate, numPeople, totalPrice } = req.body;
  
  if (!prestationId || !startDate || !endDate || !numPeople || !totalPrice) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }
  
  try {
    // Vérifier si le client existe pour cet utilisateur
    let client = await pool.query(
      'SELECT id FROM clients WHERE utilisateur_id = $1',
      [req.user.id]
    );
    
    let clientId;
    
    // Si le client n'existe pas, le créer
    if (client.rows.length === 0) {
      const newClient = await pool.query(
        'INSERT INTO clients (utilisateur_id, nom, prenom) VALUES ($1, $2, $3) RETURNING id',
        [req.user.id, req.user.nom || 'À compléter', req.user.prenom || 'À compléter']
      );
      clientId = newClient.rows[0].id;
    } else {
      clientId = client.rows[0].id;
    }
    
    // Créer la réservation
    const result = await pool.query(
      `INSERT INTO reservations (client_id, prestation_id, date_debut, date_fin, nombre_personnes, prix_total)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, date_debut AS startDate, date_fin AS endDate,
                 nombre_personnes AS numPeople, prix_total AS totalPrice,
                 status, created_at AS createdAt`,
      [clientId, prestationId, startDate, endDate, numPeople, totalPrice]
    );
    
    res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation: result.rows[0]
    });
  } catch (error) {
    console.error('Erreur création réservation:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
  }
});

// ============================================
// ROUTES EXISTANTES
// ============================================


app.get('/api/articles', (req, res) =>
  safeQuery(
    res,
    `SELECT id, titre AS title, contenu AS excerpt, categorie AS category,
            auteur AS author, date_publication AS date, read_time
     FROM articles_blog
     ORDER BY date_publication DESC`
  )
);

app.get('/api/videos', (req, res) =>
  safeQuery(
    res,
    `SELECT id, titre AS title, sport, duree AS duration, vignette AS thumbnail
     FROM videos
     ORDER BY id DESC`
  )
);

app.get('/api/routes', (req, res) =>
  safeQuery(
    res,
    `SELECT id, nom AS name, region, distance_km AS distanceKm, difficulte AS difficulty,
            saison AS season, depart AS start, arrivee AS end, avec_guide AS withGuide
     FROM routes
     ORDER BY id DESC`
  )
);

app.get('/api/activities', (req, res) =>
  safeQuery(
    res,
    `SELECT id, nom AS name, sport, resume AS summary, image_url AS image,
            niveau AS level, saison AS season
     FROM activities
     ORDER BY id DESC`
  )
);

app.get('/api/experiences', (req, res) =>
  safeQuery(
    res,
    `SELECT id, auteur AS author, titre AS title, contenu AS body, created_at AS createdAt
     FROM experiences
     ORDER BY created_at DESC`
  )
);

app.post('/api/experiences', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  const { author, title, body } = req.body;
  if (!author || !title || !body) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO experiences (auteur, titre, contenu) VALUES ($1, $2, $3) RETURNING id, auteur AS author, titre AS title, contenu AS body, created_at AS createdAt',
      [author, title, body]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

// Contact messages
app.get('/api/contact-messages', (req, res) =>
  safeQuery(
    res,
    `SELECT id, nom AS name, email, message, status, created_at AS createdAt
     FROM contact_messages
     ORDER BY created_at DESC`
  )
);

app.post('/api/contact-messages', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id, name, email, message, created_at AS createdAt',
      [name, email, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

app.patch('/api/contact-messages/:id', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status manquant' });
  }
  try {
    await pool.query('UPDATE contact_messages SET status = $1 WHERE id = $2', [status, id]);
    res.json({ success: true });
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

app.listen(PORT, () => {
  console.log(`API Aventures Alpines en écoute sur http://localhost:${PORT}`);
});
