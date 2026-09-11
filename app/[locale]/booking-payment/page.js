'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PayPalButtons, PayPalScriptProvider, FUNDING } from '@paypal/react-paypal-js'
import { useLanguage } from '@/lib/LanguageContext'
import { AlertCircle } from 'lucide-react'

function fmt(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function BookingPaymentContent() {
  const { t, lang } = useLanguage()
  const params = useSearchParams()
  const token = params.get('token') || ''

  const [booking, setBooking] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [payError, setPayError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setLoadError(t.bookingPayment.notFound)
      return
    }
    fetch(`/api/booking-lookup?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setLoadError(data.error)
        else setBooking(data)
      })
      .catch(() => setLoadError(t.bookingPayment.notFound))
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleStripe() {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session-from-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, lang }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setPayError(data.error || 'Payment initialization failed. Please try again.')
      }
    } catch {
      setPayError('Payment initialization failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
    currency: 'MXN',
    'enable-funding': 'card',
  }

  // Order amount is computed and told to PayPal entirely server-side (see
  // /api/paypal/create-order-from-token) — sourced from the locked booking,
  // never from anything in this page.
  async function createPayPalOrder() {
    const res = await fetch('/api/paypal/create-order-from-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    const data = await res.json()
    if (!data.id) throw new Error(data.error || 'Failed to create PayPal order')
    return data.id
  }

  async function onPayPalApprove(data) {
    const res = await fetch('/api/paypal/capture-order-from-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID: data.orderID, token }),
    })
    const result = await res.json()
    if (result.status !== 'COMPLETED') {
      setPayError(result.error || 'PayPal payment failed. Please try again.')
      return
    }
    window.location.href = `${lang === 'es' ? '/es' : ''}/booking-confirmed?property=${encodeURIComponent(result.propertyName)}&checkIn=${booking.checkin}&checkOut=${booking.checkout}&total=${result.total}&method=paypal`
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10 text-center">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">{loadError}</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
        <p className="text-gray-400 text-sm">{t.bookingPayment.loading}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 pb-16">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg max-w-md w-full p-8">
        <h1 className="font-serif text-navy text-2xl mb-1">{t.bookingPayment.title}</h1>
        <p className="text-gray-500 text-sm mb-6">{t.bookingPayment.subtitle}</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">{t.bookingPayment.property}</span>
            <span className="text-navy font-medium">{booking.propertyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t.bookingPayment.checkIn}</span>
            <span className="text-navy">{fmt(booking.checkin)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t.bookingPayment.checkOut}</span>
            <span className="text-navy">{fmt(booking.checkout)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t.bookingPayment.guests}</span>
            <span className="text-navy">{booking.numGuests}</span>
          </div>
          <div className="flex justify-between font-bold text-navy pt-2 border-t border-gray-200">
            <span>{t.bookingPayment.total}</span>
            <span>${Number(booking.price).toLocaleString()} {booking.currency}</span>
          </div>
        </div>

        {payError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 text-sm text-red-600">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{payError}</span>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mb-2">{t.booking.chargedInMxn}</p>

        {/* Stripe button */}
        <button
          onClick={handleStripe}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#635BFF] text-white font-semibold py-3 rounded-xl hover:bg-[#5851df] transition-colors text-sm disabled:opacity-50"
        >
          {loading ? (
            t.booking.processing
          ) : (
            <>
              <span>{t.booking.payStripe}</span>
              <svg width="50" height="21" viewBox="0 0 468 222" xmlns="http://www.w3.org/2000/svg" aria-label="Stripe" role="img">
                <path fill="#fff" d="M414 113.4c0-25.6-12.4-45.8-36.1-45.8-23.8 0-38.2 20.2-38.2 45.6 0 30.1 17 45.3 41.4 45.3 11.9 0 20.9-2.7 27.7-6.5v-20c-6.8 3.4-14.6 5.5-24.5 5.5-9.7 0-18.3-3.4-19.4-15.2h48.9c0-1.3.2-6.5.2-8.9zm-49.3-9.5c1-11.8 8.2-17.6 15.4-17.6s14 5.8 14.8 17.6h-30.2z"/>
                <path fill="#fff" d="M301.2 67.6c-9.8 0-16.1 4.6-19.6 7.8l-1.3-6.2h-22v116l25 -5.3v-27.9c3.6 2.6 8.9 6.3 17.7 6.3 17.9 0 34.2-14.4 34.2-46.1 0-29-16.5-44.6-34-44.6zm-6 68.6c-5.9 0-9.4-2.1-11.8-4.7l-.1-37.1c2.6-2.9 6.2-4.9 11.9-4.9 9.1 0 15.4 10.2 15.4 23.3 0 13.4-6.2 23.4-15.4 23.4z"/>
                <path fill="#fff" d="M228.5 61.9l25.1-5.4v-20.3l-25.1 5.3z"/>
                <path fill="#fff" d="M228.5 69.3h25.1v87.5h-25.1z"/>
                <path fill="#fff" d="M201.6 76.7l-1.6-7.4h-21.6v87.5h25v-56.1c5.9-7.7 15.9-6.3 19-5.2v-23c-3.2-1.2-14.9-3.4-20.8 4.2z"/>
                <path fill="#fff" d="M151.1 47.6l-24.4 5.2-.1 80.1c0 14.8 11.1 25.7 25.9 25.7 8.2 0 14.2-1.5 17.5-3.3v-20.3c-3.2 1.3-19 5.9-19-8.9v-35.4h19v-21.2h-19z"/>
                <path fill="#fff" d="M79.3 94.7c0-3.9 3.2-5.4 8.5-5.4 7.6 0 17.2 2.3 24.8 6.4v-23.5c-8.3-3.3-16.5-4.6-24.8-4.6-20.3 0-33.8 10.6-33.8 28.3 0 27.6 38.1 23.2 38.1 35.1 0 4.6-4 6.1-9.6 6.1-8.3 0-19-3.4-27.4-8v23.8c9.3 4 18.7 5.7 27.4 5.7 20.8 0 35.1-10.3 35.1-28.2-.1-29.8-38.3-24.5-38.3-35.7z"/>
              </svg>
            </>
          )}
        </button>

        {/* PayPal — card payment leads (no account needed), PayPal login is the secondary option */}
        <div className="mt-3 space-y-2">
          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
              fundingSource={FUNDING.CARD}
              style={{ layout: 'horizontal', color: 'black', shape: 'rect', label: 'pay', height: 44 }}
              createOrder={createPayPalOrder}
              onApprove={onPayPalApprove}
              onError={() => setPayError('Card payment failed. Please try again.')}
            />
            <p className="text-center text-xs text-gray-400 pt-1">{t.booking.loginPaypal}</p>
            <PayPalButtons
              fundingSource={FUNDING.PAYPAL}
              style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'paypal', height: 36, tagline: false }}
              createOrder={createPayPalOrder}
              onApprove={onPayPalApprove}
              onError={() => setPayError('PayPal payment failed. Please try again.')}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  )
}

export default function BookingPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BookingPaymentContent />
    </Suspense>
  )
}
