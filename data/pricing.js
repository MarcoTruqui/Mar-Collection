// ─────────────────────────────────────────────────────────────────────────────
// TC COLLECTION — PRICING CONFIG
//
// SEASONS (same calendar for all properties):
//   Peak Season  → Dec 20 – Jan 5      (overrides High)
//   High Season  → Nov 1  – Apr 30
//   Low Season   → May 1  – Oct 31
//
// DISCOUNTS (apply to all properties):
//   7+ nights    → 10% off nightly rate
//
// HOW TO USE:
//   Fill in the nightly rate (USD) for each season per property.
//   Leave a rate as null if the property is not available that season.
//   Promos: set active: true/false to turn them on or off instantly.
// ─────────────────────────────────────────────────────────────────────────────

// ── SEASON DEFINITIONS ───────────────────────────────────────────────────────
export const SEASONS = [
  {
    id: 'peak',
    name: 'Peak Season',
    nameEs: 'Temporada Alta (Peak)',
    // Repeats every year: Dec 20 → Jan 5
    ranges: [
      { startMonth: 12, startDay: 20, endMonth: 1, endDay: 5 },
    ],
  },
  {
    id: 'high',
    name: 'High Season',
    nameEs: 'Temporada Alta',
    ranges: [
      { startMonth: 11, startDay: 1, endMonth: 4, endDay: 30 },
    ],
  },
  {
    id: 'low',
    name: 'Low Season',
    nameEs: 'Temporada Baja',
    ranges: [
      { startMonth: 5, startDay: 1, endMonth: 10, endDay: 31 },
    ],
  },
]

// ── DISCOUNTS ─────────────────────────────────────────────────────────────────
export const DISCOUNTS = {
  weekly: { minNights: 7, percent: 10, label: '7-night stay discount' },
}

// ── PROMOS ───────────────────────────────────────────────────────────────────
// Set active: true to show a promo banner on the booking widget.
// seasonId: 'low' | 'high' | 'peak' — which season this promo applies to.
export const PROMOS = [
  // Example — edit or duplicate as needed:
  // {
  //   id: 'low-2025',
  //   label: 'Low Season Special',
  //   labelEs: 'Especial Temporada Baja',
  //   description: 'Book 5+ nights in low season and save an extra 10%.',
  //   descriptionEs: 'Reserva 5+ noches en temporada baja y ahorra un 10% extra.',
  //   seasonId: 'low',
  //   minNights: 5,
  //   percent: 10,
  //   active: false,
  // },
]

// ── PROPERTY RATES ────────────────────────────────────────────────────────────
// Fill in the nightly rate (USD) for each season.
// cleaningFee and serviceFee stay fixed regardless of season.
// ─────────────────────────────────────────────────────────────────────────────

const pricing = {

  // ── BUCERÍAS ────────────────────────────────────────────────────────────────

  'villa-girasol': {
    low:  1250,
    high: 1600,
    peak: 3000,
    cleaningFee: 200,
    serviceFee: 100,
  },

  'villa-jaguar': {
    low:  450,
    high: 545,
    peak: 1125,
    cleaningFee: 150,
    serviceFee: 75,
  },

  'villa-turquesa': {
    low:  460,
    high: 580,
    peak: 1400,
    cleaningFee: 220,
    serviceFee: 120,
  },

  'villa-pelicano': {
    low:  370,
    high: 500,
    peak: 675,
    cleaningFee: 175,
    serviceFee: 90,
  },

  'villa-perico': {
    low:  370,
    high: 450,
    peak: 960,
    cleaningFee: 140,
    serviceFee: 70,
  },

  'villa-zenzontle': {
    low:  400,
    high: 480,
    peak: 1050,
    cleaningFee: 170,
    serviceFee: 85,
  },

  // ── PUNTA MITA ──────────────────────────────────────────────────────────────

  'palmas-8': {
    low:  1250,
    high: 1600,
    peak: 3000,
    cleaningFee: 200,
    serviceFee: 110,
  },

  'terrazas-g32': {
    low:  650,
    high: 800,
    peak: 1600,
    cleaningFee: 250,
    serviceFee: 150,
  },

  // ── LA CRUZ — ZANTAMAR ──────────────────────────────────────────────────────

  'zantamar-205b': {
    low:  160,
    high: 180,
    peak: 280,
    cleaningFee: 120,
    serviceFee: 55,
  },

  'zantamar-303d': {
    low:  94,
    high: 125,
    peak: 200,
    cleaningFee: 100,
    serviceFee: 50,
  },

  'zantamar-304d': {
    low:  95,
    high: 125,
    peak: 200,
    cleaningFee: 100,
    serviceFee: 50,
  },

  'zantamar-305d': {
    low:  160,
    high: 180,
    peak: 280,
    cleaningFee: 120,
    serviceFee: 55,
  },

  'zantamar-306d': {
    low:  98,
    high: 125,
    peak: 200,
    cleaningFee: 100,
    serviceFee: 50,
  },

  'zantamar-th7': {
    low:  180,
    high: 220,
    peak: 350,
    cleaningFee: 160,
    serviceFee: 80,
  },

}

export default pricing
