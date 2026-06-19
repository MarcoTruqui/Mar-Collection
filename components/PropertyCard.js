'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Bed, Bath } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { getCurrentRate } from '@/lib/currentRate'

export default function PropertyCard({ property }) {
  const { t, lang, formatPrice } = useLanguage()
  const displayRate = getCurrentRate(property.slug, property.nightlyRate)

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        <span className="absolute top-3 left-3 bg-navy/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <MapPin size={11} />
          {property.location}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-serif text-xl text-navy mb-1">{property.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {lang === 'es' && property.shortDescriptionEs ? property.shortDescriptionEs : property.shortDescription}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
          <span className="flex items-center gap-1">
            <Bed size={13} /> {property.studio ? 'Studio' : `${property.bedrooms} ${t.properties.bedrooms}`}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} /> {property.bathrooms} {t.properties.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} /> {property.maxGuests} {t.properties.guests}
          </span>
        </div>

        {/* Rate + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">{t.properties.from ?? 'From'}</span>
            <span className="text-2xl font-bold text-navy">{formatPrice(displayRate)}</span>
            <span className="text-gray-400 text-xs ml-1">{t.properties.nightlyRate}</span>
          </div>
          <Link
            href={`/properties/${property.slug}`}
            className="bg-navy text-white text-sm px-4 py-2 rounded-lg hover:bg-gold hover:text-navy transition-colors font-medium"
          >
            {t.properties.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  )
}
