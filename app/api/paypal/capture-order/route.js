import { NextResponse } from 'next/server'
import { getPayPalAccessToken, PAYPAL_API_BASE } from '@/lib/paypal'
import { resolveBooking, BookingValidationError } from '@/lib/bookingValidation'

export async function POST(request) {
  try {
    const body = await request.json()
    const { orderID, slug, checkIn, checkOut, guests } = body
    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 })
    }

    // Re-derive the expected price so we can sanity-check what PayPal actually
    // captured. Availability may have changed since create-order (e.g. the
    // sheet was updated) — this call re-checks that too.
    const { property, stay, mxnRate } = await resolveBooking({ slug, checkIn, checkOut, guests })
    const totalMxn = Math.round(stay.total * mxnRate)

    const accessToken = await getPayPalAccessToken()

    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      const errBody = await res.text()
      console.error('PayPal capture failed:', errBody)
      return NextResponse.json({ error: 'Payment capture failed' }, { status: 502 })
    }

    const capture = await res.json()
    const captured = capture.purchase_units?.[0]?.payments?.captures?.[0]
    const capturedAmount = Number(captured?.amount?.value)

    if (capture.status !== 'COMPLETED' || Math.abs(capturedAmount - totalMxn) > 0.01) {
      console.error('PayPal captured amount mismatch', { capturedAmount, expected: totalMxn, orderID })
      return NextResponse.json({ error: 'Payment amount mismatch' }, { status: 400 })
    }

    return NextResponse.json({
      status: 'COMPLETED',
      propertyName: property.name,
      total: totalMxn,
    })
  } catch (error) {
    if (error instanceof BookingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('PayPal capture-order error:', error)
    return NextResponse.json({ error: 'Failed to capture PayPal order' }, { status: 500 })
  }
}
