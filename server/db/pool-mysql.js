import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
  DATABASE_URL, // Pour les services comme PlanetScale, Railway
} = process.env;

// Créer le pool uniquement si les credentials sont configurés
let pool = null;

// Si DATABASE_URL est fourni (format: mysql://user:password@host:port/database)
if (DATABASE_URL) {
  pool = mysql.createPool({
    uri: DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: false // Nécessaire pour la plupart des hébergeurs cloud
    }
  });
  console.log('✅ Pool MySQL configuré via DATABASE_URL');
} else if (MYSQL_HOST && MYSQL_USER && MYSQL_PASSWORD && MYSQL_DATABASE) {
  pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: Number(MYSQL_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // SSL pour les connexions cloud
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
  });
  console.log('✅ Pool MySQL configuré avec credentials individuels');
} else {
  console.log('⚠️ Base de données MySQL non configurée - Mode localStorage uniquement');
}

// Fonction helper pour exécuter des requêtes
const query = async (sql, params = []) => {
  if (!pool) {
    throw new Error('Base de données non configurée');
  }
  const [results] = await pool.execute(sql, params);
  return results;
};

// Fonction pour tester la connexion
const testConnection = async () => {
  if (!pool) {
    return { success: false, message: 'Pool non configuré' };
  }
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return { success: true, message: 'Connexion MySQL réussie' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export { pool, query, testConnection };
