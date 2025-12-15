import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = process.env;

// Créer le pool uniquement si les credentials sont configurés
let pool = null;

if (DB_HOST && DB_USER && DB_PASSWORD && DB_NAME) {
  pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT) || 5432,
  });

  pool.on('error', (err) => {
    console.error('Erreur de pool:', err);
  });

  console.log('✅ Pool PostgreSQL configuré');
} else {
  console.log('⚠️ Base de données non configurée - Mode localStorage uniquement');
}

export { pool };
