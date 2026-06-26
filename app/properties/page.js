'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import PropertyCard from '@/components/PropertyCard'
import properties from '@/data/properties'

const LOCATIONS = ['Punta Mita', 'Bucerías', 'La Cruz de Huanacaxtle']

const MIN_PRICE = 90
const MAX_PRICE = 1000
const MAX_GUESTS = Math.max(...properties.map(p => p.maxGuests))
const MAX_BEDS = Math.max(...properties.map(p => p.bedrooms || 0))

function PropertiesContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()

  const [activeLocation, setActiveLocation] = useState('All')

  // Filter state (pending — applied on Search click)
  const [draft, setDraft] = useState({
    maxPrice: MAX_PRICE,
    minBeds: 0,
    minGuests: 0,
  })
  // Applied filter state
  const [filters, setFilters] = useState(draft)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loc = searchParams.get('location')
    if (loc && LOCATIONS.includes(loc)) setActiveLocation(loc)
  }, [searchParams])

  function applyFilters() {
    setFilters({ ...draft })
    setShowFilters(false)
  }

  function resetFilters() {
    const defaults = { maxPrice: MAX_PRICE, minBeds: 0, minGuests: 0 }
    setDraft(defaults)
    setFilters(defaults)
  }

  const filtered = properties
    .filter(p => activeLocation === 'All' || p.location === activeLocation)
    .filter(p => filters.maxPrice >= MAX_PRICE || p.nightlyRate <= filters.maxPrice)
    .filter(p => (p.bedrooms || 0) >= filters.minBeds)
    .filter(p => p.maxGuests >= filters.minGuests)
    .sort((a, b) => b.nightlyRate - a.nightlyRate)

  const filtersActive =
    filters.maxPrice < MAX_PRICE || filters.minBeds > 0 || filters.minGuests > 0

  return (
    <>
      {/* Header */}
      <div className="bg-navy pt-32 pb-16 text-center px-4">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Our Portfolio</p>
        <h1 className="font-serif text-5xl text-white mb-4">{t.properties.title}</h1>
        <p className="text-white/60 max-w-xl mx-auto">{t.properties.subtitle}</p>
      </div>

      {/* Location tabs + filter toggle */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 overflow-x-auto scrollbar-none">
          {['All', ...LOCATIONS].map(loc => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeLocation === loc
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {loc === 'All' ? t.properties.filterAll : loc}
            </button>
          ))}

          <div className="ml-auto flex-shrink-0">
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                showFilters || filtersActive
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {filtersActive && (
                <span className="w-2 h-2 rounded-full bg-gold" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="border-t border-gray-100 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid sm:grid-cols-3 gap-8 items-end">

                {/* Max price */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide font-medium">
                    Price per Night
                    <span className="ml-2 text-navy font-bold">${draft.maxPrice >= MAX_PRICE ? '1,000+' : draft.maxPrice.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={50}
                    value={draft.maxPrice}
                    onChange={e => setDraft(d => ({ ...d, maxPrice: Number(e.target.value) }))}
                    className="w-full accent-gold"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$90</span>
                    <span>$1,000+</span>
                  </div>
                </div>

                {/* Min bedrooms */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide font-medium">
                    Bedrooms
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        onClick={() => setDraft(d => ({ ...d, minBeds: n }))}
                        className={`w-10 h-10 rounded-xl text-sm font-medium border transition-all ${
                          draft.minBeds === n
                            ? 'bg-navy text-white border-navy'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-navy'
                        }`}
                      >
                        {n === 0 ? 'Any' : n + '+'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Min guests */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide font-medium">
                    Guests
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 2, 4, 6, 8, 10].map(n => (
                      <button
                        key={n}
                        onClick={() => setDraft(d => ({ ...d, minGuests: n }))}
                        className={`w-10 h-10 rounded-xl text-sm font-medium border transition-all ${
                          draft.minGuests === n
                            ? 'bg-navy text-white border-navy'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-navy'
                        }`}
                      >
                        {n === 0 ? 'Any' : n + '+'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6 justify-end">
                {filtersActive && (
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 text-sm text-gray-500 hover:text-navy transition-colors font-medium"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={applyFilters}
                  className="flex items-center gap-2 bg-navy text-white text-sm font-semibold px-8 py-2.5 rounded-full hover:bg-gold hover:text-navy transition-all"
                >
                  <Search size={15} />
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 mb-4">{t.properties.noProperties}</p>
            <button onClick={resetFilters} className="text-navy text-sm font-medium underline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(p => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </>
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
