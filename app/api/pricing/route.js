import { NextResponse } from 'next/server'
import { getPricingConfig } from '@/lib/pricingSheet'

// Same reason as /api/availability: read the sheet on every request so rate
// and exchange-rate edits aren't hidden behind a saved copy.
export const dynamic = 'force-dynamic'

export async function GET() {
  const config = await getPricingConfig() // never throws — falls back to static config internally
  return NextResponse.json(config, {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=30' },
  })
}
