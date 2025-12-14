CREATE DATABASE IF NOT EXISTS aventures_alpines CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aventures_alpines;

CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  sport VARCHAR(60) NOT NULL,
  resume TEXT,
  image_url TEXT,
  niveau VARCHAR(60),
  saison VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS articles_blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(200) NOT NULL,
  contenu TEXT,
  categorie VARCHAR(80),
  auteur VARCHAR(120),
  date_publication DATE DEFAULT CURRENT_DATE,
  read_time INT DEFAULT 5
);

CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(180) NOT NULL,
  sport VARCHAR(60),
  duree VARCHAR(12),
  vignette TEXT
);

CREATE TABLE IF NOT EXISTS routes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(160) NOT NULL,
  region VARCHAR(120),
  distance_km DECIMAL(5,2),
  difficulte VARCHAR(60),
  saison VARCHAR(60),
  depart VARCHAR(120),
  arrivee VARCHAR(120),
  avec_guide BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auteur VARCHAR(120) NOT NULL,
  titre VARCHAR(180) NOT NULL,
  contenu TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO activities (nom, sport, resume, image_url, niveau, saison) VALUES
('Randonnée en balcon', 'Randonnée', 'Boucle panoramique pour débuter en douceur.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60', 'Facile', 'Été'),
('Grande voie école', 'Escalade', '200 m équipés, idéal pour progresser en tête.', 'https://images.unsplash.com/photo-1509644851169-2acc09a45ca0?auto=format&fit=crop&w=800&q=60', 'Intermédiaire', 'Été'),
('Ski de rando poudreuse', 'Ski', 'Sortie D+1200m avec brief sécurité avalanche.', 'https://images.unsplash.com/photo-1456120573098-9d5db83386f0?auto=format&fit=crop&w=800&q=60', 'Difficile', 'Hiver');

INSERT INTO articles_blog (titre, contenu, categorie, auteur, date_publication, read_time) VALUES
('Escalade sur granite : passer le 6b avec confiance', "Plan d'entraînement de 4 semaines et checklist matériel pour progresser en falaise alpine.", 'Escalade', 'Camille Dumas', '2024-02-12', 6),
('Randonnée sur glacier : sécurité et encordement', 'Bases de progression, gestion des crevasses et protocole en cas de chute.', 'Randonnée', 'Lucien Perrin', '2024-03-01', 5),
('Ski de randonnée : choisir son itinéraire', 'Lire un BRA, évaluer les pentes et planifier un D+ adapté au groupe.', 'Ski', 'Maya Fontaine', '2024-01-20', 7),
('Bivouac léger en altitude', '3 configurations de campement pour nuits à +2500m sans surcharge.', 'Randonnée', 'Julie Martin', '2024-02-28', 4);

INSERT INTO videos (titre, sport, duree, vignette) VALUES
('Grande voie à la Dent du Midi', 'Escalade', '08:42', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60'),
('Ski de rando : poudreuse en Beaufortain', 'Ski', '06:15', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60'),
('Boucle des lacs : randonnée familiale', 'Randonnée', '04:03', 'https://images.unsplash.com/photo-1523419400524-330b05e5d83a?auto=format&fit=crop&w=800&q=60');

INSERT INTO routes (nom, region, distance_km, difficulte, saison, depart, arrivee, avec_guide) VALUES
('Tour des Aiguilles Rouges', 'Haute-Savoie', 17.0, 'Intermédiaire', 'Été', 'Chamonix', 'Chamonix', FALSE),
('Glacier Blanc', 'Écrins', 12.0, 'Difficile', 'Été', 'Pré de Madame Carle', 'Refuge du Glacier Blanc', TRUE),
('Crêtes du Vercors', 'Isère', 9.0, 'Facile', 'Printemps/Automne', 'Corrençon', 'Corrençon', FALSE);

INSERT INTO experiences (auteur, titre, contenu) VALUES
('Sofia', 'Première sortie en ski de rando', 'Belle poudre en forêt, attention aux plaques sous 2200 m.'),
('Elias', 'Arête des Cosmiques', 'Vent fort mais super ambiance, prévoir gants techniques.');
