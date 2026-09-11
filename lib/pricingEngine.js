import { DISCOUNTS, PROMOS, SERVICE_FEE_PERCENT } from '@/data/pricing'

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

// Calculate total pricing for a stay.
// `rates` is the { [slug]: {low,high,peak,cleaningFee} } table from
// lib/pricingSheet.js (Google Sheet merged over static fallback config).
// Returns: { nightlyBreakdown, averageRate, subtotal, discount, promoDiscount, cleaningFee, serviceFee, total, nights, weeklyDiscount, activePromo, seasonSummary }
export function calculateStayPrice(rates, slug, checkIn, checkOut, fallbackRate, fallbackCleaning) {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const nights = Math.max(0, Math.round((end - start) / 86400000))

  if (nights === 0) return null

  const propRates = rates?.[slug]
  const cleaningFee = propRates?.cleaningFee ?? fallbackCleaning

  // Sum per-night rates
  let subtotal = 0
  const seasonNights = { peak: 0, high: 0, low: 0 }

  for (let i = 0; i < nights; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const sid = getSeasonId(d)
    const rate = propRates?.[sid] ?? fallbackRate
    subtotal += rate
    seasonNights[sid]++
  }

  // No discounts of any kind during peak season — if any night of the stay
  // falls in peak, the weekly-stay discount and promos are skipped entirely.
  const isPeakStay = seasonNights.peak > 0

  // Weekly discount
  let weeklyDiscount = 0
  if (!isPeakStay && nights >= DISCOUNTS.weekly.minNights) {
    weeklyDiscount = Math.round(subtotal * DISCOUNTS.weekly.percent / 100)
  }

  // Active promo discount (applied after weekly)
  let promoDiscount = 0
  let activePromo = null
  const afterWeekly = subtotal - weeklyDiscount

  if (!isPeakStay) {
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
  }

  const nightSubtotalAfterDiscounts = afterWeekly - promoDiscount

  // Flat service fee applied to every booking, every property, every season —
  // a percentage of the nightly total after discounts, before cleaning fee.
  const serviceFee = Math.round(nightSubtotalAfterDiscounts * SERVICE_FEE_PERCENT / 100)

  const total = nightSubtotalAfterDiscounts + serviceFee + cleaningFee
  const averageRate = Math.round(subtotal / nights)

  // Season summary for display
  const seasonSummary = []
  if (seasonNights.peak > 0) seasonSummary.push({ id: 'peak', nights: seasonNights.peak, rate: propRates?.peak ?? fallbackRate })
  if (seasonNights.high > 0) seasonSummary.push({ id: 'high', nights: seasonNights.high, rate: propRates?.high ?? fallbackRate })
  if (seasonNights.low  > 0) seasonSummary.push({ id: 'low',  nights: seasonNights.low,  rate: propRates?.low  ?? fallbackRate })

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
