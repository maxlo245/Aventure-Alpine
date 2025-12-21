import { pool } from './pool.js';
import bcrypt from 'bcryptjs';

async function setupAdmin() {
  if (!pool) {
    console.error('❌ Base de données non configurée');
    console.log('Veuillez configurer les variables d\'environnement dans .env');
    process.exit(1);
  }

  try {
    console.log('🔧 Configuration du système admin...\n');

    // 1. Ajouter la colonne role si elle n'existe pas
    console.log('1️⃣ Ajout de la colonne "role" à la table utilisateurs...');
    try {
      await pool.query(`
        ALTER TABLE utilisateurs 
        ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'
      `);
      console.log('✅ Colonne "role" ajoutée ou déjà existante\n');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Colonne "role" déjà existante\n');
      } else {
        throw error;
      }
    }

    // 2. Mettre à jour les utilisateurs existants sans rôle
    console.log('2️⃣ Mise à jour des utilisateurs existants...');
    const updateResult = await pool.query(`
      UPDATE utilisateurs 
      SET role = 'user' 
      WHERE role IS NULL
    `);
    console.log(`✅ ${updateResult.rowCount} utilisateur(s) mis à jour\n`);

    // 3. Créer un compte admin
    console.log('3️⃣ Création du compte administrateur...');
    
    const adminEmail = 'admin@aventures-alpines.fr';
    const adminUsername = 'admin';
    const adminPassword = 'AdminAlpine2025!';
    
    // Vérifier si l'admin existe déjà
    const existingAdmin = await pool.query(
      'SELECT id, role FROM utilisateurs WHERE email = $1 OR nom_utilisateur = $2',
      [adminEmail, adminUsername]
    );
    
    if (existingAdmin.rows.length > 0) {
      // Mettre à jour l'utilisateur existant pour le rendre admin
      await pool.query(
        'UPDATE utilisateurs SET role = $1 WHERE email = $2 OR nom_utilisateur = $3',
        ['admin', adminEmail, adminUsername]
      );
      console.log('✅ Compte admin existant mis à jour\n');
    } else {
      // Créer un nouveau compte admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await pool.query(`
        INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, nom, prenom, role)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [adminUsername, adminEmail, hashedPassword, 'Admin', 'Système', 'admin']);
      
      console.log('✅ Nouveau compte admin créé\n');
    }

    // 4. Afficher les informations du compte admin
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Configuration terminée avec succès !');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📝 Identifiants admin :');
    console.log('   Email      : admin@aventures-alpines.fr');
    console.log('   Identifiant: admin');
    console.log('   Mot de passe: AdminAlpine2025!');
    console.log('\n🔗 Accès au dashboard : http://localhost:5173/admin/login\n');
    console.log('⚠️  IMPORTANT : Changez le mot de passe en production !\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
    process.exit(1);
  }
}

setupAdmin();
