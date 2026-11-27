import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { BRAND_NAME, contactEmail } from '@/lib/brand'

// Inquiries from the English site go to hello@, from the Spanish site to hola@

// Visitor-typed text goes into an HTML email, so escape it first.
function esc(v) {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const name = esc(body.name), email = esc(body.email), phone = esc(body.phone)
    const property = esc(body.property), dates = esc(body.dates), message = esc(body.message)
    const guests = esc(body.guests)

    await resend.emails.send({
      from: `${BRAND_NAME} <contact@truqui.com>`,
      to: contactEmail(body.lang === 'es' ? 'es' : 'en'),
      replyTo: body.email,
      subject: `New Inquiry from ${body.name}${body.property ? ` — ${body.property}` : ''}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2A2621;">
          <div style="background: #2A2621; padding: 32px; text-align: center;">
            <h1 style="color: #8E6C48; font-size: 22px; margin: 0; letter-spacing: 2px;">TRUQUI COLLECTION</h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 8px 0 0; letter-spacing: 4px;">NEW INQUIRY</p>
          </div>

          <div style="padding: 32px; background: #ffffff; border: 1px solid #E4DDD2;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; width: 130px; color: #A89E8F; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; font-size: 15px; color: #2A2621; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #A89E8F; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; font-size: 15px; color: #2A2621;">
                  <a href="mailto:${email}" style="color: #8E6C48;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #A89E8F; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; font-size: 15px; color: #2A2621;">${phone}</td>
              </tr>` : ''}
              ${property ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #A89E8F; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Property</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; font-size: 15px; color: #2A2621;">${property}</td>
              </tr>` : ''}
              ${dates ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #A89E8F; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Dates</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; font-size: 15px; color: #2A2621;">${dates}</td>
              </tr>` : ''}
              ${guests ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #A89E8F; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Guests</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; font-size: 15px; color: #2A2621;">${guests}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 24px; padding: 20px; background: #FAF7F2; border-radius: 8px;">
              <p style="color: #A89E8F; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Message</p>
              <p style="color: #2A2621; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="padding: 20px; text-align: center; background: #FAF7F2; border: 1px solid #E4DDD2; border-top: none;">
            <p style="color: #A89E8F; font-size: 11px; margin: 0;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
