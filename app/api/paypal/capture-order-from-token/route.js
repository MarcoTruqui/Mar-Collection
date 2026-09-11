import { NextResponse } from 'next/server'
import { getPayPalAccessToken, PAYPAL_API_BASE } from '@/lib/paypal'
import { getBookingByToken } from '@/lib/appsScript'

export async function POST(request) {
  try {
    const body = await request.json()
    const { orderID, token } = body
    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 })
    }

    // Re-derive the expected amount from the locked booking so we can sanity-
    // check what PayPal actually captured.
    const booking = await getBookingByToken(token)
    const total = Number(booking.price)

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

    if (capture.status !== 'COMPLETED' || Math.abs(capturedAmount - total) > 0.01) {
      console.error('PayPal captured amount mismatch', { capturedAmount, expected: total, orderID })
      return NextResponse.json({ error: 'Payment amount mismatch' }, { status: 400 })
    }

    return NextResponse.json({
      status: 'COMPLETED',
      propertyName: booking.villa,
      total,
    })
  } catch (error) {
    console.error('paypal capture-order-from-token error:', error)
    return NextResponse.json({ error: 'Failed to capture PayPal order' }, { status: 500 })
  }
}
