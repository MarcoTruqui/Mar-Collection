import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    title: 'About MAR Collection — Boutique Villa Rentals on Bahía de Banderas, Near Puerto Vallarta',
    description: 'MAR Collection curates luxury villas across Punta Mita, Bucerías, and La Cruz de Huanacaxtle on Bahía de Banderas, just north of Puerto Vallarta, Mexico.',
  },
  es: {
    title: 'Sobre MAR Collection — Renta de Villas Boutique en Bahía de Banderas, Cerca de Puerto Vallarta',
    description: 'MAR Collection selecciona villas de lujo en Punta Mita, Bucerías y La Cruz de Huanacaxtle, en la Bahía de Banderas, justo al norte de Puerto Vallarta, México.',
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/about', locale: params.locale, ...c })
}

export default function AboutLayout({ children }) {
  return children
}
