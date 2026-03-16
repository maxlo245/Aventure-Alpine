// ==============================
// API CONTENU PUBLIC (JSON statique)
// ==============================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { pool, query, dbType } from './db/pool.js';
import { authenticateToken, generateToken, requireAdmin } from './middleware/auth.js';
import { articles } from '../src/data/articles.js';
import { videos } from '../src/data/videos.js';
import { sports } from '../src/data/sports.js';
import { routes } from '../src/data/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==============================
// LOGGER HTTP
// ==============================
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  cyan:   '\x1b[36m',
  blue:   '\x1b[34m',
  magenta:'\x1b[35m',
  gray:   '\x1b[90m',
  white:  '\x1b[97m',
};

function methodColor(method) {
  return { GET: C.green, POST: C.blue, PUT: C.yellow, PATCH: C.yellow, DELETE: C.red }[method] || C.white;
}

function statusColor(code) {
  if (code >= 500) return C.red;
  if (code >= 400) return C.yellow;
  if (code >= 300) return C.cyan;
  return C.green;
}

app.use((req, res, next) => {
  const start = Date.now();
  const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
  res.on('finish', () => {
    const ms = Date.now() - start;
    const mc = methodColor(req.method);
    const sc = statusColor(res.statusCode);
    console.log(
      `${C.gray}[${ts}]${C.reset} ` +
      `${mc}${C.bold}${req.method.padEnd(6)}${C.reset} ` +
      `${C.white}${req.originalUrl.padEnd(40)}${C.reset} ` +
      `${sc}${C.bold}${res.statusCode}${C.reset} ` +
      `${C.gray}${ms}ms${C.reset}`
    );
  });
  next();
});

// Auto-création des tables manquantes au démarrage
if (pool) {
  query(`CREATE TABLE IF NOT EXISTS experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    auteur VARCHAR(120) NOT NULL,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
  )`).catch(() => {});
}

// ==============================
// ANTIROBOT IP VALIDATION
// ==============================
const validatedIPs = new Set();

function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
}

app.get('/api/antirobot-check', (req, res) => {
  const ip = getClientIp(req);
  res.json({ validated: validatedIPs.has(ip) });
});

app.post('/api/antirobot-validate', (req, res) => {
  const ip = getClientIp(req);
  validatedIPs.add(ip);
  res.json({ success: true });
});

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

// ============================================
// LOGGER BASE DE DONNÉES
// ============================================
const COLORS = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  cyan:   '\x1b[36m',
  blue:   '\x1b[34m',
  gray:   '\x1b[90m',
};

const ICONS = { INSERT: '➕', UPDATE: '✏️ ', DELETE: '🗑️ ', LOGIN: '🔑', LOGOUT: '🔒' };

