import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const initDatabase = async () => {
  const connectionConfig = process.env.DATABASE_URL 
    ? { uri: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: Number(process.env.MYSQL_PORT) || 3306,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
        multipleStatements: true // Important pour exécuter plusieurs requêtes
      };

  console.log('\n🔧 Initialisation de la base de données MySQL Aventures Alpines...\n');
  console.log(`📡 Connexion à: ${process.env.MYSQL_HOST || 'via DATABASE_URL'}`);
  
  let connection;
  
  try {
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connexion réussie à MySQL\n');

    // Lire le fichier schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    // Diviser en requêtes individuelles
    const queries = schemaSql
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));

    console.log(`📋 Exécution de ${queries.length} requêtes SQL...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const query of queries) {
      try {
        const isCREATE = query.toUpperCase().includes('CREATE TABLE');
        const isINSERT = query.toUpperCase().includes('INSERT INTO');
        const isDATABASE = query.toUpperCase().includes('CREATE DATABASE') || query.toUpperCase().includes('USE ');
        
        if (isCREATE || isINSERT || isDATABASE) {
          await connection.execute(query);
          
          if (isCREATE) {
            const tableName = query.match(/CREATE TABLE IF NOT EXISTS (\w+)/i)?.[1];
            console.log(`✅ Table créée: ${tableName}`);
          } else if (isINSERT) {
            const tableName = query.match(/INSERT INTO (\w+)/i)?.[1];
            console.log(`✅ Données insérées: ${tableName}`);
          } else if (isDATABASE) {
            console.log(`✅ Commande base de données exécutée`);
          }
          successCount++;
        }
      } catch (error) {
        if (error.message.includes('already exists') || error.message.includes('Duplicate entry')) {
          console.log(`⚠️  Ignoré: ${error.message.split('\n')[0]}`);
        } else {
          console.error(`❌ Erreur:`, error.message.split('\n')[0]);
          errorCount++;
        }
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Résumé:`);
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Erreurs: ${errorCount}`);
    console.log('='.repeat(50));

    // Vérifier les tables créées
    console.log('\n📋 Vérification des tables...\n');
    const [tables] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [process.env.MYSQL_DATABASE || 'aventures_alpines']);

    console.log('Tables créées:');
    tables.forEach(t => console.log(`  - ${t.TABLE_NAME || t.table_name}`));

  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Connexion fermée');
    }
  }
};

// Exécuter si appelé directement
initDatabase().catch(console.error);

export { initDatabase };
