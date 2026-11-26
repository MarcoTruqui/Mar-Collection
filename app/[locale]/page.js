'use client'

import Link from '@/components/LocaleLink'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import PropertyCard from '@/components/PropertyCard'
import Calendar from '@/components/Calendar'
import HeroVideo from '@/components/HeroVideo'
import properties from '@/data/properties'

// The testimonials in lib/translations.js are placeholder text, not real guest
// reviews, so the "Guest Stories" section stays hidden. Replace them with real
// Airbnb reviews (exact wording, real first name + initial, real villa), then
// set this to true. Never show or advertise reviews that guests didn't write.
const SHOW_GUEST_REVIEWS = false

const COPY = {
  en: {
    place: 'Bahía de Banderas · Riviera Nayarit',
    headline: 'Houses by the sea,\non the Bay of Banderas',
    sub: 'Private villas in Punta Mita, Bucerías and La Cruz de Huanacaxtle — booked directly with us.',
    when: 'When',
    addDates: 'Add dates',
    who: 'Guests',
    search: 'Search villas',
    pickOut: 'Now choose check-out',
    pickIn: 'Choose check-in, then check-out',
    browse: 'or browse all villas',
    philosophy: 'The house',
    stats: [
      ['16', 'private villas & residences'],
      ['3', 'towns on the bay'],
      ['300+', 'five-star reviews on Airbnb'],
      ['12', 'guests in our largest villas'],
    ],
    story: 'Our story',
    portfolio: 'The collection',
    portfolioTitle: 'A few of the houses',
    allVillas: 'All villas',
    placesEyebrow: 'Where we are',
    placesTitle: 'Three towns, one bay',
    villas: n => `${n} ${n === 1 ? 'villa' : 'villas'}`,
    closingTitle: 'Tell us your dates.\nWe will find the house.',
    closingText: 'Book online in a few minutes, or write to us and we will help you choose.',
    contact: 'Write to us',
  },
  es: {
    place: 'Bahía de Banderas · Riviera Nayarit',
    headline: 'Casas junto al mar,\nen la Bahía de Banderas',
    sub: 'Villas privadas en Punta Mita, Bucerías y La Cruz de Huanacaxtle — reserva directo con nosotros.',
    when: 'Fechas',
    addDates: 'Elegir fechas',
    who: 'Huéspedes',
    search: 'Buscar villas',
    pickOut: 'Ahora elige la salida',
    pickIn: 'Elige llegada y luego salida',
    browse: 'o ver todas las villas',
    philosophy: 'La casa',
    stats: [
      ['16', 'villas y residencias privadas'],
      ['3', 'pueblos en la bahía'],
      ['300+', 'reseñas de cinco estrellas en Airbnb'],
      ['12', 'huéspedes en nuestras villas más grandes'],
    ],
    story: 'Nuestra historia',
    portfolio: 'La colección',
    portfolioTitle: 'Algunas de las casas',
    allVillas: 'Todas las villas',
    placesEyebrow: 'Dónde estamos',
    placesTitle: 'Tres pueblos, una bahía',
    villas: n => `${n} ${n === 1 ? 'villa' : 'villas'}`,
    closingTitle: 'Cuéntanos tus fechas.\nNosotros encontramos la casa.',
    closingText: 'Reserva en línea en unos minutos, o escríbenos y te ayudamos a elegir.',
    contact: 'Escríbenos',
  },
}

function fmtShort(dateStr, lang) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { month: 'short', day: 'numeric' })
}

