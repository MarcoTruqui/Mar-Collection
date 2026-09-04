import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    title: 'Contact MAR Collection — Book a Villa Near Puerto Vallarta',
    description: 'Get in touch to book your luxury villa near Puerto Vallarta, on Bahía de Banderas — Punta Mita, Bucerías, and La Cruz de Huanacaxtle, Mexico.',
  },
  es: {
    title: 'Contacto MAR Collection — Reserva tu Villa Cerca de Puerto Vallarta',
    description: 'Contáctanos para reservar tu villa de lujo cerca de Puerto Vallarta, en la Bahía de Banderas — Punta Mita, Bucerías y La Cruz de Huanacaxtle, México.',
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/contact', locale: params.locale, ...c })
}

export default function ContactLayout({ children }) {
  return children
}
