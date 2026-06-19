'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567'

function ConfirmedContent() {
  const { t } = useLanguage()
  const params = useSearchParams()

  const property = params.get('property') || ''
  const checkIn = params.get('checkIn') || ''
  const checkOut = params.get('checkOut') || ''
  const total = params.get('total') || ''
  const method = params.get('method') || 'card'

  const whatsappMsg = `Hi! I just completed my booking for ${property} (${checkIn} – ${checkOut}). Looking forward to my stay!`

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-10 text-center">
        {/* Checkmark */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Confirmed</p>
        <h1 className="font-serif text-4xl text-navy mb-3">{t.confirmed.title}</h1>
        <p className="text-gray-500 text-base mb-6">{t.confirmed.subtitle}</p>

        {/* Booking summary */}
        {property && (
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Property</span>
              <span className="text-navy font-medium">{property}</span>
            </div>
            {checkIn && (
              <div className="flex justify-between">
                <span className="text-gray-400">Check-in</span>
                <span className="text-navy">{checkIn}</span>
              </div>
            )}
            {checkOut && (
              <div className="flex justify-between">
                <span className="text-gray-400">Check-out</span>
                <span className="text-navy">{checkOut}</span>
              </div>
            )}
            {total && (
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                <span className="text-gray-600">Total Paid</span>
                <span className="text-navy">${Number(total).toLocaleString()} USD</span>
              </div>
            )}
            <div className="flex justify-between text-xs pt-1">
              <span className="text-gray-400">Payment via</span>
              <span className="text-gray-500 capitalize">{method === 'paypal' ? 'PayPal' : 'Card (Stripe)'}</span>
            </div>
          </div>
        )}

        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {t.confirmed.detail}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 border-2 border-navy text-navy font-semibold py-3 rounded-xl hover:bg-navy hover:text-white transition-all text-sm"
          >
            {t.confirmed.home}
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:bg-[#20bb5a] transition-colors text-sm"
          >
            {t.confirmed.whatsapp}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function BookingConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ConfirmedContent />
    </Suspense>
  )
}
