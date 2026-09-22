// Mirrors the wording baked into each development's Google Doc contract
// template (used server-side by Apps Script to generate the actual signed
// PDF), so this on-screen preview always matches the real document the guest
// signs. If the .docx templates change, update this file to match.

export const DEV_INFO = {
  Zantamar: {
    locationEn: 'The Property is located within the Zantamar development, Calle 49 Sur (Coral) s/n, La Cruz de Huanacaxtle, Bahía de Banderas, Nayarit, C.P. 63732, México.',
    locationEs: 'La Propiedad se ubica dentro del desarrollo Zantamar, Calle 49 Sur (Coral) s/n, La Cruz de Huanacaxtle, Bahía de Banderas, Nayarit, C.P. 63732, México.',
    parkingEn: 'Parking is available outside the condominium grounds. Parking within the condominium grounds is only permitted if agreed upon in advance and in writing with TC Lux Homes.',
    parkingEs: 'El estacionamiento está disponible fuera de las instalaciones del condominio. El estacionamiento dentro de las instalaciones del condominio sólo se permite si se acuerda previamente y por escrito con TC Lux Homes.',
  },
  'La Vida': {
    locationEn: 'The Property is located within the La Vida development, Calle Lázaro Cárdenas 61, Bucerías Zona Dorada, Bahía de Banderas, Nayarit, C.P. 63732, México.',
    locationEs: 'La Propiedad se ubica dentro del desarrollo La Vida, Calle Lázaro Cárdenas 61, Bucerías Zona Dorada, Bahía de Banderas, Nayarit, C.P. 63732, México.',
    parkingEn: villa => `Guest may park only in the space(s) designated for ${villa} within the La Vida development.`,
    parkingEs: villa => `El Huésped sólo podrá estacionarse en los espacios designados para ${villa} dentro del desarrollo La Vida.`,
  },
  'Punta Mita': {
    locationEn: 'The Property is located in Punta Mita, Bahía de Banderas, Nayarit, México.',
    locationEs: 'La Propiedad se ubica en Punta Mita, Bahía de Banderas, Nayarit, México.',
    parkingEn: 'On-site parking is available for Guest’s use for the duration of the stay.',
    parkingEs: 'El estacionamiento en el sitio está disponible para uso del Huésped durante toda la estancia.',
  },
}

export function devLocation(group, lang) {
  const d = DEV_INFO[group]
  if (!d) return ''
  return lang === 'en' ? d.locationEn : d.locationEs
}

export function devParking(group, villa, lang) {
  const d = DEV_INFO[group]
  if (!d) return `Guest may park only in the space(s) designated for ${villa}.`
  const val = lang === 'en' ? d.parkingEn : d.parkingEs
  return typeof val === 'function' ? val(villa) : val
}

export function computeNights(checkin, checkout) {
  return Math.round((new Date(checkout) - new Date(checkin)) / 86400000)
}

export function computeDerived(checkin, checkout, price) {
  const nights = computeNights(checkin, checkout)
  const p = parseFloat(price) || 0
  const deposit = Math.round((p / 2) * 100) / 100
  const balance = p - deposit
  const due = new Date(checkin)
  due.setDate(due.getDate() - 15)
  const daysUntilCheckin = Math.round((new Date(checkin) - new Date()) / 86400000)
  const fullPaymentRequired = daysUntilCheckin < 15
  return { nights, deposit, balance, dueDate: due.toDateString(), fullPaymentRequired }
}

// Website bookings always pay 100% online at signing — never the deposit/
// balance schedule, regardless of how far out check-in is. See lib/appsScript
// isWebsiteBooking wiring on the Apps Script side (buildPaymentTermsText_)
// for the server-side twin of this logic.
export function paymentTermsText({ lang, currency, price, derived, isWebsiteBooking }) {
  if (isWebsiteBooking || derived.fullPaymentRequired) {
    return lang === 'en'
      ? `Because this booking was made and paid online, 100% of the total price (${currency} ${price}) is due in full upon signing this Agreement.`
      : `Debido a que esta reservación se realizó y pagó en línea, el Huésped deberá liquidar el 100% del precio total (${currency} ${price}) al momento de firmar este contrato.`
  }
  return lang === 'en'
    ? `A deposit of ${currency} ${derived.deposit} (50%) is due upon signing. The remaining balance of ${currency} ${derived.balance} is due by ${derived.dueDate} (15 days before check-in).`
    : `Un anticipo de ${currency} ${derived.deposit} (50%) se liquida a la firma. El saldo de ${currency} ${derived.balance} se liquida antes del ${derived.dueDate} (15 días antes del check-in).`
}

