import { buildMetadata } from '@/lib/seo'
import { BRAND_NAME } from '@/lib/brand'

const copy = {
  en: {
    title: `About ${BRAND_NAME} — Boutique Villa Rentals on Bahía de Banderas, Near Puerto Vallarta`,
    description: `${BRAND_NAME} curates luxury villas across Punta Mita, Bucerías, and La Cruz de Huanacaxtle on Bahía de Banderas, just north of Puerto Vallarta, Mexico.`,
  },
  es: {
    title: `Sobre ${BRAND_NAME} — Renta de Villas Boutique en Bahía de Banderas, Cerca de Puerto Vallarta`,
    description: `${BRAND_NAME} selecciona villas de lujo en Punta Mita, Bucerías y La Cruz de Huanacaxtle, en la Bahía de Banderas, justo al norte de Puerto Vallarta, México.`,
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/about', locale: params.locale, ...c })
}

export default function AboutLayout({ children }) {
  return children
}
