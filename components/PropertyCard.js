'use client'

import Image from 'next/image'
import Link from '@/components/LocaleLink'
import { useLanguage } from '@/lib/LanguageContext'
import { getCurrentRate } from '@/lib/currentRate'
import { calculateStayPrice } from '@/lib/pricingEngine'

export default function PropertyCard({ property, checkIn, checkOut, guests }) {
  const { t, lang, formatPrice, rates } = useLanguage()
  const displayRate = getCurrentRate(rates, property.slug, property.nightlyRate)

  const stay = (checkIn && checkOut)
    ? calculateStayPrice(rates, property.slug, checkIn, checkOut, property.nightlyRate, property.cleaningFee)
    : null

  const href = checkIn && checkOut
    ? `/properties/${property.slug}?checkIn=${checkIn}&checkOut=${checkOut}${guests ? `&guests=${guests}` : ''}`
    : `/properties/${property.slug}`

  const specs = [
    property.studio ? (lang === 'es' ? 'Estudio' : 'Studio') : `${property.bedrooms} ${t.properties.bedrooms}`,
    `${property.bathrooms} ${t.properties.bathrooms}`,
    `${property.maxGuests} ${t.properties.guests}`,
  ]

  return (
    <Link href={href} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden bg-sand">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
        />
        {property.isNew && (
          <span className="absolute top-4 left-4 bg-bone text-navy text-[10px] uppercase tracking-label px-2.5 py-1">
            {lang === 'es' ? 'Nuevo' : 'New'}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="pt-5">
        <p className="eyebrow mb-2">{property.location}</p>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[26px] leading-tight text-navy group-hover:text-gold transition-colors">
            {property.name}
          </h3>
          <div className="text-right whitespace-nowrap">
            {stay ? (
              <>
                <span className="font-serif text-xl text-navy">{formatPrice(stay.averageRate ?? displayRate)}</span>
                <span className="text-[11px] text-navy/50"> / {lang === 'es' ? 'noche' : 'night'}</span>
                <span className="block text-[12px] text-navy/60 mt-0.5">
                  {formatPrice(stay.total)} total · {stay.nights} {lang === 'es' ? 'noches' : 'nights'}
                </span>
              </>
            ) : (
              <>
                <span className="text-[11px] text-navy/50 mr-1">{t.properties.from ?? 'From'}</span>
                <span className="font-serif text-xl text-navy">{formatPrice(displayRate)}</span>
              </>
            )}
          </div>
        </div>
        <p className="text-[13px] text-navy/55 mt-2">
          {specs.join('  ·  ')}
        </p>
      </div>
    </Link>
  )
}
