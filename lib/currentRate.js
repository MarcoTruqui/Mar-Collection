import pricing from '@/data/pricing'
import { getSeasonId } from '@/lib/pricingEngine'

export function getCurrentRate(slug, fallback) {
  const rates = pricing[slug]
  if (!rates) return fallback
  const season = getSeasonId(new Date())
  return rates[season] ?? fallback
}
