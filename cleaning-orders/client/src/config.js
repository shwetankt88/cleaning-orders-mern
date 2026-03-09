// ═══════════════════════════════════════════════════════════
//  CONFIGURATION FILE — Edit company settings here
// ═══════════════════════════════════════════════════════════

// ── Company Info ─────────────────────────────────────────────
export const COMPANY = {
  name: 'SHASHI ENTERPRISES',       // ← EDIT YOUR COMPANY NAME
  tagline: 'Professional Cleaning Solutions', // ← EDIT TAGLINE
  logo: null,                                 // ← Set path to logo image if you have one
};

// ── Store / Shipping Locations ────────────────────────────────
// Add or remove stores here
export const STORES = [
  'Zara, SELECT CITY WALK, Saket',
  'Zara, Promenade Mall, Vasant Kunj',
  'Zara, Pacific Mall, Delhi',
  'Massimo Dutti, SELECT CITY WALK, Saket',
  'Zara, DLF Mall of India, Noida',
  'Massimo Dutti, DLF Mall of India, Noida',
  'Zara, Ambience Mall, Gurugram',
];

// ── Product Categories ────────────────────────────────────────
// Add, remove, or rename items here
export const PRODUCTS = [
  // Poles & Frames
  { id: 'alum-pole', name: 'ALUMINIUM POLE 5 ft', category: 'Equipment' },
  { id: 'flat-mop-frame', name: 'FLAT MOP FRAME 40 cm', category: 'Equipment' },
  { id: 'heater-rod', name: 'HEATER ROD Crompton 1500W', category: 'Equipment' },
  { id: 'plastic-bucket', name: 'Plastic Bucket 20 ltr', category: 'Equipment' },

  // Cleaning Liquids
  { id: 'brasso', name: 'Brasso 500 Ml', category: 'Cleaning Liquids' },
  { id: 'colin', name: 'Colin 500 ml', category: 'Cleaning Liquids' },
  { id: 'dettol', name: 'DETTOL HANDWASH 5 LTR', category: 'Cleaning Liquids' },
  { id: 'glass-cleaner', name: 'Glass Cleaner – 5 LTR', category: 'Cleaning Liquids' },
  { id: 'harpic', name: 'Harpic – 1 Ltr', category: 'Cleaning Liquids' },
  { id: 'hit-black', name: 'HIT Black – 400 ml', category: 'Cleaning Liquids' },
  { id: 'hit-red', name: 'HIT Red – 400 ml', category: 'Cleaning Liquids' },
  { id: 'liquid-hand-wash', name: 'Liquid Hand Wash', category: 'Cleaning Liquids' },
  { id: 'lizol', name: 'Lizol – 5 LTR', category: 'Cleaning Liquids' },
  { id: 'mpc', name: 'Multi Purpose Cleaner – 5 LTR Safe n Shine', category: 'Cleaning Liquids' },
  { id: 'pril', name: 'Pril Liquid 425 ml', category: 'Cleaning Liquids' },
  { id: 'rin-ala', name: 'Rin Ala 500 ml', category: 'Cleaning Liquids' },
  { id: 'roff', name: 'Roff Tile Cleaner – 1 LTR', category: 'Cleaning Liquids' },
  { id: 'suma-inox', name: 'Suma Inox D7.1 – 5 LTR', category: 'Cleaning Liquids' },
  { id: 'taski-r2-5', name: 'Taski R2 – 5 LTR', category: 'Cleaning Liquids' },
  { id: 'taski-r3-5', name: 'Taski R3 – 5 LTR', category: 'Cleaning Liquids' },

  // Powders & Bars
  { id: 'surf-excel', name: 'Surf Excel Powder – 1 KG', category: 'Powders & Bars' },
  { id: 'surf-fena', name: 'Surf Fena – 1 KG', category: 'Powders & Bars' },
  { id: 'vim-bar', name: 'Vim Bar', category: 'Powders & Bars' },

  // Dusters & Cloths
  { id: 'dust-control-blue', name: 'Dust Control (Blue)', category: 'Dusters & Cloths' },
  { id: 'dust-control-heavy', name: 'DUST CONTROL (BLUE) HEAVY', category: 'Dusters & Cloths' },
  { id: 'dust-control-refill', name: 'Dust Control Refill (Blue)', category: 'Dusters & Cloths' },
  { id: 'feather-brush', name: 'Feather Brush', category: 'Dusters & Cloths' },
  { id: 'floor-duster', name: 'FLOOR DUSTER 30x30', category: 'Dusters & Cloths' },
  { id: 'glass-duster', name: 'Glass Duster Large', category: 'Dusters & Cloths' },
  { id: 'microfiber-350', name: 'Microfiber Duster 350 GSM', category: 'Dusters & Cloths' },
  { id: 'microfiber-blue', name: 'Microfiber Duster 350 GSM Blue', category: 'Dusters & Cloths' },
  { id: 'microfiber-red', name: 'Microfiber Duster 350 GSM Red', category: 'Dusters & Cloths' },
  { id: 'table-duster', name: 'Table Duster', category: 'Dusters & Cloths' },
  { id: 'yellow-duster', name: 'Yellow Duster', category: 'Dusters & Cloths' },

  // Mops
  { id: 'star-mop-40', name: 'Star Mop Refill 40 cm', category: 'Mops' },
  { id: 'star-mop-45', name: 'Star Mop Refill 45 cm', category: 'Mops' },
  { id: 'soft-broom', name: 'Soft Broom Ultra', category: 'Mops' },
  { id: 'paint-brush', name: 'Brush Paint Brush 3"', category: 'Mops' },
  { id: 'scotch-bright', name: 'Scotch Bright Pad 3M', category: 'Mops' },
  { id: 'scrub-sponge', name: 'Scrub Sponge 2-in-1 (Pack of 2)', category: 'Mops' },

  // Garbage Bags
  { id: 'gb-20x24-blue', name: 'Garbage Bag (20x24) Blue', category: 'Garbage Bags' },
  { id: 'gb-20x26', name: 'Garbage Bag (20x26) Black', category: 'Garbage Bags' },
  { id: 'gb-32x42', name: 'Garbage Bag (32x42) Black', category: 'Garbage Bags' },
  { id: 'gb-32x42-blue', name: 'Garbage Bag (32x42) Blue', category: 'Garbage Bags' },
  { id: 'poly-bag-40x30', name: 'Poly Bag Packaging Material 40x30', category: 'Garbage Bags' },
  { id: 'transparent-poly', name: 'Transparent Poly Bag 30x40', category: 'Garbage Bags' },

  // PPE & Safety
  { id: 'buffing-pad', name: 'BUFFING PAD 17" 3M Red', category: 'PPE & Safety' },
  { id: 'mask', name: 'Non Woven Mask 3 PLY – Black', category: 'PPE & Safety' },
  { id: 'poly-shoe', name: 'Poly Shoe Cover', category: 'PPE & Safety' },
  { id: 'rubber-gloves', name: 'Rubber Gloves (Household)', category: 'PPE & Safety' },
  { id: 'shoes-polish', name: 'Shoes Polish Wax', category: 'PPE & Safety' },

  // Paper & Tissue
  { id: 'face-tissue', name: 'Face Tissue PASEO', category: 'Paper & Tissue' },
  { id: 'tissue-napkin', name: 'Tissue Napkin (12x12)', category: 'Paper & Tissue' },
  { id: 'toilet-roll', name: 'Toilet Roll', category: 'Paper & Tissue' },
  { id: 'toilet-roll-300', name: 'Toilet Roll 300 Sheets', category: 'Paper & Tissue' },

  // Room Sprays
  { id: 'spray-godrej', name: 'Room Spray Godrej – 220 ml Lemon', category: 'Room Sprays' },
  { id: 'spray-ambipur', name: 'Room Spray – Ambi Pur', category: 'Room Sprays' },
  { id: 'spray-odonil', name: 'Room Spray – Odonil', category: 'Room Sprays' },
  { id: 'spray-pourhome', name: 'Room Spray – Pour Home', category: 'Room Sprays' },
];

export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];