function dbLog(operation, table, details = {}) {
  const ts = new Date().toLocaleString('fr-FR', { hour12: false });
  const color = {
    INSERT: COLORS.green,
    UPDATE: COLORS.yellow,
    DELETE: COLORS.red,
    LOGIN:  COLORS.cyan,
  }[operation] || COLORS.blue;

  const icon = ICONS[operation] || '•';
  const detailStr = Object.entries(details)
    .map(([k, v]) => `${COLORS.gray}${k}${COLORS.reset}=${COLORS.bold}${v}${COLORS.reset}`)
    .join('  ');

  console.log(
    `${COLORS.gray}[${ts}]${COLORS.reset} ` +
    `${color}${COLORS.bold}[DB ${operation}]${COLORS.reset} ` +
    `${icon}  ` +
    `${COLORS.blue}${COLORS.bold}${table}${COLORS.reset}` +
    (detailStr ? `  ${detailStr}` : '')
  );
}

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
    const existingUser = await query(
      'SELECT id FROM utilisateurs WHERE email = $1 OR nom_utilisateur = $2',
      [email, nom_utilisateur]
    );
    
    if (existingUser.rows.length > 0) {
      const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
      console.log(`${C.gray}[${ts}]${C.reset} ${C.yellow}${C.bold}REGISTER REFUSÉ${C.reset}  email/username déjà utilisé → ${C.yellow}${email}${C.reset}`);
      return res.status(409).json({ error: 'Cet email ou nom d\'utilisateur est déjà utilisé' });
    }
    
    // Hasher le mot de passe (salt rounds: 10)
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    
    // Créer l'utilisateur
    const result = await query(
      `INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, nom, prenom, role)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nom_utilisateur, email, hashedPassword, nom || null, prenom || null, 'user']
    );
    const newId = result.rows?.insertId ?? result.insertId;
    const user = { id: newId, nom_utilisateur, email, nom: nom || null, prenom: prenom || null, role: 'user', date_inscription: new Date() };
    dbLog('INSERT', 'utilisateurs', { id: newId, email, role: 'user' });
    const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
    console.log(`${C.gray}[${ts}]${C.reset} ${C.green}${C.bold}✔ INSCRIPTION${C.reset}       @${C.white}${nom_utilisateur}${C.reset} — ${email} — rôle: user`);
    
    // Générer le token JWT
    const token = generateToken(user);
    
    // Retourner l'utilisateur (sans le mot de passe) et le token
    res.status(201).json({
      message: 'Inscription réussie',
      user,
      token
    });
  } catch (error) {
    const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
    console.log(`${C.gray}[${ts}]${C.reset} ${C.red}${C.bold}✖ INSCRIPTION ERREUR${C.reset} ${error.message}`);
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
    const result = await query(
      'SELECT * FROM utilisateurs WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
      console.log(`${C.gray}[${ts}]${C.reset} ${C.red}${C.bold}✖ CONNEXION REFUSÉE${C.reset} email inconnu → ${C.yellow}${email}${C.reset}`);
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    const user = result.rows[0];
    
    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    
    if (!validPassword) {
      const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
      console.log(`${C.gray}[${ts}]${C.reset} ${C.red}${C.bold}✖ CONNEXION REFUSÉE${C.reset} mot de passe incorrect → ${C.yellow}${email}${C.reset}`);
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    dbLog('LOGIN', 'utilisateurs', { id: user.id, email: user.email, role: user.role });
    const ts2 = new Date().toLocaleTimeString('fr-FR', { hour12: false });
    const roleLabel = user.role === 'admin' ? `${C.magenta}${C.bold}ADMIN${C.reset}` : `${C.cyan}user${C.reset}`;
    console.log(`${C.gray}[${ts2}]${C.reset} ${C.green}${C.bold}✔ CONNEXION${C.reset}         @${C.white}${user.nom_utilisateur}${C.reset} — ${user.email} — rôle: ${roleLabel}`);
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
    const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
    console.log(`${C.gray}[${ts}]${C.reset} ${C.red}${C.bold}✖ CONNEXION ERREUR${C.reset}   ${error.message}`);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Déconnexion (log côté serveur)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  const ts = new Date().toLocaleTimeString('fr-FR', { hour12: false });
  const u = req.user;
  console.log(`${C.gray}[${ts}]${C.reset} ${C.yellow}${C.bold}◀ DÉCONNEXION${C.reset}        @${C.white}${u.nom_utilisateur || u.email}${C.reset} — id: ${u.id}`);
  res.json({ message: 'Déconnexion enregistrée' });
});

// Récupérer les infos de l'utilisateur connecté (route protégée)
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  try {
    const result = await query(
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

app.get('/api/sites-escalade', async (req, res) => {
  if (!pool) return res.json([]);
  try {
    const result = await query(
      `SELECT id, nom AS name, description, niveau_difficulte AS difficulty,
              emplacement AS location, site, temps_ascension AS duration, image_url AS image
       FROM sites_escalade
       ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/sites-escalade', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { name, description, difficulty, location, site, duration, image } = req.body;
  
  if (!name || !difficulty) {
    return res.status(400).json({ error: 'Nom et niveau de difficulté requis' });
  }
  
  try {
    const result = await query(
      `INSERT INTO sites_escalade (nom, description, niveau_difficulte, emplacement, site, temps_ascension, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, description || null, difficulty, location || null, site || null, duration || null, image || null]
    );
    dbLog('INSERT', 'sites_escalade', { nom: name, difficulte: difficulty });
    res.status(201).json({ id: result.insertId, name, description, difficulty, location, site, duration, image });
  } catch (error) {
    console.error('Erreur création site escalade:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création du site' });
  }
});

// ============================================
// STATIONS DE SKI
// ============================================

app.get('/api/stations-ski', async (req, res) => {
  if (!pool) return res.json([]);
  try {
    const result = await query(
      `SELECT id, nom AS name, description, domaine_skiable AS skiDomain,
              conditions_enneigement AS snowConditions, emplacement AS location,
              remontees_mecaniques AS hasLifts, type_piste AS slopeType, image_url AS image
       FROM stations_ski
       ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/stations-ski', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { name, description, skiDomain, snowConditions, location, hasLifts, slopeType, image } = req.body;
  
  if (!name || !slopeType) {
    return res.status(400).json({ error: 'Nom et type de piste requis' });
  }
  
  try {
    const result = await query(
      `INSERT INTO stations_ski (nom, description, domaine_skiable, conditions_enneigement,
                                  emplacement, remontees_mecaniques, type_piste, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, description || null, skiDomain || null, snowConditions || null,
       location || null, hasLifts || false, slopeType, image || null]
    );
    dbLog('INSERT', 'stations_ski', { nom: name, piste: slopeType });
    res.status(201).json({ id: result.insertId, name, description, skiDomain, snowConditions, location, hasLifts, slopeType, image });
  } catch (error) {
    console.error('Erreur création station ski:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création de la station' });
  }
});

// ============================================
// PRESTATIONS
// ============================================

app.get('/api/prestations', async (req, res) => {
  if (!pool) return res.json([]);
  try {
    const result = await query(
      `SELECT id, nom AS name, description, type_activite AS activityType,
              prix_base AS basePrice, duree_jours AS durationDays
       FROM prestations
       ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/prestations', authenticateToken, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  
  const { name, description, activityType, basePrice, durationDays } = req.body;
  
  if (!name || !basePrice) {
    return res.status(400).json({ error: 'Nom et prix requis' });
  }
  
  try {
    const result = await query(
      `INSERT INTO prestations (nom, description, type_activite, prix_base, duree_jours)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, description || null, activityType || null, basePrice, durationDays || 1]
    );
    dbLog('INSERT', 'prestations', { nom: name, prix: basePrice, type: activityType });
    res.status(201).json({ id: result.insertId, name, description, activityType, basePrice, durationDays });
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
    const result = await query(
      `SELECT id, nom, prenom, email, activite, date_debut, date_fin,
              nombre_personnes, niveau, commentaire, prix_total, status, created_at
       FROM reservations
       WHERE utilisateur_id = $1
       ORDER BY created_at DESC`,
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
  
  const { nom, prenom, email, telephone, activite, date_debut, date_fin, nombre_personnes, niveau, commentaire, prix_total } = req.body;
  
  if (!activite || !date_debut || !nom || !prenom || !email) {
    return res.status(400).json({ error: 'Les champs nom, prénom, email, activité et date sont requis' });
  }
  
  try {
    const result = await query(
      `INSERT INTO reservations (utilisateur_id, nom, prenom, email, telephone, activite, date_debut, date_fin, nombre_personnes, niveau, commentaire, prix_total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [req.user.id, nom, prenom, email, telephone || null, activite, date_debut, date_fin || null, nombre_personnes || 1, niveau || null, commentaire || null, prix_total || null]
    );
    dbLog('INSERT', 'reservations', { utilisateur_id: req.user.id, activite, date_debut, nom, prenom });
    res.status(201).json({
      message: 'Réservation créée avec succès'
    });
  } catch (error) {
    console.error('Erreur création réservation:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
  }
});

// ============================================
// ROUTES EXISTANTES
// ============================================


app.get('/api/articles', async (req, res) => {
  if (!pool) return res.json(articles);
  try {
    const result = await query(
      `SELECT id, titre AS title, contenu AS excerpt, categorie AS category,
              auteur AS author, date_publication AS date, read_time
       FROM articles_blog
       ORDER BY date_publication DESC`
    );
    res.json(result.rows);
  } catch {
    res.json(articles);
  }
});

app.get('/api/videos', async (req, res) => {
  if (!pool) return res.json(videos);
  try {
    const result = await query(
      `SELECT id, titre AS title, sport, duree AS duration, vignette AS thumbnail
       FROM videos
       ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch {
    res.json(videos);
  }
});

app.get('/api/routes', async (req, res) => {
  if (!pool) return res.json(routes);
  try {
    const result = await query(
      `SELECT id, nom AS name, region, distance_km AS distanceKm, difficulte AS difficulty,
              saison AS season, depart AS start, arrivee AS end, avec_guide AS withGuide
       FROM routes
       ORDER BY id DESC`
    );
    if (!result.rows.length) return res.json(routes);
    res.json(result.rows);
  } catch {
    res.json(routes);
  }
});

app.get('/api/activities', async (req, res) => {
  if (!pool) return res.json(sports);
  try {
    const result = await query(
      `SELECT id, nom AS name, sport, resume AS summary, image_url AS image,
              niveau AS level, saison AS season
       FROM activities
       ORDER BY id DESC`
    );
    if (!result.rows.length) return res.json(sports);
    res.json(result.rows);
  } catch {
    res.json(sports);
  }
});

app.get('/api/experiences', async (req, res) => {
  if (!pool) return res.json([]);
  try {
    const result = await query(
      `SELECT id, auteur AS author, titre AS title, contenu AS body, created_at AS createdAt
       FROM experiences
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/experiences', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  const { author, title, body } = req.body;
  if (!author || !title || !body) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  try {
    const result = await query(
      'INSERT INTO experiences (auteur, titre, contenu) VALUES ($1, $2, $3)',
      [author, title, body]
    );
    const newId = result.rows?.insertId || result.insertId;
    dbLog('INSERT', 'experiences', { auteur: author, titre: title });
    res.status(201).json({ id: newId, author, title, body, createdAt: new Date() });
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

// Contact messages
app.get('/api/contact-messages', async (req, res) => {
  if (!pool) return res.json([]);
  try {
    const result = await query(
      `SELECT id, nom AS name, email, message, status, created_at AS createdAt
       FROM contact_messages
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch {
    res.json([]);
  }
});

app.post('/api/contact-messages', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Base de données non configurée' });
  }
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  try {
    const result = await query(
      'INSERT INTO contact_messages (nom, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    const newId = result.rows?.insertId || result.insertId;
    dbLog('INSERT', 'contact_messages', { email, nom: name });
    res.status(201).json({ id: newId, name, email, message, createdAt: new Date() });
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
    await query('UPDATE contact_messages SET status = $1 WHERE id = $2', [status, id]);
    dbLog('UPDATE', 'contact_messages', { id, status });
    res.json({ success: true });
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

// ============================================
// INSCRIPTIONS AUX ACTIVITÉS
// ============================================

app.post('/api/inscriptions', async (req, res) => {
  // Auth optionnelle : si un token est fourni, on lie la réservation au compte
  let utilisateur_id = null;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const jwt = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt_a_changer_en_production';
      const decoded = jwt.default.verify(authHeader.split(' ')[1], JWT_SECRET);
      utilisateur_id = decoded.id;
    } catch { /* token invalide ou absent, on continue sans lié */ }
  }

  const {
    nom, prenom, email, telephone,
    activite, date_debut, date_fin,
    nombre_personnes, niveau, commentaire, prix_total
  } = req.body;

  // Validation serveur
  if (!nom || !prenom || !email || !telephone || !activite || !date_debut || !nombre_personnes) {
    return res.status(400).json({ error: 'Champs obligatoires manquants (nom, prénom, email, téléphone, activité, date_debut, nombre_personnes)' });
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Format d\'email invalide' });
  }
  if (parseInt(nombre_personnes) < 1 || parseInt(nombre_personnes) > 20) {
    return res.status(400).json({ error: 'Nombre de participants entre 1 et 20' });
  }

  const numero = 'ALP-' + Date.now().toString(36).toUpperCase();

  try {
    if (pool) {
      await query(
        `INSERT INTO reservations
           (utilisateur_id, nom, prenom, email, telephone, activite, date_debut, date_fin,
            nombre_personnes, niveau, commentaire, prix_total, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'en_attente')`,
        [
          utilisateur_id || null,
          nom.trim(), prenom.trim(), email.trim(), telephone.trim(),
          activite, date_debut, date_fin || null,
          parseInt(nombre_personnes), niveau || null,
          commentaire || null, prix_total ? parseFloat(prix_total) : null
        ]
      );
      dbLog('INSERT', 'reservations (inscription)', { numero, email, activite, debut: date_debut, personnes: nombre_personnes, prix: prix_total });
    } else {
      dbLog('INSERT', 'reservations (inscription — mode dégradé)', { numero, email, activite });
    }
    res.status(201).json({ message: 'Inscription enregistrée', numero });
  } catch (error) {
    console.error('Erreur inscription activité:', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'inscription' });
  }
});

app.get('/api/inscriptions', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, nom, prenom, email, telephone, activite,
              date_debut, date_fin, nombre_personnes, niveau,
              commentaire, prix_total, status, created_at
       FROM reservations
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération inscriptions:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

// ==============================
// SERVIR LE FRONTEND EN PRODUCTION (Docker)
// ==============================
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  const line = '═'.repeat(60);
  console.log(`\n${C.cyan}${C.bold}${line}${C.reset}`);
  console.log(`${C.cyan}${C.bold}  AVENTURES ALPINES — API SERVER${C.reset}`);
  console.log(`${C.cyan}${C.bold}${line}${C.reset}`);
  console.log(`  ${C.green}${C.bold}URL     ${C.reset}: http://localhost:${PORT}`);
  console.log(`  ${C.green}${C.bold}DB      ${C.reset}: ${pool ? C.green + 'MySQL connecté' + C.reset : C.yellow + 'Mode local (pas de DB)' + C.reset}`);
  console.log(`  ${C.green}${C.bold}ENV     ${C.reset}: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  ${C.green}${C.bold}Routes  ${C.reset}: /api/articles · /api/activities · /api/routes`);
  console.log(`           /api/experiences · /api/auth/* · /api/reservations`);
  console.log(`${C.cyan}${C.bold}${line}${C.reset}\n`);
  console.log(`${C.gray}En attente de requêtes...${C.reset}\n`);
});
