import { NextResponse } from 'next/server'
import { resolveBooking, BookingValidationError } from '@/lib/bookingValidation'
import { createBookingLink, slugToVillaName } from '@/lib/appsScript'

// Runs when a guest clicks "Book Now" — before any contract or payment exists.
// Re-derives the price server-side (never trusts the browser), then locks that
// exact amount into a new "Pending" row via the Apps Script website API. The
// guest is sent to the contract link it returns; payment happens only after
// they sign, charging exactly this locked amount.
export async function POST(request) {
  try {
    const body = await request.json()
    const { slug, checkIn, checkOut, guests, lang } = body

    const villa = slugToVillaName(slug)
    if (!villa) {
      return NextResponse.json({ error: 'Unknown property.' }, { status: 400 })
    }

    const { stay, mxnRate } = await resolveBooking({ slug, checkIn, checkOut, guests })
    const totalMxn = Math.round(stay.total * mxnRate)

    const { link } = await createBookingLink({
      villa,
      price: totalMxn,
      currency: 'MXN',
      checkin: checkIn,
      checkout: checkOut,
      numGuests: guests,
      language: lang === 'es' ? 'es' : 'en',
    })

    return NextResponse.json({ url: link })
  } catch (error) {
    if (error instanceof BookingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('create-booking-link error:', error)
    return NextResponse.json({ error: 'Failed to start booking. Please try again.' }, { status: 500 })
  }
}
