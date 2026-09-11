import { NextResponse } from 'next/server'
import { getPayPalAccessToken, PAYPAL_API_BASE } from '@/lib/paypal'
import { getBookingByToken } from '@/lib/appsScript'

// Runs only after a guest has signed the contract. Charges exactly the price
// locked into the Bookings sheet at "Book Now" time — never recalculated here.
export async function POST(request) {
  try {
    const { token } = await request.json()

    const booking = await getBookingByToken(token)
    if (booking.status !== 'Completed') {
      return NextResponse.json({ error: 'This booking has not finished signing yet.' }, { status: 400 })
    }

    const total = Number(booking.price)
    const currency = booking.currency || 'MXN'

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
            description: `${booking.villa} — ${booking.checkin} to ${booking.checkout}`,
            custom_id: token,
            amount: {
              currency_code: currency,
              value: total.toFixed(2),
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
    console.error('paypal create-order-from-token error:', error)
    return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 })
  }
}
