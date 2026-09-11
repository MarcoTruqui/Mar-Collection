import { NextResponse } from 'next/server'
import { getPayPalAccessToken, PAYPAL_API_BASE } from '@/lib/paypal'
import { resolveBooking, BookingValidationError } from '@/lib/bookingValidation'

// Server-driven PayPal order creation: the amount PayPal is told about comes
// only from our own price calculation, never from the browser, so a guest
// can't approve a tampered total.
export async function POST(request) {
  try {
    const body = await request.json()
    const { slug, checkIn, checkOut, guests } = body

    const { property, stay, mxnRate } = await resolveBooking({ slug, checkIn, checkOut, guests })

    // Prices are set in USD but every charge actually settles in MXN — avoids
    // the foreign-currency fee the merchant account is charged on USD payments.
    const totalMxn = Math.round(stay.total * mxnRate)

    const accessToken = await getPayPalAccessToken()

    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            description: `${property.name} — ${checkIn} to ${checkOut}`,
            custom_id: slug,
            amount: {
              currency_code: 'MXN',
              value: totalMxn.toFixed(2),
            },
          },
        ],
      }),
    })

    if (!res.ok) {
      const errBody = await res.text()
      console.error('PayPal create order failed:', errBody)
      return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 502 })
    }

    const order = await res.json()
    return NextResponse.json({ id: order.id })
  } catch (error) {
    if (error instanceof BookingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('PayPal create-order error:', error)
    return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 })
  }
}
