import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { resolveBooking, BookingValidationError } from '@/lib/bookingValidation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

export async function POST(request) {
  try {
    const body = await request.json()
    const { slug, checkIn, checkOut, guests, lang } = body

    const { property, stay, mxnRate } = await resolveBooking({ slug, checkIn, checkOut, guests })
    const { nights, total } = stay

    // Prices are set in USD but every charge actually settles in MXN — avoids
    // the foreign-currency fee the merchant account is charged on USD payments.
    const totalMxn = Math.round(total * mxnRate)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const localePrefix = lang === 'es' ? '/es' : ''

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: property.name,
              description: `${checkIn} → ${checkOut} · ${nights} night${nights > 1 ? 's' : ''} · ${guests} guest${guests > 1 ? 's' : ''} · nightly rate + cleaning & service fees, daily cleaning included`,
            },
            // Single line item for the fully-computed total (nights + weekly/promo
            // discounts + cleaning + service fee) — see lib/pricingEngine.js.
            unit_amount: totalMxn * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        propertySlug: slug,
        propertyName: property.name,
        checkIn,
        checkOut,
        nights: String(nights),
        guests: String(guests),
        totalUsd: String(total),
        totalMxn: String(totalMxn),
      },
      success_url: `${siteUrl}${localePrefix}/booking-confirmed?property=${encodeURIComponent(property.name)}&checkIn=${checkIn}&checkOut=${checkOut}&total=${totalMxn}&method=card`,
      cancel_url: `${siteUrl}${localePrefix}/properties/${slug}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof BookingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
