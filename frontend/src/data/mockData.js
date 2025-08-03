// Mock data para la revista virtual de hierbas curativas

export const mockHerbs = [
  {
    id: 1,
    name: "Manzanilla",
    scientificName: "Matricaria chamomilla",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    description: "La manzanilla es una hierba aromática conocida por sus propiedades calmantes y antiinflamatorias.",
    benefits: ["Relajante", "Antiinflamatoria", "Digestiva", "Antiséptica"],
    uses: "Infusión para el estrés, problemas digestivos y cuidado de la piel.",
    precautions: "Evitar en caso de alergia a las plantas de la familia de las margaritas."
  },
  {
    id: 2,
    name: "Lavanda",
    scientificName: "Lavandula angustifolia",
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&h=300&fit=crop",
    description: "Planta aromática mediterránea reconocida por su fragancia única y propiedades relajantes.",
    benefits: ["Calmante", "Antiséptica", "Antiespasmódica", "Cicatrizante"],
    uses: "Aceite esencial para aromaterapia, infusiones para el insomnio.",
    precautions: "Usar con moderación durante el embarazo."
  },
  {
    id: 3,
    name: "Romero",
    scientificName: "Rosmarinus officinalis",
    image: "https://images.unsplash.com/photo-1562239958-67f593f44896?w=400&h=300&fit=crop",
    description: "Hierba aromática mediterránea con potentes propiedades antioxidantes y estimulantes.",
    benefits: ["Antioxidante", "Estimulante", "Antimicrobiana", "Mejora la circulación"],
    uses: "Condimento culinario, aceite para masajes, infusión para la memoria.",
    precautions: "Evitar dosis altas durante el embarazo."
  },
  {
    id: 4,
    name: "Eucalipto",
    scientificName: "Eucalyptus globulus",
    image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0f5?w=400&h=300&fit=crop",
    description: "Árbol originario de Australia, famoso por sus propiedades respiratorias.",
    benefits: ["Expectorante", "Antiséptico", "Antiinflamatorio", "Descongestionante"],
    uses: "Inhalaciones para problemas respiratorios, aceite para masajes.",
    precautions: "No ingerir el aceite esencial puro."
  },
  {
    id: 5,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop",
    description: "Planta suculenta conocida por sus excepcionales propiedades curativas para la piel.",
    benefits: ["Cicatrizante", "Hidratante", "Antiinflamatoria", "Regeneradora"],
    uses: "Gel tópico para quemaduras, heridas y cuidado de la piel.",
    precautions: "Evitar contacto con los ojos."
  },
  {
    id: 6,
    name: "Jengibre",
    scientificName: "Zingiber officinale",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    description: "Raíz picante con poderosas propiedades digestivas y antiinflamatorias.",
    benefits: ["Digestivo", "Antiinflamatorio", "Antináuseas", "Estimulante"],
    uses: "Té para náuseas, condimento culinario, cataplasma para dolores.",
    precautions: "Moderar el consumo si se toman anticoagulantes."
  }
];

