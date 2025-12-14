import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'postgres',
  DB_PASSWORD = '',
  DB_NAME = 'aventures_alpines',
  DB_PORT = 5432,
} = process.env;

export const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
});

// Test de connexion au démarrage
pool.on('error', (err) => {
  console.error('Erreur de pool:', err);
});
