// Données mock — remplacées par l'API Laravel plus tard

export const BOUTIQUES = [
  {
    id: 1,
    ville: 'Cotonou',
    quartier: 'Sainte Rita',
    adresse: 'Rue des Opticiens, Sainte Rita',
    tel: '+229 01 61 98 53 54',
    horaires: 'Lun–Sam : 8h–19h',
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=600&q=80',
  },
  {
    id: 2,
    ville: 'Porto-Novo',
    quartier: 'Avakpa',
    adresse: 'Quartier Avakpa, Porto-Novo',
    tel: '+229 01 61 98 53 54',
    horaires: 'Lun–Sam : 8h–19h',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
  },
  {
    id: 3,
    ville: 'Parakou',
    quartier: 'Wanssirou',
    adresse: 'Quartier Wanssirou, Parakou',
    tel: '+229 01 61 98 53 54',
    horaires: 'Lun–Sam : 8h–19h',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=600&q=80',
  },
]

export const CATALOGUES = [
  {
    id: 1,
    nom: 'Lunettes de Vue',
    description: 'Notre sélection de montures pour corriger votre vision avec style. Des formes classiques aux designs les plus contemporains.',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&q=80', texte: 'Monture ronde dorée — élégance intemporelle', type: 'Vue' },
      { id: 2, src: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&q=80', texte: 'Monture acétate carrée — style contemporain', type: 'Vue' },
      { id: 3, src: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&q=80', texte: 'Monture légère titane — confort toute la journée', type: 'Vue' },
      { id: 4, src: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=500&q=80', texte: 'Collection jeunesse — couleurs vives', type: 'Vue' },
    ],
  },
  {
    id: 2,
    nom: 'Lunettes Soleil',
    description: 'Protection solaire et style à la fois. Verres polarisés, filtres UV400 pour protéger vos yeux en toutes circonstances.',
    photos: [
      { id: 5, src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80', texte: 'Aviateur polarisé — protection UV400', type: 'Soleil' },
      { id: 6, src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', texte: 'Wayfarer moderne — look intemporel', type: 'Soleil' },
      { id: 7, src: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&q=80', texte: 'Sport oversize — plein air et mer', type: 'Soleil' },
    ],
  },
  {
    id: 3,
    nom: 'Lentilles',
    description: 'Lentilles de contact quotidiennes, mensuelles et colorées. Liberté et confort pour votre vision au quotidien.',
    photos: [
      { id: 8, src: 'https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?w=500&q=80', texte: 'Lentilles journalières — pratiques et hygiéniques', type: 'Lentille' },
      { id: 9, src: 'https://images.unsplash.com/photo-1583394293214-0b6e1fce00a4?w=500&q=80', texte: 'Lentilles colorées — changer de regard', type: 'Lentille' },
    ],
  },
  {
    id: 4,
    nom: 'Accessoires',
    description: 'Étuis, chiffons, solutions nettoyantes et tout ce qu\'il faut pour prendre soin de vos équipements optiques.',
    photos: [
      { id: 10, src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80', texte: 'Étuis premium — protection optimale', type: 'Accessoire' },
      { id: 11, src: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&q=80', texte: 'Solutions nettoyantes — soin quotidien', type: 'Accessoire' },
    ],
  },
]

export const VIDEOS_ACCUEIL = [
  {
    id: 1,
    titre: 'Bienvenue chez Éméraude Optique',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4', // placeholder
    visible: true,
  },
]

export const STATS = [
  { valeur: '3', label: 'Boutiques au Bénin' },
  { valeur: '10+', label: 'Années d\'expérience' },
  { valeur: '5000+', label: 'Clients satisfaits' },
  { valeur: '500+', label: 'Modèles disponibles' },
]