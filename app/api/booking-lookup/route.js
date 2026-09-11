import { NextResponse } from 'next/server'
import properties from '@/data/properties'
import { getBookingByToken, villaNameToSlug } from '@/lib/appsScript'

// Display-only lookup for the /booking-payment page — shows the guest what
// they're about to pay for. The routes that actually create the charge
// (create-checkout-session-from-token, paypal/*-from-token) do their own
// independent lookup, so this route being display-only can't be tampered
// with to affect what's charged.
export async function GET(request) {
  try {
    const token = new URL(request.url).searchParams.get('token')
    if (!token) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 400 })
    }

    const booking = await getBookingByToken(token)
    if (booking.status !== 'Completed') {
      return NextResponse.json({ error: 'This booking has not finished signing yet.' }, { status: 400 })
    }

    const slug = villaNameToSlug(booking.villa)
    const property = properties.find(p => p.slug === slug)

    return NextResponse.json({
      propertyName: property?.name || booking.villa,
      slug,
      price: Number(booking.price),
      currency: booking.currency,
      checkin: booking.checkin,
      checkout: booking.checkout,
      numGuests: booking.numGuests,
    })
  } catch (error) {
    console.error('booking-lookup error:', error)
    return NextResponse.json({ error: 'Booking not found.' }, { status: 404 })
  }
}
