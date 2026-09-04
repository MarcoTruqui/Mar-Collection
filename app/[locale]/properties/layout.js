import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    title: 'Luxury Villas for Rent Near Puerto Vallarta | Punta Mita, Bucerías & La Cruz',
    description: 'Browse handpicked luxury villas on Bahía de Banderas, minutes from Puerto Vallarta — beachfront estates in Punta Mita, Bucerías, and La Cruz de Huanacaxtle. Check live availability and book direct.',
  },
  es: {
    title: 'Villas de Lujo en Renta Cerca de Puerto Vallarta | Punta Mita, Bucerías y La Cruz',
    description: 'Explora villas de lujo seleccionadas en la Bahía de Banderas, a minutos de Puerto Vallarta — residencias frente al mar en Punta Mita, Bucerías y La Cruz de Huanacaxtle. Consulta disponibilidad y reserva directo.',
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/properties', locale: params.locale, ...c })
}

export default function PropertiesLayout({ children }) {
  return children
}
