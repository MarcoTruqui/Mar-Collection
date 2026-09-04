import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'
import Link from '@/components/LocaleLink'

const copy = {
  en: {
    metaTitle: 'La Cruz de Huanacaxtle Villa Rentals — Marina Town Near Puerto Vallarta',
    metaDescription: 'Ocean-view residences for rent in La Cruz de Huanacaxtle, a marina village on Bahía de Banderas about 30-35 minutes from Puerto Vallarta. Home to the Zantamar complex, a Friday market, and whale watching.',
    breadcrumbHome: 'Home',
    eyebrow: 'Riviera Nayarit',
    title: 'La Cruz de Huanacaxtle Villa Rentals',
    subtitle: 'A fishing-village-turned-marina town on Bahía de Banderas, about 30 minutes from Puerto Vallarta.',
    fitTitle: 'Where La Cruz de Huanacaxtle Fits on Bahía de Banderas',
    fitBody: 'La Cruz de Huanacaxtle sits roughly midway up Bahía de Banderas between Bucerías and Punta Mita, about 30-35 minutes from Puerto Vallarta International Airport (PVR). It grew up as a fishing village and still has that quieter, more local character, built around a working marina rather than a hotel strip.',
    knownTitle: 'What La Cruz de Huanacaxtle Is Known For',
    knownBody: "The town is best known for its marina, a well-loved Friday market, live music at local restaurants, fresh seafood, and easy access to whale watching tours during the winter season. MAR Collection's properties here are all in the Zantamar complex, a gated development with a resort-style pool and ocean views, a short walk from the marina and town center.",
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'How far is La Cruz de Huanacaxtle from Puerto Vallarta?', answer: 'La Cruz de Huanacaxtle is about 30-35 minutes by car from Puerto Vallarta International Airport (PVR), roughly midway up Bahía de Banderas between Bucerías and Punta Mita.' },
      { question: 'What is the Zantamar complex?', answer: 'Zantamar is a gated residential complex in La Cruz de Huanacaxtle with a resort-style pool and gardens. MAR Collection manages several ocean-view studios and two-bedroom units there, all within walking distance of the marina.' },
      { question: 'Is La Cruz de Huanacaxtle good for whale watching?', answer: "Yes. Bahía de Banderas is one of Mexico's best-known humpback whale watching areas during the winter season (roughly December through March), and tours commonly depart from La Cruz de Huanacaxtle's marina." },
    ],
    footerPre: 'Comparing areas? See our guide to',
    footerGuideLink: 'where to stay near Puerto Vallarta',
    footerOr: 'or browse',
    footerAnd: 'and',
    footerVillas: 'villas.',
  },
  es: {
    metaTitle: 'Renta de Villas en La Cruz de Huanacaxtle — Pueblo de Marina Cerca de Puerto Vallarta',
    metaDescription: 'Residencias con vista al mar en renta en La Cruz de Huanacaxtle, un pueblo de marina en la Bahía de Banderas a unos 30-35 minutos de Puerto Vallarta. Hogar del complejo Zantamar, el mercado del viernes y el avistamiento de ballenas.',
    breadcrumbHome: 'Inicio',
    eyebrow: 'Riviera Nayarit',
    title: 'Renta de Villas en La Cruz de Huanacaxtle',
    subtitle: 'Un pueblo pesquero convertido en marina, en la Bahía de Banderas, a unos 30 minutos de Puerto Vallarta.',
    fitTitle: 'Dónde Está La Cruz de Huanacaxtle en la Bahía de Banderas',
    fitBody: 'La Cruz de Huanacaxtle se ubica aproximadamente a la mitad de la Bahía de Banderas entre Bucerías y Punta Mita, a unos 30-35 minutos del Aeropuerto Internacional de Puerto Vallarta (PVR). Creció como pueblo pesquero y conserva ese carácter más tranquilo y local, construido alrededor de una marina activa en lugar de una zona hotelera.',
    knownTitle: 'Por Qué Es Conocido La Cruz de Huanacaxtle',
    knownBody: 'El pueblo es conocido por su marina, su querido mercado del viernes, música en vivo en restaurantes locales, mariscos frescos y fácil acceso a tours de avistamiento de ballenas durante la temporada de invierno. Las propiedades de MAR Collection aquí están todas en el complejo Zantamar, un desarrollo privado con alberca estilo resort y vista al mar, a poca distancia de la marina y el centro del pueblo.',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { question: '¿Qué tan lejos está La Cruz de Huanacaxtle de Puerto Vallarta?', answer: 'La Cruz de Huanacaxtle está a unos 30-35 minutos en auto del Aeropuerto Internacional de Puerto Vallarta (PVR), aproximadamente a la mitad de la Bahía de Banderas entre Bucerías y Punta Mita.' },
      { question: '¿Qué es el complejo Zantamar?', answer: 'Zantamar es un complejo residencial privado en La Cruz de Huanacaxtle con alberca estilo resort y jardines. MAR Collection administra varios estudios y unidades de dos habitaciones con vista al mar ahí, todos a poca distancia de la marina.' },
      { question: '¿La Cruz de Huanacaxtle es buena para avistar ballenas?', answer: 'Sí. La Bahía de Banderas es una de las zonas más conocidas de México para el avistamiento de ballenas jorobadas durante la temporada de invierno (aproximadamente de diciembre a marzo), y los tours suelen salir desde la marina de La Cruz de Huanacaxtle.' },
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
  return buildMetadata({ path: '/la-cruz-de-huanacaxtle', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function LaCruzPage({ params }) {
  const c = copy[params.locale] ?? copy.en
  const jsonLd = [
    breadcrumbJsonLd([
      { name: c.breadcrumbHome, path: '/' },
      { name: 'La Cruz de Huanacaxtle', path: '/la-cruz-de-huanacaxtle' },
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
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar205_01.jpg"
        locationFilter="La Cruz de Huanacaxtle"
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
            <Link href="/bucerias" className="text-gold underline hover:text-navy">Bucerías</Link> {c.footerAnd}{' '}
            <Link href="/punta-mita" className="text-gold underline hover:text-navy">Punta Mita</Link> {c.footerVillas}
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
