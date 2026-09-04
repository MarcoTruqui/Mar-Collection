import Link from '@/components/LocaleLink'
import Image from 'next/image'
import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import PropertyCard from '@/components/PropertyCard'
import properties from '@/data/properties'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    metaTitle: 'Places to Stay Near Puerto Vallarta — Luxury Villas on Bahía de Banderas',
    metaDescription: 'Looking for places to stay near Puerto Vallarta? MAR Collection manages 14 luxury villas on Bahía de Banderas in Punta Mita, Bucerías, and La Cruz de Huanacaxtle, all 20-45 minutes from Puerto Vallarta International Airport.',
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'Puerto Vallarta Area',
    eyebrow: 'Bahía de Banderas',
    title: 'Places to Stay Near Puerto Vallarta',
    subtitle: '14 luxury villas across three Riviera Nayarit towns, all a short drive from Puerto Vallarta International Airport.',
    geoTitle: 'The Honest Geography',
    geoBody1: "If you're searching for places to stay near Puerto Vallarta, here's what you should know: MAR Collection's villas aren't inside Puerto Vallarta's city limits. They're on Bahía de Banderas — the same bay Puerto Vallarta sits on — in the neighboring Riviera Nayarit towns of Punta Mita, Bucerías, and La Cruz de Huanacaxtle, just across the state line in Nayarit. Depending on the town, that's roughly 20 to 45 minutes from Puerto Vallarta International Airport (PVR) and downtown Puerto Vallarta by car.",
    geoBody2: "For many travelers, that trade-off is the point: more privacy, more beachfront, and lower density than the city's hotel zone, while still being a short drive from Puerto Vallarta's restaurants, nightlife, and airport.",
    chooseTitle: 'Choose Your Area',
    areas: [
      { name: 'Bucerías', href: '/bucerias', drive: '~20-25 min from PVR', vibe: 'Walkable art-and-beach town, closest to the airport and Puerto Vallarta itself.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_01.jpg' },
      { name: 'La Cruz de Huanacaxtle', href: '/la-cruz-de-huanacaxtle', drive: '~30-35 min from PVR', vibe: 'Quiet marina village with a Friday market and whale watching in season.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar205_01.jpg' },
      { name: 'Punta Mita', href: '/punta-mita', drive: '~40-45 min from PVR', vibe: 'Gated luxury communities, golf, and surf at the tip of the bay.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/palmas_01.jpg' },
    ],
    propertyLabel: (n) => (n === 1 ? 'property' : 'properties'),
    featuredTitle: 'Featured Villas',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'Are MAR Collection villas actually in Puerto Vallarta?', answer: 'No, and we want to be upfront about that. MAR Collection villas are on Bahía de Banderas, the bay Puerto Vallarta sits on, in the neighboring Riviera Nayarit towns of Punta Mita, Bucerías, and La Cruz de Huanacaxtle, all in the state of Nayarit. They range from about 20 to 45 minutes from Puerto Vallarta International Airport and downtown Puerto Vallarta by car.' },
      { question: 'What is the closest area to Puerto Vallarta with villa rentals?', answer: 'Bucerías is the closest, about 20-25 minutes from Puerto Vallarta International Airport (PVR), just across the Ameca River that separates Jalisco from Nayarit.' },
      { question: 'Which area should I choose: Punta Mita, Bucerías, or La Cruz de Huanacaxtle?', answer: 'Bucerías suits travelers who want a walkable town and easy airport access. La Cruz de Huanacaxtle suits those who want a quieter marina-village feel. Punta Mita suits those who want gated-community privacy, golf, and surf, and don\'t mind a longer drive from the airport.' },
    ],
    footerPre: 'Want a deeper comparison?',
    footerGuideLink: 'Read our full where-to-stay guide',
    footerOr: 'or check',
    footerTransferLink: 'airport transfer times and options',
  },
  es: {
    metaTitle: 'Dónde Hospedarse Cerca de Puerto Vallarta — Villas de Lujo en la Bahía de Banderas',
    metaDescription: '¿Buscas dónde hospedarte cerca de Puerto Vallarta? MAR Collection administra 14 villas de lujo en la Bahía de Banderas en Punta Mita, Bucerías y La Cruz de Huanacaxtle, todas a 20-45 minutos del Aeropuerto Internacional de Puerto Vallarta.',
    breadcrumbHome: 'Inicio',
    breadcrumbSelf: 'Zona Puerto Vallarta',
    eyebrow: 'Bahía de Banderas',
    title: 'Dónde Hospedarse Cerca de Puerto Vallarta',
    subtitle: '14 villas de lujo en tres pueblos de la Riviera Nayarit, todos a poca distancia del Aeropuerto Internacional de Puerto Vallarta.',
    geoTitle: 'La Geografía Honesta',
    geoBody1: 'Si buscas dónde hospedarte cerca de Puerto Vallarta, esto es lo que debes saber: las villas de MAR Collection no están dentro de los límites de la ciudad de Puerto Vallarta. Están en la Bahía de Banderas — la misma bahía donde se ubica Puerto Vallarta — en los pueblos vecinos de la Riviera Nayarit: Punta Mita, Bucerías y La Cruz de Huanacaxtle, cruzando el límite estatal hacia Nayarit. Dependiendo del pueblo, eso significa entre 20 y 45 minutos en auto del Aeropuerto Internacional de Puerto Vallarta (PVR) y del centro de Puerto Vallarta.',
    geoBody2: 'Para muchos viajeros, ese intercambio es justamente el atractivo: más privacidad, más frente de playa y menor densidad que la zona hotelera de la ciudad, mientras se mantiene a poca distancia de los restaurantes, la vida nocturna y el aeropuerto de Puerto Vallarta.',
    chooseTitle: 'Elige tu Zona',
    areas: [
      { name: 'Bucerías', href: '/bucerias', drive: '~20-25 min del PVR', vibe: 'Pueblo caminable de arte y playa, el más cercano al aeropuerto y a Puerto Vallarta.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_01.jpg' },
      { name: 'La Cruz de Huanacaxtle', href: '/la-cruz-de-huanacaxtle', drive: '~30-35 min del PVR', vibe: 'Pueblo tranquilo de marina con mercado del viernes y avistamiento de ballenas en temporada.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar205_01.jpg' },
      { name: 'Punta Mita', href: '/punta-mita', drive: '~40-45 min del PVR', vibe: 'Comunidades privadas de lujo, golf y surf en la punta de la bahía.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/palmas_01.jpg' },
    ],
    propertyLabel: (n) => (n === 1 ? 'propiedad' : 'propiedades'),
    featuredTitle: 'Villas Destacadas',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { question: '¿Las villas de MAR Collection están realmente en Puerto Vallarta?', answer: 'No, y queremos ser claros al respecto. Las villas de MAR Collection están en la Bahía de Banderas, la bahía donde se ubica Puerto Vallarta, en los pueblos vecinos de la Riviera Nayarit: Punta Mita, Bucerías y La Cruz de Huanacaxtle, todos en el estado de Nayarit. Están a entre 20 y 45 minutos en auto del Aeropuerto Internacional de Puerto Vallarta y del centro de Puerto Vallarta.' },
      { question: '¿Cuál es la zona más cercana a Puerto Vallarta con renta de villas?', answer: 'Bucerías es la más cercana, a unos 20-25 minutos del Aeropuerto Internacional de Puerto Vallarta (PVR), cruzando el Río Ameca que separa Jalisco de Nayarit.' },
      { question: '¿Qué zona debo elegir: Punta Mita, Bucerías o La Cruz de Huanacaxtle?', answer: 'Bucerías es ideal para quienes buscan un pueblo caminable y fácil acceso al aeropuerto. La Cruz de Huanacaxtle es ideal para quienes buscan un ambiente más tranquilo de pueblo de marina. Punta Mita es ideal para quienes buscan privacidad en comunidad cerrada, golf y surf, sin importarles un trayecto más largo desde el aeropuerto.' },
    ],
    footerPre: '¿Quieres una comparación más completa?',
    footerGuideLink: 'Lee nuestra guía completa de dónde hospedarte',
    footerOr: 'o consulta',
    footerTransferLink: 'los tiempos y opciones de traslado desde el aeropuerto',
  },
}

