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

