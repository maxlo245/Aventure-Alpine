import pkg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const initDatabase = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  console.log('\n🔧 Initialisation de la base de données Aventures Alpines...\n');
  console.log(`📡 Connexion à: ${process.env.DB_HOST}`);
  
  try {
    await client.connect();
    console.log('✅ Connexion réussie à Supabase PostgreSQL\n');

    // Lire le fichier schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    // Convertir le SQL MySQL en PostgreSQL
    const postgresqlSchema = schemaSql
      // Remplacer AUTO_INCREMENT par SERIAL
      .replace(/INT AUTO_INCREMENT PRIMARY KEY/g, 'SERIAL PRIMARY KEY')
      .replace(/AUTO_INCREMENT/g, '')
      // Supprimer les commandes MySQL spécifiques
      .replace(/CREATE DATABASE IF NOT EXISTS.*?;/g, '')
      .replace(/USE .*?;/g, '')
      .replace(/CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci/g, '')
      // Remplacer CURRENT_DATE par CURRENT_TIMESTAMP::DATE
      .replace(/DEFAULT CURRENT_DATE/g, 'DEFAULT CURRENT_TIMESTAMP::DATE')
      // Nettoyer les espaces multiples
      .replace(/\s+/g, ' ')
      .trim();

    // Diviser en requêtes individuelles (en ignorant les commentaires)
    const queries = postgresqlSchema
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));

    console.log(`📋 Exécution de ${queries.length} requêtes SQL...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const query of queries) {
      try {
        // Détecter le type de requête
        const isCREATE = query.toUpperCase().includes('CREATE TABLE');
        const isINSERT = query.toUpperCase().includes('INSERT INTO');
        
        if (isCREATE || isINSERT) {
          await client.query(query);
          
          if (isCREATE) {
            const tableName = query.match(/CREATE TABLE IF NOT EXISTS (\w+)/i)?.[1];
            console.log(`✅ Table créée: ${tableName}`);
          } else if (isINSERT) {
            const tableName = query.match(/INSERT INTO (\w+)/i)?.[1];
            console.log(`✅ Données insérées: ${tableName}`);
          }
          successCount++;
        }
      } catch (error) {
        // Ignorer les erreurs "table already exists" ou "duplicate key"
        if (error.message.includes('already exists') || error.message.includes('duplicate key')) {
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
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    console.log(`✅ ${result.rows.length} tables détectées:\n`);
    result.rows.forEach((row, index) => {
      console.log(`   ${(index + 1).toString().padStart(2, '0')}. ${row.table_name}`);
    });

    console.log('\n🎉 Initialisation terminée avec succès!\n');

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('👋 Déconnexion de la base de données\n');
  }
};

// Exécuter l'initialisation
initDatabase();
