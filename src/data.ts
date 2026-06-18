import { Product, MapSpot, BlogArticle, Review } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "sandy-hills",
    name: "Safar EDP",
    tagline: "Sensual Coastal Breeze & Golden Desert Sand",
    price: 1850,
    salePrice: 1450,
    size: "50 ml",
    ingredients: ["Italian Bergamot", "Cardamom Seeds", "Crisp Sea Salt", "Golden Caramel", "Sand Accord", "Madagascan Vanilla", "Cedarwood"],
    longevity: "Extremely long lasting (10-12 hours)",
    projection: "Radiant, enveloping and warm",
    description: "A breathtaking mineral-oasis fragrance that mimics the feeling of warm desert dunes touching cool ocean waves, creating a gorgeous cozy sillage.",
    story: "Safar is the ultimate journey of the wanderer. Inspired by the surreal sands of ancient desert landscapes, it is our signature masterpiece blending fresh zesty bergamot with high-octane cardamom, transitioning elegantly into dry woodiness and the comforting sweet, saline glow of sea salt and warm vanilla caramel.",
    notes: {
      top: ["Italian Bergamot", "Green Cardamom Seeds", "Crisp Sea Salt"],
      heart: ["Warm Golden Caramel", "Desert Sand Accord", "Coconut Water"],
      base: ["Madagascan Vanilla", "Dry Himalayan Cedarwood", "White Amber"]
    },
    destination: "Thar & Indian Coastlines",
    destinationState: "Rajasthan & Goa",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 384,
    category: "Next Gen fragrances"
  },
  {
    id: "island-bloom",
    name: "Zara EDP",
    tagline: "Dancing Tiare Petals & Luminous Beachside Musk",
    price: 1850,
    salePrice: 1450,
    size: "50 ml",
    ingredients: ["Fresh Tiare Flower", "Coconut Nectar", "White Gardenia", "Indian Jasmine", "Warm Orange Blossom", "Musk Infusion"],
    longevity: "Long lasting (8-10 hours)",
    projection: "Luminous, sunny and floral",
    description: "An exotic, narcotic tropical floral composition capturing the pristine white sands and breeze of warm Indian Ocean horizons.",
    story: "Zara is a brilliant white-floral breeze that speaks of blooming coastal gardens. We hand-compound the sun-kissed sweetness of dew-soaked white gardenia and fresh tiare blossoms with modern saline-sweet coconut nectar to create a highly addictive coastal trace.",
    notes: {
      top: ["Tiare Flower Buds", "Sweet Neroli Sparks", "Mandarin Zest"],
      heart: ["Indian Royal Jasmine", "Plumeria (Frangipani)", "Orange Blossom"],
      base: ["Creamy Coconut Nectar", "Soft Velvet Musk", "Warm Golden Amber"]
    },
    destination: "Andaman & Lakshadweep",
    destinationState: "Indian Territories",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 142,
    category: "Next Gen fragrances"
  },
  {
    id: "mogra-madness",
    name: "Aarzoo Attar",
    tagline: "Wild Arabian Jasmine & Velvet Musk Trail",
    price: 1623,
    salePrice: 1623,
    size: "12 ml",
    ingredients: ["Kannauj Mogra Extract", "Arabian Jasmine", "Ambergris Accord", "Tonka Bean", "White Musk"],
    longevity: "Long lasting (7-9 hours)",
    projection: "Luminous floral cloud",
    description: "A celebration of fresh handpicked Mogra flowers blended into white musk and sandalwood.",
    story: "Aarzoo translates to 'Desire' or 'Longing'. Scent-laden breeze flowing through open verandas down ancient South Indian plains. We hand-compound the green-creamy sweetness of Kannauj Mogra with soft white velvet musk to preserve a warm, innocent nostalgia.",
    notes: {
      top: ["Fresh Cardamom Sparks", "Sweet Orange Blossom", "Green Leaves"],
      heart: ["Kannauj Mogra Lily", "Arabian Jasmine", "Tuberose Nectar"],
      base: ["Sandalwood Oil", "White Velvet Musk", "Gourmand Tonka"]
    },
    destination: "Kannauj Scent Hub",
    destinationState: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 8,
    category: "Next Gen fragrances"
  },
  {
    id: "sidr-wood",
    name: "Musafir EDP",
    tagline: "Golden Sidr Honey, Saffron & Majestic Cedarwood",
    price: 1850,
    salePrice: 1450,
    size: "50 ml",
    ingredients: ["Raw Sidr Honey", "Kashmiri Saffron", "Himalayan Cedarwood", "Warm Nutmeg", "Incense Puff", "Earthy Patchouli"],
    longevity: "Beast mode (10-12 hours)",
    projection: "Strong, deep, and majestic",
    description: "A dense, rich sweet-woody masterpiece combining precious Sidr honey with resinous cedarwood barks and warm spices.",
    story: "Musafir represents the mystic traveler. Drawing inspiration from sacred ancient forests and gold-dripping mountain honeycombs. It is an opulent nectar EDP that merges the spicy warmth of Kashmiri Saffron with the raw, earthy-sweet comfort of real forest honey and cedarwood layers.",
    notes: {
      top: ["Kashmiri Saffron Threads", "Warm Cardamom Seeds", "Nutmeg Shavings"],
      heart: ["Raw Sidr Wild Honey", "Royal Rosa Absolue", "Warm Incense Puff"],
      base: ["Himalayan Cedarwood Bark", "Resinous Agarwood", "Earthy Patchouli"]
    },
    destination: "Kullu & Kashmir Ranges",
    destinationState: "Jammu & Kashmir",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 219,
    category: "Next Gen fragrances"
  },
  {
    id: "mitti-attar",
    name: "Mitti Attar",
    tagline: "The Olfactory Essence of Baked Terra-Cotta",
    price: 1149,
    salePrice: 949,
    size: "12 ml",
    ingredients: ["Baked Clay Earth", "Pure Mysore Sandalwood", "Silt Accord", "Mineral Musk"],
    longevity: "Moderate (6-8 hours)",
    projection: "Intimate and earthy",
    description: "Baked clay hydro-distilled into creamy sandalwood. Captures the magical aroma of first summer rain landing on parched Indian soil.",
    story: "The ultimate signature of Kannauj cooperage. Terra-cotta clay cakes baked in wood fires are placed inside copper stills and hydro-distilled directly into sacred sandalwood oil over forty days to capture Petrichor (Gil).",
    notes: {
      top: ["Baked Earth Shells", "Mineral Salt", "Ozone Accord"],
      heart: ["Wet Clay Silt", "Rainwater Mist", "Foliage Sap"],
      base: ["Mysore Sandalwood Oil", "Dry Vetiver", "Mineral Musk"]
    },
    destination: "Kannauj Scent Hub",
    destinationState: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 146,
    category: "BEST SELLING"
  },
  {
    id: "ruh-discovery-set",
    name: "The Ruh Odyssey Discovery Set",
    tagline: "Explore flagship slow-perfumery masterpieces",
    price: 1250,
    salePrice: 950,
    size: "3 x 10 ml Spray",
    ingredients: ["Sandy Hills EDP", "Sidr Wood EDP", "Island Bloom EDP"],
    longevity: "Varies (8-12 hours)",
    projection: "Highly captivating sillage",
    description: "An elegant travel-box discovery drawers featuring 10ml travel sprayers of Sandy Hills, Sidr Wood, and Island Bloom.",
    story: "Begin your traveler scent journey. Discover our three signature flagship Eau de Parfums in generous 10ml travel sizes to find your personal geographical signature.",
    notes: {
      top: ["Coastal Bergamot & Salt (Sandy Hills)"],
      heart: ["Sweet Golden Sidr Honey & Rose (Sidr Wood)"],
      base: ["Tiare Flower Buds & Musk (Island Bloom)"]
    },
    destination: "Flagship Collection Tour",
    destinationState: "Pan-India Sourcing",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 312,
    category: "BEST SELLING"
  },
  {
    id: "sandalwood-attar",
    name: "Sandalwood Attar",
    tagline: "Pure Santalum Album Heritage Oil",
    price: 1600,
    salePrice: 1349,
    size: "12 ml",
    ingredients: ["Santalum Album Album", "East Indian Sandalwood", "Creamy Woods", "Ambergris", "White Musk"],
    longevity: "Long lasting (8-10 hours)",
    projection: "Subtle but elegant",
    description: "Pristine sandalwood extract handcrafted in Kannauj using heritage cooper-still methods.",
    story: "Sandalwood is India's most sacred tree. Respected in ritual and royalty, this attar offers a milky, buttery, deeply comforting woody drydown that acts as an second skin.",
    notes: {
      top: ["Sandalwood Heartwood Shavings", "Powdery Accord", "Warm Cedar"],
      heart: ["Creamy Santalum Album Oil", "Balsam Fir", "Soft Rosewood"],
      base: ["Gilded Amber", "White Velvet Musk", "Benzoin Tears"]
    },
    destination: "Mysore Cooperative",
    destinationState: "Karnataka",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 126,
    category: "BEST SELLING"
  },
  {
    id: "mogra-attar",
    name: "Mogra Attar",
    tagline: "Royal White Jasmine Petals in Sandalwood oil",
    price: 1350,
    salePrice: 1090,
    size: "12 ml",
    ingredients: ["Madurai Jasmin Sambac", "Mysore Sandalwood Base", "Neroli", "Green Leaves Extract"],
    longevity: "Long lasting (8-10 hours)",
    projection: "Luminous and narcotic",
    description: "Fragrant Mogra flower buds hand-collected at sunrise and water-distilled into pure sandalwood oil base.",
    story: "A delicate dance of floral ecstasy and sacred woody depth. Compounded via traditional Kannauj hydro-distillation methods by the same perfumer generations.",
    notes: {
      top: ["Dewy Green Leaves", "Grapefruit Skin", "Water Lilies"],
      heart: ["Madurai Jasmine Buds", "Neroli Blossoms", "Ylang Ylang"],
      base: ["Sandalwood Heritage Base", "Musk Accord", "Warm Cedarwood"]
    },
    destination: "Madurai & Kannauj",
    destinationState: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200",
    rating: 5.0,
    reviewsCount: 105,
    category: "BEST SELLING"
  },
  {
    id: "nargis-attar",
    name: "Nargis Attar",
    tagline: "Wild Narcissus Scent of Himalayan Slopes",
    price: 1350,
    salePrice: 1090,
    size: "12 ml",
    ingredients: ["Narcissus Poeticus", "Himalayan Forest Herbs", "Creamy Sandalwood OilBase", "Gilded Moss", "Oud Wood"],
    longevity: "Long lasting (7-9 hours)",
    projection: "Polite and green-honeyed",
    description: "An evocative mountain-fresh attar, celebrating wild paperwhite Narcissus blooms of pristine Himalayan slopes.",
    story: "Capturing the spring thaw in Kullu valley. Precious Narcissus (Nargis) flowers are handpicked and carefully transported to Kannauj for immediate clay hydro-distillation into creamy Sandalwood oil.",
    notes: {
      top: ["Himalayan Green Herbs", "Ozone Scent", "Bitter Orange"],
      heart: ["Wild Narcissus Blooms", "White Jasmine", "Warm Honeycomb"],
      base: ["Creamy Sandalwood Oil", "Forest Moss", "Soft Patchouli"]
    },
    destination: "Himalayas & Kannauj",
    destinationState: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1528740564264-7a988d39f6cc?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 45,
    category: "Authentic Indian Attars"
  },
  {
    id: "dahn-al-oud-attar",
    name: "Dahn Al Oud Attar",
    tagline: "Prestigious Wild Aquilaria Resin Oil",
    price: 1600,
    salePrice: 1549,
    size: "12 ml",
    ingredients: ["Assam Aged Agarwood", "Smoked Leather Accord", "Patchouli Oil", "Earthy Roots", "Ambergris"],
    longevity: "Beast mode (12+ hours)",
    projection: "Rich, powerful sillage",
    description: "Pure, aged dark agarwood essence extracted from wild resinous Aquilaria fields in Assam Hills.",
    story: "An opulent, prized classic. Composed of dark, resinous Assamese Oud aged for three years to unleash its famous animalic-sweet, smoky, and highly prestigious woody longevity profile.",
    notes: {
      top: ["Smoked Spices", "Tobacco Leaves", "Aromatic Herbs"],
      heart: ["Aged Assamese Oud", "Smoked Leather", "Rose Absolue"],
      base: ["Earthy Patchouli", "Ambergris Infusion", "Sandalwood Core"]
    },
    destination: "Assam Hills",
    destinationState: "Assam",
    image: "https://images.unsplash.com/photo-1512207724213-747424901c37?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 15,
    category: "Authentic Indian Attars"
  },
  {
    id: "saffron-attar",
    name: "Saffron Attar (Kesar)",
    tagline: "Kashmiri Golden Saffron in Sandalwood Oil Base",
    price: 1600,
    salePrice: 1349,
    size: "12 ml",
    ingredients: ["Kashmiri Saffron Crocus", "Warm Cinnamon Bark", "Clove Buds", "Sandalwood Heritage Base", "Musk"],
    longevity: "Long lasting (8-10 hours)",
    projection: "Warm and noble",
    description: "Highly sought-after golden Kashmiri Saffron stigmata hydro-distilled into pure sandalwood oil base.",
    story: "Saffron is the world's most luxurious spice. Harvested by hand during autumn in Pampore, Kashmir, this attar envelopes you in a royal aura of warm, metallic-sweet spice of rare pedigree.",
    notes: {
      top: ["Green Cardamom Buds", "Nutmeg", "Cinnamon Sparks"],
      heart: ["Kashmiri Saffron Threads", "Crimson Rose Petals", "Clove Buds"],
      base: ["Mysore Sandalwood Heritage Base", "Warm Vanilla Beads", "White Musk"]
    },
    destination: "Pampore Cooperative",
    destinationState: "Kashmir",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 20,
    category: "Authentic Indian Attars"
  },
  {
    id: "raat-ki-rani",
    name: "Raat ki Rani",
    tagline: "Night-Blooming Cestrum Diurnvm & Amber",
    price: 1763,
    salePrice: 1489,
    size: "12 ml",
    ingredients: ["Raat ki Rani Extract", "Night Bloom Jasmine", "Warm Amber Resin", "Sandalwood Oil Base", "Musk"],
    longevity: "Long lasting (8-12 hours)",
    projection: "Luminous and warm",
    description: "Captivating night-blooming jasmine blossoms compounded with sweet amber to echo romantic mystical nights.",
    story: "Capturing the intense fragrance of Raat ki Rani (Queen of the Night) which blooms only when the sun sets. Water-distilled inside traditional Kannauj stills into premium sandalwood oil to provide a glorious sensual trail.",
    notes: {
      top: ["Fresh Bergamot", "Dewy Leaves Accord", "Neroli"],
      heart: ["Night-Blooming Jasmin", "White Rose Buds", "Tuberose Nectar"],
      base: ["Sandalwood Oil base", "Sweet Amber Resin", "Musk Accord"]
    },
    destination: "Kannauj Scent Hub",
    destinationState: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 17,
    category: "Authentic Indian Attars"
  },
  {
    id: "champa-muse",
    name: "Champa Muse",
    tagline: "Golden Champa Flower & Sunkissed Vanilla EDP",
    price: 1847,
    salePrice: 1638,
    size: "50 ml",
    ingredients: ["Golden Champa flower", "Madagascar Vanilla", "Calabrian Bergamot", "Sandalwood Core", "Musk Accord"],
    longevity: "Long lasting (8-10 hours)",
    projection: "Strong but polite",
    description: "A gorgeous modern Eau De Parfum showcasing high-altitude Golden Champa (Magnolia Champaca) blossoms layered upon rich gourmet vanilla.",
    story: "Inspired by lazy sunny afternoons in South Indian temple courtyards. Handcrafted at a heavy 22% oil concentration to ensure a persistent, gorgeous floral trail that turns heads.",
    notes: {
      top: ["Calabrian Bergamot", "Sunkissed Citrus", "Green Cardamom"],
      heart: ["Golden Champa Blooms", "Ylang Ylang", "Star Jasmine"],
      base: ["Madagascar Vanilla", "Sandalwood Core", "Warm Musk"]
    },
    destination: "Kannauj & Mysore",
    destinationState: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 9,
    category: "Eau De Parfum"
  },
  {
    id: "dahn-al-oud-edp",
    name: "Dahn al Oud EDP",
    tagline: "Resinous Assamese Agarwood & Tuscan Leather",
    price: 2130,
    salePrice: 1939,
    size: "50 ml",
    ingredients: ["Assam Oud Oil", "Tuscan Leather", "Kashmiri Saffron", "Royal Red Rose", "Cedarwood"],
    longevity: "Beast mode (12+ hours)",
    projection: "Rich, room-filling trail",
    description: "A modern, highly sophisticated Eau De Parfum blending organic Assamese agarwood with rich Tuscan leather and red roses.",
    story: "A luxurious translation of our legendary attar. Styled as a premium, deep Eau De Parfum that wraps the strong animalic-smoky wood depth of pure Assam Oud in a velvety soft embrace of Kashmiri Saffron.",
    notes: {
      top: ["Saffron Threads", "Raspberry Spark", "Aromatic Thyme"],
      heart: ["Kannauj Crimson Rose", "Incense Smoke", "Tuscan Leather"],
      base: ["Aged Assamese Oud", "Warm Cedarwood", "Earthy Patchouli"]
    },
    destination: "Assam Hills",
    destinationState: "Assam",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 6,
    category: "Eau De Parfum"
  },
  {
    id: "forest-rush",
    name: "Forest Rush",
    tagline: "Earthy Vetiver & Rainwashed Woods EDP",
    price: 1847,
    salePrice: 1638,
    size: "50 ml",
    ingredients: ["Wayanad Vetiver", "Green Ivy leaves", "Cedarwood Bark", "Oakmoss", "Rainwater Accord"],
    longevity: "Long lasting (8-10 hours)",
    projection: "Fresh and crisp",
    description: "A clean, ultra-refreshing woody fragrance with notes of earthy vetiver, crushed green ivy, and rainwater.",
    story: "Capturing a mountain trek into the Western Ghats of Wayanad, Kerala. The wet root-smell of organic Vetiver grass blends beautifully with wood barks to revive the pure sense of nature after a storm.",
    notes: {
      top: ["Crushed Ivy Leaves", "Zesty Lime", "Rainwater Accord"],
      heart: ["Green Vetiver Roots", "Cedarwood", "Blue Lavender"],
      base: ["Oakmoss", "White Musk Accord", "Dry Sandalwood"]
    },
    destination: "Wayanad Sourcing Cooperative",
    destinationState: "Kerala",
    image: "https://images.unsplash.com/photo-1585218356057-dc0e8d3558bb?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 2,
    category: "Eau De Parfum"
  },
  {
    id: "gulab-edp",
    name: "Gulab EDP",
    tagline: "Hydro-Distilled Damask Roses & Soft Musks",
    price: 1847,
    salePrice: 1652,
    size: "50 ml",
    ingredients: ["Pure Damask Rose extract", "Kannauj Rose water", "White Amber", "Powdery Floral Accord", "Musk"],
    longevity: "Long lasting (8-10 hours)",
    projection: "Luminous and romantic",
    description: "An incredibly elegant Eau De Parfum celebrating the true essence of Kannauj's legendary hydro-distilled Damask Roses.",
    story: "An ode to the timeless Rose flower. Thousands of crimson petals are processed at dawn in traditional woodfires to capture an fresh, dew-kissed floral essence that feels incredibly rich.",
    notes: {
      top: ["Pink Pepper", "Bergamot Zest", "Kannauj Rosewater"],
      heart: ["Prisinte Damask Rose", "Plum Pulp", "White Violet blossomed"],
      base: ["White Amber", "Cashmere Wood", "Powdery Velvet Musk"]
    },
    destination: "Kannauj Scent Hub",
    destinationState: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 36,
    category: "Eau De Parfum"
  }
];

