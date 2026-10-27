import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\nizar\\.gemini\\antigravity-ide\\brain\\96c9a6ca-f853-439b-a9d4-95621231805c';
const outputDir = path.resolve('./src/data');
const publicShoesDir = path.resolve('./public/shoes');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(publicShoesDir)) {
  fs.mkdirSync(publicShoesDir, { recursive: true });
}

const images = [
  {
    file: 'sneaker_cyber_cyan_1793097958235.jpg',
    id: 'kntx-01',
    name: 'KINETIX Quantum V1',
    category: 'Road Racing',
    subtitle: 'Cyber Cyan Edition // Nitro-Air Sole',
    price: 240,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Flagship',
    colorway: 'Cyber Cyan / Obsidian',
    accentColor: '#00F0FF',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Engineered with hyper-responsive Nitro-Air cushioning and dual-carbon stability shanks. The Quantum V1 delivers unmatched energy return and aerodynamic glide on road surfaces.',
    specs: {
      weight: '215g (Size 9)',
      drop: '8mm',
      upper: 'VaporWeave engineered breathable mesh',
      midsole: 'Translucent Nitro-Air chamber + dual carbon shank',
      outsole: 'Micro-lug grip rubber'
    },
    inStock: 14
  },
  {
    file: 'sneaker_phantom_white_1793097989424.jpg',
    id: 'kntx-02',
    name: 'AEROVOX Phantom High',
    category: 'Streetwear & Lifestyle',
    subtitle: 'Chalk White // Holographic Matrix',
    price: 295,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 98,
    badge: 'Limited Drop',
    colorway: 'Chalk White / Platinum Holographic',
    accentColor: '#A855F7',
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    description: 'Sculptural architectural high-top engineered from supple chalk-white leather and reflective holographic panelling. Designed for both runway impact and cloud-like all-day cushioning.',
    specs: {
      weight: '340g (Size 9)',
      drop: '10mm',
      upper: 'Top-grain leather + prismatic thermal film',
      midsole: 'Chunky geometric EVA matrix',
      outsole: 'Translucent traction pods'
    },
    inStock: 8
  },
  {
    file: 'sneaker_inferno_orange_1793098015614.jpg',
    id: 'kntx-03',
    name: 'TERRA-HAWK Trail 360',
    category: 'Trail & Outdoor',
    subtitle: 'Inferno Orange // BOA Precision Dial',
    price: 210,
    originalPrice: 230,
    rating: 4.95,
    reviewsCount: 215,
    badge: 'Editor\'s Choice',
    colorway: 'Electric Lava / Neon Lime / Slate',
    accentColor: '#FF5E00',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Built for relentless mountain trails and technical descents. Equipped with instantaneous micro-adjust BOA dial lacing, rock-shield toe guards, and aggressive multi-directional chevron lugs.',
    specs: {
      weight: '275g (Size 9)',
      drop: '6mm',
      upper: 'Ripstop ballistic mesh with TPU hot-melt weld',
      midsole: 'High-density Energy-Foam chassis',
      outsole: 'Vibram-grade 5mm mud-shedding lugs'
    },
    inStock: 19
  },
  {
    file: 'sneaker_aurum_stealth_1793098034982.jpg',
    id: 'kntx-04',
    name: 'STRYKE Aero-Gold Elite',
    category: 'Road Racing',
    subtitle: 'Stealth Pitch Black // Liquid Aurum 24K',
    price: 310,
    originalPrice: 350,
    rating: 5.0,
    reviewsCount: 84,
    badge: 'Ultra Rare',
    colorway: 'Pitch Black / Liquid Aurum',
    accentColor: '#FFD700',
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    description: 'The pinnacle of marathon racing performance. Full-length 3D carbon rocker plate embedded between dual layers of hyper-critical nitrogen-infused foam with liquid gold aerodynamic winglets.',
    specs: {
      weight: '188g (Size 9)',
      drop: '8mm',
      upper: 'Ultra-light AtomKnit seamless race weave',
      midsole: 'Full-length Carbon Spoon plate + ZoomFlype foam',
      outsole: 'Tuned wet-traction track pattern'
    },
    inStock: 5
  }
];

// Let's also create 2 more products using alternate color-filtered editions of these models
const extendedImages = [
  ...images,
  {
    file: 'sneaker_cyber_cyan_1793097958235.jpg',
    id: 'kntx-05',
    name: 'KINETIX Quantum Hyper-Acid',
    category: 'Limited Drop',
    subtitle: 'Acid Emerald // Dark Matter Edition',
    price: 260,
    originalPrice: 290,
    rating: 4.85,
    reviewsCount: 67,
    badge: 'Drop #04',
    colorway: 'Acid Emerald / Translucent Solar',
    accentColor: '#00FF66',
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    description: 'A glow-in-the-dark nocturnal runner featuring bioluminescent accents and our proprietary Nitro-Air chamber tuned for responsive urban night sprints.',
    specs: {
      weight: '218g (Size 9)',
      drop: '8mm',
      upper: 'Bioluminescent yarn + engineered mesh',
      midsole: 'High-rebound glow sole with carbon truss',
      outsole: 'Wet-grip hexagonal traction'
    },
    inStock: 11,
    cssFilter: 'hue-rotate(85deg) saturate(1.2)'
  },
  {
    file: 'sneaker_inferno_orange_1793098015614.jpg',
    id: 'kntx-06',
    name: 'TERRA-HAWK Crimson Peak',
    category: 'Trail & Outdoor',
    subtitle: 'Crimson Peak // Magnetic Quick-Lace',
    price: 225,
    originalPrice: 250,
    rating: 4.78,
    reviewsCount: 53,
    badge: 'New',
    colorway: 'Crimson Ember / Midnight Black',
    accentColor: '#FF0055',
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12],
    description: 'Engineered for high-altitude scree fields and rugged alpine crossings. High-traction perimeter teeth and reinforced toe cap keep you locked in.',
    specs: {
      weight: '280g (Size 9)',
      drop: '6mm',
      upper: 'Waterproof DWR ballistic nylon',
      midsole: 'Dual-density anti-torsion foam',
      outsole: 'Hyper-grip alpine compound'
    },
    inStock: 16,
    cssFilter: 'hue-rotate(-40deg) saturate(1.3)'
  }
];

const products = extendedImages.map(item => {
  const filePath = path.join(brainDir, item.file);
  const buffer = fs.readFileSync(filePath);
  const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  
  // also copy to public
  const targetPublic = path.join(publicShoesDir, item.file);
  if (!fs.existsSync(targetPublic)) {
    fs.copyFileSync(filePath, targetPublic);
  }

  return {
    ...item,
    imageBase64: base64,
    imagePublicUrl: `/shoes/${item.file}`,
    createdAt: new Date().toISOString()
  };
});

const content = `// Auto-generated product catalog with genuine Base64 encoded images
export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};

export const CATEGORIES = [
  'All Shoes',
  'Road Racing',
  'Streetwear & Lifestyle',
  'Trail & Outdoor',
  'Limited Drop'
];

export const SORT_OPTIONS = [
  { label: 'Featured / Best Selling', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' }
];
`;

fs.writeFileSync(path.join(outputDir, 'products.js'), content, 'utf-8');
console.log(`Successfully generated products.js with ${products.length} products with Base64 images!`);
