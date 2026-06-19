const properties = [

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // BUCERÃAS
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    slug: 'villa-girasol',
    name: 'Villa Girasol',
    location: 'BucerÃ­as',
    bedrooms: 4,
    bathrooms: 4.5,
    maxGuests: 12,
    nightlyRate: 600,
    cleaningFee: 200,
    serviceFee: 100,
    shortDescription: 'Stunning beachfront villa in BucerÃ­as with direct ocean access, 4 bedrooms, and space for up to 12 guests.',
    shortDescriptionEs: 'Impresionante villa frente al mar en BucerÃ­as con acceso directo al ocÃ©ano, 4 habitaciones y espacio para hasta 12 huÃ©spedes.',
    description: `Villa Girasol is TC Collection's flagship BucerÃ­as property â€” a magnificent beachfront estate sitting directly on the sand with unobstructed Pacific views from nearly every room. Named for the sunflowers that line its entrance, Villa Girasol radiates warmth and elegance in equal measure.

The generous open-plan living and dining area opens directly to a private pool terrace and, beyond it, the beach itself â€” one of the most beloved stretches of sand in all of Nayarit. Four beautifully appointed bedroom suites accommodate up to 12 guests in total comfort, each finished with high-quality linens, ensuite bathrooms, and its own character.

With BucerÃ­as' cobblestone streets, art galleries, and renowned seafood restaurants minutes away on foot, Villa Girasol gives you total privacy and beachfront serenity with a vibrant town right at your doorstep.`,
    descriptionEs: `Villa Girasol es la propiedad insignia de TC Collection en BucerÃ­as â€” una magnÃ­fica villa frente al mar ubicada directamente sobre la arena, con vistas al PacÃ­fico desde casi todos los rincones. Su nombre evoca los girasoles que adornan su entrada, y la villa irradia calidez y elegancia a partes iguales.

La generosa sala y comedor de planta abierta desemboca en una terraza con alberca privada y, mÃ¡s allÃ¡, la playa misma â€” una de las franjas de arena mÃ¡s queridas de todo Nayarit. Cuatro suites bellamente decoradas alojan hasta 12 huÃ©spedes con total comodidad, cada una con ropa de cama de alta calidad, baÃ±o privado y carÃ¡cter propio.

Con las calles empedradas, galerÃ­as de arte y afamados restaurantes de mariscos de BucerÃ­as a pocos pasos, Villa Girasol ofrece privacidad total y serenidad frente al mar con un pueblo vibrante a la vuelta de la esquina.`,
    amenities: ['Beachfront â€” Direct Beach Access', 'Private Pool', 'Ocean Views', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Outdoor Dining Area', 'Multiple Terraces', 'Smart TV / Streaming', 'Washer & Dryer', 'Covered Parking', 'Daily Housekeeping', 'BBQ Grill', 'Outdoor Shower', 'Concierge Service'],
    amenitiesEs: ['Frente al mar â€” Acceso directo a la playa', 'Alberca privada', 'Vistas al ocÃ©ano', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Ãrea de comedor exterior', 'MÃºltiples terrazas', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento techado', 'Limpieza diaria', 'Asador', 'Regadera exterior', 'Servicio de concierge'],
    images: Array.from({length: 56}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'villa-jaguar',
    name: 'Villa Jaguar',
    location: 'BucerÃ­as',
    bedrooms: 3,
    bathrooms: 3.5,
    maxGuests: 9,
    nightlyRate: 400,
    cleaningFee: 150,
    serviceFee: 75,
    shortDescription: 'Elegant 3-bedroom villa in the heart of BucerÃ­as, steps from the beach, cobblestone streets, and the best dining on the coast.',
    shortDescriptionEs: 'Elegante villa de 3 habitaciones en el corazÃ³n de BucerÃ­as, a pasos de la playa, las calles empedradas y los mejores restaurantes de la costa.',
    description: `Villa Jaguar brings together bold design and coastal elegance in one of BucerÃ­as' most coveted neighborhoods. This three-bedroom villa for up to 9 guests is a masterclass in refined Mexican architecture â€” high ceilings, handcrafted details, lush gardens, and a private pool that beckons from the moment you arrive.

Each of the three suites is a retreat in its own right, appointed with premium linens, ensuite bathrooms, and thoughtful finishes that reflect the natural palette of the Pacific coast. The open kitchen and dining area flows seamlessly to the outdoor terrace, creating a space perfectly suited to long lunches, sunset cocktails, and the unhurried rhythms of a Riviera Nayarit vacation.

Villa Jaguar sits minutes from BucerÃ­as' famous malecÃ³n, Saturday art walk, and a seafood scene that draws gourmands from across Mexico.`,
    descriptionEs: `Villa Jaguar combina diseÃ±o atrevido y elegancia costera en uno de los vecindarios mÃ¡s codiciados de BucerÃ­as. Esta villa de tres habitaciones para hasta 9 huÃ©spedes es una obra maestra de la arquitectura mexicana refinada â€” techos altos, detalles artesanales, jardines exuberantes y una alberca privada que invita desde el momento en que llegas.

Cada una de las tres suites es un refugio propio, con ropa de cama premium, baÃ±o privado y acabados que reflejan la paleta natural de la costa del PacÃ­fico. La cocina y el comedor abiertos fluyen hacia la terraza exterior, creando un espacio ideal para largas comidas, cÃ³cteles al atardecer y el ritmo pausado de unas vacaciones en la Riviera Nayarit.

Villa Jaguar estÃ¡ a minutos del famoso malecÃ³n de BucerÃ­as, el paseo de arte del sÃ¡bado y una escena gastronÃ³mica que atrae a gourmets de todo MÃ©xico.`,
    amenities: ['Private Pool', 'Lush Tropical Garden', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Outdoor Terrace & Dining', 'Beach (2 min walk)', 'Smart TV / Streaming', 'Washer & Dryer', 'Covered Parking', 'Daily Housekeeping', 'Concierge Service', 'BBQ Grill'],
    amenitiesEs: ['Alberca privada', 'JardÃ­n tropical exuberante', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Terraza y comedor exterior', 'Playa (2 min caminando)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento techado', 'Limpieza diaria', 'Servicio de concierge', 'Asador'],
    images: Array.from({length: 37}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/jaguar_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'villa-turquesa',
    name: 'Villa Turquesa',
    location: 'BucerÃ­as',
    bedrooms: 5,
    bathrooms: 5.5,
    maxGuests: 12,
    nightlyRate: 750,
    cleaningFee: 220,
    serviceFee: 120,
    shortDescription: 'Spectacular penthouse villa in BucerÃ­as with 5 suites, sweeping ocean views, and resort-level amenities for groups of up to 12.',
    shortDescriptionEs: 'Espectacular villa penthouse en BucerÃ­as con 5 suites, vistas panorÃ¡micas al ocÃ©ano y amenidades de resort para grupos de hasta 12 personas.',
    description: `Villa Turquesa occupies a world of its own â€” a spectacular penthouse-level villa in BucerÃ­as that delivers panoramic Pacific views, five private suites, and an entertainment experience that rivals the finest boutique hotels on the coast. Named for the turquoise waters that shimmer from every terrace, this is the ultimate address for large groups and milestone celebrations.

Five elegantly appointed suites each offer king beds, ensuite bathrooms, and private access to the outdoors. The rooftop terrace is the crown jewel: a generous sky-level space with a pool, open-air lounge, and 360-degree views stretching from the Sierra Madre to the open sea.

Ideal for weddings, family reunions, milestone birthdays, and any occasion that deserves to be remembered.`,
    descriptionEs: `Villa Turquesa es un mundo aparte â€” una espectacular villa nivel penthouse en BucerÃ­as que ofrece vistas panorÃ¡micas al PacÃ­fico, cinco suites privadas y una experiencia de entretenimiento que rivaliza con los mejores hoteles boutique de la costa. Su nombre evoca las aguas turquesas que brillan desde cada terraza.

Cinco suites elegantemente decoradas ofrecen camas king, baÃ±os privados y acceso directo al exterior. La terraza en la azotea es la joya de la corona: un generoso espacio a nivel del cielo con alberca, salÃ³n al aire libre y vistas de 360 grados desde la Sierra Madre hasta el mar abierto.

Ideal para bodas, reuniones familiares, cumpleaÃ±os especiales y cualquier ocasiÃ³n que merezca ser recordada.`,
    amenities: ['Penthouse Level â€” Panoramic Views', 'Rooftop Pool', 'Ocean & Mountain Views', 'Air Conditioning', 'High-Speed WiFi', 'Professional Kitchen', 'Rooftop Terrace & Lounge', 'Multiple Living Areas', 'Smart TV / Streaming', 'Washer & Dryer', 'Secure Parking', 'Daily Housekeeping', 'Concierge Service', 'Event-Friendly Layout'],
    amenitiesEs: ['Nivel penthouse â€” Vistas panorÃ¡micas', 'Alberca en azotea', 'Vistas al ocÃ©ano y montaÃ±as', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina profesional', 'Terraza y salÃ³n en azotea', 'MÃºltiples salas de estar', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento seguro', 'Limpieza diaria', 'Servicio de concierge', 'DistribuciÃ³n para eventos'],
    images: Array.from({length: 45}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/turquesa_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'villa-pelicano',
    name: 'Villa PelÃ­cano',
    location: 'BucerÃ­as',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 10,
    nightlyRate: 500,
    cleaningFee: 175,
    serviceFee: 90,
    shortDescription: 'Beautiful 4-bedroom villa in BucerÃ­as with a private pool, tropical gardens, and a short walk to the beach and town center.',
    shortDescriptionEs: 'Hermosa villa de 4 habitaciones en BucerÃ­as con alberca privada, jardines tropicales y a pocos pasos de la playa y el centro del pueblo.',
    description: `Villa PelÃ­cano is a stunning private retreat in the heart of BucerÃ­as â€” a four-bedroom villa where every detail has been curated for comfort, style, and the unhurried pace of the Mexican Pacific coast. Named for the magnificent pelicans that soar above the Nayarit coastline, this property captures the spirit of the sea in every room.

A private pool sits at the center of lush tropical gardens, creating a serene sanctuary that draws you outside from the moment you wake. The interiors blend warm Mexican craftsmanship with modern comfort â€” generous living spaces, a fully equipped kitchen, and bedrooms designed for genuine rest.

BucerÃ­as' vibrant malecÃ³n, Saturday art walk, and celebrated seafood scene are a short walk away, making Villa PelÃ­cano the ideal base for those who want the best of authentic Nayarit living.`,
    descriptionEs: `Villa PelÃ­cano es un impresionante refugio privado en el corazÃ³n de BucerÃ­as â€” una villa de cuatro habitaciones donde cada detalle ha sido cuidadosamente seleccionado para la comodidad, el estilo y el ritmo pausado de la costa del PacÃ­fico mexicano. Su nombre evoca los magnÃ­ficos pelÃ­canos que surcan los cielos de Nayarit.

Una alberca privada ocupa el centro de exuberantes jardines tropicales, creando un santuario sereno que te invita a salir desde el momento en que despiertas. Los interiores combinan la artesanÃ­a mexicana con comodidades modernas â€” amplias salas de estar, cocina totalmente equipada y habitaciones diseÃ±adas para el descanso genuino.

El malecÃ³n vibrante de BucerÃ­as, el paseo de arte del sÃ¡bado y la celebrada escena de mariscos estÃ¡n a pocos pasos, haciendo de Villa PelÃ­cano la base ideal para quienes buscan lo mejor de la vida autÃ©ntica en Nayarit.`,
    amenities: ['Private Pool', 'Tropical Gardens', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Outdoor Dining & Terrace', 'Beach (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Covered Parking', 'Daily Housekeeping', 'BBQ Grill', 'Concierge Service'],
    amenitiesEs: ['Alberca privada', 'Jardines tropicales', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Comedor y terraza exterior', 'Playa (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento techado', 'Limpieza diaria', 'Asador', 'Servicio de concierge'],
    images: [
      'https://res.cloudinary.com/dwutnv1bb/image/upload/pelicano-01.jpg',
      'https://res.cloudinary.com/dwutnv1bb/image/upload/pelicano-02.jpg',
      ...Array.from({length: 42}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/pelicano-${String(i+4).padStart(2,'0')}.jpg`),
    ],
  },

  {
    slug: 'villa-perico',
    name: 'Villa Perico',
    location: 'BucerÃ­as',
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 8,
    nightlyRate: 380,
    cleaningFee: 140,
    serviceFee: 70,
    shortDescription: 'Charming 3-bedroom villa in BucerÃ­as with a private pool, vibrant Mexican design, and an unbeatable location near beach and town.',
    shortDescriptionEs: 'Encantadora villa de 3 habitaciones en BucerÃ­as con alberca privada, vibrante diseÃ±o mexicano e inmejorable ubicaciÃ³n cerca de la playa y el pueblo.',
    description: `Villa Perico is a vibrant, character-filled retreat in BucerÃ­as â€” a three-bedroom villa that embodies the color, warmth, and joy of the Mexican Pacific coast. Named for the bright parrots that fill the Nayarit canopy, Villa Perico is bold, beautiful, and full of life.

The private pool and outdoor terrace are the heart of the property â€” a sun-drenched space perfectly designed for lazy mornings, poolside lunches, and golden-hour cocktails. Inside, the interiors are rich with handcrafted Mexican details: Talavera tiles, hand-painted accents, and artisan furnishings that make every corner a discovery.

Three comfortable suites accommodate up to 8 guests, each with their own ensuite bathroom and thoughtfully chosen finishes. BucerÃ­as' cobblestone streets, art galleries, and world-class seafood are steps from your door.`,
    descriptionEs: `Villa Perico es un refugio vibrante y lleno de carÃ¡cter en BucerÃ­as â€” una villa de tres habitaciones que encarna el color, la calidez y la alegrÃ­a de la costa del PacÃ­fico mexicano. Su nombre evoca los brillantes pericos que llenan el dosel de Nayarit.

La alberca privada y la terraza exterior son el corazÃ³n de la propiedad â€” un espacio baÃ±ado por el sol, diseÃ±ado para maÃ±anas tranquilas, almuerzos junto a la alberca y cÃ³cteles al atardecer. Por dentro, los interiores estÃ¡n llenos de detalles artesanales mexicanos: azulejos de Talavera, acentos pintados a mano y muebles artesanales que hacen de cada rincÃ³n un descubrimiento.

Tres cÃ³modas suites alojan hasta 8 huÃ©spedes, cada una con baÃ±o privado y acabados cuidadosamente elegidos. Las calles empedradas, galerÃ­as de arte y mariscos de clase mundial de BucerÃ­as estÃ¡n a la vuelta de la esquina.`,
    amenities: ['Private Pool', 'Outdoor Terrace', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Mexican Artisan DÃ©cor', 'Beach (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Parking', 'Daily Housekeeping', 'BBQ Grill'],
    amenitiesEs: ['Alberca privada', 'Terraza exterior', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'DecoraciÃ³n artesanal mexicana', 'Playa (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento', 'Limpieza diaria', 'Asador'],
    images: Array.from({length: 39}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/perico_perico_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'villa-zenzontle',
    name: 'Villa Zenzontle',
    location: 'BucerÃ­as',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 10,
    nightlyRate: 480,
    cleaningFee: 170,
    serviceFee: 85,
    shortDescription: 'Graceful 4-bedroom villa in BucerÃ­as named for the mockingbird â€” a property with many faces and one consistent quality: excellence.',
    shortDescriptionEs: 'Elegante villa de 4 habitaciones en BucerÃ­as, nombrada por el cenzontle â€” una propiedad con muchas facetas y una constante: la excelencia.',
    description: `Villa Zenzontle takes its name from the zenzontle â€” the mockingbird of Mexican legend, a bird celebrated for its ability to be many things at once. This four-bedroom villa in BucerÃ­as lives up to its name: intimate enough for couples traveling together, spacious enough for families, elegant enough for the most discerning guests.

The property centers on a generous private pool surrounded by tropical gardens, with outdoor living spaces designed for the long, golden days that define a Riviera Nayarit vacation. The interiors balance contemporary comfort with warm Mexican character â€” open-plan living, a fully equipped kitchen, and four private suites that each feel like their own retreat.

Situated in a quiet neighborhood just steps from BucerÃ­as' vibrant town center, Villa Zenzontle offers the rare combination of total peace and instant access to the best of the coast.`,
    descriptionEs: `Villa Zenzontle toma su nombre del cenzontle â€” el pÃ¡jaro de la leyenda mexicana, celebrado por su capacidad de ser muchas cosas a la vez. Esta villa de cuatro habitaciones en BucerÃ­as estÃ¡ a la altura de su nombre: Ã­ntima para parejas que viajan juntas, espaciosa para familias, elegante para los huÃ©spedes mÃ¡s exigentes.

La propiedad gira en torno a una generosa alberca privada rodeada de jardines tropicales, con espacios al aire libre diseÃ±ados para los largos y dorados dÃ­as que definen unas vacaciones en la Riviera Nayarit. Los interiores equilibran la comodidad contemporÃ¡nea con el carÃ¡cter mexicano â€” sala abierta, cocina totalmente equipada y cuatro suites privadas que se sienten como un refugio propio.

Ubicada en un tranquilo vecindario a pocos pasos del vibrante centro de BucerÃ­as, Villa Zenzontle ofrece la combinaciÃ³n perfecta de paz total y acceso inmediato a lo mejor de la costa.`,
    amenities: ['Private Pool', 'Tropical Gardens', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Outdoor Living & Dining', 'Beach (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Covered Parking', 'Daily Housekeeping', 'BBQ Grill', 'Concierge Service'],
    amenitiesEs: ['Alberca privada', 'Jardines tropicales', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Sala y comedor exterior', 'Playa (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento techado', 'Limpieza diaria', 'Asador', 'Servicio de concierge'],
    images: Array.from({length: 46}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/villa-zenzontle-${String(i+1).padStart(2,'0')}.jpg`),
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PUNTA MITA
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    slug: 'palmas-8',
    name: 'Palmas 8',
    location: 'Punta Mita',
    bedrooms: 4,
    bathrooms: 4.5,
    maxGuests: 12,
    nightlyRate: 650,
    cleaningFee: 200,
    serviceFee: 110,
    shortDescription: 'Stunning 4-bedroom Punta Mita estate with a private pool, lush grounds, and a complimentary golf cart for exploring the peninsula.',
    shortDescriptionEs: 'Impresionante residencia de 4 habitaciones en Punta Mita con alberca privada, jardines exuberantes y carrito de golf incluido para explorar la penÃ­nsula.',
    description: `Palmas 8 is one of Punta Mita's most coveted private estates â€” a four-bedroom sanctuary where the architecture speaks in the language of the palms, the ocean breeze, and the unhurried pace of the Mexican Pacific. Set within a prestigious gated community on the Punta Mita peninsula, this property delivers privacy, elegance, and privileged access to one of the world's most celebrated coastlines.

Four generously proportioned suites accommodate up to 12 guests, each with premium bedding, ensuite bathroom, and its own connection to the tropical gardens and ocean air that define life at Palmas 8.

A complimentary golf cart is included with your stay â€” the ideal way to explore Punta Mita's beaches, beach clubs, and seaside restaurants at your own pace.`,
    descriptionEs: `Palmas 8 es una de las residencias privadas mÃ¡s codiciadas de Punta Mita â€” un santuario de cuatro habitaciones donde la arquitectura habla el idioma de las palmeras, la brisa marina y el ritmo pausado del PacÃ­fico mexicano. Ubicada dentro de una exclusiva comunidad privada en la penÃ­nsula de Punta Mita, esta propiedad ofrece privacidad, elegancia y acceso privilegiado a una de las costas mÃ¡s celebradas del mundo.

Cuatro suites generosamente dimensionadas alojan hasta 12 huÃ©spedes, cada una con ropa de cama premium, baÃ±o privado y conexiÃ³n propia con los jardines tropicales y el aire oceÃ¡nico que definen la vida en Palmas 8.

Un carrito de golf estÃ¡ incluido con tu estadÃ­a â€” la forma ideal de explorar las playas, beach clubs y restaurantes frente al mar de Punta Mita a tu propio ritmo.`,
    amenities: ['Private Pool', 'Golf Cart Included', 'Gated Community', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Outdoor Dining & Terrace', 'Tropical Gardens', 'Smart TV / Streaming', 'Washer & Dryer', 'Covered Parking', 'Daily Housekeeping', 'Concierge Service', 'Beach Club Access (nearby)'],
    amenitiesEs: ['Alberca privada', 'Carrito de golf incluido', 'Comunidad privada', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Comedor y terraza exterior', 'Jardines tropicales', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento techado', 'Limpieza diaria', 'Servicio de concierge', 'Acceso a beach club (cercano)'],
    images: Array.from({length: 53}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/palmas_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'terrazas-g32',
    name: 'Las Terrazas G-32',
    location: 'Punta Mita',
    bedrooms: 5,
    bathrooms: 5.5,
    maxGuests: 12,
    nightlyRate: 850,
    cleaningFee: 250,
    serviceFee: 150,
    shortDescription: 'Grand 5-bedroom Punta Mita estate with breathtaking ocean views, a private pool, and a golf cart â€” the pinnacle of peninsula living.',
    shortDescriptionEs: 'Gran residencia de 5 habitaciones en Punta Mita con impresionantes vistas al ocÃ©ano, alberca privada y carrito de golf â€” la cÃºspide del lujo en la penÃ­nsula.',
    description: `Las Terrazas G-32 is the crown jewel of our Punta Mita collection â€” a grand five-bedroom estate that defines luxury living on the Mexican Pacific. Perched within an exclusive gated community on the Punta Mita peninsula, this property commands sweeping ocean views from its signature multi-level terraces, delivering some of the most spectacular scenery on the entire Riviera Nayarit.

Five elegantly appointed suites accommodate up to 12 guests in absolute comfort, each with premium linens, ensuite bathrooms, and curated finishes that honor the natural beauty of their surroundings. The open living and dining pavilion flows onto a breathtaking pool terrace where the infinity edge seems to dissolve into the Pacific.

A golf cart is included with every stay, giving you the freedom to explore Punta Mita's legendary beaches, world-class golf courses, spa retreats, and beachfront restaurants at your leisure.`,
    descriptionEs: `Las Terrazas G-32 es la joya de la corona de nuestra colecciÃ³n en Punta Mita â€” una gran residencia de cinco habitaciones que define el lujo en el PacÃ­fico mexicano. Situada dentro de una exclusiva comunidad privada en la penÃ­nsula de Punta Mita, esta propiedad domina vistas panorÃ¡micas al ocÃ©ano desde sus caracterÃ­sticas terrazas de varios niveles, ofreciendo algunos de los paisajes mÃ¡s espectaculares de toda la Riviera Nayarit.

Cinco suites elegantemente decoradas alojan hasta 12 huÃ©spedes con absoluta comodidad, cada una con ropa de cama premium, baÃ±os privados y acabados cuidados que honran la belleza natural del entorno. El pabellÃ³n de sala y comedor abierto desemboca en una impresionante terraza con alberca infinita que parece fundirse con el PacÃ­fico.

Un carrito de golf estÃ¡ incluido en cada estadÃ­a, dÃ¡ndote la libertad de explorar las legendarias playas, campos de golf de clase mundial, spas y restaurantes frente al mar de Punta Mita.`,
    amenities: ['Infinity Pool with Ocean Views', 'Golf Cart Included', 'Multi-Level Terraces', 'Gated Community', 'Air Conditioning', 'High-Speed WiFi', 'Gourmet Kitchen', 'Outdoor Dining', 'Tropical Gardens', 'Smart TV / Streaming', 'Washer & Dryer', 'Covered Parking', 'Daily Housekeeping', 'Concierge Service'],
    amenitiesEs: ['Alberca infinita con vistas al ocÃ©ano', 'Carrito de golf incluido', 'Terrazas de varios niveles', 'Comunidad privada', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina gourmet', 'Comedor exterior', 'Jardines tropicales', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento techado', 'Limpieza diaria', 'Servicio de concierge'],
    images: Array.from({length: 47}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/terrazas_${String(i+1).padStart(2,'0')}.jpg`),
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // LA CRUZ DE HUANACAXTLE â€” Zantamar Complex
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    slug: 'zantamar-205b',
    name: 'Zantamar 205B',
    location: 'La Cruz de Huanacaxtle',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 8,
    studio: false,
    sleeping: '1 king bed Â· 2 queen beds Â· pull-out sofa',
    nightlyRate: 320,
    cleaningFee: 120,
    serviceFee: 55,
    shortDescription: 'Spacious 2-bedroom ocean-view residence in the exclusive Zantamar complex â€” 1 king, 2 queens, pull-out sofa, up to 8 guests.',
    shortDescriptionEs: 'Amplia residencia de 2 habitaciones con vista al ocÃ©ano en el exclusivo complejo Zantamar â€” 1 king, 2 queens, sofÃ¡ cama, hasta 8 huÃ©spedes.',
    description: `Zantamar 205B is one of the larger residences in the prestigious Zantamar complex â€” a two-bedroom, ocean-view retreat that comfortably accommodates up to 8 guests with a thoughtful sleeping arrangement: a master with king bed, a second bedroom with two queen beds, and a pull-out sofa in the living room.

Perched above the charming marina village of La Cruz de Huanacaxtle, the unit enjoys sweeping views of Banderas Bay from its private terrace. The Zantamar complex is known for its resort-quality pool, lush grounds, and serene atmosphere â€” the ideal complement to La Cruz's beloved Friday market, live music at Philo's, world-class whale watching, and some of the finest fresh seafood in Mexico.`,
    descriptionEs: `Zantamar 205B es una de las residencias mÃ¡s amplias del prestigioso complejo Zantamar â€” un refugio de dos habitaciones con vista al ocÃ©ano que aloja cÃ³modamente hasta 8 huÃ©spedes: habitaciÃ³n principal con cama king, segunda habitaciÃ³n con dos camas queen y sofÃ¡ cama en la sala.

Elevada sobre el encantador pueblo marina de La Cruz de Huanacaxtle, la unidad disfruta de amplias vistas a la BahÃ­a de Banderas desde su terraza privada. El complejo Zantamar es conocido por su alberca de calidad resort, jardines exuberantes y ambiente sereno â€” el complemento ideal para el querido mercado del viernes de La Cruz, la mÃºsica en vivo en Philo's, el avistamiento de ballenas y algunos de los mejores mariscos frescos de MÃ©xico.`,
    amenities: ['Ocean View', 'Private Terrace', 'Complex Pool', '2 Bedrooms (King + 2 Queens)', 'Pull-Out Sofa', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Marina (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Secure Parking', 'Daily Housekeeping', 'Concierge Service'],
    amenitiesEs: ['Vista al ocÃ©ano', 'Terraza privada', 'Alberca del complejo', '2 habitaciones (King + 2 Queens)', 'SofÃ¡ cama', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Marina (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento seguro', 'Limpieza diaria', 'Servicio de concierge'],
    images: Array.from({length: 20}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar205_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'zantamar-303d',
    name: 'Zantamar 303D',
    location: 'La Cruz de Huanacaxtle',
    bedrooms: 0,
    bathrooms: 2,
    maxGuests: 4,
    studio: true,
    sleeping: '1 king bed Â· bunk bed',
    nightlyRate: 250,
    cleaningFee: 100,
    serviceFee: 50,
    shortDescription: 'Ocean-view studio at Zantamar in La Cruz de Huanacaxtle â€” king bed, bunk bed, 2 baths, up to 4 guests. Resort pool included.',
    shortDescriptionEs: 'Studio con vista al ocÃ©ano en Zantamar, La Cruz de Huanacaxtle â€” cama king, literas, 2 baÃ±os, hasta 4 huÃ©spedes. Alberca de resort incluida.',
    description: `Zantamar 303D is a beautifully appointed ocean-view studio on the third floor of the prestigious Zantamar complex in La Cruz de Huanacaxtle. Intimate yet complete, the studio features a king bed, a bunk bed, two full bathrooms, and a private terrace with sweeping views of Banderas Bay.

The open-plan layout makes clever use of every square foot â€” stylish, well-equipped, and filled with natural light and ocean breeze. Access to the Zantamar complex's resort-quality pool and lush grounds is included, making every day feel like a luxury stay at a boutique Pacific hotel.

La Cruz's marina, Friday organic market, Philo's live music, and world-class whale watching are all a short walk away.`,
    descriptionEs: `Zantamar 303D es un studio bellamente decorado con vista al ocÃ©ano en el tercer piso del prestigioso complejo Zantamar en La Cruz de Huanacaxtle. Ãntimo pero completo, el studio cuenta con cama king, literas, dos baÃ±os completos y una terraza privada con amplias vistas a la BahÃ­a de Banderas.

La distribuciÃ³n de planta abierta aprovecha inteligentemente cada metro cuadrado â€” elegante, bien equipado y lleno de luz natural y brisa marina. El acceso a la alberca de calidad resort y los jardines del complejo Zantamar estÃ¡ incluido, haciendo que cada dÃ­a se sienta como una estadÃ­a de lujo en un hotel boutique frente al PacÃ­fico.

La marina de La Cruz, el mercado orgÃ¡nico del viernes, la mÃºsica en vivo de Philo's y el avistamiento de ballenas estÃ¡n a pocos pasos.`,
    amenities: ['Ocean View', 'Private Terrace', 'Complex Pool', 'King Bed + Bunk Bed', '2 Bathrooms', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Marina (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Secure Parking', 'Daily Housekeeping'],
    amenitiesEs: ['Vista al ocÃ©ano', 'Terraza privada', 'Alberca del complejo', 'Cama king + literas', '2 baÃ±os', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Marina (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento seguro', 'Limpieza diaria'],
    images: Array.from({length: 19}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar303_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'zantamar-304d',
    name: 'Zantamar 304D',
    location: 'La Cruz de Huanacaxtle',
    bedrooms: 0,
    bathrooms: 2,
    maxGuests: 4,
    studio: true,
    sleeping: '1 king bed Â· bunk bed',
    nightlyRate: 250,
    cleaningFee: 100,
    serviceFee: 50,
    shortDescription: 'Ocean-view studio at Zantamar in La Cruz de Huanacaxtle â€” king bed, bunk bed, 2 baths, up to 4 guests. Resort pool included.',
    shortDescriptionEs: 'Studio con vista al ocÃ©ano en Zantamar, La Cruz de Huanacaxtle â€” cama king, literas, 2 baÃ±os, hasta 4 huÃ©spedes. Alberca de resort incluida.',
    description: `Zantamar 304D is a refined ocean-view studio on the third floor of the Zantamar complex in La Cruz de Huanacaxtle. The studio layout â€” king bed, bunk bed, two bathrooms, and a private terrace overlooking Banderas Bay â€” is designed for the couple or small group who wants the character and warmth of La Cruz with the polish of a TC Collection property.

The Zantamar complex's pool, gardens, and serene atmosphere provide a resort-quality backdrop, while La Cruz's famous marina, market, and seafood scene are right at your doorstep.`,
    descriptionEs: `Zantamar 304D es un refinado studio con vista al ocÃ©ano en el tercer piso del complejo Zantamar en La Cruz de Huanacaxtle. La distribuciÃ³n del studio â€” cama king, literas, dos baÃ±os y terraza privada con vistas a la BahÃ­a de Banderas â€” estÃ¡ diseÃ±ada para la pareja o grupo pequeÃ±o que busca el carÃ¡cter y la calidez de La Cruz con el acabado de una propiedad TC Collection.

La alberca, jardines y ambiente sereno del complejo Zantamar ofrecen un entorno de calidad resort, mientras que la famosa marina, el mercado y la escena gastronÃ³mica de La Cruz estÃ¡n a la vuelta de la esquina.`,
    amenities: ['Ocean View', 'Private Terrace', 'Complex Pool', 'King Bed + Bunk Bed', '2 Bathrooms', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Marina (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Secure Parking', 'Daily Housekeeping'],
    amenitiesEs: ['Vista al ocÃ©ano', 'Terraza privada', 'Alberca del complejo', 'Cama king + literas', '2 baÃ±os', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Marina (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento seguro', 'Limpieza diaria'],
    images: Array.from({length: 22}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar304_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'zantamar-305d',
    name: 'Zantamar 305D',
    location: 'La Cruz de Huanacaxtle',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 8,
    studio: false,
    sleeping: '1 king bed Â· 2 queen beds Â· pull-out sofa',
    nightlyRate: 320,
    cleaningFee: 120,
    serviceFee: 55,
    shortDescription: 'Spacious 2-bedroom ocean-view residence at Zantamar â€” 1 king, 2 queens, pull-out sofa, up to 8 guests in La Cruz de Huanacaxtle.',
    shortDescriptionEs: 'Amplia residencia de 2 habitaciones con vista al ocÃ©ano en Zantamar â€” 1 king, 2 queens, sofÃ¡ cama, hasta 8 huÃ©spedes en La Cruz de Huanacaxtle.',
    description: `Zantamar 305D is a spacious two-bedroom, ocean-view residence on the third floor of the Zantamar complex in La Cruz de Huanacaxtle. Designed for families or groups of up to 8, the unit offers a master bedroom with king bed, a second bedroom with two queen beds, a pull-out sofa in the living area, and two full bathrooms â€” a generous layout that rarely feels crowded.

The private terrace frames panoramic views of Banderas Bay, while the Zantamar complex's resort-quality pool and grounds provide an exceptional amenity backdrop. La Cruz's authentic village charm â€” the Friday market, whale watching, the marina â€” completes the picture.`,
    descriptionEs: `Zantamar 305D es una espaciosa residencia de dos habitaciones con vista al ocÃ©ano en el tercer piso del complejo Zantamar en La Cruz de Huanacaxtle. DiseÃ±ada para familias o grupos de hasta 8 personas, la unidad ofrece habitaciÃ³n principal con cama king, segunda habitaciÃ³n con dos camas queen, sofÃ¡ cama en la sala y dos baÃ±os completos â€” una distribuciÃ³n generosa que rara vez se siente saturada.

La terraza privada enmarca vistas panorÃ¡micas a la BahÃ­a de Banderas, mientras que la alberca de calidad resort y los jardines del complejo Zantamar ofrecen un entorno excepcional. El encanto autÃ©ntico del pueblo de La Cruz â€” el mercado del viernes, el avistamiento de ballenas, la marina â€” completa el cuadro.`,
    amenities: ['Ocean View', 'Private Terrace', 'Complex Pool', '2 Bedrooms (King + 2 Queens)', 'Pull-Out Sofa', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Marina (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Secure Parking', 'Daily Housekeeping', 'Concierge Service'],
    amenitiesEs: ['Vista al ocÃ©ano', 'Terraza privada', 'Alberca del complejo', '2 habitaciones (King + 2 Queens)', 'SofÃ¡ cama', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Marina (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento seguro', 'Limpieza diaria', 'Servicio de concierge'],
    images: Array.from({length: 30}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar305_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'zantamar-306d',
    name: 'Zantamar 306D',
    location: 'La Cruz de Huanacaxtle',
    bedrooms: 0,
    bathrooms: 2,
    maxGuests: 4,
    studio: true,
    sleeping: '1 king bed Â· bunk bed',
    nightlyRate: 250,
    cleaningFee: 100,
    serviceFee: 50,
    shortDescription: 'Ocean-view studio at Zantamar in La Cruz de Huanacaxtle â€” king bed, bunk bed, 2 baths, up to 4 guests. Resort pool included.',
    shortDescriptionEs: 'Studio con vista al ocÃ©ano en Zantamar, La Cruz de Huanacaxtle â€” cama king, literas, 2 baÃ±os, hasta 4 huÃ©spedes. Alberca de resort incluida.',
    description: `Zantamar 306D is an ocean-view studio at the Zantamar complex in La Cruz de Huanacaxtle â€” a beautifully appointed retreat with a king bed, bunk bed, two bathrooms, and a private terrace with panoramic Banderas Bay views.

Compact, stylish, and complete, this studio is perfect for a couple or small family seeking the quintessential La Cruz experience at an accessible price point, with the full amenity backdrop of the Zantamar complex and TC Collection concierge service included.`,
    descriptionEs: `Zantamar 306D es un studio con vista al ocÃ©ano en el complejo Zantamar en La Cruz de Huanacaxtle â€” un refugio bellamente decorado con cama king, literas, dos baÃ±os y terraza privada con vistas panorÃ¡micas a la BahÃ­a de Banderas.

Compacto, elegante y completo, este studio es perfecto para una pareja o familia pequeÃ±a que busca la experiencia quintaesencial de La Cruz a un precio accesible, con el respaldo total de las amenidades del complejo Zantamar y el servicio de concierge de TC Collection incluidos.`,
    amenities: ['Ocean View', 'Private Terrace', 'Complex Pool', 'King Bed + Bunk Bed', '2 Bathrooms', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Marina (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Secure Parking', 'Daily Housekeeping'],
    amenitiesEs: ['Vista al ocÃ©ano', 'Terraza privada', 'Alberca del complejo', 'Cama king + literas', '2 baÃ±os', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'Marina (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento seguro', 'Limpieza diaria'],
    images: Array.from({length: 23}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar306_${String(i+1).padStart(2,'0')}.jpg`),
  },

  {
    slug: 'zantamar-th7',
    name: 'Zantamar TH7',
    location: 'La Cruz de Huanacaxtle',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    studio: false,
    sleeping: '1 king bed Â· 1 king bunk bed Â· pull-out sofa',
    nightlyRate: 480,
    cleaningFee: 160,
    serviceFee: 80,
    shortDescription: 'The crown of Zantamar â€” beachfront townhouse right on the sand with a private pool, 2 bedrooms, and Banderas Bay at your feet.',
    shortDescriptionEs: 'La joya de Zantamar â€” townhouse frente al mar directamente sobre la arena con alberca privada, 2 habitaciones y la BahÃ­a de Banderas a tus pies.',
    description: `Zantamar TH7 is the crown jewel of the Zantamar complex â€” a rare beachfront townhouse sitting directly on the sand of La Cruz de Huanacaxtle with a private pool, sweeping bay views, and the kind of direct ocean access that simply doesn't exist at this price point anywhere on the Riviera Nayarit.

Two bedrooms â€” a master with king bed and a second room with a king-size bunk bed â€” plus a pull-out sofa in the living area accommodate up to 6 guests across a generous multi-level layout. Step off your private terrace directly onto the beach; walk into your private pool whenever the mood strikes.

TH7 delivers the intimacy and exclusivity of a private villa with the full amenity support of the Zantamar complex and TC Collection concierge service. It is, without question, the finest address in La Cruz.`,
    descriptionEs: `Zantamar TH7 es la joya de la corona del complejo Zantamar â€” un excepcional townhouse frente al mar ubicado directamente sobre la arena de La Cruz de Huanacaxtle, con alberca privada, amplias vistas a la bahÃ­a y el tipo de acceso directo al ocÃ©ano que sencillamente no existe a este precio en ningÃºn lugar de la Riviera Nayarit.

Dos habitaciones â€” una principal con cama king y una segunda con literas king â€” mÃ¡s un sofÃ¡ cama en la sala alojan hasta 6 huÃ©spedes en una generosa distribuciÃ³n de varios niveles. Sal de tu terraza privada directamente a la playa; entra a tu alberca privada cuando el momento lo pida.

TH7 ofrece la intimidad y exclusividad de una villa privada con el respaldo completo de amenidades del complejo Zantamar y el servicio de concierge de TC Collection. Es, sin duda, la mejor direcciÃ³n en La Cruz.`,
    amenities: ['Beachfront â€” Right on the Sand', 'Private Pool', 'Direct Beach Access', 'Ocean Views', 'Multi-Level Townhouse', 'King Bed + King Bunk Bed', 'Pull-Out Sofa', 'Air Conditioning', 'High-Speed WiFi', 'Fully Equipped Kitchen', 'Multiple Terraces', 'Complex Pool', 'Marina (walking distance)', 'Smart TV / Streaming', 'Washer & Dryer', 'Secure Parking', 'Daily Housekeeping', 'Concierge Service'],
    amenitiesEs: ['Frente al mar â€” Sobre la arena', 'Alberca privada', 'Acceso directo a la playa', 'Vistas al ocÃ©ano', 'Townhouse de varios niveles', 'Cama king + literas king', 'SofÃ¡ cama', 'Aire acondicionado', 'WiFi de alta velocidad', 'Cocina totalmente equipada', 'MÃºltiples terrazas', 'Alberca del complejo', 'Marina (a pie)', 'Smart TV / Streaming', 'Lavadora y secadora', 'Estacionamiento seguro', 'Limpieza diaria', 'Servicio de concierge'],
    images: Array.from({length: 18}, (_, i) => `https://res.cloudinary.com/dwutnv1bb/image/upload/th7_${String(i+1).padStart(2,'0')}.jpg`),
  },

]

export default properties