export const MAP_SPOTS: MapSpot[] = [
  {
    id: "mysore",
    name: "Mysore, Karnataka",
    lat: 12.2958,
    lng: 76.6394,
    mainIngredient: "Mysore Sandalwood Oil",
    description: "Sanding from the heart of the royal sandalwood gardens.",
    story: "Known as the Sandalwood City, Mysore has produced the world's most prized Santalum album oil for centuries. It yields a creamy, deeply milky, and sweet woody resonance that acts as the signature base of our Citrus Sandalwood perfume.",
    x: 35,
    y: 78
  },
  {
    id: "malabar",
    name: "Wayanad, Kerala",
    lat: 11.6854,
    lng: 76.1320,
    mainIngredient: "Malabar Pepper & Cardamom",
    description: "Organic black gold from ancient coastal plantations.",
    story: "Nestled in the Western Ghats, Wayanad provides a humid mountain climate perfect for spices. The cold, fresh green-spice crackle of our cardamom seeds provides the critical counterpoint to the warm vanilla cozy base in Spicy Route.",
    x: 34,
    y: 84
  },
  {
    id: "kannauj",
    name: "Kannauj, Uttar Pradesh",
    lat: 27.0543,
    lng: 79.9135,
    mainIngredient: "Gulab (Rose) Attar",
    description: "Hydro-distilled rose petals in traditional copper degs.",
    story: "The Grasse of the East, Kannauj uses century-old hydro-distillation methods. We incorporate their velvety copper-distilled Crimson Rose as the romantic bridge notes mapping the smoky leather into Assamese Oud.",
    x: 52,
    y: 44
  },
  {
    id: "assam",
    name: "Jorhat, Assam",
    lat: 26.7509,
    lng: 94.2156,
    mainIngredient: "Assam Dark Agarwood (Oud)",
    description: "Black liquid gold extracted from wild resinous aquilaria fields.",
    story: "In the moist river valleys of Upper Assam, Aquilaria trees develop deep, dark protective resins when touched by nature. This gives Assam Oud its famously powerful, slightly animalic, dark, sweet, and highly smoky longevity signature on the skin.",
    x: 82,
    y: 36
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "mysore-journey",
    title: "The Whispers of Mysore Forests: Sourcing Sacred Sandalwood",
    excerpt: "How we track down the rarest 'Santalum Album' from heritage grower cooperatives to create our creamy Sandalwood bases.",
    readTime: "4 min read",
    author: "Maldev Singh, Olfactory lead",
    date: "May 28, 2026",
    image: "https://images.unsplash.com/photo-1540206276907-fbd77eeaa0a8?auto=format&fit=crop&q=80&w=600",
    location: "Mysore, India",
    content: `For over two millennia, the royal forests of Mysore, Karnataka, have been synonymous with the finest sandalwood on earth. Popularly known as Mysore Sandalwood (*Santalum album*), the oil extracted from these slow-growing heartwoods carries a uniquely dense, milky, and extremely long-lasting woody aroma that synthetic alternatives fail to replicate.

To obtain our high-concentration raw material, the Ruh Imperium sourcing team ventures deep into government-supervised grower cooperatives down South. It takes thirty years of growth before a sandalwood tree develops its rich heartwood. 

When blended with zesty bergamot and sea salt in our Sandy Hills EDP, the sandalwood behaves as an anchor. It warms up upon contact with the heat of your pulse points, transitioning slowly from a zesty, sunkissed morning splash into a calm, enveloping trail that stays close to you for up to 10 hours.`
  },
  {
    id: "kannauj-distillation",
    title: "Kannauj: Scent of Summer Rain & Traditional Deg-Bhapka Cooperage",
    excerpt: "A deep dive into Kannauj, India's perfume capital, where time-tested copper stills capture the essence of earth and rose petals.",
    readTime: "5 min read",
    author: "Shubhangi V.",
    date: "June 05, 2026",
    image: "https://images.unsplash.com/photo-1595151830531-2974eb3a13d7?auto=format&fit=crop&q=80&w=600",
    location: "Kannauj, India",
    content: `Walking through the narrow alleys of Kannauj, Uttar Pradesh, feels like traveling back to the 12th century. The air is thick with the sweet aroma of boiling jasmine, rose petals, and baked terra-cotta clay. 

Here, artisans still practice the age-old *Deg-Bhapka* method of hydro-distillation. No modern computer consoles or steel pressure cookers are seen. Clay woodfire furnaces boil large copper pots (*degs*), connected via bamboo pipes (*chongas*) into receivers (*bhapkas*) submerged in cold water channels.

In Oud Wood, we wanted to capture the exquisite scent of hydro-distilled Crimson Roses from Kannauj. Sourced at dawn when the morning nectar is at its peak, these roses give our dark agarwood core a lush, dew-drenched floral breathing room, softening the harsh, smoky edges of Tuscan leather.`
  },
  {
    id: "ancient-spice-trails",
    title: "Ancient Spice Trails: The Secret to Warm Cardamom & Malabar Pepper",
    excerpt: "Exploring the humid foothills of Kerala's Western Ghats to find organic, high-potency green cardamom.",
    readTime: "3 min read",
    author: "Rohan Advani",
    date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=600",
    location: "Malabar, India",
    content: `Kerala has been the spice chest of the world since ancient Rome. Traders braved wild monsoon oceans just to obtain sacks of Malabar black pepper and green cardamom.

Our journey led us to family-owned spice orchards in Wayanad, high up in the foggy Western Ghats. In these hills, pepper vines climb up silver oak trees, while cardamom shrubs thrive in the cool undergrowth. 

For our 'Spicy Route' EDP, we select small-batch harvested green cardamom pods. They possess an icy, pine-like freshness that bursts open on the throat of the perfume, creating a sharp contrast that slowly dissolves into a velvety blanket of warm, organic Madagascar vanilla.`
  }
];

