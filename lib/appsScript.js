// Maps our site's property slugs to the exact villa name strings your
// Apps Script's VILLA_GROUPS/VILLAS expect. Keep in sync if either side adds
// a property.
const SLUG_TO_VILLA_NAME = {
  'villa-girasol': 'Girasol',
  'villa-jaguar': 'Jaguar',
  'villa-turquesa': 'Turquesa',
  'villa-pelicano': 'Pelicano',
  'villa-perico': 'Perico',
  'villa-zenzontle': 'Zenzontle',
  'palmas-8': 'Palmas',
  'terrazas-g32': 'Terrazas',
  'zantamar-205b': 'Zantamar 205',
  'zantamar-303d': 'Zantamar 303',
  'zantamar-304d': 'Zantamar 304',
  'zantamar-305d': 'Zantamar 305',
  'zantamar-306d': 'Zantamar 306',
  'zantamar-403d': 'Zantamar 403',
  'zantamar-th7': 'Zantamar TH7',
}

const VILLA_NAME_TO_SLUG = Object.fromEntries(
  Object.entries(SLUG_TO_VILLA_NAME).map(([slug, villa]) => [villa, slug])
)

export function slugToVillaName(slug) {
  return SLUG_TO_VILLA_NAME[slug] || null
}

export function villaNameToSlug(villa) {
  return VILLA_NAME_TO_SLUG[villa] || null
}

async function callAppsScript(payload) {
  const url = process.env.APPS_SCRIPT_URL
  const apiKey = process.env.APPS_SCRIPT_API_KEY
  if (!url || !apiKey) {
    throw new Error('Apps Script integration is not configured yet (APPS_SCRIPT_URL / APPS_SCRIPT_API_KEY).')
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, apiKey }),
    cache: 'no-store', // this reads/mutates live booking state — never cache it
  })
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`)

  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data
}

// Creates a "Pending" row in the Bookings sheet and returns the guest contract
// link. The price/currency passed here becomes the locked, authoritative
// amount for this booking — the payment step later charges exactly this,
// never a freshly recalculated price.
export async function createBookingLink({ villa, price, currency, checkin, checkout, numGuests, language }) {
  return callAppsScript({
    villa,
    price: String(price),
    agreedPrice: String(price),
    currency,
    checkin,
    checkout,
    numGuests: String(numGuests),
    language,
  })
}

// Fetches the authoritative locked booking details for a token — used right
// before charging a card, so the amount charged can never drift from what's
// actually in the signed contract.
export async function getBookingByToken(token) {
  return callAppsScript({ action: 'getBooking', token })
}

// Submits the guest's info, ID photo, and signature — same as clicking
// "Sign and submit" on the old Apps Script-hosted form, just invoked from our
// own site instead. Writes to the Bookings sheet, generates the contract PDF,
// and syncs to Stays exactly as before; nothing about that backend changes.
export async function submitContract(form) {
  return callAppsScript({ action: 'submitContract', ...form })
}