const CLAUSES = {
  en: [
    ['1. Use of Property', ({ group }) => `The Owner/Manager grants the Guest and accompanying party use of the Property strictly for residential vacation purposes. ${devLocation(group, 'en')}`],
    ['2. Rental Term', ({ checkin, checkout, derived }) => `Check-in: ${checkin} at 3:00 PM. Check-out: ${checkout} at 11:00 AM. Total nights: ${derived.nights}.`],
    ['3. Rental Price & Payment Terms', ({ currency, price, derived, isWebsiteBooking }) => `Total price: ${currency} ${price}. ${paymentTermsText({ lang: 'en', currency, price, derived, isWebsiteBooking })}`],
    ['4. Included Services', () => 'Water, electricity, gas, Wi-Fi, TV service, designated parking, and daily housekeeping, unless otherwise noted.'],
    ['5. Additional Services', () => 'Private chef, babysitting, cribs, high chairs, and grocery delivery may be arranged with 30 days’ notice, at additional cost.'],
    ['6. Late Arrival / Early Departure', () => 'Guest must notify TC Lux Homes of any delay. Extensions are subject to availability and prior authorization.'],
    ['7. Parking', ({ group, villa }) => devParking(group, villa, 'en')],
    ['8. Cancellation Policy', () => '90+ days before check-in: 100% refundable. 89–60 days: 70% refundable. 59–30 days: 50% refundable. Fewer than 30 days: non-refundable.'],
    ['9. Force Majeure', () => 'If the Property is unavailable due to unforeseen circumstances beyond TC Lux Homes’s control, 100% of payments will be refunded within 5 business days.'],
    ['10. Liability Waiver', () => 'TC Lux Homes and the Property owner bear no responsibility for accidents, injury, loss, theft, or damage within the Property or common areas.'],
    ['11. Children’s Safety', () => 'Guest is solely responsible for supervision and safety of any minors in their party.'],
    ['12. Care of Property', () => 'Guest is responsible for the Property and will be liable for damage caused during the stay.'],
    ['13. Occupancy Limit', ({ numGuests }) => `The Property will be occupied by no more than ${numGuests} guest(s), as indicated in this Agreement, unless a different number is authorized in writing by TC Lux Homes.`],
    ['14. Pets', () => 'Pets are not permitted on the Property.'],
    ['15. Smoking & Prohibited Substances', () => 'Smoking and illegal substances are not permitted on the Property or development.'],
    ['16. Conduct', () => 'Guest is responsible for their own conduct and that of their party, including compliance with community rules.'],
    ['17. Governing Law', () => 'This Agreement is governed by the laws of the State of Nayarit, Mexico.'],
    ['18. Electronic Signature', () => 'This Agreement, once signed electronically by the Guest and confirmed by TC Lux Homes, is valid and binding.'],
  ],
  es: [
    ['1. Uso de la Propiedad', ({ group }) => `El Propietario/Administrador otorga al Huésped y su grupo el uso de la Propiedad exclusivamente con fines de renta vacacional habitacional. ${devLocation(group, 'es')}`],
    ['2. Duración del Alquiler', ({ checkin, checkout, derived }) => `Check-in: ${checkin} a las 15:00. Check-out: ${checkout} a las 11:00. Noches totales: ${derived.nights}.`],
    ['3. Precio y Condiciones de Pago', ({ currency, price, derived, isWebsiteBooking }) => `Precio total: ${currency} ${price}. ${paymentTermsText({ lang: 'es', currency, price, derived, isWebsiteBooking })}`],
    ['4. Servicios Incluidos', () => 'Agua, electricidad, gas, Wi-Fi, TV, estacionamiento designado y limpieza diaria, salvo que se indique lo contrario.'],
    ['5. Servicios Adicionales', () => 'Chef privado, niñera, cunas, sillas para bebé y víveres pueden gestionarse con 30 días de anticipación, con costo adicional.'],
    ['6. Retraso en Llegada / Salida Anticipada', () => 'El Huésped debe notificar cualquier retraso. Las extensiones están sujetas a disponibilidad y autorización previa.'],
    ['7. Estacionamiento', ({ group, villa }) => devParking(group, villa, 'es')],
    ['8. Política de Cancelación', () => '90+ días antes: 100% reembolsable. 89–60 días: 70% reembolsable. 59–30 días: 50% reembolsable. Menos de 30 días: no reembolsable.'],
    ['9. Fuerza Mayor', () => 'Si la Propiedad no está disponible por circunstancias imprevistas, se reembolsará el 100% dentro de 5 días hábiles.'],
    ['10. Exención de Responsabilidad', () => 'TC Lux Homes y el propietario no tienen responsabilidad por accidentes, lesiones, pérdidas, robos o daños dentro de la Propiedad.'],
    ['11. Seguridad de Menores', () => 'El Huésped es el único responsable de la supervisión y seguridad de los menores de su grupo.'],
    ['12. Cuidado de la Propiedad', () => 'El Huésped es responsable de la Propiedad y de los daños causados durante la estancia.'],
    ['13. Límite de Ocupación', ({ numGuests }) => `La Propiedad será ocupada por no más de ${numGuests} huésped(es), según lo indicado en este contrato, salvo que TC Lux Homes autorice por escrito un número distinto.`],
    ['14. Mascotas', () => 'No se permiten mascotas dentro de la Propiedad.'],
    ['15. Fumar y Sustancias Prohibidas', () => 'No se permite fumar ni sustancias ilícitas dentro de la Propiedad o el desarrollo.'],
    ['16. Conducta', () => 'El Huésped es responsable de su conducta y la de su grupo, incluyendo el cumplimiento de los reglamentos de la comunidad.'],
    ['17. Legislación Aplicable', () => 'Este contrato se rige por las leyes del Estado de Nayarit, México.'],
    ['18. Firma Electrónica', () => 'Este contrato, firmado electrónicamente por el Huésped y confirmado por TC Lux Homes, es válido y vinculante.'],
  ],
}

