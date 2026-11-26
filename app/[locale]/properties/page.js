'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { SlidersHorizontal, CalendarDays, X, Search } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import PropertyCard from '@/components/PropertyCard'
import Calendar from '@/components/Calendar'
import properties from '@/data/properties'
import { getCurrentRate } from '@/lib/currentRate'

const LOCATIONS = ['Punta Mita', 'Bucerías', 'La Cruz de Huanacaxtle']
const MIN_PRICE = 90
const MAX_PRICE = 1000

// Signature villas always lead the list (they're what the ads promote), in
// this order. Everything else follows by nightly price, highest first.
// "New" units keep their NEW label but no longer jump to the top.
const SIGNATURE = ['palmas-8', 'villa-girasol', 'terrazas-g32', 'villa-turquesa']
const signatureRank = p => {
  const i = SIGNATURE.indexOf(p.slug)
  return i === -1 ? SIGNATURE.length : i
}

function isAvailable(slug, checkIn, checkOut, availability) {
  if (!checkIn || !checkOut) return true
  const booked = availability[slug] || []
  return !booked.some(({ checkIn: bIn, checkOut: bOut }) =>
    checkIn < bOut && checkOut > bIn
  )
}

function PropertiesContent() {
  const { t, lang, rates } = useLanguage()
  // Same live price the cards show, so filtering/sorting matches what guests see.
  const rateOf = p => getCurrentRate(rates, p.slug, p.nightlyRate)
  const searchParams = useSearchParams()

  const [activeLocation, setActiveLocation] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [availability, setAvailability] = useState(null)
  const [loadingAvail, setLoadingAvail] = useState(false)
  const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false)
  const [calOpen, setCalOpen] = useState(false)
  const calRef = useRef(null)

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
    // Guests from the homepage search → "fits at least N guests"
    const guestsParam = Number(searchParams.get('guests')) || 0
    if (checkIn && checkOut) {
      const next = { ...draft, checkIn, checkOut, minGuests: guestsParam }
      setDraft(next)
      setFilters(next)
      setMobileHeaderHidden(true) // phones: go straight to the available villas
      fetchAvailability()
    }
  }, [searchParams])

  async function fetchAvailability() {
    setLoadingAvail(true)
    try {
      const res = await fetch('/api/availability', { cache: 'no-store' })
      const data = await res.json()
      setAvailability(data)
    } catch {
      setAvailability({})
    } finally {
      setLoadingAvail(false)
    }
  }

  // Close calendar on outside click
  useEffect(() => {
    function handleClick(e) {
      if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false)
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

  async function applyFilters() {
    if (draft.checkIn && draft.checkOut && !availability) {
      await fetchAvailability()
    }
    setFilters({ ...draft })
    setShowFilters(false)
    setCalOpen(false)
    setMobileHeaderHidden(true)
  }

  function resetFilters() {
    const defaults = { maxPrice: MAX_PRICE, minBeds: 0, minGuests: 0, checkIn: '', checkOut: '' }
    setDraft(defaults)
    setFilters(defaults)
    setAvailability(null)
    setMobileHeaderHidden(false)
    setCalOpen(false)
  }

  const filtersActive =
    filters.maxPrice < MAX_PRICE ||
    filters.minBeds > 0 ||
    filters.minGuests > 0 ||
    (filters.checkIn && filters.checkOut)

  const filtered = properties
    .filter(p => activeLocation === 'All' || p.location === activeLocation)
    .filter(p => filters.maxPrice >= MAX_PRICE || rateOf(p) <= filters.maxPrice)
    .filter(p => (p.bedrooms || 0) >= filters.minBeds)
    .filter(p => p.maxGuests >= filters.minGuests)
    .filter(p => !filters.checkIn || !filters.checkOut || !availability ||
      isAvailable(p.slug, filters.checkIn, filters.checkOut, availability))
    .sort((a, b) => (signatureRank(a) - signatureRank(b)) || (rateOf(b) - rateOf(a)))

  const dateFilterActive = filters.checkIn && filters.checkOut && availability

  const L = lang === 'es'
    ? { eyebrow: 'La colección', dates: 'Fechas', add: 'Elegir fechas', search: 'Buscar', searching: 'Buscando…', filters: 'Filtros', clear: 'Borrar', price: 'Precio por noche', beds: 'Recámaras', guests: 'Huéspedes', any: 'Todas', pickIn: 'Elige llegada y luego salida', available: n => `${n} ${n === 1 ? 'villa disponible' : 'villas disponibles'}`, none: 'No hay villas disponibles en esas fechas', tryOther: 'Prueba otras fechas o ajusta los filtros', clearFilters: 'Borrar filtros', forGuests: n => `· ${n}+ huéspedes` }
    : { eyebrow: 'The collection', dates: 'Dates', add: 'Add dates', search: 'Search', searching: 'Searching…', filters: 'Filters', clear: 'Clear', price: 'Price per night', beds: 'Bedrooms', guests: 'Guests', any: 'Any', pickIn: 'Choose check-in, then check-out', available: n => `${n} ${n === 1 ? 'villa available' : 'villas available'}`, none: 'No villas available for those dates', tryOther: 'Try different dates or adjust your filters', clearFilters: 'Clear filters', forGuests: n => `· ${n}+ guests` }

  const guestOptions = [0, 2, 4, 6, 8, 10, 12]
  if (draft.minGuests && !guestOptions.includes(draft.minGuests)) guestOptions.push(draft.minGuests)
  guestOptions.sort((a, b) => a - b)

  const chip = active => `whitespace-nowrap px-4 py-2 text-[12px] uppercase tracking-[0.14em] border transition-colors ${
    active ? 'bg-navy text-bone border-navy' : 'bg-transparent text-navy/70 border-navy/20 hover:border-navy hover:text-navy'
  }`

  return (
    <>
      {/* Header — compact on phones so the date search is the first thing you see */}
      <div className={`bg-linen pt-24 pb-8 md:pt-36 md:pb-14 px-5 ${mobileHeaderHidden ? 'hidden sm:block' : ''}`}>
        <div className="max-w-7xl mx-auto sm:px-1 lg:px-5">
          <p className="eyebrow mb-3 hidden md:block">{L.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-7xl text-navy leading-none">{t.properties.title}</h1>
          <p className="text-navy/60 max-w-xl mt-3 md:mt-5 text-[15px] hidden sm:block">{t.properties.subtitle}</p>

          {/* Date search */}
          <div className="mt-6 md:mt-10 max-w-2xl">
            <div className="relative" ref={calRef}>
              <div className="bg-bone border border-navy/15 flex items-stretch">
                <button
                  type="button"
                  className="flex-1 text-left px-4 md:px-6 py-3.5 md:py-4"
                  onClick={() => setCalOpen(o => !o)}
                >
                  <span className="block text-[10px] uppercase tracking-label text-navy/50 mb-0.5">{L.dates}</span>
                  {draft.checkIn && draft.checkOut ? (
                    <span className="font-serif text-lg md:text-xl text-navy">{draft.checkIn} → {draft.checkOut}</span>
                  ) : draft.checkIn ? (
                    <span className="font-serif text-lg md:text-xl text-navy">{draft.checkIn} → <span className="text-navy/40">…</span></span>
                  ) : (
                    <span className="font-serif text-lg md:text-xl text-navy/45">{L.add}</span>
                  )}
                </button>
                {(draft.checkIn || draft.checkOut) && (
                  <button onClick={e => { e.stopPropagation(); setDraft(d => ({ ...d, checkIn: '', checkOut: '' })) }}
                    className="px-3 text-navy/40 hover:text-navy" aria-label="Clear dates">
                    <X size={15} strokeWidth={1.5} />
                  </button>
                )}
                <button
                  onClick={e => { e.stopPropagation(); applyFilters() }}
                  disabled={!draft.checkIn || !draft.checkOut || loadingAvail}
                  className="bg-navy text-bone text-[12px] uppercase tracking-[0.18em] px-5 md:px-8 hover:bg-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loadingAvail ? L.searching : L.search}
                </button>
              </div>

              {calOpen && (
                <div
                  className="absolute left-0 right-0 md:right-auto md:w-[380px] top-full mt-2 z-40 bg-bone border border-navy/10 shadow-xl p-5"
                  onClick={e => e.stopPropagation()}
                  onTouchEnd={e => e.stopPropagation()}
                >
                  <Calendar
                    bookedRanges={[]}
                    checkIn={draft.checkIn}
                    checkOut={draft.checkOut}
                    onChange={(ci, co) => {
                      setDraft(d => ({ ...d, checkIn: ci, checkOut: co }))
                      if (ci && co) setCalOpen(false)
                    }}
                    lang={lang}
                    monthsToShow={1}
                    minNights={2}
                  />
                  <p className="text-xs text-navy/50 mt-3 text-center">{L.pickIn}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Location tabs + filter toggle */}
      <div className={`md:sticky md:top-[84px] z-30 bg-bone/95 backdrop-blur-sm border-b border-navy/10 ${mobileHeaderHidden ? "mt-[77px] sm:mt-0" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-4 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {['All', ...LOCATIONS].map(loc => (
            <button key={loc} onClick={() => setActiveLocation(loc)} className={chip(activeLocation === loc)}>
              {loc === 'All' ? t.properties.filterAll : loc}
            </button>
          ))}

          <div className="ml-auto flex-shrink-0 flex items-center gap-2 pl-2">
            {filtersActive && (
              <button onClick={resetFilters} className="flex items-center gap-1 text-[12px] text-navy/50 hover:text-navy transition-colors px-2 py-1">
                <X size={13} strokeWidth={1.5} /> {L.clear}
              </button>
            )}
            <button onClick={() => setShowFilters(v => !v)} className={`${chip(showFilters || filtersActive)} flex items-center gap-2`}>
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              {L.filters}
              {filtersActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
            </button>
          </div>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="border-t border-navy/10 bg-linen">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-8">
              <div className="grid sm:grid-cols-3 gap-10 items-start">
                {/* Max price */}
                <div>
                  <label className="block text-[10px] uppercase tracking-label text-navy/55 mb-3">
                    {L.price}
                    <span className="ml-2 font-serif normal-case tracking-normal text-base text-navy">${draft.maxPrice >= MAX_PRICE ? '1,000+' : draft.maxPrice.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={50}
                    value={draft.maxPrice}
                    onChange={e => setDraft(d => ({ ...d, maxPrice: Number(e.target.value) }))}
                    className="w-full accent-navy"
                  />
                  <div className="flex justify-between text-xs text-navy/45 mt-1">
                    <span>$90</span>
                    <span>$1,000+</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-[10px] uppercase tracking-label text-navy/55 mb-3">{L.beds}</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {[0, 1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => setDraft(d => ({ ...d, minBeds: n }))}
                        className={`min-w-10 h-10 px-2 text-sm border transition-colors ${draft.minBeds === n ? 'bg-navy text-bone border-navy' : 'bg-bone text-navy/70 border-navy/15 hover:border-navy'}`}>
                        {n === 0 ? L.any : n + '+'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[10px] uppercase tracking-label text-navy/55 mb-3">{L.guests}</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {guestOptions.map(n => (
                      <button key={n} onClick={() => setDraft(d => ({ ...d, minGuests: n }))}
                        className={`min-w-10 h-10 px-2 text-sm border transition-colors ${draft.minGuests === n ? 'bg-navy text-bone border-navy' : 'bg-bone text-navy/70 border-navy/15 hover:border-navy'}`}>
                        {n === 0 ? L.any : n + '+'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 justify-end">
                <button onClick={applyFilters} disabled={loadingAvail} className="btn-primary">
                  <Search size={14} strokeWidth={1.5} />
                  {loadingAvail ? L.searching : L.search}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-10 md:py-16">
        {dateFilterActive && (
          <div className="flex items-center gap-3 mb-10 border-y border-navy/15 py-4 text-[15px] text-navy">
            <span className="font-serif text-xl">{L.available(filtered.length)}</span>
            <span className="text-navy/55 text-sm">{filters.checkIn} → {filters.checkOut} {filters.minGuests > 0 ? L.forGuests(filters.minGuests) : ''}</span>
            <button onClick={resetFilters} className="ml-auto text-navy/40 hover:text-navy" aria-label="Clear">
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-3xl text-navy mb-3">
              {dateFilterActive ? L.none : t.properties.noProperties}
            </p>
            <p className="text-navy/55 text-sm mb-6">{L.tryOther}</p>
            <button onClick={resetFilters} className="btn-outline">{L.clearFilters}</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filtered.map(p => (
              <PropertyCard key={p.slug} property={p} checkIn={filters.checkIn} checkOut={filters.checkOut} guests={filters.minGuests} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bone" />}>
      <PropertiesContent />
    </Suspense>
  )
}