export const mockRecipes = [
  {
    id: 1,
    name: "Té Relajante de Manzanilla",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
    ingredients: [
      "2 cucharaditas de flores secas de manzanilla",
      "1 taza de agua caliente",
      "Miel al gusto",
      "Rodaja de limón opcional"
    ],
    instructions: [
      "Hierve el agua y deja enfriar por 2 minutos.",
      "Agrega las flores de manzanilla al agua.",
      "Deja reposar por 5-7 minutos.",
      "Cuela y endulza con miel si deseas.",
      "Sirve caliente antes de dormir."
    ],
    benefits: "Ideal para relajarse y conciliar el sueño",
    difficulty: "Fácil",
    time: "10 minutos"
  },
  {
    id: 2,
    name: "Aceite de Lavanda Casero",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop",
    ingredients: [
      "1 taza de aceite de oliva virgen",
      "2 cucharadas de flores secas de lavanda",
      "Frasco de vidrio oscuro"
    ],
    instructions: [
      "Coloca las flores de lavanda en el frasco.",
      "Cubre completamente con aceite de oliva.",
      "Sella el frasco y déjalo en un lugar soleado por 2 semanas.",
      "Agita diariamente.",
      "Cuela y almacena en frasco oscuro."
    ],
    benefits: "Perfecto para masajes relajantes y cuidado de la piel",
    difficulty: "Intermedio",
    time: "15 días"
  },
  {
    id: 3,
    name: "Tintura de Equinácea",
    image: "https://images.unsplash.com/photo-1609501676725-7186f628f63c?w=400&h=300&fit=crop",
    ingredients: [
      "50g de raíz seca de equinácea",
      "250ml de alcohol de 40°",
      "Frasco de vidrio oscuro"
    ],
    instructions: [
      "Tritura la raíz de equinácea finamente.",
      "Coloca en el frasco con el alcohol.",
      "Sella y deja macerar por 4 semanas.",
      "Agita cada 2-3 días.",
      "Cuela y almacena en gotero."
    ],
    benefits: "Fortalece el sistema inmunitario",
    difficulty: "Avanzado",
    time: "4 semanas"
  }
];

export const mockBenefits = [
  {
    id: 1,
    category: "Sistema Digestivo",
    herbs: ["Manzanilla", "Jengibre", "Menta", "Hinojo"],
    description: "Las hierbas digestivas ayudan a aliviar malestares estomacales, mejoran la digestión y reducen la inflamación intestinal.",
    symptoms: ["Indigestión", "Náuseas", "Gases", "Dolor estomacal"],
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    category: "Sistema Respiratorio",
    herbs: ["Eucalipto", "Tomillo", "Orégano", "Pino"],
    description: "Estas plantas medicinales son efectivas para tratar afecciones respiratorias y fortalecer los pulmones.",
    symptoms: ["Tos", "Congestión", "Bronquitis", "Sinusitis"],
    image: "https://images.unsplash.com/photo-1576670843584-6b9e096d8b80?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    category: "Sistema Nervioso",
    herbs: ["Lavanda", "Valeriana", "Pasiflora", "Melissa"],
    description: "Hierbas con propiedades calmantes que ayudan a reducir el estrés, la ansiedad y mejoran la calidad del sueño.",
    symptoms: ["Estrés", "Ansiedad", "Insomnio", "Nerviosismo"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    category: "Cuidado de la Piel",
    herbs: ["Aloe Vera", "Caléndula", "Árnica", "Rosa Mosqueta"],
    description: "Plantas con propiedades regenerativas y curativas ideales para el cuidado y tratamiento de la piel.",
    symptoms: ["Heridas", "Quemaduras", "Irritación", "Sequedad"],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop"
  }
];

export const mockMagazinePages = [
  {
    id: 1,
    title: "Bienvenidos a Natura Revista",
    content: "Descubre el fascinante mundo de las plantas medicinales. En esta edición especial exploramos las hierbas más poderosas de la naturaleza y sus increíbles beneficios para la salud.",
    image: "https://images.unsplash.com/photo-1576670843584-6b9e096d8b80?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "La Sabiduría Ancestral",
    content: "Durante milenios, nuestros ancestros han utilizado plantas medicinales para curar enfermedades y mantener la salud. Esta sabiduría tradicional sigue siendo relevante hoy en día.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Jardín de Hierbas Curativas",
    content: "Aprende a crear tu propio jardín medicinal en casa. Te mostramos las mejores hierbas para principiantes y cómo cuidarlas adecuadamente.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Recetas de la Abuela",
    content: "Redescubre las recetas tradicionales que han pasado de generación en generación. Remedios caseros efectivos y completamente naturales.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Ciencia y Naturaleza",
    content: "La investigación moderna confirma lo que nuestros ancestros sabían: las plantas contienen compuestos activos con propiedades medicinales comprobadas.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=200&fit=crop"
  },
  {
    id: 6,
    title: "Aromaterapia Natural",
    content: "Descubre cómo los aceites esenciales pueden mejorar tu bienestar físico y emocional. Una guía completa para principiantes.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=200&fit=crop"
  }
];