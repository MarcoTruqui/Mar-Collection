import { NextResponse } from 'next/server'
import { getPricingConfig } from '@/lib/pricingSheet'

export async function GET() {
  const config = await getPricingConfig() // never throws — falls back to static config internally
  return NextResponse.json(config, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
  })
}
