# Schéma de la base de données — Aventure Alpine

```mermaid
erDiagram
    UTILISATEURS {
        INT id PK
        VARCHAR nom_utilisateur
        VARCHAR email
        VARCHAR mot_de_passe
        VARCHAR nom
        VARCHAR prenom
        VARCHAR telephone
        VARCHAR role
        TIMESTAMP date_inscription
    }

    RESERVATIONS {
        INT id PK
        INT utilisateur_id FK
        VARCHAR nom
        VARCHAR prenom
        VARCHAR email
        VARCHAR telephone
        VARCHAR activite
        DATE date_debut
        DATE date_fin
        INT nombre_personnes
        VARCHAR niveau
        TEXT commentaire
        DECIMAL prix_total
        VARCHAR status
        TIMESTAMP created_at
    }

    CONTACT_MESSAGES {
        INT id PK
        VARCHAR nom
        VARCHAR email
        VARCHAR telephone
        TEXT message
        VARCHAR status
        TIMESTAMP created_at
    }

    UTILISATEURS ||--o{ RESERVATIONS : "effectue"
```

Table utilisateurs {

  id INT [pk, increment]

  nom_utilisateur VARCHAR(120) [not null, unique]

  email VARCHAR(180) [not null, unique]

  mot_de_passe VARCHAR(255) [not null]

  nom VARCHAR(120)

  prenom VARCHAR(120)

  telephone VARCHAR(20)

  role VARCHAR(20) [default: 'user']

  date_inscription TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}



Table reservations {

  id INT [pk, increment]

  utilisateur_id INT [ref: > utilisateurs.id]

  nom VARCHAR(120) [not null]

  prenom VARCHAR(120) [not null]

  email VARCHAR(180) [not null]

  telephone VARCHAR(20)

  activite VARCHAR(120) [not null]

  date_debut DATE [not null]

  date_fin DATE

  nombre_personnes INT [default: 1]

  niveau VARCHAR(60)

  commentaire TEXT

  prix_total DECIMAL(10,2)

  status VARCHAR(30) [default: 'en_attente']

  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}



Table contact_messages {

  id INT [pk, increment]

  nom VARCHAR(120) [not null]

  email VARCHAR(180) [not null]

  telephone VARCHAR(20)

  message TEXT [not null]

  status VARCHAR(30) [default: 'nouveau']

  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}Table utilisateurs {

  id INT [pk, increment]

  nom_utilisateur VARCHAR(120) [not null, unique]

  email VARCHAR(180) [not null, unique]

  mot_de_passe VARCHAR(255) [not null]

  nom VARCHAR(120)

  prenom VARCHAR(120)

  telephone VARCHAR(20)

  role VARCHAR(20) [default: 'user']

  date_inscription TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}



Table reservations {

  id INT [pk, increment]

  utilisateur_id INT [ref: > utilisateurs.id]

  nom VARCHAR(120) [not null]

  prenom VARCHAR(120) [not null]

  email VARCHAR(180) [not null]

  telephone VARCHAR(20)

  activite VARCHAR(120) [not null]

  date_debut DATE [not null]

  date_fin DATE

  nombre_personnes INT [default: 1]

  niveau VARCHAR(60)

  commentaire TEXT

  prix_total DECIMAL(10,2)

  status VARCHAR(30) [default: 'en_attente']

  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}



Table contact_messages {

  id INT [pk, increment]

  nom VARCHAR(120) [not null]

  email VARCHAR(180) [not null]

  telephone VARCHAR(20)

  message TEXT [not null]

  status VARCHAR(30) [default: 'nouveau']

  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}Table utilisateurs {

  id INT [pk, increment]

  nom_utilisateur VARCHAR(120) [not null, unique]

  email VARCHAR(180) [not null, unique]

  mot_de_passe VARCHAR(255) [not null]

  nom VARCHAR(120)

  prenom VARCHAR(120)

  telephone VARCHAR(20)

  role VARCHAR(20) [default: 'user']

  date_inscription TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}



Table reservations {

  id INT [pk, increment]

  utilisateur_id INT [ref: > utilisateurs.id]

  nom VARCHAR(120) [not null]

  prenom VARCHAR(120) [not null]

  email VARCHAR(180) [not null]

  telephone VARCHAR(20)

  activite VARCHAR(120) [not null]

  date_debut DATE [not null]

  date_fin DATE

  nombre_personnes INT [default: 1]

  niveau VARCHAR(60)

  commentaire TEXT

  prix_total DECIMAL(10,2)

  status VARCHAR(30) [default: 'en_attente']

  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}



Table contact_messages {

  id INT [pk, increment]

  nom VARCHAR(120) [not null]

  email VARCHAR(180) [not null]

  telephone VARCHAR(20)

  message TEXT [not null]

  status VARCHAR(30) [default: 'nouveau']

  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]

}
