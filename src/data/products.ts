import { Product } from '../types/store';

export const PAKISTANI_HERO_IMAGE = '/src/assets/images/pakistani_summer_hero_1791268340968.jpg';

export const CURRENCY_RATES = {
  PKR: { symbol: 'Rs. ', rate: 1.0, locale: 'en-PK', prefix: true },
  USD: { symbol: '$', rate: 1 / 280, locale: 'en-US', prefix: true },
  GBP: { symbol: '£', rate: 1 / 355, locale: 'en-GB', prefix: true },
  AED: { symbol: 'AED ', rate: 1 / 76.2, locale: 'en-AE', prefix: true },
};

export const PRODUCTS: Product[] = [
  {
    id: 'nm-lawn-01',
    name: 'Gul-e-Bahaar Chikankari Luxury Lawn 3-Piece',
    urduSubtitle: 'گلِ بہار · چکن کاری لگژری لان',
    subtitle: 'Schiffli Embroidered Pima Lawn · Chiffon Dupatta · Dyed Cambric',
    category: 'chikankari',
    pieces: '3-piece',
    pricePKR: 15950,
    originalPricePKR: 18500,
    stitchingPricePKR: 5500,
    tag: 'Bahaar Volume I',
    images: [
      '/src/assets/images/pakistani_lawn_chikankari_1791268360831.jpg',
      '/src/assets/images/pakistani_summer_hero_1791268340968.jpg'
    ],
    colors: [
      { name: 'Blush Peach', hex: '#F7C6B8' },
      { name: 'Mint Pistachio', hex: '#C7E4D3' },
      { name: 'Pearl Ivory', hex: '#FAF5EE' }
    ],
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL'],
    description: 'An ethereal ode to classic Pakistani summer tailoring. Crafted on premium 80s count combed Pima cotton lawn with intricate floral Chikankari bore embroidery on front and sleeve panels. Completed with an airy digital printed Bemberg pure chiffon dupatta and solid dyed cambric trousers.',
    unstitchedFabricDetails: [
      'Embroidered Schiffli Lawn Shirt Front (1.25 meters)',
      'Digital Printed Lawn Shirt Back & Sleeves (1.75 meters)',
      'Digital Printed Pure Bemberg Chiffon Dupatta (2.5 meters)',
      'Dyed Solid Cotton Cambric Trouser (2.5 meters)',
      'Organza Embroidered Neckline & Daman Lace Border (2 meters)'
    ],
    composition: '100% Breathable Egyptian Combed Cotton Lawn & Pure Chiffon',
    craftTechnique: 'Schiffli Cutwork, Hand-guided Resham Threadwork & Pearl Borders',
    careInstructions: 'Dry clean recommended for first wash. Iron on reverse side at moderate temperature.',
    rating: 4.9,
    reviewsCount: 84,
    reviews: [
      {
        id: 'rev-p1',
        author: 'Ayesha Malik',
        location: 'Lahore, Defense Phase 6',
        rating: 5,
        date: 'March 14, 2026',
        headline: 'The lawn is astonishingly soft for hot summer days!',
        comment: 'I ordered the stitched version in Medium. The tailoring with organza cutwork on the daman and sleeves is impeccable. The chiffon dupatta drapes like a dream.',
        verified: true,
        fit: 'Perfect stitching'
      },
      {
        id: 'rev-p2',
        author: 'Saman Zubair',
        location: 'Karachi, Clifton',
        rating: 5,
        date: 'February 28, 2026',
        headline: 'True luxury lawn experience',
        comment: 'Zero color bleeding after wash. The peach tone is delicate and compliments Pakistani skin tones so gracefully.',
        verified: true,
        fit: 'Breathable lawn fabric'
      }
    ],
    inStock: true,
    pairedProductIds: ['nm-dupatta-01', 'nm-pret-01']
  },
  {
    id: 'nm-pret-01',
    name: 'Noor-e-Subh Embroidered Summer Pret Kurta',
    urduSubtitle: 'نورِ صبح · ریڈی ٹو ویئر سمر کُرتا',
    subtitle: 'Ready-to-Wear Pure Lawn · Hand-cut lace trimmings & pearl buttons',
    category: 'summer-pret',
    pieces: '1-piece',
    pricePKR: 8950,
    stitchingPricePKR: 0, // already stitched
    tag: 'Ready to Wear',
    images: [
      '/src/assets/images/pakistani_summer_pret_1791268376213.jpg',
      '/src/assets/images/pakistani_lawn_chikankari_1791268360831.jpg'
    ],
    colors: [
      { name: 'Alabaster Ivory', hex: '#FAF9F5' },
      { name: 'Sage Green', hex: '#C2D1C1' },
      { name: 'Dusty Rose', hex: '#D8B8B4' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Effortless summer elegance. A relaxed A-line silhouette tunic cut from featherlight lawn with sage green botanical embroidery, delicate scalloped crochet lace inserts on flared bell sleeves, and mother-of-pearl potli button accents.',
    unstitchedFabricDetails: [
      'Stitched Ready-to-Wear Shirt with pre-attached soft lawn slip',
      'Elongated shirt length (42 inches) for modern modest grace',
      'Lace insert neckline with hand-finished keyhole detailing'
    ],
    composition: '100% Fine Combed Summer Lawn with Cotton Lace',
    craftTechnique: 'Aari Threadwork & Hand-attached Pearl Trims',
    careInstructions: 'Gentle hand wash in cold water with mild detergent. Line dry in shade.',
    rating: 4.8,
    reviewsCount: 52,
    reviews: [
      {
        id: 'rev-p3',
        author: 'Zainab Tariq',
        location: 'Islamabad, F-7',
        rating: 5,
        date: 'March 21, 2026',
        headline: 'Ideal for summer brunch and workwear',
        comment: 'So cooling and lightweight. The sleeve lace adds such a chic touch. Received compliments all day!',
        verified: true,
        fit: 'True to size'
      }
    ],
    inStock: true,
    pairedProductIds: ['nm-coord-01', 'nm-dupatta-01']
  },
  {
    id: 'nm-festive-01',
    name: 'Shab-e-Noor Festive Organza Ensemble 3-Piece',
    urduSubtitle: 'شبِ نور · فیسٹیو آرگنزا سوٹ',
    subtitle: 'Silver Tilla & Resham Embroidery · Scalloped Organza Dupatta',
    category: 'festive-organza',
    pieces: '3-piece',
    pricePKR: 22500,
    originalPricePKR: 26000,
    stitchingPricePKR: 6500,
    tag: 'Eid Festive Edit',
    images: [
      '/src/assets/images/pakistani_festive_organza_1791268390971.jpg',
      '/src/assets/images/pakistani_summer_hero_1791268340968.jpg'
    ],
    colors: [
      { name: 'Ice Glaze Blue', hex: '#D1E6EB' },
      { name: 'Lilac Haze', hex: '#DFD2E5' },
      { name: 'Mughal Gold', hex: '#EAD7B0' }
    ],
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL'],
    description: 'Designed for summer weddings and Eid festivities. Light-as-air sheer organza encrusted with glistening silver tilla wire, micro-sequins, and delicate resham work. Features an intricately scalloped four-sided embroidered dupatta and silk trousers.',
    unstitchedFabricDetails: [
      'Embroidered Organza Shirt Front & Back (2.5 meters)',
      'Embroidered Organza Sleeves (0.75 meters)',
      'Four-Sided Scalloped Embroidered Organza Dupatta (2.5 meters)',
      'Dyed Raw Silk Trouser with Embroidered Motifs (2.5 meters)',
      'Dyed Cotton Silk Inner Slip (2.5 meters)'
    ],
    composition: 'Fine Sheer Organza & Raw Silk Trouser with Cotton-Silk Slip',
    craftTechnique: 'Zari, Tilla, Micro-Sequin & French Knot Resham',
    careInstructions: 'Strictly dry clean only. Store wrapped in muslin cloth.',
    rating: 5.0,
    reviewsCount: 39,
    reviews: [
      {
        id: 'rev-p4',
        author: 'Dr. Mahnoor Khan',
        location: 'Rawalpindi, Bahria Town',
        rating: 5,
        date: 'March 5, 2026',
        headline: 'Stunning craftsmanship for Eid',
        comment: 'The silver tilla work has zero coarseness—it does not snag and glimmers beautifully under evening lighting. Exceptional stitching quality.',
        verified: true,
        fit: 'Perfect stitching'
      }
    ],
    inStock: true,
    pairedProductIds: ['nm-lawn-01', 'nm-dupatta-01']
  },
  {
    id: 'nm-coord-01',
    name: 'Sahr Terracotta Printed Lawn Co-ord Set',
    urduSubtitle: 'سحر · پرنٹڈ لان کو آرڈ سیٹ',
    subtitle: 'Matching 2-Piece Kurta & Cigarette Trouser · Modern Modest Cut',
    category: 'co-ords',
    pieces: '2-piece',
    pricePKR: 9800,
    stitchingPricePKR: 0,
    tag: 'Summer Uniform',
    images: [
      '/src/assets/images/pakistani_summer_coords_1791268405650.jpg',
      '/src/assets/images/pakistani_summer_pret_1791268376213.jpg'
    ],
    colors: [
      { name: 'Terracotta Earth', hex: '#BF6652' },
      { name: 'Indigo Flora', hex: '#374B6E' },
      { name: 'Mustard Ochre', hex: '#CBA048' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'The contemporary uniform for everyday Pakistani summer ease. A coordinating 2-piece set in premium lawn showcasing earthy botanical Mughal block-print geometry. Styled with a notched band collar and ankle-skimming cigarette trousers with side slits.',
    unstitchedFabricDetails: [
      'Stitched Matching Lawn Kurta with band collar (39 inches length)',
      'Stitched Matching Straight Cigarette Trousers with elasticated waist'
    ],
    composition: '100% Superfine Combed Pakistani Lawn',
    craftTechnique: 'Precision Rotary Screen Print with Colorfast Reactive Dyes',
    careInstructions: 'Machine wash on gentle cold cycle. Wash dark colors separately.',
    rating: 4.8,
    reviewsCount: 67,
    reviews: [
      {
        id: 'rev-p5',
        author: 'Natasha Rizvi',
        location: 'Karachi, PECHS',
        rating: 5,
        date: 'March 18, 2026',
        headline: 'Crisp, contemporary, and so breathable',
        comment: 'Co-ord sets are having a huge moment in Pakistani fashion, and this cut is flattering and comfortable in Karachi humidity.',
        verified: true,
        fit: 'True to size'
      }
    ],
    inStock: true,
    pairedProductIds: ['nm-dupatta-01', 'nm-pret-01']
  },
  {
    id: 'nm-emerald-01',
    name: 'Zamarud Royal Emerald Foil & Resham Lawn 3-Piece',
    urduSubtitle: 'زمرد · رائل ایمرلڈ لان ۳ پیس',
    subtitle: 'Gold Foil Accents · Pure Medium Silk Dupatta · Cambric Trouser',
    category: 'luxury-lawn',
    pieces: '3-piece',
    pricePKR: 16800,
    originalPricePKR: 19500,
    stitchingPricePKR: 5500,
    tag: 'Luxury Collection',
    images: [
      '/src/assets/images/pakistani_emerald_lawn_1791268450797.jpg',
      '/src/assets/images/pakistani_summer_hero_1791268340968.jpg'
    ],
    colors: [
      { name: 'Royal Emerald', hex: '#1C543B' },
      { name: 'Cobalt Royal', hex: '#1D3B6A' },
      { name: 'Garnet Ruby', hex: '#632128' }
    ],
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL'],
    description: 'Regal South Asian summer eveningwear. Deep jewel-tone lawn detailed with intricate resham flora and delicate gold foil printing. Paired with a featherweight 100% pure silk dupatta that billows effortlessly in summer breezes.',
    unstitchedFabricDetails: [
      'Embroidered & Foil Printed Lawn Front (1.25 meters)',
      'Foil Printed Lawn Back and Sleeves (1.75 meters)',
      'Digital Printed 100% Pure Silk Dupatta (2.5 meters)',
      'Dyed Cotton Cambric Trouser (2.5 meters)',
      'Embroidered Organza Hem & Sleeve Borders'
    ],
    composition: 'Pima Lawn with 100% Pure Medium Silk Dupatta',
    craftTechnique: 'Metallic Gold Khari Print & Resham Embroidery',
    careInstructions: 'Dry clean recommended. Gentle warm iron on reverse.',
    rating: 4.9,
    reviewsCount: 41,
    reviews: [
      {
        id: 'rev-p6',
        author: 'Hiba Qureshi',
        location: 'Faisalabad, Kohinoor City',
        rating: 5,
        date: 'March 11, 2026',
        headline: 'The pure silk dupatta is out of this world',
        comment: 'Colors are so rich and vibrant! The gold foil has high durability and does not fade or stick.',
        verified: true,
        fit: 'True to size'
      }
    ],
    inStock: true,
    pairedProductIds: ['nm-festive-01', 'nm-lawn-01']
  },
  {
    id: 'nm-dupatta-01',
    name: 'Bahaar Pure Bemberg Chiffon Statement Dupatta',
    urduSubtitle: 'بہار · پیور شفون دوپٹہ',
    subtitle: 'Floral Digital Print · Pearl Hand-crocheted Lace Trimming',
    category: 'accessories',
    pieces: '1-piece',
    pricePKR: 5200,
    stitchingPricePKR: 0,
    tag: 'Artisanal Finish',
    images: [
      '/src/assets/images/pakistani_chiffon_dupatta_1791268466381.jpg',
      '/src/assets/images/pakistani_summer_hero_1791268340968.jpg'
    ],
    colors: [
      { name: 'Summer Meadow', hex: '#EAE1CE' },
      { name: 'Coral Blossom', hex: '#F0C2B2' },
      { name: 'Sky Azure', hex: '#CBE0E8' }
    ],
    sizes: ['Standard 2.5m'],
    description: 'A versatile summer staple. Artisanal pure Bemberg chiffon dupatta adorned with heritage floral Mughal motifs and finished with hand-knotted pearl crochet edging. Elevates any basic white or solid cotton kurta instantly.',
    unstitchedFabricDetails: [
      'Finished 2.5 Meter Chiffon Dupatta with all 4 edges hemmed with lace'
    ],
    composition: '100% Pure Bemberg Chiffon with Cotton Crochet Edging',
    craftTechnique: 'Precision Digital Textile Print & Hand-crocheted Pearl Lace',
    careInstructions: 'Hand wash cold or dry clean. Do not wring.',
    rating: 4.9,
    reviewsCount: 29,
    reviews: [
      {
        id: 'rev-p7',
        author: 'Sadaf Farooq',
        location: 'Peshawar, University Town',
        rating: 5,
        date: 'March 9, 2026',
        headline: 'Elevates any simple kurta',
        comment: 'So soft and featherweight. Doesn’t slip off shoulders because of the weight of the pearl crochet lace.',
        verified: true,
        fit: 'True to size'
      }
    ],
    inStock: true,
    pairedProductIds: ['nm-pret-01', 'nm-coord-01']
  }
];

export const LOOKBOOK_ITEMS = [
  {
    id: 'look-1',
    title: 'The Mughal Veranda Morning',
    urduTitle: 'صبحِ چمن · بہار ایڈیشن',
    subtitle: 'Look 01 · Bahaar Summer Campaign',
    image: '/src/assets/images/pakistani_summer_hero_1791268340968.jpg',
    description: 'Captured in the marble sunlit arches of Old Lahore. Layering breathable 80s count Pima lawn with sheer organza cutwork borders and a flowing chiffon dupatta that catches the morning breeze.',
    pieces: [
      { productId: 'nm-lawn-01', name: 'Gul-e-Bahaar 3-Piece', pricePKR: 15950, position: { top: '38%', left: '36%' } },
      { productId: 'nm-festive-01', name: 'Shab-e-Noor Organza', pricePKR: 22500, position: { top: '74%', left: '55%' } }
    ]
  },
  {
    id: 'look-2',
    title: 'Modern Modest Summer Pret',
    urduTitle: 'جدید سمر پریٹ',
    subtitle: 'Look 02 · Ready-to-Wear Ease',
    image: '/src/assets/images/pakistani_lawn_chikankari_1791268360831.jpg',
    description: 'Pastel Chikankari bore embroidery tailored with an elongated 42-inch shirt length, paired with pearl lace details for seamless transition from day to evening soirees.',
    pieces: [
      { productId: 'nm-pret-01', name: 'Noor-e-Subh Pret Kurta', pricePKR: 8950, position: { top: '45%', left: '48%' } },
      { productId: 'nm-dupatta-01', name: 'Chiffon Statement Dupatta', pricePKR: 5200, position: { top: '72%', left: '42%' } }
    ]
  }
];
