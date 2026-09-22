import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { submitContract, getBookingByToken } from '@/lib/appsScript'

const TO_EMAIL = 'tch@truqui.com'

// Forwards the guest's info, ID photo, and signature to Apps Script's
// submitGuestForm — same sheet write, same Drive uploads, same PDF
// generation, same Stays sync as the old Apps Script-hosted form. This route
// only exists so the guest's browser never needs to know our Apps Script API
// key; the actual work happens server-to-server.
export async function POST(request) {
  try {
    const form = await request.json()
    if (!form.token) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 400 })
    }

    const result = await submitContract(form)
    if (result.success) {
      notifyNewBooking(form).catch(err => console.error('New booking email failed:', err))
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error('submit-contract error:', error)
    return NextResponse.json({ error: error.message || 'Failed to submit contract.' }, { status: 500 })
  }
}

// Best-effort notification to the same inbox contact-form inquiries go to.
// Never allowed to affect the guest-facing response — a failure here is
// logged and swallowed, not surfaced as a booking failure.
async function notifyNewBooking(form) {
  const booking = await getBookingByToken(form.token)
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'TC Collection <contact@truqui.com>',
    to: TO_EMAIL,
    subject: `New Booking — ${booking.villa} (${form.fullName})`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0a1628;">
        <div style="background: #0a1628; padding: 32px; text-align: center;">
          <h1 style="color: #c9a84c; font-size: 22px; margin: 0; letter-spacing: 2px;">TC COLLECTION</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 8px 0 0; letter-spacing: 4px;">NEW BOOKING</p>
        </div>

        <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 130px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Guest</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628; font-weight: 600;">${form.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">
                <a href="mailto:${form.email}" style="color: #c9a84c;">${form.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">${form.countryCode || ''} ${form.phoneNumber || ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Property</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">${booking.villa}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Dates</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">${booking.checkin} → ${booking.checkout}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Guests</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">${booking.numGuests}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total Price</td>
              <td style="padding: 10px 0; font-size: 15px; color: #0a1628; font-weight: 600;">${booking.currency} ${Number(booking.price).toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="padding: 20px; text-align: center; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none;">
          <p style="color: #9ca3af; font-size: 11px; margin: 0;">Contract signed and submitted through the website.</p>
        </div>
      </div>
    `,
  })
}
