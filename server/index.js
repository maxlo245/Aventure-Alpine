import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db/pool.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const safeQuery = async (res, sql, params = []) => {
  try {
    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (error) {
    console.error('DB error:', error.message);
    return res.status(500).json({ error: 'Erreur base de données' });
  }
};

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

app.listen(PORT, () => {
  console.log(`API Aventures Alpines en écoute sur http://localhost:${PORT}`);
});