export const PRE_SEEDED_REVIEWS: Review[] = [
  {
    id: "rev1",
    productId: "citrus-sandalwood",
    productName: "Citrus Sandalwood",
    author: "Dr. Vikram Seth",
    rating: 5,
    text: "Absolutely stunning! The transition from bright mandarin into creamy Mysore sandalwood is seamless. It smells incredibly luxurious, easily on par with Creed or Tom Ford, if not better. Lasts a good 8+ hours on my skin. Highly recommended!",
    date: "2026-06-11",
    verified: true
  },
  {
    id: "rev2",
    productId: "spicy-route",
    productName: "Spicy Route",
    author: "Ananya Iyer",
    rating: 5,
    text: "Spicy Route is a masterpiece. The Wayanad cardamom feels very fresh and 'cold-spicy' at first, but after an hour, it turns into a cozy, rich vanilla-vetiver heaven. Received three compliments in office on my very first day wearing it. Safe blind buy!",
    date: "2026-06-08",
    verified: true
  },
  {
    id: "rev3",
    productId: "sidr-wood",
    productName: "Sidr Wood EDP",
    author: "Kabir Al-Mansoori",
    rating: 5,
    text: "Being raised in the Middle East, I have high standards for woody scents. Ruh Imperium did an incredible job. Scent profile is extremely rich without being overwhelming. The wild Sidr honey softens the cedarwood and saffron, making it extremely elegant. projection is massive!",
    date: "2026-05-30",
    verified: true
  },
  {
    id: "rev4",
    productId: "ruh-discovery-set",
    productName: "The Ruh Odyssey Discovery Set",
    author: "Ritu Sharma",
    rating: 5,
    text: "The perfect introduction to Ruh Imperium. Housed in a beautiful premium sand-colored gift drawer. 10ml size is very generous and easy to carry on travels. I fell in love with Sandy Hills, just ordered the 50ml full bottle!",
    date: "2026-06-12",
    verified: true
  },
  {
    id: "rev5",
    productId: "sandy-hills",
    productName: "Sandy Hills EDP",
    author: "Nikhil K.",
    rating: 4,
    text: "Superb everyday fragrance. Smells fresh, clean, and regal. The warm cardamom and caramel is creamy and warm. I wish the zesty bergamot lasted a bit longer upfront, but the sweet-mineral salt drydown is to die for.",
    date: "2026-06-02",
    verified: true
  }
];