const GOLF_CART = {
  en: ['19. Golf Cart Use', 'If a golf cart is provided with the Property, Guest agrees to operate it responsibly, only on designated roads and paths within the Punta Mita community, and only by licensed drivers 18 years of age or older. Guest is fully responsible for any damage, loss, traffic violation, or injury associated with the golf cart during the rental period. The golf cart must never be operated under the influence of alcohol or any substance that impairs driving ability.'],
  es: ['19. Uso del Carrito de Golf', 'Si se proporciona un carrito de golf con la Propiedad, el Huésped se compromete a operarlo de manera responsable, únicamente en los caminos y vialidades designados dentro de la comunidad de Punta Mita, y sólo por conductores con licencia de 18 años o más. El Huésped es completamente responsable de cualquier daño, pérdida, infracción de tránsito o lesión asociada con el carrito de golf durante el período de la renta. El carrito de golf nunca deberá operarse bajo la influencia del alcohol o cualquier sustancia que afecte la capacidad de conducir.'],
}

// Returns the full ordered list of [heading, bodyText] clause pairs for this
// booking — ready to render directly.
export function getClauses({ lang, checkin, checkout, currency, price, group, villa, numGuests, isWebsiteBooking }) {
  const derived = computeDerived(checkin, checkout, price)
  const ctx = { checkin, checkout, currency, price, group, villa, numGuests, isWebsiteBooking, derived }
  const clauses = CLAUSES[lang].map(([heading, body]) => [heading, body(ctx)])
  if (group === 'Punta Mita') clauses.push(GOLF_CART[lang])
  return clauses
}

export function contractTitle(lang) {
  return lang === 'en' ? 'SHORT-TERM VACATION RENTAL AGREEMENT' : 'CONTRATO DE HOSPEDAJE DE CORTO PLAZO'
}

export function guestLabel(lang) {
  return lang === 'en' ? 'Guest: ' : 'Huésped: '
}
