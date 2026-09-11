import { getSeasonId } from '@/lib/pricingEngine'

export function getCurrentRate(rates, slug, fallback) {
  const propRates = rates?.[slug]
  if (!propRates) return fallback
  const season = getSeasonId(new Date())
  return propRates[season] ?? fallback
}
