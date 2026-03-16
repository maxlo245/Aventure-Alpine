import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'aventures_alpines',
  port: Number(process.env.MYSQL_PORT) || 3306,
});

// Table experiences
await conn.execute(`
  CREATE TABLE IF NOT EXISTS experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    auteur VARCHAR(120) NOT NULL,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
  )
`);
console.log('✅ Table experiences créée');

await conn.end();


const rows = [
  [1, 'Randonnée',    'Randonnée',    'Itinéraires balisés, dénivelés progressifs et conseils météo pour partir serein.',   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60', 'Facile à Difficile',       'Printemps à Automne'],
  [2, 'Escalade',     'Escalade',     'Sites écoles et grandes voies, niveaux du 4a au 7b avec topos synthétiques.',         'https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=800&q=60', 'Débutant à Confirmé',      'Toute l\'année'],
  [3, 'Ski',          'Ski',          'Domaine alpin, ski de randonnée et freeride avec conditions neige mises à jour.',     'https://images.unsplash.com/photo-1559386484-97dfc0e15539?auto=format&fit=crop&w=800&q=60', 'Vert à Noir',              'Décembre à Avril'],
  [4, 'Alpinisme',    'Alpinisme',    'Courses d\'altitude, techniques mixtes et sommets mythiques des Alpes.',              'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=60', 'F à D+',                   'Été/Hiver selon course'],
  [5, 'Via Ferrata',  'Via Ferrata',  'Parcours aériens équipés, du niveau découverte au vertige garanti.',                 'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=800&q=60', 'Facile à Très Difficile',  'Mai à Octobre'],
  [6, 'Trail Running','Trail Running','Courses nature en montagne, du 10 km découverte aux ultra-trails exigeants.',         'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=60', 'Débutant à Expert',        'Toute l\'année'],
];

for (const r of rows) {
  await conn.execute(
    'INSERT IGNORE INTO activities (id, nom, sport, resume, image_url, niveau, saison) VALUES (?, ?, ?, ?, ?, ?, ?)',
    r
  );
}
console.log('✅ 6 activités insérées');
await conn.end();
