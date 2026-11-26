'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { Minus, Plus, AlertCircle } from 'lucide-react'
import { calculateStayPrice } from '@/lib/pricingEngine'
import Calendar from '@/components/Calendar'

const SEASON_LABELS = {
  peak: { en: 'Peak Season', es: 'Temporada Peak' },
  high: { en: 'High Season', es: 'Temporada Alta' },
  low:  { en: 'Low Season',  es: 'Temporada Baja' },
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

// The booking server answers in English; show Spanish visitors Spanish.
const ERRORS_ES = {
  'Unknown property.': 'Propiedad desconocida.',
  'Invalid dates.': 'Fechas no válidas.',
  'Check-in date is in the past.': 'La fecha de llegada ya pasó.',
  'Check-out must be after check-in.': 'La salida debe ser después de la llegada.',
  'Minimum stay is 2 nights.': 'La estancia mínima es de 2 noches.',
  'These dates were just booked. Please pick different dates.': 'Estas fechas se acaban de reservar. Por favor elige otras.',
  'Failed to start booking. Please try again.': 'No se pudo iniciar la reserva. Inténtalo de nuevo.',
  'Could not start booking. Please try again.': 'No se pudo iniciar la reserva. Inténtalo de nuevo.',
}
function localizeError(msg, lang) {
  if (lang !== 'es' || !msg) return msg
  if (ERRORS_ES[msg]) return ERRORS_ES[msg]
  const max = msg.match(/maximum of (\d+) guests/)
  if (max) return `Esta propiedad permite un máximo de ${max[1]} huéspedes.`
  return msg
}

function fmt(dateStr, lang) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BookingWidget({ property }) {
  const { t, lang, formatPrice, rates } = useLanguage()
  const [checkIn, setCheckIn]           = useState('')
  const [checkOut, setCheckOut]         = useState('')
  const [guests, setGuests]             = useState(1)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [bookedRanges, setBookedRanges] = useState([])
  const [calOpen, setCalOpen]           = useState(false)
  const calRef                          = useRef(null)

  useEffect(() => {
    fetch('/api/availability', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setBookedRanges(data[property.slug] || []))
      .catch(() => {})
  }, [property.slug])

  // Carry over dates/guests the guest already searched for (homepage or
  // Properties list), so they don't have to pick them twice.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const ci = q.get('checkIn'), co = q.get('checkOut'), g = Number(q.get('guests'))
    if (ci && co && DATE_RE.test(ci) && DATE_RE.test(co) && co > ci) {
      setCheckIn(ci)
      setCheckOut(co)
    }
    if (g > 0) setGuests(Math.min(property.maxGuests, g))
  }, [property.maxGuests])

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (calRef.current && !calRef.current.contains(e.target)) {
        setCalOpen(false)
      }
    }
    if (calOpen) {
      document.addEventListener('click', handleClick)
      document.addEventListener('touchend', handleClick)
    }
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchend', handleClick)
    }
  }, [calOpen])

  const stay = (checkIn && checkOut)
    ? calculateStayPrice(
        rates,
        property.slug,
        checkIn,
        checkOut,
        property.nightlyRate,
        property.cleaningFee,
      )
    : null

  const nights = stay?.nights ?? 0
  const total  = stay?.total  ?? 0

  function validate() {
    if (!checkIn || !checkOut) { setError(t.booking.selectDatesFirst); setCalOpen(true); return false }
    if (nights < 2) { setError(t.booking.minimum2Nights); return false }
    setError('')
    return true
  }

  // Starts the booking: creates a locked-price contract link via the Apps
  // Script website API and sends the guest there to fill in their info, review
  // the contract, and sign. Payment happens only after that, on a separate
  // page — see /booking-payment.
  async function handleBookNow() {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/create-booking-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: property.slug,
          checkIn,
          checkOut,
          guests,
          lang,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(localizeError(data.error || 'Could not start booking. Please try again.', lang))
      }
    } catch {
      setError(localizeError('Could not start booking. Please try again.', lang))
    } finally {
      setLoading(false)
    }
  }

  const label = 'block text-[10px] uppercase tracking-label text-navy/50 mb-1'

  return (
    <div className="bg-white/70 border border-navy/15 p-6 md:p-7">
      <div className="flex items-baseline justify-between mb-5">
        <h3 className="font-serif text-2xl text-navy">{t.booking.title}</h3>
      </div>

      {/* Date picker — click to open calendar popover */}
      <div className="relative mb-3" ref={calRef}>
        <div className="grid grid-cols-2 border border-navy/20 cursor-pointer" onClick={() => setCalOpen(o => !o)}>
          <div className={`px-4 py-3 border-r border-navy/20 transition-colors ${calOpen ? 'bg-linen' : 'hover:bg-linen/60'}`}>
            <span className={label}>{t.booking.checkIn}</span>
            <span className={`font-serif text-lg ${checkIn ? 'text-navy' : 'text-navy/35'}`}>{checkIn ? fmt(checkIn, lang) : '—'}</span>
          </div>
          <div className={`px-4 py-3 transition-colors ${calOpen ? 'bg-linen' : 'hover:bg-linen/60'}`}>
            <span className={label}>{t.booking.checkOut}</span>
            <span className={`font-serif text-lg ${checkOut ? 'text-navy' : 'text-navy/35'}`}>{checkOut ? fmt(checkOut, lang) : '—'}</span>
          </div>
        </div>

        {(checkIn || checkOut) && !calOpen && (
          <button
            onClick={e => { e.stopPropagation(); setCheckIn(''); setCheckOut(''); setError('') }}
            className="absolute -top-6 right-0 text-[11px] text-navy/45 hover:text-navy underline underline-offset-2"
          >
            {lang === 'es' ? 'Borrar fechas' : 'Clear dates'}
          </button>
        )}

        {/* Popover calendar */}
        {calOpen && (
          <div
            className="absolute left-0 right-0 top-full mt-2 z-30 bg-bone border border-navy/10 shadow-xl p-4"
            onClick={e => e.stopPropagation()}
            onTouchEnd={e => e.stopPropagation()}
          >
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
            <p className="text-xs text-navy/50 mt-3 text-center">
              {lang === 'es' ? 'Selecciona llegada y luego salida' : 'Select check-in, then check-out'}
            </p>
          </div>
        )}
      </div>

      {/* Guests */}
      <div className="flex items-center justify-between border border-navy/20 px-4 py-3 mb-5">
        <div>
          <span className={label}>{t.booking.guests}</span>
          <span className="font-serif text-lg text-navy">
            {guests} <span className="text-[13px] font-sans text-navy/50">/ max {property.maxGuests}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setGuests(g => Math.max(1, g - 1))} aria-label="Fewer guests"
            className="w-8 h-8 rounded-full border border-navy/20 flex items-center justify-center text-navy/70 hover:border-navy">
            <Minus size={13} strokeWidth={1.5} />
          </button>
          <button onClick={() => setGuests(g => Math.min(property.maxGuests, g + 1))} aria-label="More guests"
            className="w-8 h-8 rounded-full border border-navy/20 flex items-center justify-center text-navy/70 hover:border-navy">
            <Plus size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Price breakdown */}
      {stay && nights >= 2 && (
        <div className="text-[14px] space-y-2.5 mb-5">
          {stay.mixedSeasons
            ? stay.seasonSummary.map(s => (
                <div key={s.id} className="flex justify-between text-navy/70">
                  <span>{SEASON_LABELS[s.id]?.[lang]} ({s.nights}n × {formatPrice(s.rate ?? 0)})</span>
                  <span>{formatPrice(s.nights * (s.rate ?? 0))}</span>
                </div>
              ))
            : (
                <div className="flex justify-between text-navy/70">
                  <span>{SEASON_LABELS[stay.seasonSummary[0]?.id]?.[lang]} — {formatPrice(stay.averageRate ?? 0)} × {nights} {nights === 1 ? t.booking.nights : t.booking.nightsPlural}</span>
                  <span>{formatPrice(stay.subtotal)}</span>
                </div>
              )
          }

          {stay.weeklyDiscount > 0 && (
            <div className="flex justify-between text-olive">
              <span>{lang === 'es' ? 'Descuento 7 noches (10%)' : '7-night discount (10%)'}</span>
              <span>−{formatPrice(stay.weeklyDiscount)}</span>
            </div>
          )}

          {stay.promoDiscount > 0 && stay.activePromo && (
            <div className="flex justify-between text-olive">
              <span>{lang === 'es' ? stay.activePromo.labelEs : stay.activePromo.label}</span>
              <span>−{formatPrice(stay.promoDiscount)}</span>
            </div>
          )}

          {stay.cleaningFee > 0 && (
            <div className="flex justify-between text-navy/70">
              <span>{t.booking.cleaningFee}</span>
              <span>{formatPrice(stay.cleaningFee)}</span>
            </div>
          )}

          {stay.serviceFee > 0 && (
            <div className="flex justify-between text-navy/70">
              <span>{t.booking.serviceFee}</span>
              <span>{formatPrice(stay.serviceFee)}</span>
            </div>
          )}

          <div className="flex justify-between items-baseline text-navy pt-3 border-t border-navy/15">
            <span className="text-[11px] uppercase tracking-label">{t.booking.total}</span>
            <span className="font-serif text-2xl">{formatPrice(total)}</span>
          </div>
          <p className="text-[12px] text-navy/50">
            {lang === 'es' ? 'Limpieza diaria incluida' : 'Daily cleaning included'}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-clay/10 border border-clay/30 px-4 py-3 mb-4 text-sm text-[#7a3f26]">
          <AlertCircle size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
          <span>
            {error}{' '}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523221355153'}?text=${encodeURIComponent(lang === 'es' ? `¡Hola! Me gustaría reservar ${property.name}${checkIn && checkOut ? ` del ${checkIn} al ${checkOut}` : ''}.` : `Hi! I'd like to book ${property.name}${checkIn && checkOut ? ` from ${checkIn} to ${checkOut}` : ''}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              {lang === 'es' ? 'O resérvala por WhatsApp.' : 'Or book via WhatsApp.'}
            </a>
          </span>
        </div>
      )}

      {/* Book Now — starts the contract flow. Payment method (Stripe/PayPal) is
          chosen after the contract is signed, on /booking-payment. */}
      <button
        onClick={handleBookNow}
        disabled={loading}
        className="w-full bg-navy text-bone text-[12px] uppercase tracking-[0.2em] py-4 hover:bg-gold transition-colors disabled:opacity-50"
      >
        {loading ? t.booking.startingBooking : t.booking.bookNow}
      </button>
      <p className="text-[12px] text-navy/45 text-center mt-3">
        {lang === 'es' ? 'Aún no se te cobra nada' : 'You won’t be charged yet'}
      </p>
    </div>
  )
}
