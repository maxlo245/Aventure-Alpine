import dotenv from 'dotenv';

dotenv.config();

// Détection automatique du type de base de données
const DATABASE_URL = process.env.DATABASE_URL || '';
const isMySQL = DATABASE_URL.startsWith('mysql://') || process.env.MYSQL_HOST;
const isPostgreSQL = DATABASE_URL.startsWith('postgres://') || process.env.DB_HOST;

let pool = null;
let dbType = 'none';

// ============================================
// CONFIGURATION MYSQL (pour phpMyAdmin)
// ============================================
if (isMySQL) {
  const mysql = await import('mysql2/promise');
  
  if (DATABASE_URL.startsWith('mysql://')) {
    pool = mysql.default.createPool({
      uri: DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: { rejectUnauthorized: false }
    });
  } else {
    pool = mysql.default.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: Number(process.env.MYSQL_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
    });
  }
  
  dbType = 'mysql';
  console.log('✅ Pool MySQL configuré');
}

// ============================================
// CONFIGURATION POSTGRESQL (Supabase, etc.)
// ============================================
else if (isPostgreSQL) {
  const pkg = await import('pg');
  const { Pool } = pkg.default;
  
  pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
  });

  pool.on('error', (err) => {
    console.error('Erreur de pool PostgreSQL:', err);
  });

  dbType = 'postgresql';
  console.log('✅ Pool PostgreSQL configuré');
}

// ============================================
// PAS DE BASE DE DONNÉES
// ============================================
else {
  console.log('⚠️ Base de données non configurée - Mode localStorage uniquement');
}

// ============================================
// HELPER UNIFIÉ POUR REQUÊTES
// ============================================
const query = async (sql, params = []) => {
  if (!pool) {
    throw new Error('Base de données non configurée');
  }
  
  if (dbType === 'mysql') {
    // MySQL utilise ? pour les paramètres, convertir $1, $2... si nécessaire
    const mysqlSql = sql.replace(/\$(\d+)/g, '?');
    const [results] = await pool.execute(mysqlSql, params);
    return { rows: results, rowCount: results.length };
  } else {
    // PostgreSQL
    const result = await pool.query(sql, params);
    return result;
  }
};

// Test de connexion
const testConnection = async () => {
  if (!pool) {
    return { success: false, type: 'none', message: 'Pool non configuré' };
  }
  try {
    if (dbType === 'mysql') {
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
    } else {
      await pool.query('SELECT 1');
    }
    return { success: true, type: dbType, message: `Connexion ${dbType.toUpperCase()} réussie` };
  } catch (error) {
    return { success: false, type: dbType, message: error.message };
  }
};

export { pool, query, testConnection, dbType };
