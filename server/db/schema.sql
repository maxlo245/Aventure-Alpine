CREATE DATABASE IF NOT EXISTS aventures_alpines CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aventures_alpines;

-- ============================================
-- TABLE UTILISATEURS (Mission 3 - Authentification)
-- ============================================
CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_utilisateur VARCHAR(120) NOT NULL UNIQUE,
  email VARCHAR(180) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL, -- Haché avec bcrypt
  nom VARCHAR(120),
  prenom VARCHAR(120),
  date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_nom_utilisateur (nom_utilisateur)
);

-- ============================================
-- TABLE GUIDES (Mission 1 - Pour randonnées)
-- ============================================
CREATE TABLE IF NOT EXISTS guides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  prenom VARCHAR(120) NOT NULL,
  specialite VARCHAR(60), -- Randonnée, Escalade, Ski
  telephone VARCHAR(20),
  email VARCHAR(180),
  certification VARCHAR(200),
  INDEX idx_specialite (specialite)
);

-- ============================================
-- TABLE ACTIVITES GENERIQUES
-- ============================================
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  sport VARCHAR(60) NOT NULL,
  resume TEXT,
  image_url TEXT,
  niveau VARCHAR(60),
  saison VARCHAR(60),
  type_loisir VARCHAR(60), -- 'loisir', 'competition'
  public_cible VARCHAR(60), -- 'famille', 'experimente', 'sensations_fortes'
  INDEX idx_sport (sport),
  INDEX idx_niveau (niveau)
);

-- ============================================
-- TABLE SITES ESCALADE (Mission 1 & 3)
-- ============================================
CREATE TABLE IF NOT EXISTS sites_escalade (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(180) NOT NULL,
  description TEXT,
  niveau_difficulte VARCHAR(60), -- facile, moyen, difficile, experimente
  emplacement VARCHAR(200),
  site VARCHAR(200), -- Nom du site d'escalade
  temps_ascension VARCHAR(60), -- Ex: "3h30"
  image_url TEXT,
  INDEX idx_niveau (niveau_difficulte)
);

-- ============================================
-- TABLE STATIONS SKI (Mission 1 & 3)
-- ============================================
CREATE TABLE IF NOT EXISTS stations_ski (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(180) NOT NULL,
  description TEXT,
  domaine_skiable VARCHAR(200),
  conditions_enneigement TEXT,
  emplacement VARCHAR(200),
  remontees_mecaniques BOOLEAN DEFAULT FALSE,
  type_piste VARCHAR(60), -- verte, bleue, rouge, noire
  image_url TEXT,
  INDEX idx_type_piste (type_piste)
);

-- ============================================
-- TABLE RANDONNEES (Avec relation Guide)
-- ============================================
CREATE TABLE IF NOT EXISTS routes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(160) NOT NULL,
  region VARCHAR(120),
  lieu_depart VARCHAR(120),
  lieu_arrivee VARCHAR(120),
  distance_km DECIMAL(5,2),
  difficulte VARCHAR(60),
  saison VARCHAR(60),
  praticable_ete BOOLEAN DEFAULT TRUE,
  praticable_hiver BOOLEAN DEFAULT FALSE,
  avec_guide BOOLEAN DEFAULT FALSE,
  guide_id INT,
  FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE SET NULL,
  INDEX idx_difficulte (difficulte),
  INDEX idx_region (region)
);

-- ============================================
-- TABLE ARTICLES BLOG (Avec auteur)
-- ============================================
CREATE TABLE IF NOT EXISTS articles_blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(200) NOT NULL,
  contenu TEXT,
  categorie VARCHAR(80),
  auteur VARCHAR(120), -- Temporaire pour compatibilité
  auteur_id INT, -- Clé étrangère vers utilisateurs
  date_publication DATE DEFAULT CURRENT_DATE,
  read_time INT DEFAULT 5,
  FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL,
  INDEX idx_auteur_id (auteur_id),
  INDEX idx_categorie (categorie)
);

-- ============================================
-- TABLE VIDEOS
-- ============================================
CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(180) NOT NULL,
  sport VARCHAR(60),
  duree VARCHAR(12),
  vignette TEXT,
  INDEX idx_sport (sport)
);

