import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;

dotenv.config();

const initDatabase = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
  });

  console.log('Connexion à Supabase...');
  
  try {
    await client.connect();
    console.log('✅ Connexion réussie à Supabase');

    // Table activities
    await client.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(100) NOT NULL,
        description TEXT,
        difficulte VARCHAR(50),
        saison VARCHAR(50),
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table activities créée');

    // Table articles_blog
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles_blog (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(200) NOT NULL,
        contenu TEXT,
        auteur VARCHAR(100),
        date_publication DATE,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table articles_blog créée');

    // Table videos
    await client.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(200) NOT NULL,
        url VARCHAR(255) NOT NULL,
        description TEXT,
        duree VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table videos créée');

    // Table routes
    await client.query(`
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(100) NOT NULL,
        lieu VARCHAR(100),
        distance_km DECIMAL(5,2),
        denivele_m INT,
        difficulte VARCHAR(50),
        description TEXT,
        gpx_file VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table routes créée');

    // Table experiences
    await client.query(`
      CREATE TABLE IF NOT EXISTS experiences (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(200) NOT NULL,
        date_experience DATE,
        lieu VARCHAR(100),
        recit TEXT,
        photos JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table experiences créée');

    // Table contact_messages
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table contact_messages créée');

    // Insérer des données de démonstration (si la table est vide)
    const result = await client.query('SELECT COUNT(*) FROM activities');
    if (result.rows[0].count === 0) {
      await client.query(`
        INSERT INTO activities (nom, description, difficulte, saison, image_url) VALUES
        ('Ski de randonnée', 'Exploration des sommets enneigés', 'Intermédiaire', 'Hiver', '/images/ski.jpg'),
        ('Alpinisme', 'Ascension de sommets mythiques', 'Avancé', 'Été', '/images/alpinisme.jpg'),
        ('VTT', 'Descentes et trails en montagne', 'Tous niveaux', 'Été', '/images/vtt.jpg')
      `);
      console.log('✅ Données de démonstration ajoutées');
    }

    console.log('\n🎉 Base de données Supabase initialisée avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await client.end();
  }
};

initDatabase();
