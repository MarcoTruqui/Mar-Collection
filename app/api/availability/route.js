import { NextResponse } from 'next/server'
import { fetchBookedRanges } from '@/lib/availability'

export async function GET() {
  try {
    const availability = await fetchBookedRanges()
    return NextResponse.json(availability, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch (err) {
    console.error('Availability fetch error:', err)
    return NextResponse.json({}, { status: 500 })
  }
}