// Date + guests search. First click sets check-in, second sets check-out.
// Sends the guest to /properties with dates (and guests) applied.
function SearchPanel({ c }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const [checkIn, setCheckIn]   = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests]     = useState(2)
  const [calOpen, setCalOpen]   = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!calOpen) return
    function onOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setCalOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('touchstart', onOutside)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('touchstart', onOutside)
    }
  }, [calOpen])

  function handleSearch() {
    const prefix = lang === 'es' ? '/es' : ''
    if (!checkIn || !checkOut) { setCalOpen(true); return }
    router.push(`${prefix}/properties?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
  }

  const dateLabel = checkIn && checkOut
    ? `${fmtShort(checkIn, lang)} — ${fmtShort(checkOut, lang)}`
    : checkIn
      ? `${fmtShort(checkIn, lang)} — …`
      : c.addDates

  return (
    <div className="relative" ref={wrapRef}>
      <div className="bg-bone border border-navy/10 shadow-xl flex flex-col md:flex-row md:items-stretch">
        <button
          type="button"
          onClick={() => setCalOpen(o => !o)}
          className="flex-1 text-left px-5 py-4 md:py-5 md:px-7 border-b md:border-b-0 md:border-r border-navy/10 hover:bg-linen/60 transition-colors"
        >
          <span className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{c.when}</span>
          <span className={`block font-serif text-xl ${checkIn ? 'text-navy' : 'text-navy/45'}`}>{dateLabel}</span>
        </button>

        <div className="flex items-center justify-between md:justify-start gap-6 px-5 py-4 md:py-5 md:px-7 border-b md:border-b-0 md:border-r border-navy/10">
          <div>
            <span className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{c.who}</span>
            <span className="block font-serif text-xl text-navy">{guests}</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Fewer guests" onClick={() => setGuests(g => Math.max(1, g - 1))}
              className="w-8 h-8 rounded-full border border-navy/20 flex items-center justify-center text-navy/70 hover:border-navy">
              <Minus size={13} strokeWidth={1.5} />
            </button>
            <button type="button" aria-label="More guests" onClick={() => setGuests(g => Math.min(16, g + 1))}
              className="w-8 h-8 rounded-full border border-navy/20 flex items-center justify-center text-navy/70 hover:border-navy">
              <Plus size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="bg-navy text-bone text-[12px] uppercase tracking-[0.18em] px-8 py-4 md:py-0 hover:bg-gold transition-colors"
        >
          {c.search}
        </button>
      </div>

      {calOpen && (
        <div className="absolute left-0 right-0 md:right-auto md:w-[380px] top-full mt-2 z-40 bg-bone border border-navy/10 shadow-xl p-5 text-left">
          <Calendar
            bookedRanges={[]}
            checkIn={checkIn}
            checkOut={checkOut}
            lang={lang}
            monthsToShow={1}
            minNights={2}
            onChange={(ci, co) => {
              setCheckIn(ci)
              setCheckOut(co)
              if (ci && co) setCalOpen(false)
            }}
          />
          <p className="text-xs text-navy/50 mt-3 text-center">
            {checkIn && !checkOut ? c.pickOut : c.pickIn}
          </p>
        </div>
      )}
    </div>
  )
}

const FEATURED_SLUGS = ['palmas-8', 'villa-girasol', 'terrazas-g32', 'villa-turquesa', 'villa-perico']

function FeaturedRow({ items }) {
  const scroller = useRef(null)
  const scrollBy = dir => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(p => (
          <div key={p.slug} className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31.5%]">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
      <div className="hidden sm:flex gap-2 justify-end mt-8">
        <button onClick={() => scrollBy(-1)} aria-label="Previous"
          className="w-11 h-11 rounded-full border border-navy/25 flex items-center justify-center text-navy/70 hover:border-navy hover:text-navy transition-colors">
          <ArrowLeft size={16} strokeWidth={1.5} />
        </button>
        <button onClick={() => scrollBy(1)} aria-label="Next"
          className="w-11 h-11 rounded-full border border-navy/25 flex items-center justify-center text-navy/70 hover:border-navy hover:text-navy transition-colors">
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

function TestimonialList({ testimonials }) {
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {testimonials.slice(0, 3).map((t, i) => (
        <figure key={i} className="border-t border-navy/15 pt-6">
          <blockquote className="font-serif text-xl leading-snug text-navy/90">“{t.text}”</blockquote>
          <figcaption className="mt-5 text-[13px] text-navy/60">
            {t.name} · <span className="text-gold">{t.property}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

const PLACES = [
  { name: 'Punta Mita', href: '/punta-mita', cover: 'palmas-8' },
  { name: 'Bucerías', href: '/bucerias', cover: 'villa-girasol' },
  { name: 'La Cruz de Huanacaxtle', href: '/la-cruz-de-huanacaxtle', cover: 'zantamar-th7' },
]

export default function HomePage() {
  const { t, lang } = useLanguage()
  const c = COPY[lang] || COPY.en
  const featured = FEATURED_SLUGS.map(slug => properties.find(p => p.slug === slug)).filter(Boolean)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[60svh] min-h-[420px] md:h-[92vh] md:min-h-[640px]">
        <div className="absolute inset-0 bg-navy overflow-hidden">
          <HeroVideo />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex flex-col justify-end pb-16 md:pb-40">
          <p className="text-[11px] uppercase tracking-label text-white/80 mb-4">{c.place}</p>
          <h1 className="font-serif font-light text-white text-[42px] leading-[1.02] sm:text-6xl md:text-[84px] md:leading-[0.98] whitespace-pre-line max-w-4xl">
            {c.headline}
          </h1>
          <p className="hidden md:block text-white/85 text-lg font-light mt-6 max-w-xl">{c.sub}</p>
        </div>

        {/* Desktop: search sits on the bottom edge of the hero */}
        <div className="hidden md:block absolute z-20 left-0 right-0 bottom-0 translate-y-1/2">
          <div className="max-w-5xl mx-auto px-10">
            <SearchPanel c={c} />
          </div>
        </div>
      </section>

      {/* Phone: search comes straight after the photo, before anything else */}
      <section className="md:hidden bg-bone px-5 pt-5 pb-10 relative z-20 -mt-10">
        <SearchPanel c={c} />
        <div className="text-center mt-4">
          <Link href="/properties" className="text-[13px] text-navy/60 underline underline-offset-4 decoration-navy/30">
            {c.browse}
          </Link>
        </div>
        <p className="text-navy/70 text-[15px] leading-relaxed mt-8">{c.sub}</p>
      </section>

      {/* ── FEATURED VILLAS (right after search, so booking stays close) ── */}
      <section className="bg-bone pt-6 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="eyebrow mb-3">{c.portfolio}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-navy leading-none">{c.portfolioTitle}</h2>
            </div>
            <Link href="/properties" className="hidden sm:inline text-[12px] uppercase tracking-[0.18em] text-navy border-b border-navy/40 pb-1 hover:text-gold hover:border-gold transition-colors">
              {c.allVillas}
            </Link>
          </div>

          <FeaturedRow items={featured} />

          <div className="sm:hidden mt-8">
            <Link href="/properties" className="btn-outline w-full">{c.allVillas}</Link>
          </div>
        </div>
      </section>

      {/* ── THE HOUSE / PHILOSOPHY ───────────────────────────── */}
      <section className="bg-linen py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">{c.philosophy}</p>
            <h2 className="font-serif text-4xl md:text-[54px] leading-[1.05] text-navy">
              {t.home.brandTitle}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-navy/75 text-[17px] leading-[1.75] font-light">
              {t.home.brandText}
            </p>
            <Link href="/about" className="inline-block mt-8 text-[12px] uppercase tracking-[0.18em] text-navy border-b border-navy/40 pb-1 hover:text-gold hover:border-gold transition-colors">
              {c.story}
            </Link>
          </div>

          <dl className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 border-t border-navy/15 mt-4 md:mt-16">
            {c.stats.map(([value, label], i) => (
              <div key={label} className={`pt-8 pb-2 pr-4 ${i % 2 === 1 ? 'pl-4 md:pl-8' : ''} ${i > 0 ? 'md:border-l md:border-navy/15 md:pl-8' : ''}`}>
                <dt className="font-serif text-5xl md:text-6xl font-light text-navy">{value}</dt>
                <dd className="text-[13px] text-navy/60 mt-2 leading-snug">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── PLACES ───────────────────────────────────────────── */}
      <section className="bg-bone py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <p className="eyebrow mb-3">{c.placesEyebrow}</p>
          <h2 className="font-serif text-4xl md:text-6xl text-navy leading-none mb-12">{c.placesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {PLACES.map(place => {
              const cover = properties.find(p => p.slug === place.cover)
              const count = properties.filter(p => p.location === place.name).length
              return (
                <Link key={place.name} href={place.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    {cover && (
                      <Image src={cover.images[0]} alt={place.name} fill sizes="(max-width: 768px) 90vw, 33vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
                    )}
                  </div>
                  <div className="flex items-baseline justify-between pt-5 border-b border-navy/15 pb-4">
                    <h3 className="font-serif text-[28px] text-navy group-hover:text-gold transition-colors">{place.name}</h3>
                    <span className="text-[13px] text-navy/55 whitespace-nowrap pl-4">{c.villas(count)}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── REVIEWS (hidden until real ones are in) ──────────── */}
      {SHOW_GUEST_REVIEWS && (
        <section className="bg-linen py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <p className="eyebrow mb-3">Guest Stories</p>
            <h2 className="font-serif text-4xl md:text-6xl text-navy leading-none mb-12">{t.home.testimonialsTitle}</h2>
            <TestimonialList testimonials={t.testimonials} />
          </div>
        </section>
      )}

      {/* ── CLOSING ──────────────────────────────────────────── */}
      <section className="bg-sand py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 grid md:grid-cols-12 gap-10 items-end">
          <h2 className="md:col-span-7 font-serif text-4xl md:text-6xl leading-[1.05] text-navy whitespace-pre-line">
            {c.closingTitle}
          </h2>
          <div className="md:col-span-5">
            <p className="text-navy/70 text-[16px] leading-relaxed mb-8">{c.closingText}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/properties" className="btn-primary">{t.nav.bookNow}</Link>
              <Link href="/contact" className="btn-outline">{c.contact}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
