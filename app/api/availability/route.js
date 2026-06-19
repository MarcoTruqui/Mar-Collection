import { NextResponse } from 'next/server'

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSWaU6yrlhxjuejbroYlkzTYUKOTbhxzE1URtlJgKwB_t65aemd_M6neZ7euOxJ09lzoNcZ5Dt2g4Yq/pub?output=csv'

const MONTH_ES = {
  ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
  jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
}

// Maps sheet property names → site slugs (case-insensitive partial match)
const SLUG_MAP = [
  { match: ['girasol'],         slug: 'villa-girasol'   },
  { match: ['jaguar'],          slug: 'villa-jaguar'    },
  { match: ['turquesa'],        slug: 'villa-turquesa'  },
  { match: ['pelicano', 'pelícano'], slug: 'villa-pelicano' },
  { match: ['perico'],          slug: 'villa-perico'    },
  { match: ['zenzontle'],       slug: 'villa-zenzontle' },
  { match: ['palmas'],          slug: 'palmas-8'        },
  { match: ['terrazas', 'g-32', 'g32'], slug: 'terrazas-g32'  },
  { match: ['205'],             slug: 'zantamar-205b'   },
  { match: ['303'],             slug: 'zantamar-303d'   },
  { match: ['304'],             slug: 'zantamar-304d'   },
  { match: ['305'],             slug: 'zantamar-305d'   },
  { match: ['306'],             slug: 'zantamar-306d'   },
  { match: ['th7'],             slug: 'zantamar-th7'    },
]

function parseSpanishDate(str) {
  if (!str) return null
  // Format: 02-ene-2026
  const parts = str.trim().split('-')
  if (parts.length !== 3) return null
  const [day, monthStr, year] = parts
  const month = MONTH_ES[monthStr.toLowerCase()]
  if (month === undefined) return null
  const d = new Date(Date.UTC(parseInt(year), month, parseInt(day)))
  return d.toISOString().split('T')[0] // YYYY-MM-DD
}

function toSlug(propertyName) {
  const lower = propertyName.toLowerCase().trim()
  for (const entry of SLUG_MAP) {
    if (entry.match.some(m => lower.includes(m))) return entry.slug
  }
  return null
}

function parseCSV(text) {
  const lines = text.trim().split('\n')
  const result = {}

  for (const line of lines) {
    // Simple CSV split — handles quoted fields with commas
    const cols = []
    let current = ''
    let inQuote = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') { inQuote = !inQuote; continue }
      if (ch === ',' && !inQuote) { cols.push(current); current = ''; continue }
      current += ch
    }
    cols.push(current)

    const propertyRaw = cols[2]?.trim()
    const checkInRaw  = cols[3]?.trim()
    const checkOutRaw = cols[4]?.trim()
    const status      = cols[10]?.trim() ?? ''

    // Skip cancelled or blank status
    if (!propertyRaw || !checkInRaw || !checkOutRaw) continue
    if (status.toLowerCase().includes('cancelada')) continue

    const slug    = toSlug(propertyRaw)
    const checkIn  = parseSpanishDate(checkInRaw)
    const checkOut = parseSpanishDate(checkOutRaw)

    if (!slug || !checkIn || !checkOut) continue

    if (!result[slug]) result[slug] = []
    result[slug].push({ checkIn, checkOut })
  }

  return result
}

export async function GET() {
  try {
    const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } }) // cache 1 min
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
    const text = await res.text()
    const availability = parseCSV(text)
    return NextResponse.json(availability, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch (err) {
    console.error('Availability fetch error:', err)
    return NextResponse.json({}, { status: 500 })
  }
}
