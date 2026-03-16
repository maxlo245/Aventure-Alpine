CREATE DATABASE IF NOT EXISTS aventures_alpines CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aventures_alpines;

-- ============================================
-- TABLE UTILISATEURS (Connexion / Inscription)
-- ============================================
CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_utilisateur VARCHAR(120) NOT NULL UNIQUE,
  email VARCHAR(180) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL, -- Haché avec bcrypt
  nom VARCHAR(120),
  prenom VARCHAR(120),
  telephone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'user', -- 'user' ou 'admin'
  date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_nom_utilisateur (nom_utilisateur),
  INDEX idx_role (role)
);

-- ============================================
-- TABLE MESSAGES CONTACT (Formulaire de contact)
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  telephone VARCHAR(20),
  message TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'nouveau', -- nouveau, lu, traite
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_email (email)
);

-- ============================================
-- TABLE RESERVATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT,                          -- Lié à un compte (optionnel)
  nom VARCHAR(120) NOT NULL,
  prenom VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  telephone VARCHAR(20),
  activite VARCHAR(120) NOT NULL,              -- Ex: Randonnée, Escalade, Ski
  date_debut DATE NOT NULL,
  date_fin DATE,
  nombre_personnes INT DEFAULT 1,
  niveau VARCHAR(60),                          -- debutant, intermediaire, experimente
  commentaire TEXT,
  prix_total DECIMAL(10,2),
  status VARCHAR(30) DEFAULT 'en_attente',     -- en_attente, confirmee, annulee
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL,
  INDEX idx_utilisateur (utilisateur_id),
  INDEX idx_status (status),
  INDEX idx_date (date_debut),
  INDEX idx_activite (activite)
);

-- ============================================
-- TABLE ACTIVITIES (Sports proposés)
-- ============================================
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  sport VARCHAR(120),
  resume TEXT,
  image_url VARCHAR(500),
  niveau VARCHAR(120),
  saison VARCHAR(120),
  INDEX idx_sport (sport)
);

INSERT IGNORE INTO activities (id, nom, sport, resume, image_url, niveau, saison) VALUES
(1, 'Randonnée', 'Randonnée', 'Itinéraires balisés, dénivelés progressifs et conseils météo pour partir serein.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60', 'Facile à Difficile', 'Printemps à Automne'),
(2, 'Escalade', 'Escalade', 'Sites écoles et grandes voies, niveaux du 4a au 7b avec topos synthétiques.', 'https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=800&q=60', 'Débutant à Confirmé', 'Toute l''année'),
(3, 'Ski', 'Ski', 'Domaine alpin, ski de randonnée et freeride avec conditions neige mises à jour.', 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?auto=format&fit=crop&w=800&q=60', 'Vert à Noir', 'Décembre à Avril'),
(4, 'Alpinisme', 'Alpinisme', 'Courses d''altitude, techniques mixtes et sommets mythiques des Alpes.', 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=60', 'F à D+', 'Été/Hiver selon course'),
(5, 'Via Ferrata', 'Via Ferrata', 'Parcours aériens équipés, du niveau découverte au vertige garanti.', 'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=800&q=60', 'Facile à Très Difficile', 'Mai à Octobre'),
(6, 'Trail Running', 'Trail Running', 'Courses nature en montagne, du 10 km découverte aux ultra-trails exigeants.', 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=60', 'Débutant à Expert', 'Toute l''année');

-- ============================================
-- TABLE EXPERIENCES (Partage d'expériences - Blog)
-- ============================================
CREATE TABLE IF NOT EXISTS experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auteur VARCHAR(120) NOT NULL,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at)
);

