/**
 * Product Database for Kettle & Co.
 * 10 premium kettle products across smart, gooseneck, travel, and traditional categories.
 */
export const products = [
  {
    id: 'apex-kettle',
    name: 'The Apex Smart Kettle',
    price: 249.00,
    category: 'smart',
    tagline: 'Precision engineered for the coffee and tea connoisseur.',
    description: 'The pinnacle of thermal engineering. Features an ultra-sleek matte black outer shell, professional-grade gooseneck spout for water flow control, and micro-refined temperature control settings down to a single degree. Integrated smart companion App support enables remote boils and custom heat schedule profile configurations.',
    image: '/images/apex-kettle.png',
    rating: 4.9,
    reviews: 142,
    colors: [
      { name: 'Matte Obsidian', hex: '#1C1C1F', active: true },
      { name: 'Brushed Brass', hex: '#D4AF37', active: false },
      { name: 'Chrome Steel', hex: '#E2E2E2', active: false }
    ],
    features: [
      'Single-degree precision temperature control (40°C - 100°C)',
      '1200W rapid heating element with safety auto-shutoff',
      'Ambient LED color status base indicator',
      'Real-time temperature hold for up to 60 minutes',
      'Bluetooth 5.0 & Wi-Fi companion app integration'
    ],
    specs: {
      'Capacity': '0.9 Liters',
      'Material': '316 Medical-Grade Stainless Steel',
      'Connectivity': 'Bluetooth 5.0 & Wi-Fi 2.4GHz',
      'Power Source': '120V / 60Hz / 1200W',
      'Base Dimensions': '17.5 cm x 17.5 cm x 4.2 cm'
    }
  },
  {
    id: 'aero-gooseneck',
    name: 'The Aero Precision Gooseneck',
    price: 189.00,
    category: 'gooseneck',
    tagline: 'Artisan hand-brushed copper body for classical drip methods.',
    description: 'Designed exclusively for manual pour-over brewers. Crafted with a heavy-gauge, hand-brushed solid copper exterior and a medical-grade steel core. The signature counterbalanced handle shifts the center of gravity back toward your hand, enabling steady, organic pouring with zero fatigue.',
    image: '/images/aero-gooseneck.png',
    rating: 4.8,
    reviews: 96,
    colors: [
      { name: 'Brushed Copper', hex: '#B87333', active: true },
      { name: 'Polished Bronze', hex: '#CD7F32', active: false }
    ],
    features: [
      'Ergonomic counterbalanced handle for steady pours',
      'Angled spout cut for drip-free termination',
      'Solid copper exterior with dual-wall thermal isolation',
      'Analog thermometer built into the steam-vent lid',
      'Stovetop compatible — induction, gas & electric'
    ],
    specs: {
      'Capacity': '1.0 Liters',
      'Material': 'Solid Copper & 304 Stainless Steel',
      'Weight': '820 grams (empty)',
      'Base Type': 'Compatible with induction, gas, and electric ranges',
      'Base Dimensions': '15 cm diameter'
    }
  },
  {
    id: 'voyager-flask',
    name: 'The Voyager Smart Flask',
    price: 159.00,
    category: 'travel',
    tagline: 'Ultralight titanium electric flask with double-wall insulation.',
    description: 'Designed for the nomad who refuses to compromise on beverage quality. The Voyager combines a high-speed travel kettle and a vacuum flask in a single cylindrical titanium design. The integrated digital temperature display allows you to monitor heat real-time, holding your perfect boil on flights, trains, or trails.',
    image: '/images/voyager-flask.png',
    rating: 4.7,
    reviews: 64,
    colors: [
      { name: 'Raw Titanium', hex: '#8A9597', active: true },
      { name: 'Matte Charcoal', hex: '#2C3539', active: false }
    ],
    features: [
      'USB-C rapid heating interface + standard wall outlet cord',
      'Integrated touch-screen LCD temperature control panel',
      'Ultra-durable, lightweight double-walled titanium structure',
      'Spill-proof locking lid with integrated pressure valve',
      'NFC quick-pair mobile app profile sync'
    ],
    specs: {
      'Capacity': '0.5 Liters',
      'Material': 'Grade 5 Titanium & BPA-free Silicone',
      'Connectivity': 'NFC quick-pair mobile app profile',
      'Power Source': '100-240V Multi-voltage / 500W',
      'Weight': '480 grams'
    }
  },
  {
    id: 'neo-traditional',
    name: 'The Neo Traditionalist',
    price: 139.00,
    category: 'traditional',
    tagline: 'Timeless vintage silhouette reimagined for the modern stovetop.',
    description: 'Combining classic 1950s European aesthetics with contemporary thermal efficiency. The Neo Traditionalist has a premium glossy sage green enamel-over-steel coating, a solid teak wood handle, and a pleasant, low-pitch harmonic whistle. Perfect for tea rituals that deserve slow, aesthetic preparation.',
    image: '/images/neo-traditional.png',
    rating: 4.9,
    reviews: 112,
    colors: [
      { name: 'Glossy Sage', hex: '#778C85', active: true },
      { name: 'Pastel Cream', hex: '#FDF6E2', active: false },
      { name: 'Retro Red', hex: '#B22222', active: false }
    ],
    features: [
      'Low-frequency harmonic whistle (non-piercing chord)',
      'Responsibly sourced natural solid teak wood handles',
      'Extra-wide heat base for rapid stovetop heat absorption',
      'Scratch-resistant high-gloss ceramic enamel coating',
      'Compatible with all stovetop types including induction'
    ],
    specs: {
      'Capacity': '1.8 Liters',
      'Material': 'Enamel-Coated Carbon Steel & Teak Wood',
      'Base Type': 'Works on Induction, Electric, Ceramic, Gas, and Halogen',
      'Weight': '1.2 kg',
      'Opening Diameter': '11 cm (easy clean access)'
    }
  },
  {
    id: 'prism-smart',
    name: 'The Prism Smart Pro',
    price: 299.00,
    category: 'smart',
    tagline: 'Next-gen AI-assisted brewing with voice control support.',
    description: 'The Prism Smart Pro elevates intelligent brewing to an art form. Featuring an OLED status ring, voice command integration, and a self-calibrating temperature algorithm that learns your brewing preferences over time. Its polished mirror-finish body makes it the centerpiece of any modern kitchen.',
    image: '/images/apex-kettle.png',
    imageFilter: 'hue-rotate(180deg) brightness(1.1)',
    rating: 4.8,
    reviews: 78,
    colors: [
      { name: 'Mirror Platinum', hex: '#E8E8EC', active: true },
      { name: 'Deep Space', hex: '#0D0D14', active: false },
      { name: 'Aurora Gold', hex: '#C8A951', active: false }
    ],
    features: [
      'AI-powered brew profile memory (up to 20 profiles)',
      'Voice command integration (Alexa & Google Home)',
      'OLED ambient light ring with 16M color options',
      'Self-calibrating temperature sensors (±0.2°C accuracy)',
      '1400W dual coil heating with overheat protection'
    ],
    specs: {
      'Capacity': '1.2 Liters',
      'Material': '18/10 Mirror-Polished Stainless Steel',
      'Connectivity': 'Wi-Fi 6, Bluetooth 5.2, Matter Protocol',
      'Power Source': '120-240V Universal / 1400W',
      'Display': 'Capacitive touch + OLED ring'
    }
  },
  {
    id: 'nordic-gooseneck',
    name: 'The Nordic Pour',
    price: 169.00,
    category: 'gooseneck',
    tagline: 'Scandinavian minimalism meets precision pour engineering.',
    description: 'Inspired by the clean lines of Nordic design, the Nordic Pour kettle offers a matte concrete-grey body with a naturally oiled ash wood handle. The swan-neck spout is precision-milled from a single steel billet, ensuring a consistent, laminar flow rate perfect for V60 and Chemex pour-overs.',
    image: '/images/aero-gooseneck.png',
    imageFilter: 'hue-rotate(200deg) saturate(0.6) brightness(1.15)',
    rating: 4.6,
    reviews: 55,
    colors: [
      { name: 'Concrete Grey', hex: '#9A9AA4', active: true },
      { name: 'Dune White', hex: '#F0EBE3', active: false }
    ],
    features: [
      'Single-billet precision-milled gooseneck spout',
      'Natural ash wood handle with food-safe oil finish',
      'Matte concrete-textured powder coat exterior',
      'Built-in flow-rate indicator on handle',
      '60-minute temperature hold with tactile dial'
    ],
    specs: {
      'Capacity': '1.0 Liters',
      'Material': 'Powder-Coated 304 Steel & Ash Wood',
      'Weight': '760 grams',
      'Base Type': 'Electric base included (detachable)',
      'Temperature Range': '60°C - 100°C'
    }
  },
  {
    id: 'summit-travel',
    name: 'The Summit Expeditionary',
    price: 119.00,
    category: 'travel',
    tagline: 'Military-grade travel kettle built for extreme conditions.',
    description: 'Engineered for adventurers, the Summit Expeditionary kettle is built to endure the harshest environments. Its aircraft-grade aluminum shell withstands drops from 1.5m, the locking lid creates a hermetic seal for high-altitude use, and a dual-mode heating system works via car lighter adaptor or standard outlet.',
    image: '/images/voyager-flask.png',
    imageFilter: 'hue-rotate(90deg) saturate(1.3) brightness(0.9)',
    rating: 4.5,
    reviews: 43,
    colors: [
      { name: 'Tactical Olive', hex: '#4A5240', active: true },
      { name: 'Desert Sand', hex: '#C2A882', active: false },
      { name: 'Stealth Black', hex: '#111118', active: false }
    ],
    features: [
      '1.5m drop-tested aircraft-grade aluminum shell',
      'Hermetic vacuum lid for altitudes up to 5,000m',
      'Dual-mode: 12V car adapter + 110-240V outlet',
      'Integrated carabiner clip & handle loop',
      'Foldable heat-safe silicone grip handles'
    ],
    specs: {
      'Capacity': '0.75 Liters',
      'Material': '6061 Aircraft Aluminum & Food-Safe Silicone',
      'Power Source': '12V DC / 100-240V AC, 800W',
      'Weight': '390 grams',
      'Certifications': 'MIL-STD-810H impact rated'
    }
  },
  {
    id: 'heritage-cast',
    name: 'The Heritage Cast Iron',
    price: 199.00,
    category: 'traditional',
    tagline: 'Japanese tetsubin-inspired cast iron kettle with enamel core.',
    description: 'A love letter to centuries-old Japanese tetsubin craft. The Heritage Cast Iron kettle is hand-cast using traditional sand-mold techniques in our partner foundry in Nambu, Japan. The interior is coated with a food-safe enamel glaze to prevent rust while preserving the iron\'s natural mineral-enhancing properties on water.',
    image: '/images/neo-traditional.png',
    imageFilter: 'hue-rotate(340deg) saturate(0.7) brightness(0.85)',
    rating: 4.9,
    reviews: 134,
    colors: [
      { name: 'Nambu Black', hex: '#1A1A1A', active: true },
      { name: 'Burgundy Lacquer', hex: '#6B1B24', active: false }
    ],
    features: [
      'Hand-cast using traditional Japanese sand-mold technique',
      'Food-safe enamel interior preserves mineral water quality',
      'Textured iron exterior retains heat for 45+ minutes',
      'Included wooden trivet and lid lifter accessories',
      'Artisan-signed base with foundry authenticity certificate'
    ],
    specs: {
      'Capacity': '1.2 Liters',
      'Material': 'Cast Iron (Nambu-style) & Enamel Coating',
      'Weight': '2.1 kg',
      'Base Type': 'Gas, Electric, Ceramic — NOT induction compatible',
      'Origin': 'Handmade in Iwate Prefecture, Japan'
    }
  },
  {
    id: 'ion-smart',
    name: 'The Ion Glass Smart',
    price: 219.00,
    category: 'smart',
    tagline: 'Borosilicate glass body with real-time brew visualization.',
    description: 'Watch your water transform in real-time. The Ion Glass Smart kettle features a laboratory-grade borosilicate glass body illuminated by an RGB LED base that shifts color with temperature — from cool blue at 40°C to vibrant amber at 80°C to intense crimson at 100°C. Smart connectivity lets you set precise targets from your phone.',
    image: '/images/apex-kettle.png',
    imageFilter: 'hue-rotate(250deg) brightness(1.2) contrast(1.1)',
    rating: 4.7,
    reviews: 89,
    colors: [
      { name: 'Crystal Clear', hex: '#D6E4F0', active: true },
      { name: 'Smoked Obsidian', hex: '#2D2D35', active: false }
    ],
    features: [
      'Laboratory-grade borosilicate glass (shock & thermal resistant)',
      'RGB temperature-reactive LED illumination base',
      'Touch-capacitive handle with haptic feedback controls',
      'Real-time temperature visualization through glass',
      'App-controlled brew scheduling with 15 presets'
    ],
    specs: {
      'Capacity': '1.0 Liters',
      'Material': 'Borosilicate Glass & Brushed Stainless Steel',
      'Connectivity': 'Bluetooth 5.0 / Wi-Fi 2.4GHz',
      'Power Source': '120V / 1000W',
      'LED Colors': '16 million RGB colors'
    }
  },
  {
    id: 'bamboo-gooseneck',
    name: 'The Bamboo Flow',
    price: 155.00,
    category: 'gooseneck',
    tagline: 'Sustainably crafted gooseneck with organic bamboo detailing.',
    description: 'Crafted for the eco-conscious brewer without compromise. The Bamboo Flow pairs a recycled 316 stainless steel body with responsibly harvested bamboo handle and base accents. Certified carbon-neutral in manufacturing, it delivers exceptional pour control with a spring-balanced gooseneck spout that makes every pour feel effortless.',
    image: '/images/aero-gooseneck.png',
    imageFilter: 'sepia(0.4) hue-rotate(60deg) brightness(1.05)',
    rating: 4.6,
    reviews: 71,
    colors: [
      { name: 'Natural Bamboo', hex: '#A8956A', active: true },
      { name: 'Matte Sage', hex: '#6B7F6B', active: false },
      { name: 'Ebony Oak', hex: '#2C1A0E', active: false }
    ],
    features: [
      'FSC-certified sustainable bamboo handle & base',
      'Recycled 316 stainless steel body (70% recycled content)',
      'Spring-balanced gooseneck for effortless flow control',
      'Carbon-neutral manufacturing certified',
      '1L capacity — ideal for 2-4 cup pour-over sessions'
    ],
    specs: {
      'Capacity': '1.0 Liters',
      'Material': 'Recycled 316 Steel & FSC Bamboo',
      'Weight': '690 grams',
      'Temperature Indicator': 'External glass thermometer',
      'Base Type': 'Electric induction base (1100W) included'
    }
  }
];
