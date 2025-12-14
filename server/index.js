import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { pool } from './db/pool.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors());
app.use(express.json());

// Middleware d'authentification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

const safeQuery = async (res, sql, params = []) => {
  try {
    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (error) {
    console.error('DB error:', error.message);
    return res.status(500).json({ error: 'Erreur base de données' });
  }
};

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, username });
  }
  res.status(401).json({ error: 'Identifiants invalides' });
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'down', message: error.message });
  }
});

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
  const { author, title, body } = req.body;
  if (!author || !title || !body) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO experiences (auteur, titre, contenu) VALUES (?, ?, ?)',
      [author, title, body]
    );
    res.status(201).json({ id: result.insertId, author, title, body, createdAt: new Date() });
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

// Contact messages (protected)
app.get('/api/contact-messages', verifyToken, (req, res) =>
  safeQuery(
    res,
    `SELECT id, nom AS name, email, message, status, created_at AS createdAt
     FROM contact_messages
     ORDER BY created_at DESC`
  )
);

app.post('/api/contact-messages', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO contact_messages (nom, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ id: result.insertId, name, email, message, status: 'nouveau', createdAt: new Date() });
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

app.patch('/api/contact-messages/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status manquant' });
  }
  try {
    await pool.query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true });
  } catch (error) {
    console.error('DB error:', error.message);
    res.status(500).json({ error: 'Erreur base de données' });
  }
});

app.listen(PORT, () => {
  console.log(`API Aventures Alpines en écoute sur http://localhost:${PORT}`);
});
