import { NextResponse } from 'next/server'
import properties from '@/data/properties'
import { getBookingByToken, villaNameToSlug } from '@/lib/appsScript'

// Display lookup for the /booking-contract page — the guest hasn't signed
// yet, so (unlike /api/booking-lookup) this expects a "Pending" booking, not
// a "Completed" one. Submission itself is handled separately by
// /api/submit-contract, which re-validates the token server-side again.
export async function GET(request) {
  try {
    const token = new URL(request.url).searchParams.get('token')
    if (!token) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 400 })
    }

    const booking = await getBookingByToken(token)

    if (booking.status === 'Completed') {
      return NextResponse.json({ error: 'This contract has already been signed.' }, { status: 400 })
    }
    if (booking.status !== 'Pending') {
      return NextResponse.json({ error: 'This booking link is no longer valid.' }, { status: 400 })
    }

    const slug = villaNameToSlug(booking.villa)
    const property = properties.find(p => p.slug === slug)

    return NextResponse.json({
      propertyName: property?.name || booking.villa,
      villa: booking.villa,
      slug,
      price: Number(booking.price),
      currency: booking.currency,
      checkin: booking.checkin,
      checkout: booking.checkout,
      numGuests: booking.numGuests,
      language: booking.language || 'en',
      group: booking.group || '',
      agentName: booking.agentName || '',
    })
  } catch (error) {
    console.error('contract-lookup error:', error)
    return NextResponse.json({ error: 'This booking link is not valid.' }, { status: 404 })
  }
}