-- ============================================
-- TABLE EXPERIENCES (Partage utilisateurs)
-- ============================================
CREATE TABLE IF NOT EXISTS experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auteur VARCHAR(120) NOT NULL, -- Temporaire
  utilisateur_id INT, -- Clé étrangère vers utilisateurs
  titre VARCHAR(180) NOT NULL,
  contenu TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  INDEX idx_utilisateur_id (utilisateur_id)
);

-- ============================================
-- TABLE MESSAGES CONTACT
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'nouveau',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status)
);

-- ============================================
-- SYSTEME DE RESERVATION (Mission 1)
-- ============================================

-- Table Clients
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT UNIQUE, -- Lien avec utilisateurs
  nom VARCHAR(120) NOT NULL,
  prenom VARCHAR(120) NOT NULL,
  rue VARCHAR(200),
  code_postal VARCHAR(10),
  ville VARCHAR(120),
  telephone VARCHAR(20),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  INDEX idx_utilisateur (utilisateur_id)
);

-- Table Prestations
CREATE TABLE IF NOT EXISTS prestations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(180) NOT NULL,
  description TEXT,
  type_activite VARCHAR(60), -- randonnee, escalade, ski
  activite_id INT, -- Référence générique
  site_escalade_id INT,
  station_ski_id INT,
  route_id INT,
  prix_base DECIMAL(10,2),
  duree_jours INT DEFAULT 1,
  FOREIGN KEY (activite_id) REFERENCES activities(id) ON DELETE SET NULL,
  FOREIGN KEY (site_escalade_id) REFERENCES sites_escalade(id) ON DELETE SET NULL,
  FOREIGN KEY (station_ski_id) REFERENCES stations_ski(id) ON DELETE SET NULL,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE SET NULL,
  INDEX idx_type (type_activite)
);

-- Table Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  prestation_id INT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  nombre_personnes INT DEFAULT 1,
  prix_total DECIMAL(10,2) NOT NULL,
  status VARCHAR(60) DEFAULT 'en_attente', -- en_attente, confirmee, annulee
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (prestation_id) REFERENCES prestations(id) ON DELETE CASCADE,
  INDEX idx_client (client_id),
  INDEX idx_prestation (prestation_id),
  INDEX idx_dates (date_debut, date_fin),
  INDEX idx_status (status)
);

);

-- ============================================
-- DONNEES DE TEST
-- ============================================

-- Guides
INSERT INTO guides (nom, prenom, specialite, telephone, email, certification) VALUES
('Dupont', 'Pierre', 'Randonnée', '+33612345678', 'pierre.dupont@guides-montagne.fr', 'Guide Haute Montagne UIAGM'),
('Martin', 'Sophie', 'Escalade', '+33687654321', 'sophie.martin@guides-montagne.fr', 'Moniteur Escalade FFME'),
('Bernard', 'Luc', 'Ski', '+33698765432', 'luc.bernard@guides-montagne.fr', 'Moniteur Ski ESF');

-- Activités génériques
INSERT INTO activities (nom, sport, resume, image_url, niveau, saison, type_loisir, public_cible) VALUES
('Randonnée en balcon', 'Randonnée', 'Boucle panoramique pour débuter en douceur.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60', 'Facile', 'Été', 'loisir', 'famille'),
('Grande voie école', 'Escalade', '200 m équipés, idéal pour progresser en tête.', 'https://images.unsplash.com/photo-1509644851169-2acc09a45ca0?auto=format&fit=crop&w=800&q=60', 'Intermédiaire', 'Été', 'loisir', 'experimente'),
('Ski de rando poudreuse', 'Ski', 'Sortie D+1200m avec brief sécurité avalanche.', 'https://images.unsplash.com/photo-1456120573098-9d5db83386f0?auto=format&fit=crop&w=800&q=60', 'Difficile', 'Hiver', 'competition', 'sensations_fortes');

