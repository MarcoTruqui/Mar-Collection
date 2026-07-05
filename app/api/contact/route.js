import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = 'tch@truqui.com'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, phone, property, dates, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'MAR Collection <contact@truqui.com>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${name}${property ? ` — ${property}` : ''}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0a1628;">
          <div style="background: #0a1628; padding: 32px; text-align: center;">
            <h1 style="color: #c9a84c; font-size: 22px; margin: 0; letter-spacing: 2px;">MAR COLLECTION</h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 8px 0 0; letter-spacing: 4px;">NEW INQUIRY</p>
          </div>

          <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 130px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">
                  <a href="mailto:${email}" style="color: #c9a84c;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">${phone}</td>
              </tr>` : ''}
              ${property ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Property</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">${property}</td>
              </tr>` : ''}
              ${dates ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Dates</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a1628;">${dates}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 24px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Message</p>
              <p style="color: #0a1628; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="padding: 20px; text-align: center; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
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
