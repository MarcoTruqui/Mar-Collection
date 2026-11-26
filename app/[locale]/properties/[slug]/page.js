'use client'

import Image from 'next/image'
import Link from '@/components/LocaleLink'
import { notFound } from 'next/navigation'
import { X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import properties from '@/data/properties'
import BookingWidget from '@/components/BookingWidget'
import PropertyCard from '@/components/PropertyCard'
import { useLanguage } from '@/lib/LanguageContext'
import { getCurrentRate } from '@/lib/currentRate'
import Calendar from '@/components/Calendar'
import InquiryForm from '@/components/InquiryForm'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523221355153'

function GalleryLightbox({ images, startIndex, onClose, propertyName }) {
  const [current, setCurrent] = useState(startIndex)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  return (
    <div className="fixed inset-0 z-[60] bg-[#1d1a17]/97 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 text-white/70 hover:text-white z-10" aria-label="Close">
        <X size={26} strokeWidth={1.25} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length) }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl font-light z-10 px-2"
        aria-label="Previous photo"
      >
        ‹
      </button>
      <div className="relative w-full max-w-5xl h-[80vh] mx-10" onClick={e => e.stopPropagation()}>
        <Image src={images[current]} alt={`${propertyName} — photo ${current + 1}`} fill className="object-contain" sizes="90vw" />
      </div>
      <button
        onClick={e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length) }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl font-light z-10 px-2"
        aria-label="Next photo"
      >
        ›
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.2em]">
        {current + 1} / {images.length}
      </p>
    </div>
  )
}

const UI = {
  en: {
    photos: n => `View all ${n} photos`,
    from: 'From',
    night: 'night',
    overview: 'The house',
    amenities: 'What’s here',
    availability: 'Availability',
    ask: name => `Ask about ${name}`,
    askText: 'Questions, flexible dates or a larger group? Write to us and we reply within 24 hours.',
    whatsapp: 'Or message us on WhatsApp',
    more: place => `More in ${place}`,
    checkDates: 'Check dates',
    reserve: 'Reserve',
  },
  es: {
    photos: n => `Ver las ${n} fotos`,
    from: 'Desde',
    night: 'noche',
    overview: 'La casa',
    amenities: 'Lo que hay',
    availability: 'Disponibilidad',
    ask: name => `Consulta sobre ${name}`,
    askText: '¿Preguntas, fechas flexibles o un grupo grande? Escríbenos y te respondemos en 24 horas.',
    whatsapp: 'O escríbenos por WhatsApp',
    more: place => `Más en ${place}`,
    checkDates: 'Ver fechas',
    reserve: 'Reservar',
  },
}

