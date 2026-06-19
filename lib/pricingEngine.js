import pricing, { DISCOUNTS, PROMOS } from '@/data/pricing'

// Returns 'peak' | 'high' | 'low' for a given JS Date object.
// Peak takes priority over High (it's a subset of High season).
function getSeasonId(date) {
  const m = date.getMonth() + 1 // 1-12
  const d = date.getDate()

  // Peak: Dec 20 – Jan 5
  if ((m === 12 && d >= 20) || (m === 1 && d <= 5)) return 'peak'

  // High: Nov 1 – Apr 30
  if (m >= 11 || m <= 4) return 'high'

  // Low: May 1 – Oct 31
  return 'low'
}

// Returns the nightly rate for a given date and property slug.
// Falls back to fallbackRate if pricing data is missing.
function getNightlyRate(date, slug, fallbackRate) {
  const rates = pricing[slug]
  if (!rates) return fallbackRate
  const seasonId = getSeasonId(date)
  return rates[seasonId] ?? fallbackRate
}

// Calculate total pricing for a stay.
// Returns: { nightlyBreakdown, averageRate, subtotal, discount, promoDiscount, cleaningFee, serviceFee, total, nights, weeklyDiscount, activePromo, seasonSummary }
export function calculateStayPrice(slug, checkIn, checkOut, fallbackRate, fallbackCleaning, fallbackService) {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const nights = Math.max(0, Math.round((end - start) / 86400000))

  if (nights === 0) return null

  const rates = pricing[slug]
  const cleaningFee = rates?.cleaningFee ?? fallbackCleaning
  const serviceFee  = rates?.serviceFee  ?? fallbackService

  // Sum per-night rates
  let subtotal = 0
  const seasonNights = { peak: 0, high: 0, low: 0 }

  for (let i = 0; i < nights; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const sid = getSeasonId(d)
    const rate = rates?.[sid] ?? fallbackRate
    subtotal += rate
    seasonNights[sid]++
  }

  // Weekly discount
  let weeklyDiscount = 0
  if (nights >= DISCOUNTS.weekly.minNights) {
    weeklyDiscount = Math.round(subtotal * DISCOUNTS.weekly.percent / 100)
  }

  // Active promo discount (applied after weekly)
  let promoDiscount = 0
  let activePromo = null
  const afterWeekly = subtotal - weeklyDiscount

  for (const promo of PROMOS) {
    if (!promo.active) continue
    if (promo.minNights && nights < promo.minNights) continue
    // Check if the primary season of the stay matches
    const primarySeason = Object.entries(seasonNights).sort((a, b) => b[1] - a[1])[0][0]
    if (promo.seasonId && promo.seasonId !== primarySeason) continue
    promoDiscount = Math.round(afterWeekly * promo.percent / 100)
    activePromo = promo
    break // only one promo at a time
  }

  const nightSubtotalAfterDiscounts = afterWeekly - promoDiscount
  const total = nightSubtotalAfterDiscounts
  const averageRate = Math.round(subtotal / nights)

  // Season summary for display
  const seasonSummary = []
  if (seasonNights.peak > 0) seasonSummary.push({ id: 'peak', nights: seasonNights.peak, rate: rates?.peak ?? fallbackRate })
  if (seasonNights.high > 0) seasonSummary.push({ id: 'high', nights: seasonNights.high, rate: rates?.high ?? fallbackRate })
  if (seasonNights.low  > 0) seasonSummary.push({ id: 'low',  nights: seasonNights.low,  rate: rates?.low  ?? fallbackRate })

  return {
    nights,
    subtotal,
    weeklyDiscount,
    promoDiscount,
    activePromo,
    cleaningFee,
    serviceFee,
    total,
    averageRate,
    seasonSummary,
    mixedSeasons: seasonSummary.length > 1,
  }
}

export { getSeasonId }
