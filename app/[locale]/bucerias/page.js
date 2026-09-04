import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'
import Link from '@/components/LocaleLink'

const copy = {
  en: {
    metaTitle: 'Bucerías Villa Rentals — Beachfront Homes Minutes from Puerto Vallarta',
    metaDescription: 'Luxury beachfront villas for rent in Bucerías, Nayarit — the closest Bahía de Banderas town to Puerto Vallarta, about 20-25 minutes from the airport. Cobblestone streets, art galleries, and direct beach access.',
    breadcrumbHome: 'Home',
    eyebrow: 'Riviera Nayarit',
    title: 'Bucerías Villa Rentals — Beachfront Homes Near Puerto Vallarta',
    subtitle: 'The closest Bahía de Banderas town to Puerto Vallarta — cobblestone streets, art galleries, and villas that open straight onto the sand.',
    fitTitle: 'Where Bucerías Fits on Bahía de Banderas',
    fitBody: "Bucerías sits on Bahía de Banderas immediately north of Puerto Vallarta, just across the Ameca River that marks the border between the states of Jalisco and Nayarit. It's the nearest of the three Riviera Nayarit towns where MAR Collection operates to Puerto Vallarta International Airport (PVR) — about 20-25 minutes by car — which makes it a popular choice for travelers who want easy airport access without staying inside the city itself.",
    knownTitle: 'What Bucerías Is Known For',
    knownBody: "Bucerías has kept the character of a real Mexican beach town while building a reputation for its arts scene — galleries and studios line several blocks of the town center, alongside long-running seafood restaurants and a beach that stretches for miles along the bay. It's quieter and more local-feeling than Puerto Vallarta's hotel zone, but close enough to reach it for a night out or a day of shopping.",
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'How far is Bucerías from Puerto Vallarta?', answer: 'Bucerías is about 20-25 minutes by car from Puerto Vallarta International Airport (PVR) and roughly the same from downtown Puerto Vallarta, just across the Ameca River in the state of Nayarit.' },
      { question: 'Is Bucerías walkable?', answer: 'Yes. Bucerías has a compact, walkable town center with cobblestone streets, art galleries, and seafood restaurants, all within a short walk of the beach.' },
      { question: 'Do I need a car to stay in Bucerías?', answer: 'Not necessarily. Many MAR Collection villas in Bucerías are within walking distance of restaurants and the beach, though a rental car or taxi is useful for day trips to Puerto Vallarta, Punta Mita, or La Cruz de Huanacaxtle.' },
    ],
    footerPre: 'Comparing areas? See our guide to',
    footerGuideLink: 'where to stay near Puerto Vallarta',
    footerOr: 'or browse',
    footerAnd: 'and',
    footerVillas: 'villas.',
  },
  es: {
    metaTitle: 'Renta de Villas en Bucerías — Casas Frente al Mar a Minutos de Puerto Vallarta',
    metaDescription: 'Villas de lujo frente al mar en renta en Bucerías, Nayarit — el pueblo de la Bahía de Banderas más cercano a Puerto Vallarta, a unos 20-25 minutos del aeropuerto. Calles empedradas, galerías de arte y acceso directo a la playa.',
    breadcrumbHome: 'Inicio',
    eyebrow: 'Riviera Nayarit',
    title: 'Renta de Villas en Bucerías — Casas Frente al Mar Cerca de Puerto Vallarta',
    subtitle: 'El pueblo de la Bahía de Banderas más cercano a Puerto Vallarta — calles empedradas, galerías de arte y villas que dan directo a la arena.',
    fitTitle: 'Dónde Está Bucerías en la Bahía de Banderas',
    fitBody: 'Bucerías se ubica en la Bahía de Banderas justo al norte de Puerto Vallarta, cruzando el Río Ameca que marca el límite entre los estados de Jalisco y Nayarit. Es el más cercano de los tres pueblos de la Riviera Nayarit donde opera MAR Collection al Aeropuerto Internacional de Puerto Vallarta (PVR) — unos 20-25 minutos en auto — lo que lo convierte en una opción popular para quienes buscan fácil acceso al aeropuerto sin hospedarse dentro de la ciudad.',
    knownTitle: 'Por Qué Es Conocido Bucerías',
    knownBody: 'Bucerías ha conservado el carácter de un verdadero pueblo costero mexicano mientras construye una reputación por su escena artística — galerías y estudios ocupan varias cuadras del centro, junto con restaurantes de mariscos de larga tradición y una playa que se extiende por kilómetros a lo largo de la bahía. Es más tranquilo y de ambiente más local que la zona hotelera de Puerto Vallarta, pero lo suficientemente cerca para llegar en una noche de salida o un día de compras.',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { question: '¿Qué tan lejos está Bucerías de Puerto Vallarta?', answer: 'Bucerías está a unos 20-25 minutos en auto del Aeropuerto Internacional de Puerto Vallarta (PVR) y aproximadamente lo mismo del centro de Puerto Vallarta, cruzando el Río Ameca en el estado de Nayarit.' },
      { question: '¿Se puede caminar en Bucerías?', answer: 'Sí. Bucerías tiene un centro compacto y caminable con calles empedradas, galerías de arte y restaurantes de mariscos, todo a poca distancia de la playa.' },
      { question: '¿Necesito auto para hospedarme en Bucerías?', answer: 'No necesariamente. Muchas villas de MAR Collection en Bucerías están a poca distancia a pie de restaurantes y la playa, aunque un auto rentado o taxi es útil para excursiones de un día a Puerto Vallarta, Punta Mita o La Cruz de Huanacaxtle.' },
    ],
    footerPre: '¿Comparando zonas? Consulta nuestra guía sobre',
    footerGuideLink: 'dónde hospedarte cerca de Puerto Vallarta',
    footerOr: 'o explora',
    footerAnd: 'y',
    footerVillas: 'villas.',
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/bucerias', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function BuceriasPage({ params }) {
  const c = copy[params.locale] ?? copy.en
  const jsonLd = [
    breadcrumbJsonLd([
      { name: c.breadcrumbHome, path: '/' },
      { name: 'Bucerías', path: '/bucerias' },
    ], params.locale),
    faqJsonLd(c.faqs),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaPageLayout
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_01.jpg"
        locationFilter="Bucerías"
        locale={params.locale}
      >
        <Section title={c.fitTitle}>
          <p>{c.fitBody}</p>
        </Section>

        <Section title={c.knownTitle}>
          <p>{c.knownBody}</p>
        </Section>

        <Section title={c.faqTitle}>
          <div className="space-y-6">
            {c.faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-serif text-lg text-navy mb-1">{question}</h3>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <p className="text-sm text-gray-500">
            {c.footerPre}{' '}
            <Link href="/guides/where-to-stay-puerto-vallarta-area" className="text-gold underline hover:text-navy">
              {c.footerGuideLink}
            </Link>{' '}
            {c.footerOr}{' '}
            <Link href="/punta-mita" className="text-gold underline hover:text-navy">Punta Mita</Link> {c.footerAnd}{' '}
            <Link href="/la-cruz-de-huanacaxtle" className="text-gold underline hover:text-navy">La Cruz de Huanacaxtle</Link> {c.footerVillas}
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