const featuredSlugs = ['villa-girasol', 'palmas-8', 'zantamar-205b']
const featured = featuredSlugs.map(slug => properties.find(p => p.slug === slug)).filter(Boolean)

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/puerto-vallarta', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function PuertoVallartaPage({ params }) {
  const c = copy[params.locale] ?? copy.en
  const areas = c.areas.map(area => ({
    ...area,
    count: properties.filter(p => p.location === area.name).length,
  }))

  const jsonLd = [
    breadcrumbJsonLd([
      { name: c.breadcrumbHome, path: '/' },
      { name: c.breadcrumbSelf, path: '/puerto-vallarta' },
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
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/terrazas_01.jpg"
        locale={params.locale}
      >
        <Section title={c.geoTitle}>
          <p>{c.geoBody1}</p>
          <p>{c.geoBody2}</p>
        </Section>

        <Section title={c.chooseTitle}>
          <div className="grid sm:grid-cols-3 gap-6 not-prose">
            {areas.map(area => (
              <Link
                key={area.name}
                href={area.href}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="relative h-36">
                  <Image
                    src={area.image}
                    alt={`Villa in ${area.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-navy mb-1">{area.name}</h3>
                  <p className="text-gold text-xs font-medium mb-2">{area.drive}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{area.vibe}</p>
                  <p className="text-navy text-xs font-semibold">
                    {area.count} {c.propertyLabel(area.count)} &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section title={c.featuredTitle}>
          <div className="grid sm:grid-cols-3 gap-6 not-prose">
            {featured.map(p => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
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
            <Link href="/guides/airport-transfers-puerto-vallarta" className="text-gold underline hover:text-navy">
              {c.footerTransferLink}
            </Link>.
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
