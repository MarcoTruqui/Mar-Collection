'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import PropertyCard from '@/components/PropertyCard'
import properties from '@/data/properties'

const LOCATIONS = ['Punta Mita', 'Bucerías', 'La Cruz de Huanacaxtle']
const COMING_SOON = []

function PropertiesContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [activeLocation, setActiveLocation] = useState('All')

  useEffect(() => {
    const loc = searchParams.get('location')
    if (loc && LOCATIONS.includes(loc)) setActiveLocation(loc)
  }, [searchParams])

  const isComingSoon = COMING_SOON.includes(activeLocation)
  const filtered = activeLocation === 'All'
    ? properties
    : properties.filter(p => p.location === activeLocation)

  return (
    <>
      {/* Header */}
      <div className="bg-navy pt-32 pb-16 text-center px-4">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Our Portfolio</p>
        <h1 className="font-serif text-5xl text-white mb-4">{t.properties.title}</h1>
        <p className="text-white/60 max-w-xl mx-auto">{t.properties.subtitle}</p>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-2 overflow-x-auto scrollbar-none">
          {['All', ...LOCATIONS].map(loc => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeLocation === loc
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {loc === 'All' ? t.properties.filterAll : loc}
              {COMING_SOON.includes(loc) && (
                <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full font-semibold">
                  Soon
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Coming Soon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isComingSoon ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🌊</span>
            </div>
            <h3 className="font-serif text-3xl text-navy mb-3">Coming Soon</h3>
            <p className="text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
              We're curating exceptional properties in La Cruz de Huanacaxtle. Check back soon or contact us — we may have an unlisted property that's perfect for you.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523221355153'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-navy text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-colors"
            >
              Ask Us Directly
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">{t.properties.noProperties}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(p => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <PropertiesContent />
    </Suspense>
  )
}
