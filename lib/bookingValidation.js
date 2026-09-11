import properties from '@/data/properties'
import { calculateStayPrice } from '@/lib/pricingEngine'
import { fetchBookedRanges, rangeIsBooked } from '@/lib/availability'
import { getPricingConfig } from '@/lib/pricingSheet'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

class BookingValidationError extends Error {}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

// Re-derives price and validity server-side from just (slug, checkIn, checkOut, guests) —
// nothing about price is ever trusted from the client, so a guest can't tamper
// with the amount they're charged by editing the request body in devtools.
export async function resolveBooking({ slug, checkIn, checkOut, guests }) {
  const property = properties.find(p => p.slug === slug)
  if (!property) throw new BookingValidationError('Unknown property.')

  if (!DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) {
    throw new BookingValidationError('Invalid dates.')
  }
  if (checkIn < todayStr()) {
    throw new BookingValidationError('Check-in date is in the past.')
  }
  if (checkOut <= checkIn) {
    throw new BookingValidationError('Check-out must be after check-in.')
  }

  const guestCount = Number(guests) || 1
  if (guestCount < 1 || guestCount > property.maxGuests) {
    throw new BookingValidationError(`This property allows a maximum of ${property.maxGuests} guests.`)
  }

  const { rates, mxnRate } = await getPricingConfig()

  const stay = calculateStayPrice(
    rates,
    property.slug,
    checkIn,
    checkOut,
    property.nightlyRate,
    property.cleaningFee,
  )
  if (!stay || stay.nights < 2) {
    throw new BookingValidationError('Minimum stay is 2 nights.')
  }

  const bookedRanges = await fetchBookedRanges()
  if (rangeIsBooked(checkIn, checkOut, bookedRanges[slug] || [])) {
    throw new BookingValidationError('These dates were just booked. Please pick different dates.')
  }

  return { property, stay, guests: guestCount, mxnRate }
}

export { BookingValidationError }
