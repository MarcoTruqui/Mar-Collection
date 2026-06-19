'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Users, Bed, Bath, Check, ChevronLeft, X, MoonStar } from 'lucide-react'
import { useState, useEffect } from 'react'
import properties from '@/data/properties'
import BookingWidget from '@/components/BookingWidget'
import { useLanguage } from '@/lib/LanguageContext'
import { getCurrentRate } from '@/lib/currentRate'
import Calendar from '@/components/Calendar'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523221355153'

function GalleryLightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
        <X size={28} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length) }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 px-2"
      >
        ‹
      </button>
      <div className="relative w-full max-w-4xl h-[80vh] mx-8" onClick={e => e.stopPropagation()}>
        <Image src={images[current]} alt="" fill className="object-contain" sizes="90vw" />
      </div>
      <button
        onClick={e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length) }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 px-2"
      >
        ›
      </button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
        {current + 1} / {images.length}
      </p>
    </div>
  )
}

export default function PropertyDetailPage({ params }) {
  const { slug } = params
  const { t, lang, formatPrice } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [bookedRanges, setBookedRanges] = useState([])

  useEffect(() => {
    fetch('/api/availability')
      .then(r => r.json())
      .then(data => setBookedRanges(data[slug] || []))
      .catch(() => {})
  }, [slug])

  const property = properties.find(p => p.slug === slug)
  if (!property) notFound()

  const displayRate = getCurrentRate(property.slug, property.nightlyRate)

  const whatsappMsg = `Hi! I'm interested in ${property.name} (${property.location}). Could you help me check availability and pricing?`

  return (
    <div className="pt-20">
      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-navy text-sm mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          {t.properties.title}
        </Link>

        {/* Desktop mosaic gallery */}
        <div className="hidden sm:grid grid-cols-4 grid-rows-2 gap-2 h-[480px] rounded-2xl overflow-hidden">
          <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => setLightboxIndex(0)}>
            <Image
              src={property.images[0]}
              alt={`${property.name} main`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
              sizes="50vw"
            />
          </div>
          {property.images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative overflow-hidden cursor-pointer" onClick={() => setLightboxIndex(i + 1)}>
              <Image
                src={img}
                alt={`${property.name} ${i + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="25vw"
              />
              {i === 3 && property.images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-semibold text-sm">+{property.images.length - 5} photos</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile gallery — horizontal scroll strip */}
        <div className="sm:hidden -mx-4 flex gap-2 overflow-x-auto pb-2 px-4 snap-x snap-mandatory">
          {property.images.slice(0, 8).map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-72 h-52 rounded-xl overflow-hidden snap-start cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <Image src={img} alt={`${property.name} ${i + 1}`} fill className="object-cover" sizes="288px" />
            </div>
          ))}
          {property.images.length > 8 && (
            <div
              className="relative flex-shrink-0 w-72 h-52 rounded-xl overflow-hidden snap-start cursor-pointer bg-navy flex items-center justify-center"
              onClick={() => setLightboxIndex(8)}
            >
              <span className="text-white font-semibold text-sm">+{property.images.length - 8} more</span>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={property.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* ── CONTENT + BOOKING ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            {/* Title block */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <span className="flex items-center gap-1 text-gold text-sm mb-2">
                    <MapPin size={14} />
                    {property.location}
                  </span>
                  <h1 className="font-serif text-4xl text-navy">{property.name}</h1>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">{t.properties.from ?? 'From'}</span>
                  <span className="text-3xl font-bold text-navy">{formatPrice(displayRate)}</span>
                  <span className="text-gray-400 text-sm ml-1">{t.properties.nightlyRate}</span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Bed size={16} className="text-gold" />
                  {property.studio ? 'Studio' : `${property.bedrooms} ${t.property.bedrooms}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath size={16} className="text-gold" />
                  {property.bathrooms} {t.property.bathrooms}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={16} className="text-gold" />
                  {t.property.maxGuests}: {property.maxGuests}
                </span>
                {property.sleeping && (
                  <span className="flex items-center gap-1.5">
                    <MoonStar size={16} className="text-gold" />
                    {property.sleeping}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl text-navy mb-4">{t.property.overview}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {lang === 'es' && property.descriptionEs ? property.descriptionEs : property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl text-navy mb-5">{t.property.amenities}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(lang === 'es' && property.amenitiesEs ? property.amenitiesEs : property.amenities).map(a => (
                  <div key={a} className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check size={14} className="text-gold flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Availability calendar */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl text-navy mb-4">{t.property.availability}</h2>
              <div className="bg-gray-50 rounded-2xl p-5">
                <Calendar
                  bookedRanges={bookedRanges}
                  lang={lang}
                  monthsToShow={2}
                />
              </div>
            </div>

            {/* WhatsApp inquiry */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#20bb5a] transition-colors text-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.property.inquire}
            </a>
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <BookingWidget property={property} />
          </div>
        </div>
      </section>

      {/* Similar properties */}
      <SimilarProperties current={property} t={t} />
    </div>
  )
}

function SimilarProperties({ current, t }) {
  const similar = properties
    .filter(p => p.slug !== current.slug && p.location === current.location)
    .slice(0, 2)

  if (similar.length === 0) return null

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-navy mb-8">More in {current.location}</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {similar.map(p => (
            <Link key={p.slug} href={`/properties/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-navy">{p.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{p.bedrooms} bd · {p.bathrooms} ba · {p.maxGuests} guests</p>
                <p className="text-navy font-bold mt-2">${p.nightlyRate.toLocaleString()} <span className="text-gray-400 text-xs font-normal">{t.properties.nightlyRate}</span></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
