import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'
import Link from '@/components/LocaleLink'

const copy = {
  en: {
    metaTitle: 'Punta Mita Villa Rentals — Luxury Beachfront & Golf Estates',
    metaDescription: "Punta Mita villa rentals in gated peninsula communities, 40-45 minutes from Puerto Vallarta International Airport. Private pools, golf carts included, beach club access, and some of Riviera Nayarit's best surf and golf.",
    breadcrumbHome: 'Home',
    eyebrow: 'Riviera Nayarit',
    title: 'Punta Mita Villa Rentals',
    subtitle: 'Gated-community luxury estates at the tip of Bahía de Banderas — golf, world-class surf, and total privacy.',
    fitTitle: 'Where Punta Mita Fits on Bahía de Banderas',
    fitBody: "Punta Mita occupies the peninsula at the northern point of Bahía de Banderas, about 40-45 minutes from Puerto Vallarta International Airport (PVR). It's the most exclusive of the three areas where MAR Collection operates — most properties sit inside gated communities with private security, landscaped grounds, and direct or short-walk access to the peninsula's beach clubs.",
    knownTitle: 'What Punta Mita Is Known For',
    knownBody: "The peninsula is known for its golf courses, world-class surf breaks, and calm swimming beaches on its bay-facing side — a rare combination in one place. Both MAR Collection properties in Punta Mita, Palmas 8 and Las Terrazas G-32, include a complimentary golf cart with every stay, the standard way to get around the peninsula's private communities and reach nearby beach clubs and restaurants.",
    whyTitle: 'Why Punta Mita Villa Rentals Stand Apart',
    whyBody: "Punta Mita villa rentals command a different tier than the rest of Riviera Nayarit — this is where Mexico's most established gated developments, golf clubs, and beach clubs concentrate on a single peninsula. Travelers who choose Punta Mita specifically (rather than the wider Puerto Vallarta area) are usually prioritizing privacy, security, and resort-level polish over proximity to the airport, and the peninsula delivers on all three.",
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'How far is Punta Mita from Puerto Vallarta?', answer: 'Punta Mita is about 40-45 minutes by car from Puerto Vallarta International Airport (PVR), at the northern tip of Bahía de Banderas in the state of Nayarit.' },
      { question: 'Do Punta Mita villas include a golf cart?', answer: 'Several MAR Collection properties in Punta Mita, including Palmas 8 and Las Terrazas G-32, include a complimentary golf cart for getting around the peninsula\'s gated communities and beach clubs.' },
      { question: 'Is Punta Mita good for golf and surfing?', answer: "Yes. The peninsula is home to some of Mexico's most exclusive golf courses and a string of well-known surf breaks along its point, alongside calmer beaches suited to swimming and families." },
    ],
    footerPre: 'Comparing areas? See our guide to',
    footerGuideLink: 'where to stay near Puerto Vallarta',
    footerOr: 'or browse',
    footerAnd: 'and',
    footerVillas: 'villas.',
  },
  es: {
    metaTitle: 'Renta de Villas en Punta Mita — Residencias de Lujo Frente al Mar y de Golf',
    metaDescription: 'Renta de villas en Punta Mita dentro de comunidades privadas en la península, a 40-45 minutos del Aeropuerto Internacional de Puerto Vallarta. Alberca privada, carrito de golf incluido, acceso a beach clubs y algunas de las mejores playas de surf y golf de la Riviera Nayarit.',
    breadcrumbHome: 'Inicio',
    eyebrow: 'Riviera Nayarit',
    title: 'Renta de Villas en Punta Mita',
    subtitle: 'Residencias de lujo en comunidades privadas en la punta de la Bahía de Banderas — golf, surf de clase mundial y total privacidad.',
    fitTitle: 'Dónde Está Punta Mita en la Bahía de Banderas',
    fitBody: 'Punta Mita ocupa la península en el punto norte de la Bahía de Banderas, a unos 40-45 minutos del Aeropuerto Internacional de Puerto Vallarta (PVR). Es la más exclusiva de las tres zonas donde opera MAR Collection — la mayoría de las propiedades están dentro de comunidades privadas con seguridad, jardines cuidados y acceso directo o a poca distancia de los beach clubs de la península.',
    knownTitle: 'Por Qué Es Conocido Punta Mita',
    knownBody: 'La península es conocida por sus campos de golf, olas de clase mundial para surf y playas tranquilas para nadar del lado de la bahía — una combinación poco común en un solo lugar. Ambas propiedades de MAR Collection en Punta Mita, Palmas 8 y Las Terrazas G-32, incluyen carrito de golf de cortesía en cada estadía, la forma habitual de moverse dentro de las comunidades privadas de la península y llegar a beach clubs y restaurantes cercanos.',
    whyTitle: 'Por Qué la Renta de Villas en Punta Mita Es Diferente',
    whyBody: 'La renta de villas en Punta Mita está en otro nivel respecto al resto de la Riviera Nayarit — aquí se concentran en una sola península los desarrollos privados, clubes de golf y beach clubs más consolidados de México. Quienes eligen Punta Mita específicamente (en lugar de la zona más amplia de Puerto Vallarta) suelen priorizar la privacidad, la seguridad y el nivel de acabado tipo resort por encima de la cercanía al aeropuerto, y la península cumple en los tres aspectos.',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { question: '¿Qué tan lejos está Punta Mita de Puerto Vallarta?', answer: 'Punta Mita está a unos 40-45 minutos en auto del Aeropuerto Internacional de Puerto Vallarta (PVR), en la punta norte de la Bahía de Banderas, en el estado de Nayarit.' },
      { question: '¿Las villas en Punta Mita incluyen carrito de golf?', answer: 'Varias propiedades de MAR Collection en Punta Mita, incluyendo Palmas 8 y Las Terrazas G-32, incluyen carrito de golf de cortesía para moverte dentro de las comunidades privadas y beach clubs de la península.' },
      { question: '¿Punta Mita es buena para golf y surf?', answer: 'Sí. La península alberga algunos de los campos de golf más exclusivos de México y una serie de reconocidas olas para surf a lo largo de la punta, además de playas más tranquilas para nadar y familias.' },
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
  return buildMetadata({ path: '/punta-mita', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function PuntaMitaPage({ params }) {
  const c = copy[params.locale] ?? copy.en
  const jsonLd = [
    breadcrumbJsonLd([
      { name: c.breadcrumbHome, path: '/' },
      { name: 'Punta Mita', path: '/punta-mita' },
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
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/palmas_01.jpg"
        locationFilter="Punta Mita"
        locale={params.locale}
      >
        <Section title={c.fitTitle}>
          <p>{c.fitBody}</p>
        </Section>

        <Section title={c.knownTitle}>
          <p>{c.knownBody}</p>
        </Section>

        <Section title={c.whyTitle}>
          <p>{c.whyBody}</p>
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
            <Link href="/bucerias" className="text-gold underline hover:text-navy">Bucerías</Link> {c.footerAnd}{' '}
            <Link href="/la-cruz-de-huanacaxtle" className="text-gold underline hover:text-navy">La Cruz de Huanacaxtle</Link> {c.footerVillas}
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
