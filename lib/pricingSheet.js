import staticPricing, { MXN_RATE as STATIC_MXN_RATE } from '@/data/pricing'

// Published CSV of the "MAR Collection — Pricing Config" Google Sheet.
// File → Share → Publish to web → select this sheet → CSV.
const PRICING_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTgbnZjwK3v8CkRcLzYcbh4z5f40h_qdHVqXcSyvXl9b9NdEPmzHuYyKuDZ3weezC2TWWYDjSPhVgRG/pub?output=csv'

function parseNum(val) {
  if (val === undefined || val === null) return null
  const n = Number(String(val).replace(/[^0-9.\-]/g, ''))
  return Number.isFinite(n) ? n : null
}

function parseCSV(text) {
  const lines = text.trim().split('\n')
  const rows = []
  for (const line of lines) {
    // Simple CSV split — handles quoted fields with commas
    const cols = []
    let current = ''
    let inQuote = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') { inQuote = !inQuote; continue }
      if (ch === ',' && !inQuote) { cols.push(current); current = ''; continue }
      current += ch
    }
    cols.push(current)
    rows.push(cols)
  }
  return rows
}

// Fetches and parses the pricing sheet into { rates: { [slug]: {low,high,peak,cleaningFee} }, mxnRate }.
// Returns null if the sheet isn't published yet — callers fall back to static config.
async function fetchPricingSheet() {
  if (!PRICING_SHEET_CSV_URL) return null
  const res = await fetch(PRICING_SHEET_CSV_URL, { next: { revalidate: 60 } }) // cache 1 min
  if (!res.ok) throw new Error(`Pricing sheet fetch failed: ${res.status}`)
  const text = await res.text()
  const rows = parseCSV(text).slice(1) // skip header row

  const rates = {}
  let mxnRate = null

  for (const cols of rows) {
    const key = cols[0]?.trim()
    if (!key) continue

    if (key.toLowerCase().startsWith('exchange rate')) {
      mxnRate = parseNum(cols[2])
      continue
    }

    const low = parseNum(cols[2])
    const high = parseNum(cols[3])
    const peak = parseNum(cols[4])
    const cleaningFee = parseNum(cols[5])
    if (low === null && high === null && peak === null) continue

    rates[key] = { low, high, peak, cleaningFee: cleaningFee ?? 0 }
  }

  return { rates, mxnRate }
}

// The live source of truth for pricing: the Google Sheet, merged over the
// static data/pricing.js config as a fallback. Falls back per-property and
// per-field (not all-or-nothing) so a blank cell or an unreachable sheet
// never breaks pricing — it just uses the last known-good value from code.
export async function getPricingConfig() {
  let sheet = null
  try {
    sheet = await fetchPricingSheet()
  } catch (err) {
    console.error('Pricing sheet fetch error, falling back to static config:', err)
  }

  const rates = {}
  for (const slug of Object.keys(staticPricing)) {
    rates[slug] = { ...staticPricing[slug], ...(sheet?.rates?.[slug] ?? {}) }
  }
  // Include any slug that only exists in the sheet (new property added there first).
  for (const slug of Object.keys(sheet?.rates ?? {})) {
    if (!rates[slug]) rates[slug] = sheet.rates[slug]
  }

  const mxnRate = sheet?.mxnRate ?? STATIC_MXN_RATE

  return { rates, mxnRate }
}
