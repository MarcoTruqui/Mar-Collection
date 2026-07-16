'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAYS_EN   = ['Su','Mo','Tu','We','Th','Fr','Sa']
const DAYS_ES   = ['Do','Lu','Ma','Mi','Ju','Vi','Sá']

function toStr(d) { return d.toISOString().split('T')[0] }

function addMonths(year, month, n) {
  const d = new Date(year, month + n, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function getFirstDow(y, m)    { return new Date(y, m, 1).getDay() }

// Returns true if dateStr falls within any booked range (checkIn inclusive, checkOut exclusive)
// allowAsCheckout: if true, a date that is exactly a booking's checkIn is allowed (same-day turnover)
function isBookedDate(dateStr, bookedRanges, allowAsCheckout = false) {
  return bookedRanges.some(({ checkIn, checkOut }) => {
    if (allowAsCheckout && dateStr === checkIn) return false
    return dateStr >= checkIn && dateStr < checkOut
  })
}

// Returns true if any night in (start, end) is booked
function rangeContainsBooked(start, end, bookedRanges) {
  if (!start || !end || start >= end) return false
  const s = new Date(start + 'T12:00:00')
  const e = new Date(end   + 'T12:00:00')
  for (const d = new Date(s); d < e; d.setDate(d.getDate() + 1)) {
    if (isBookedDate(toStr(d), bookedRanges)) return true
  }
  return false
}

// ── Single month grid ─────────────────────────────────────────────────────────
function MonthGrid({ year, month, lang, bookedRanges, checkIn, checkOut, hovered, onDayClick, onDayHover, interactive, todayStr }) {
  const days     = getDaysInMonth(year, month)
  const firstDow = getFirstDow(year, month)
  const months   = lang === 'es' ? MONTHS_ES : MONTHS_EN
  const dayLabels = lang === 'es' ? DAYS_ES : DAYS_EN

  const rangeEnd = checkOut || (checkIn && hovered && hovered > checkIn ? hovered : null)

  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(toStr(new Date(year, month, d)))

  return (
    <div style={{ minWidth: 220 }}>
      <p style={{ textAlign: 'center', fontWeight: 500, fontSize: 14, marginBottom: 10, color: 'var(--color-text-primary)' }}>
        {months[month]} {year}
      </p>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {dayLabels.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 500, padding: '2px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((dateStr, i) => {
          if (!dateStr) return <div key={`e${i}`} />

          const isPast   = dateStr < todayStr
          const booked   = isBookedDate(dateStr, bookedRanges)
          const isStart  = dateStr === checkIn
          const isEnd    = dateStr === checkOut
          const inRange  = !!(checkIn && rangeEnd && dateStr > checkIn && dateStr < rangeEnd && !rangeContainsBooked(checkIn, rangeEnd, bookedRanges))
          const isToday  = dateStr === todayStr
          const isHov    = interactive && dateStr === hovered && !isPast && !booked

          // Color logic
          let bg      = 'transparent'
          let fg      = 'var(--color-text-primary)'
          let weight  = 400
          let cursor  = interactive ? 'pointer' : 'default'
          let border  = 'none'
          let opacity = 1

          if (isPast) {
            opacity = 0.3
            cursor = 'default'
          } else if (booked) {
            bg     = '#f3f4f6'
            fg     = '#d1d5db'
            cursor = interactive ? 'not-allowed' : 'default'
          } else if (isStart || isEnd) {
            bg     = '#0a1628'
            fg     = '#c9a84c'
            weight = 600
          } else if (inRange) {
            bg = '#dde6f0'
          } else if (isToday) {
            border = '1.5px solid #c9a84c'
          } else if (isHov) {
            bg = 'var(--color-background-secondary)'
          }

          return (
            <div
              key={dateStr}
              onClick={() => interactive && !isPast && onDayClick(dateStr)}
              onMouseEnter={() => interactive && onDayHover(dateStr)}
              onMouseLeave={() => interactive && onDayHover(null)}
              style={{
                position: 'relative',
                textAlign: 'center',
                fontSize: 13,
                padding: '6px 0',
                borderRadius: 6,
                background: bg,
                color: fg,
                fontWeight: weight,
                opacity,
                cursor,
                border,
                userSelect: 'none',
                transition: 'background 0.1s',
              }}
            >
              {/* Diagonal stripe overlay for booked dates */}
              {booked && (
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: 6, pointerEvents: 'none',
                  background: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, #e5e7eb 3px, #e5e7eb 4.5px)',
                  opacity: 0.7,
                }} />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>
                {new Date(dateStr + 'T12:00:00').getDate()}
              </span>
              {/* Gold dot for today */}
              {isToday && (
                <span style={{ display: 'block', width: 3, height: 3, borderRadius: '50%', background: '#c9a84c', margin: '1px auto 0', position: 'relative', zIndex: 1 }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Calendar component ───────────────────────────────────────────────────
// Props:
//   bookedRanges  — [{ checkIn, checkOut }] from /api/availability
//   checkIn       — selected check-in date string (YYYY-MM-DD) or ''
//   checkOut      — selected check-out date string or ''
//   onChange      — (checkIn, checkOut) => void  (omit for display-only mode)
//   lang          — 'en' | 'es'
//   monthsToShow  — how many month grids to show side by side (default 1)
//   minNights     — minimum stay (default 2)

export default function Calendar({ bookedRanges = [], checkIn = '', checkOut = '', onChange, lang = 'en', monthsToShow = 2, minNights = 2 }) {
  const interactive = !!onChange
  const todayDate   = new Date()
  const todayStr    = toStr(todayDate)

  const [viewYear,  setViewYear]  = useState(todayDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(todayDate.getMonth())
  const [hovered,   setHovered]   = useState(null)

  function prevMonth() {
    const { year, month } = addMonths(viewYear, viewMonth, -1)
    setViewYear(year); setViewMonth(month)
  }
  function nextMonth() {
    const { year, month } = addMonths(viewYear, viewMonth, 1)
    setViewYear(year); setViewMonth(month)
  }

  function handleDayClick(dateStr) {
    if (!interactive) return
    if (dateStr < todayStr) return

    // Selecting checkout: allow clicking on another booking's checkIn (same-day turnover)
    const selectingCheckout = !!(checkIn && !checkOut)
    if (isBookedDate(dateStr, bookedRanges, selectingCheckout)) return

    // No selection yet, or both already selected → start fresh
    if (!checkIn || (checkIn && checkOut)) {
      onChange(dateStr, '')
      return
    }

    // checkIn set, no checkOut yet
    if (dateStr <= checkIn) {
      onChange(dateStr, '')
      return
    }

    // Check minimum nights
    const nights = Math.round((new Date(dateStr) - new Date(checkIn)) / 86400000)
    if (nights < minNights) {
      onChange(checkIn, '')
      return
    }

    // Check no booked nights in the range (exclude the checkout date itself)
    if (rangeContainsBooked(checkIn, dateStr, bookedRanges)) {
      onChange(dateStr, '')
      return
    }

    onChange(checkIn, dateStr)
  }

  // Build visible months array
  const visibleMonths = []
  for (let i = 0; i < monthsToShow; i++) {
    visibleMonths.push(addMonths(viewYear, viewMonth, i))
  }

  return (
    <div>
      {/* Legend (display mode only) */}
      {!interactive && (
        <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-secondary)' }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: '#f3f4f6', border: '0.5px solid #e5e7eb', flexShrink: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, #e5e7eb 3px, #e5e7eb 4.5px)' }} />
            {lang === 'es' ? 'Ocupado' : 'Booked'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-secondary)' }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: '#fff', border: '0.5px solid #e5e7eb', flexShrink: 0 }} />
            {lang === 'es' ? 'Disponible' : 'Available'}
          </span>
        </div>
      )}

      {/* Nav + grids */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <button
          onClick={prevMonth}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: 'var(--color-text-secondary)', marginTop: 2, flexShrink: 0 }}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <div style={{ flex: 1, display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {visibleMonths.map(({ year, month }) => (
            <MonthGrid
              key={`${year}-${month}`}
              year={year}
              month={month}
              lang={lang}
              bookedRanges={bookedRanges}
              checkIn={checkIn}
              checkOut={checkOut}
              hovered={hovered}
              onDayClick={handleDayClick}
              onDayHover={setHovered}
              interactive={interactive}
              todayStr={todayStr}
            />
          ))}
        </div>

        <button
          onClick={nextMonth}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: 'var(--color-text-secondary)', marginTop: 2, flexShrink: 0 }}
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
