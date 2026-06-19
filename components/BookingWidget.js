'use client'

import { useState, useEffect, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useLanguage } from '@/lib/LanguageContext'
import { Minus, Plus, Tag, AlertCircle, CalendarDays } from 'lucide-react'
import { calculateStayPrice } from '@/lib/pricingEngine'
import Calendar from '@/components/Calendar'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

const SEASON_LABELS = {
  peak: { en: 'Peak Season', es: 'Temporada Peak' },
  high: { en: 'High Season', es: 'Temporada Alta' },
  low:  { en: 'Low Season',  es: 'Temporada Baja' },
}

function fmt(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BookingWidget({ property }) {
  const { t, lang, formatPrice } = useLanguage()
  const [checkIn, setCheckIn]           = useState('')
  const [checkOut, setCheckOut]         = useState('')
  const [guests, setGuests]             = useState(1)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [bookedRanges, setBookedRanges] = useState([])
  const [calOpen, setCalOpen]           = useState(false)
  const calRef                          = useRef(null)

  useEffect(() => {
    fetch('/api/availability')
      .then(r => r.json())
      .then(data => setBookedRanges(data[property.slug] || []))
      .catch(() => {})
  }, [property.slug])

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (calRef.current && !calRef.current.contains(e.target)) {
        setCalOpen(false)
      }
    }
    if (calOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [calOpen])

  const stay = (checkIn && checkOut)
    ? calculateStayPrice(
        property.slug,
        checkIn,
        checkOut,
        property.nightlyRate,
        property.cleaningFee,
        property.serviceFee,
      )
    : null

  const nights = stay?.nights ?? 0
  const total  = stay?.total  ?? 0

  function validate() {
    if (!checkIn || !checkOut) { setError(t.booking.selectDatesFirst); return false }
    if (nights < 2) { setError(t.booking.minimum2Nights); return false }
    setError('')
    return true
  }

  async function handleStripe() {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyName: property.name,
          slug: property.slug,
          checkIn,
          checkOut,
          nights,
          nightlyRate: stay.averageRate,
          cleaningFee: stay.cleaningFee,
          serviceFee:  stay.serviceFee,
          total,
          guests,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Payment initialization failed. Please try again.')
      }
    } catch {
      setError('Payment initialization failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
    currency: 'USD',
  }

  function createPayPalOrder(data, actions) {
    return actions.order.create({
      purchase_units: [{
        description: `${property.name} — ${checkIn} to ${checkOut}`,
        amount: { currency_code: 'USD', value: total.toFixed(2) },
      }],
    })
  }

  function onPayPalApprove(data, actions) {
    return actions.order.capture().then(() => {
      window.location.href = `/booking-confirmed?property=${encodeURIComponent(property.name)}&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}&method=paypal`
    })
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 sticky top-24">
      <h3 className="font-serif text-navy text-xl mb-4">{t.booking.title}</h3>

      {/* Date picker — click to open calendar popover */}
      <div className="relative mb-4" ref={calRef}>
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => setCalOpen(o => !o)}
        >
          <div className={`flex-1 rounded-xl border px-3 py-2.5 text-sm transition-colors ${calOpen || checkIn ? 'border-navy/40 bg-navy/5' : 'border-gray-200 hover:border-gray-300'}`}>
            <p className="text-xs text-gray-400 mb-0.5">{t.booking.checkIn}</p>
            <p className={`font-medium ${checkIn ? 'text-navy' : 'text-gray-300'}`}>{checkIn ? fmt(checkIn) : '—'}</p>
          </div>
          <div className={`flex-1 rounded-xl border px-3 py-2.5 text-sm transition-colors ${calOpen || checkOut ? 'border-navy/40 bg-navy/5' : 'border-gray-200 hover:border-gray-300'}`}>
            <p className="text-xs text-gray-400 mb-0.5">{t.booking.checkOut}</p>
            <p className={`font-medium ${checkOut ? 'text-navy' : 'text-gray-300'}`}>{checkOut ? fmt(checkOut) : '—'}</p>
          </div>
          <div className="flex items-center px-1 text-gray-400">
            <CalendarDays size={18} />
          </div>
        </div>

        {/* Clear button */}
        {(checkIn || checkOut) && !calOpen && (
          <button
            onClick={e => { e.stopPropagation(); setCheckIn(''); setCheckOut(''); setError('') }}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-gray-300 hover:text-red-400 transition-colors"
          >
            ✕
          </button>
        )}

        {/* Popover calendar */}
        {calOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
            <Calendar
              bookedRanges={bookedRanges}
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={(ci, co) => {
                setCheckIn(ci)
                setCheckOut(co)
                setError('')
                if (ci && co) setCalOpen(false)
              }}
              lang={lang}
              monthsToShow={1}
              minNights={2}
            />
            <p className="text-xs text-gray-400 mt-3 text-center">
              {lang === 'es' ? 'Selecciona llegada y luego salida' : 'Select check-in, then check-out'}
            </p>
          </div>
        )}
      </div>

      {/* Guests */}
      <div className="mb-5">
        <label className="block text-xs text-gray-500 mb-1">{t.booking.guests}</label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 w-full">
          <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="text-navy hover:text-gold transition-colors">
            <Minus size={16} />
          </button>
          <span className="flex-1 text-center text-sm text-navy font-medium">
            {guests} {guests === 1 ? t.booking.guestCount : t.booking.guestsCount}
          </span>
          <button onClick={() => setGuests(g => Math.min(property.maxGuests, g + 1))} className="text-navy hover:text-gold transition-colors">
            <Plus size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">Max {property.maxGuests} {t.booking.guestsCount}</p>
      </div>

      {/* Price breakdown */}
      {stay && nights >= 2 && (
        <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm space-y-2">
          <p className="font-medium text-navy text-xs tracking-wide mb-3">{t.booking.priceBreakdown}</p>

          {stay.mixedSeasons
            ? stay.seasonSummary.map(s => (
                <div key={s.id} className="flex justify-between text-gray-600">
                  <span>{SEASON_LABELS[s.id]?.[lang]} ({s.nights}n × {formatPrice(s.rate ?? 0)})</span>
                  <span>{formatPrice(s.nights * (s.rate ?? 0))}</span>
                </div>
              ))
            : (
                <div className="flex justify-between text-gray-600">
                  <span>{SEASON_LABELS[stay.seasonSummary[0]?.id]?.[lang]} — {formatPrice(stay.averageRate ?? 0)} × {nights} {nights === 1 ? t.booking.nights : t.booking.nightsPlural}</span>
                  <span>{formatPrice(stay.subtotal)}</span>
                </div>
              )
          }

          {stay.weeklyDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center gap-1"><Tag size={12} /> 7-night discount (10%)</span>
              <span>−{formatPrice(stay.weeklyDiscount)}</span>
            </div>
          )}

          {stay.promoDiscount > 0 && stay.activePromo && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center gap-1"><Tag size={12} />{lang === 'es' ? stay.activePromo.labelEs : stay.activePromo.label}</span>
              <span>−{formatPrice(stay.promoDiscount)}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-navy pt-2 border-t border-gray-200">
            <span>{t.booking.total}</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-gray-400 pt-1 flex items-center gap-1">
            <span>✓</span>
            {lang === 'es' ? 'Limpieza diaria incluida' : 'Daily cleaning included'}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 text-sm text-red-600">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stripe button */}
      <button
        onClick={handleStripe}
        disabled={loading}
        className="w-full bg-navy text-white font-semibold py-3 rounded-xl hover:bg-navy/90 transition-colors mb-3 text-sm disabled:opacity-50"
      >
        {loading ? t.booking.processing : t.booking.payStripe}
      </button>

      {/* PayPal */}
      {nights >= 2 && total > 0 ? (
        <PayPalScriptProvider options={paypalOptions}>
          <PayPalButtons
            style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'pay', height: 44 }}
            createOrder={createPayPalOrder}
            onApprove={onPayPalApprove}
            onError={() => setError('PayPal payment failed. Please try again.')}
          />
        </PayPalScriptProvider>
      ) : (
        <button
          onClick={validate}
          className="w-full border border-gray-200 text-gray-400 font-semibold py-3 rounded-xl text-sm cursor-not-allowed"
        >
          {t.booking.payPaypal}
        </button>
      )}
    </div>
  )
}