-- Sites d'escalade
INSERT INTO sites_escalade (nom, description, niveau_difficulte, emplacement, site, temps_ascension, image_url) VALUES
('Voie du Pilier Sud', 'Grande voie mythique sur granite parfait', 'experimente', 'Massif du Mont-Blanc', 'Aiguille du Midi', '6h00', 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=60'),
('Dalle des Gaillands', 'Site école idéal pour débutants', 'facile', 'Chamonix', 'Les Gaillands', '2h00', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60'),
('Paroi des Aravis', 'Voies sportives dans les Aravis', 'moyen', 'Haute-Savoie', 'Col des Aravis', '3h30', 'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=800&q=60');

-- Stations de ski
INSERT INTO stations_ski (nom, description, domaine_skiable, conditions_enneigement, emplacement, remontees_mecaniques, type_piste, image_url) VALUES
('Les Grands Montets', 'Station pour skieurs confirmés avec poudreuse légendaire', 'Chamonix Mont-Blanc', 'Excellent - 180cm base', 'Chamonix, Haute-Savoie', TRUE, 'noire', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=60'),
('Domaine des Portes du Soleil', 'Plus grand domaine skiable d\'Europe', 'Portes du Soleil', 'Bon - 120cm base', 'Morzine-Avoriaz', TRUE, 'rouge', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=800&q=60'),
('Station Village Famille', 'Idéal pour apprendre en famille', 'Petit domaine familial', 'Correct - 80cm base', 'Les Carroz', TRUE, 'verte', 'https://images.unsplash.com/photo-1498146831523-fbe41acdc5ad?auto=format&fit=crop&w=800&q=60');

-- Randonnées (avec guides)
INSERT INTO routes (nom, region, lieu_depart, lieu_arrivee, distance_km, difficulte, saison, praticable_ete, praticable_hiver, avec_guide, guide_id) VALUES
('Tour des Aiguilles Rouges', 'Haute-Savoie', 'Chamonix', 'Chamonix', 17.0, 'Intermédiaire', 'Été', TRUE, FALSE, FALSE, NULL),
('Glacier Blanc', 'Écrins', 'Pré de Madame Carle', 'Refuge du Glacier Blanc', 12.0, 'Difficile', 'Été', TRUE, FALSE, TRUE, 1),
('Crêtes du Vercors', 'Isère', 'Corrençon', 'Corrençon', 9.0, 'Facile', 'Printemps/Automne', TRUE, TRUE, FALSE, NULL),
('Traversée du Mont-Blanc', 'Haute-Savoie', 'Les Houches', 'Courmayeur (IT)', 42.0, 'Difficile', 'Été', TRUE, FALSE, TRUE, 1);

-- Articles de blog
INSERT INTO articles_blog (titre, contenu, categorie, auteur, date_publication, read_time, auteur_id) VALUES
('Escalade sur granite : passer le 6b avec confiance', "Plan d'entraînement de 4 semaines et checklist matériel pour progresser en falaise alpine.", 'Escalade', 'Camille Dumas', '2024-02-12', 6, NULL),
('Randonnée sur glacier : sécurité et encordement', 'Bases de progression, gestion des crevasses et protocole en cas de chute.', 'Randonnée', 'Lucien Perrin', '2024-03-01', 5, NULL),
('Ski de randonnée : choisir son itinéraire', 'Lire un BRA, évaluer les pentes et planifier un D+ adapté au groupe.', 'Ski', 'Maya Fontaine', '2024-01-20', 7, NULL),
('Bivouac léger en altitude', '3 configurations de campement pour nuits à +2500m sans surcharge.', 'Randonnée', 'Julie Martin', '2024-02-28', 4, NULL);

-- Vidéos
INSERT INTO videos (titre, sport, duree, vignette) VALUES
('Grande voie à la Dent du Midi', 'Escalade', '08:42', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60'),
('Ski de rando : poudreuse en Beaufortain', 'Ski', '06:15', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60'),
('Boucle des lacs : randonnée familiale', 'Randonnée', '04:03', 'https://images.unsplash.com/photo-1523419400524-330b05e5d83a?auto=format&fit=crop&w=800&q=60');

-- Prestations (exemples)
INSERT INTO prestations (nom, description, type_activite, route_id, prix_base, duree_jours) VALUES
('Stage Escalade Débutant', 'Initiation escalade sur 2 jours avec équipement fourni', 'escalade', NULL, 180.00, 2),
('Randonnée Glacier Blanc', 'Randonnée guidée avec nuit en refuge', 'randonnee', 2, 250.00, 2),
('Weekend Ski Freeride', 'Stage ski hors-piste avec guide', 'ski', NULL, 320.00, 2);
