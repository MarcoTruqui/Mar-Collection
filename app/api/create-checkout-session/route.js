import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      propertyName,
      slug,
      checkIn,
      checkOut,
      nights,
      nightlyRate,
      total,
      guests,
    } = body

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: propertyName,
              description: `${checkIn} → ${checkOut} · ${nights} night${nights > 1 ? 's' : ''} · ${guests} guest${guests > 1 ? 's' : ''} · Daily cleaning included`,
            },
            unit_amount: nightlyRate * 100,
          },
          quantity: nights,
        },
      ],
      metadata: {
        propertySlug: slug,
        propertyName,
        checkIn,
        checkOut,
        nights: String(nights),
        guests: String(guests),
      },
      success_url: `${siteUrl}/booking-confirmed?property=${encodeURIComponent(propertyName)}&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}&method=card`,
      cancel_url: `${siteUrl}/properties/${slug}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