export default function PropertyDetailPage({ params }) {
  const { slug } = params
  const { t, lang, formatPrice, rates } = useLanguage()
  const u = UI[lang] || UI.en
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [bookedRanges, setBookedRanges] = useState([])
  const [showBar, setShowBar] = useState(false)
  const bookRef = useRef(null)

  useEffect(() => {
    fetch('/api/availability', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setBookedRanges(data[slug] || []))
      .catch(() => {})
  }, [slug])

  // Phone: a slim "Reserve" bar stays at the bottom whenever the booking box
  // itself is off-screen, so booking is always one tap away.
  useEffect(() => {
    const el = bookRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => {
      setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight)
    }, { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Lift the WhatsApp bubble above the bar while the bar is visible (phones only).
  useEffect(() => {
    const isPhone = window.matchMedia('(max-width: 1023px)').matches
    document.documentElement.style.setProperty('--wa-offset', showBar && isPhone ? '68px' : '0px')
    return () => document.documentElement.style.setProperty('--wa-offset', '0px')
  }, [showBar])

  const property = properties.find(p => p.slug === slug)
  if (!property) notFound()

  const displayRate = getCurrentRate(rates, property.slug, property.nightlyRate)
  const whatsappMsg = lang === 'es'
    ? `¡Hola! Me interesa ${property.name} (${property.location}). ¿Me ayudan con disponibilidad y precios?`
    : `Hi! I'm interested in ${property.name} (${property.location}). Could you help me check availability and pricing?`
  const amenities = lang === 'es' && property.amenitiesEs ? property.amenitiesEs : property.amenities
  const specs = [
    property.studio ? (lang === 'es' ? 'Estudio' : 'Studio') : `${property.bedrooms} ${t.property.bedrooms.toLowerCase()}`,
    `${property.bathrooms} ${t.property.bathrooms.toLowerCase()}`,
    `${t.property.maxGuests.toLowerCase()} ${property.maxGuests}`,
  ]

  function scrollToBook() {
    bookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pt-[78px] md:pt-[86px] pb-20 lg:pb-0">
      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto md:px-6 lg:px-10 md:pt-6">
        {/* Desktop mosaic */}
        <div className="relative hidden md:grid grid-cols-4 grid-rows-2 gap-1.5 h-[62vh] min-h-[460px] max-h-[640px]">
          <button className="col-span-2 row-span-2 relative overflow-hidden" onClick={() => setLightboxIndex(0)}>
            <Image
              src={property.images[0].replace('/upload/', '/upload/w_1600,q_auto,f_auto/')}
              alt={`${property.name}`}
              fill
              className="object-cover hover:scale-[1.02] transition-transform duration-[1200ms]"
              priority
              unoptimized
              sizes="50vw"
            />
          </button>
          {property.images.slice(1, 5).map((img, i) => (
            <button key={i} className="relative overflow-hidden" onClick={() => setLightboxIndex(i + 1)}>
              <Image src={img} alt={`${property.name} ${i + 2}`} fill className="object-cover hover:scale-[1.03] transition-transform duration-[1200ms]" sizes="25vw" />
            </button>
          ))}
          <button
            onClick={() => setLightboxIndex(0)}
            className="absolute bottom-5 right-5 bg-bone text-navy text-[11px] uppercase tracking-[0.16em] px-4 py-2.5 hover:bg-white transition-colors"
          >
            {u.photos(property.images.length)}
          </button>
        </div>

        {/* Phone: swipeable full-width photos */}
        <div className="md:hidden relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {property.images.slice(0, 12).map((img, i) => (
              <button key={i} className="relative shrink-0 w-full aspect-[4/3] snap-start" onClick={() => setLightboxIndex(i)}>
                <Image src={img} alt={`${property.name} ${i + 1}`} fill className="object-cover" sizes="100vw" priority={i === 0} />
              </button>
            ))}
          </div>
          <span className="absolute bottom-3 right-3 bg-bone/90 text-navy text-[10px] tracking-[0.16em] px-2.5 py-1 pointer-events-none">
            1 / {property.images.length} · {lang === 'es' ? 'desliza' : 'swipe'}
          </span>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={property.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          propertyName={property.name}
        />
      )}

      {/* ── TITLE ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-7 md:pt-12">
        <nav className="hidden md:flex gap-2 text-[12px] text-navy/45 mb-6">
          <Link href="/properties" className="hover:text-navy">{t.properties.title}</Link>
          <span>/</span>
          <span>{property.location}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10">
          <div>
            <p className="eyebrow mb-3">
              {property.location}
              {property.isNew && <span className="ml-3 text-navy">· {lang === 'es' ? 'Nuevo' : 'New'}</span>}
            </p>
            <h1 className="font-serif text-[44px] md:text-7xl leading-[0.95] text-navy">{property.name}</h1>
            <p className="text-[14px] text-navy/60 mt-4">
              {specs.join('  ·  ')}
              {property.sleeping && <span className="block md:inline md:before:content-['·'] md:before:mx-2">{property.sleeping}</span>}
            </p>
          </div>
          <div className="hidden md:block text-right shrink-0">
            <span className="text-[11px] uppercase tracking-label text-navy/50 block mb-1">{u.from}</span>
            <span className="font-serif text-4xl text-navy">{formatPrice(displayRate)}</span>
            <span className="text-navy/50 text-sm ml-1">/ {u.night}</span>
          </div>
        </div>
      </section>

      {/* ── BOOKING + DETAILS ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-6 md:pt-12 pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Booking — on phones it comes right after the title */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1 order-first lg:order-none">
            <div ref={bookRef} id="book" className="scroll-mt-24 lg:sticky lg:top-28">
              <BookingWidget property={property} />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 lg:row-start-1">
            <div className="border-t border-navy/15 pt-10">
              <p className="eyebrow mb-4">{u.overview}</p>
              <p className="text-navy/80 text-[17px] leading-[1.8] font-light whitespace-pre-line">
                {lang === 'es' && property.descriptionEs ? property.descriptionEs : property.description}
              </p>
            </div>

            <div className="border-t border-navy/15 pt-10 mt-14">
              <p className="eyebrow mb-6">{u.amenities}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                {amenities.map(a => (
                  <li key={a} className="text-navy/80 text-[15px] py-3 border-b border-navy/10">{a}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-navy/15 pt-10 mt-14">
              <p className="eyebrow mb-6">{u.availability}</p>
              <div className="bg-linen p-5 md:p-7">
                <Calendar bookedRanges={bookedRanges} lang={lang} monthsToShow={2} />
              </div>
            </div>

            <div id="inquire" className="border-t border-navy/15 pt-10 mt-14 scroll-mt-24">
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">{u.ask(property.name)}</h2>
              <p className="text-navy/60 text-[15px] mb-7">{u.askText}</p>
              <InquiryForm property={property} />
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-[13px] text-navy/70 underline underline-offset-4 decoration-navy/30 hover:text-navy"
              >
                {u.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SimilarProperties current={property} title={u.more(property.location)} />

      {/* Phone: sticky reserve bar */}
      <div
        className={`lg:hidden fixed left-0 right-0 bottom-0 z-40 bg-bone border-t border-navy/15 px-5 py-3 flex items-center justify-between gap-4 transition-transform duration-300 ${
          showBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="leading-tight">
          <span className="text-[11px] text-navy/55">{u.from} </span>
          <span className="font-serif text-xl text-navy">{formatPrice(displayRate)}</span>
          <span className="text-[11px] text-navy/55"> / {u.night}</span>
        </div>
        <button onClick={scrollToBook} className="bg-navy text-bone text-[12px] uppercase tracking-[0.18em] px-6 py-3">
          {u.reserve}
        </button>
      </div>
    </div>
  )
}

function SimilarProperties({ current, title }) {
  const similar = properties
    .filter(p => p.slug !== current.slug && p.location === current.location)
    .slice(0, 3)

  if (similar.length === 0) return null

  return (
    <section className="bg-linen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <h2 className="font-serif text-4xl md:text-5xl text-navy mb-10">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {similar.map(p => <PropertyCard key={p.slug} property={p} />)}
        </div>
      </div>
    </section>
  )
}
