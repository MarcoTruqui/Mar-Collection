'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Search, SlidersHorizontal, CalendarDays, X } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import PropertyCard from '@/components/PropertyCard'
import properties from '@/data/properties'

const LOCATIONS = ['Punta Mita', 'Bucerías', 'La Cruz de Huanacaxtle']
const MIN_PRICE = 90
const MAX_PRICE = 1000
const today = new Date().toISOString().split('T')[0]

function isAvailable(slug, checkIn, checkOut, availability) {
  if (!checkIn || !checkOut) return true
  const booked = availability[slug] || []
  return !booked.some(({ checkIn: bIn, checkOut: bOut }) =>
    checkIn < bOut && checkOut > bIn
  )
}

function PropertiesContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()

  const [activeLocation, setActiveLocation] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [availability, setAvailability] = useState(null)
  const [loadingAvail, setLoadingAvail] = useState(false)
  const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // Draft (before Search is clicked)
  const [draft, setDraft] = useState({
    maxPrice: MAX_PRICE,
    minBeds: 0,
    minGuests: 0,
    checkIn: '',
    checkOut: '',
  })

  // Applied filters
  const [filters, setFilters] = useState(draft)

  // Read URL params on load
  useEffect(() => {
    const loc     = searchParams.get('location')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    if (loc && LOCATIONS.includes(loc)) setActiveLocation(loc)
    if (checkIn && checkOut) {
      const next = { ...draft, checkIn, checkOut }
      setDraft(next)
      setFilters(next)
      setShowFilters(true)
      fetchAvailability()
    }
  }, [searchParams])

  async function fetchAvailability() {
    setLoadingAvail(true)
    try {
      const res = await fetch('/api/availability')
      const data = await res.json()
      setAvailability(data)
    } catch {
      setAvailability({})
    } finally {
      setLoadingAvail(false)
    }
  }

  async function applyFilters() {
    if (draft.checkIn && draft.checkOut && !availability) {
      await fetchAvailability()
    }
    setFilters({ ...draft })
    setShowFilters(false)
    setMobileHeaderHidden(true)
    setShowMobileSearch(false)
  }

  function resetFilters() {
    const defaults = { maxPrice: MAX_PRICE, minBeds: 0, minGuests: 0, checkIn: '', checkOut: '' }
    setDraft(defaults)
    setFilters(defaults)
    setAvailability(null)
    setMobileHeaderHidden(false)
    setShowMobileSearch(false)
  }

  const filtersActive =
    filters.maxPrice < MAX_PRICE ||
    filters.minBeds > 0 ||
    filters.minGuests > 0 ||
    (filters.checkIn && filters.checkOut)

  const filtered = properties
    .filter(p => activeLocation === 'All' || p.location === activeLocation)
    .filter(p => filters.maxPrice >= MAX_PRICE || p.nightlyRate <= filters.maxPrice)
    .filter(p => (p.bedrooms || 0) >= filters.minBeds)
    .filter(p => p.maxGuests >= filters.minGuests)
    .filter(p => !filters.checkIn || !filters.checkOut || !availability ||
      isAvailable(p.slug, filters.checkIn, filters.checkOut, availability))
    .sort((a, b) => b.nightlyRate - a.nightlyRate)

  const dateFilterActive = filters.checkIn && filters.checkOut && availability

  return (
    <>
      {/* Header — hidden on mobile after search */}
      <div className={`bg-navy pt-32 pb-16 text-center px-4 ${mobileHeaderHidden ? 'hidden sm:block' : ''}`}>
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Our Portfolio</p>
        <h1 className="font-serif text-5xl text-white mb-4">{t.properties.title}</h1>
        <p className="text-white/60 max-w-xl mx-auto">{t.properties.subtitle}</p>

        {/* Date search bar in header */}
        <div className="mt-10 max-w-xl mx-auto px-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
            <div className="flex-1">
              <label className="block text-white/60 text-xs mb-1.5 text-left tracking-wide">Check-in</label>
              <input
                type="date"
                min={today}
                value={draft.checkIn}
                onChange={e => setDraft(d => ({ ...d, checkIn: e.target.value, checkOut: d.checkOut && e.target.value >= d.checkOut ? '' : d.checkOut }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-white/60 text-xs mb-1.5 text-left tracking-wide">Check-out</label>
              <input
                type="date"
                min={draft.checkIn || today}
                value={draft.checkOut}
                onChange={e => setDraft(d => ({ ...d, checkOut: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold transition-colors [color-scheme:dark]"
              />
            </div>
            <button
              onClick={applyFilters}
              disabled={!draft.checkIn || !draft.checkOut || loadingAvail}
              className="flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
            >
              <Search size={15} />
              {loadingAvail ? 'Searching...' : 'Check Availability'}
            </button>
          </div>
          {dateFilterActive && (
            <p className="text-white/50 text-xs mt-2">
              Showing {filtered.length} available {filtered.length === 1 ? 'property' : 'properties'} for {filters.checkIn} → {filters.checkOut}
            </p>
          )}
        </div>
      </div>

      {/* Mobile search overlay — shown when magnifying glass tapped after search */}
      {mobileHeaderHidden && showMobileSearch && (
        <div className="sm:hidden bg-navy px-4 pt-20 pb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col gap-3">
            <div>
              <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Check-in</label>
              <input
                type="date"
                min={today}
                value={draft.checkIn}
                onChange={e => setDraft(d => ({ ...d, checkIn: e.target.value, checkOut: d.checkOut && e.target.value >= d.checkOut ? '' : d.checkOut }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Check-out</label>
              <input
                type="date"
                min={draft.checkIn || today}
                value={draft.checkOut}
                onChange={e => setDraft(d => ({ ...d, checkOut: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold transition-colors [color-scheme:dark]"
              />
            </div>
            <button
              onClick={applyFilters}
              disabled={!draft.checkIn || !draft.checkOut || loadingAvail}
              className="flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={15} />
              {loadingAvail ? 'Searching...' : 'Check Availability'}
            </button>
          </div>
        </div>
      )}

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

          <div className="ml-auto flex-shrink-0 flex items-center gap-2">
            {mobileHeaderHidden && (
              <button
                onClick={() => setShowMobileSearch(v => !v)}
                className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-navy hover:border-navy transition-colors"
              >
                <Search size={15} />
              </button>
            )}
            {filtersActive && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-navy transition-colors px-2 py-1"
              >
                <X size={13} /> Clear all
              </button>
            )}
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
              {filtersActive && <span className="w-2 h-2 rounded-full bg-gold" />}
            </button>
          </div>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="border-t border-gray-100 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">

                {/* Dates */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide font-medium flex items-center gap-1">
                    <CalendarDays size={13} /> Dates
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-400 mb-1">Check-in</p>
                      <input
                        type="date"
                        min={today}
                        value={draft.checkIn}
                        onChange={e => setDraft(d => ({ ...d, checkIn: e.target.value, checkOut: d.checkOut && e.target.value >= d.checkOut ? '' : d.checkOut }))}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-400 mb-1">Check-out</p>
                      <input
                        type="date"
                        min={draft.checkIn || today}
                        value={draft.checkOut}
                        onChange={e => setDraft(d => ({ ...d, checkOut: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>
                  {draft.checkIn && draft.checkOut && (
                    <p className="text-[10px] text-gold mt-1">Will check real availability on Search</p>
                  )}
                </div>

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

                {/* Bedrooms */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide font-medium">Bedrooms</label>
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

                {/* Guests */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide font-medium">Guests</label>
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
                <button
                  onClick={applyFilters}
                  disabled={loadingAvail}
                  className="flex items-center gap-2 bg-navy text-white text-sm font-semibold px-8 py-2.5 rounded-full hover:bg-gold hover:text-navy transition-all disabled:opacity-50"
                >
                  <Search size={15} />
                  {loadingAvail ? 'Checking availability...' : 'Search'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {dateFilterActive && (
          <div className="flex items-center gap-2 mb-8 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 text-sm text-navy">
            <CalendarDays size={16} className="text-gold flex-shrink-0" />
            <span>
              Showing <strong>{filtered.length}</strong> available {filtered.length === 1 ? 'property' : 'properties'} for <strong>{filters.checkIn}</strong> → <strong>{filters.checkOut}</strong>
            </span>
            <button onClick={resetFilters} className="ml-auto text-gray-400 hover:text-navy">
              <X size={15} />
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <CalendarDays size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium mb-2">
              {dateFilterActive ? 'No properties available for those dates' : t.properties.noProperties}
            </p>
            <p className="text-gray-400 text-sm mb-6">Try different dates or adjust your filters</p>
            <button onClick={resetFilters} className="text-navy text-sm font-medium underline">
              Clear filters
            </button>
          </div>
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
