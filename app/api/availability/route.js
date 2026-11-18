import { NextResponse } from 'next/server'
import { fetchBookedRanges } from '@/lib/availability'

// Without this Next saves the response and serves the old copy first after
// any quiet period (stale-while-revalidate), so a booking could stay hidden
// for a long time. Read the sheet on every request; the CDN holds it ≤60s.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const availability = await fetchBookedRanges()
    return NextResponse.json(availability, {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=30' },
    })
  } catch (err) {
    console.error('Availability fetch error:', err)
    return NextResponse.json({}, { status: 500 })
  }
}
