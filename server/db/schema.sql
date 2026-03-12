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

