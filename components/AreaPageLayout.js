import Link from '@/components/LocaleLink'
import Image from 'next/image'
import properties from '@/data/properties'
import PropertyCard from '@/components/PropertyCard'

const STRINGS = {
  en: {
    availableNow: 'Available Now',
    villasAndProperties: 'Villas & Properties',
    readyTitle: 'Ready to Book Your Stay?',
    readyBody: 'Browse live availability across all 14 MAR Collection villas and book direct — no third-party platform fees.',
    viewAll: 'View All Properties',
  },
  es: {
    availableNow: 'Disponible Ahora',
    villasAndProperties: 'Villas y Propiedades',
    readyTitle: '¿Listo para Reservar tu Estadía?',
    readyBody: 'Consulta disponibilidad en tiempo real de las 14 villas de MAR Collection y reserva directo — sin comisiones de plataformas externas.',
    viewAll: 'Ver Todas las Propiedades',
  },
}

export default function AreaPageLayout({ eyebrow, title, subtitle, heroImage, children, locationFilter, jsonLd, locale = 'en' }) {
  const t = STRINGS[locale] ?? STRINGS.en
  const areaProperties = locationFilter
    ? properties.filter(p => p.location === locationFilter)
    : null

  return (
    <div className="pt-20">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Hero */}
      <div className="bg-navy pt-24 pb-20 px-4 text-center relative overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 opacity-20">
            <Image src={heroImage} alt="" fill className="object-cover" sizes="100vw" priority />
          </div>
        )}
        <div className="relative z-10">
          <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">{eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-3xl mx-auto">{title}</h1>
          {subtitle && <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">{subtitle}</p>}
        </div>
      </div>

      {/* Body content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {children}
        </div>
      </section>

      {/* Properties in this area */}
      {areaProperties && areaProperties.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">{t.availableNow}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
                {locationFilter} {t.villasAndProperties}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {areaProperties.map(p => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy py-16 px-4 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">{t.readyTitle}</h2>
        <p className="text-white/50 mb-8 max-w-lg mx-auto">
          {t.readyBody}
        </p>
        <Link
          href="/properties"
          className="inline-block bg-gold text-navy font-semibold px-8 py-3 rounded-full hover:bg-gold/90 transition-colors"
        >
          {t.viewAll}
        </Link>
      </section>
    </div>
  )
}

export function Section({ title, children }) {
  return (
    <div>
      {title && <h2 className="font-serif text-2xl md:text-3xl text-navy mb-5">{title}</h2>}
      <div className="text-gray-600 leading-relaxed space-y-4">{children}</div>
    </div>
  )
}
