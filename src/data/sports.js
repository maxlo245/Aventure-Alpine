export const sports = [
  {
    id: 1,
    slug: "randonnee",
    name: "Randonnée",
    summary: "Itinéraires balisés, dénivelés progressifs et conseils météo pour partir serein.",
    description: "Découvrez les plus beaux sentiers de montagne, des balades familiales aux treks de plusieurs jours.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
    difficulty: ["Facile", "Intermédiaire", "Difficile"],
    season: "Printemps à Automne",
    equipment: ["Chaussures de randonnée", "Bâtons", "Sac à dos", "Carte IGN"]
  },
  {
    id: 2,
    slug: "escalade",
    name: "Escalade",
    summary: "Sites écoles et grandes voies, niveaux du 4a au 7b avec topos synthétiques.",
    description: "De l'initiation en salle aux grandes voies alpines, progressez à votre rythme.",
    image: "https://images.unsplash.com/photo-1509644851169-2acc09a45ca0?auto=format&fit=crop&w=800&q=60",
    difficulty: ["Débutant (4a-5b)", "Intermédiaire (5c-6b)", "Confirmé (6c+)"],
    season: "Toute l'année",
    equipment: ["Baudrier", "Chaussons", "Corde", "Casque", "Mousquetons"]
  },
  {
    id: 3,
    slug: "ski",
    name: "Ski",
    summary: "Domaine alpin, ski de randonnée et freeride avec conditions neige mises à jour.",
    description: "Ski alpin, ski de fond, freeride ou ski de randonnée : glissez sur les plus beaux domaines.",
    image: "https://images.unsplash.com/photo-1456120573098-9d5db83386f0?auto=format&fit=crop&w=800&q=60",
    difficulty: ["Piste verte/bleue", "Piste rouge", "Piste noire/Hors-piste"],
    season: "Décembre à Avril",
    equipment: ["Skis", "Bâtons", "Casque", "Masque", "Protection dorsale"]
  },
  {
    id: 4,
    slug: "alpinisme",
    name: "Alpinisme",
    summary: "Courses d'altitude, techniques mixtes et sommets mythiques des Alpes.",
    description: "Atteignez les sommets emblématiques avec des guides certifiés UIAGM.",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=60",
    difficulty: ["F (Facile)", "PD (Peu Difficile)", "AD (Assez Difficile)", "D+ (Difficile)"],
    season: "Été/Hiver selon course",
    equipment: ["Crampons", "Piolet", "Baudrier", "Corde", "Matériel d'assurage"]
  },
  {
    id: 5,
    slug: "via-ferrata",
    name: "Via Ferrata",
    summary: "Parcours aériens équipés, du niveau découverte au vertige garanti.",
    description: "Activité ludique et sécurisée entre randonnée et escalade.",
    image: "https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=800&q=60",
    difficulty: ["Facile", "Assez Difficile", "Difficile", "Très Difficile"],
    season: "Mai à Octobre",
    equipment: ["Baudrier", "Longe double", "Casque", "Gants"]
  },
  {
    id: 6,
    slug: "trail",
    name: "Trail Running",
    summary: "Courses en montagne, de la sortie matinale aux ultras mythiques.",
    description: "Courez sur les sentiers alpins et relevez les défis des trails en altitude.",
    image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=800&q=60",
    difficulty: ["Court (<15km)", "Moyen (15-40km)", "Long/Ultra (40km+)"],
    season: "Avril à Novembre",
    equipment: ["Chaussures de trail", "Sac d'hydratation", "Bâtons", "Vêtements techniques"]
  },
];
