import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { getBookingByToken, villaNameToSlug } from '@/lib/appsScript'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

// Runs only after a guest has signed the contract. Charges exactly the price
// locked into the Bookings sheet at "Book Now" time — never recalculated here,
// so the card is always charged the same amount the guest saw and signed for.
export async function POST(request) {
  try {
    const body = await request.json()
    const { token, lang } = body

    const booking = await getBookingByToken(token)
    if (booking.status !== 'Completed') {
      return NextResponse.json({ error: 'This booking has not finished signing yet.' }, { status: 400 })
    }

    const slug = villaNameToSlug(booking.villa)
    const nights = Math.max(0, Math.round((new Date(booking.checkout) - new Date(booking.checkin)) / 86400000))
    const total = Number(booking.price)
    const currency = (booking.currency || 'MXN').toLowerCase()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const localePrefix = lang === 'es' ? '/es' : ''

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: booking.villa,
              description: `${booking.checkin} → ${booking.checkout} · ${nights} night${nights > 1 ? 's' : ''} · ${booking.numGuests} guest${booking.numGuests > 1 ? 's' : ''} · signed contract total`,
            },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingToken: token,
        propertySlug: slug || '',
        villa: booking.villa,
        checkIn: booking.checkin,
        checkOut: booking.checkout,
        total: String(total),
      },
      success_url: `${siteUrl}${localePrefix}/booking-confirmed?property=${encodeURIComponent(booking.villa)}&checkIn=${booking.checkin}&checkOut=${booking.checkout}&total=${total}&method=card`,
      cancel_url: `${siteUrl}${localePrefix}/booking-payment?token=${token}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('create-checkout-session-from-token error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
