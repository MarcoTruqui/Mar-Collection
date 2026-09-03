import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import Link from 'next/link'

export const metadata = {
  title: 'La Cruz de Huanacaxtle Villa Rentals — Marina Town Near Puerto Vallarta',
  description: 'Ocean-view residences for rent in La Cruz de Huanacaxtle, a marina village on Bahía de Banderas about 30-35 minutes from Puerto Vallarta. Home to the Zantamar complex, a Friday market, and whale watching.',
  alternates: { canonical: '/la-cruz-de-huanacaxtle' },
  openGraph: {
    title: 'La Cruz de Huanacaxtle Villa Rentals | MAR Collection',
    description: 'Ocean-view residences in the marina village of La Cruz de Huanacaxtle, Riviera Nayarit.',
    url: '/la-cruz-de-huanacaxtle',
  },
}

const faqs = [
  {
    question: 'How far is La Cruz de Huanacaxtle from Puerto Vallarta?',
    answer: 'La Cruz de Huanacaxtle is about 30-35 minutes by car from Puerto Vallarta International Airport (PVR), roughly midway up Bahía de Banderas between Bucerías and Punta Mita.',
  },
  {
    question: 'What is the Zantamar complex?',
    answer: 'Zantamar is a gated residential complex in La Cruz de Huanacaxtle with a resort-style pool and gardens. MAR Collection manages several ocean-view studios and two-bedroom units there, all within walking distance of the marina.',
  },
  {
    question: 'Is La Cruz de Huanacaxtle good for whale watching?',
    answer: 'Yes. Bahía de Banderas is one of Mexico\'s best-known humpback whale watching areas during the winter season (roughly December through March), and tours commonly depart from La Cruz de Huanacaxtle\'s marina.',
  },
]

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'La Cruz de Huanacaxtle', path: '/la-cruz-de-huanacaxtle' },
  ]),
  faqJsonLd(faqs),
]

export default function LaCruzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaPageLayout
        eyebrow="Riviera Nayarit"
        title="La Cruz de Huanacaxtle Villa Rentals"
        subtitle="A fishing-village-turned-marina town on Bahía de Banderas, about 30 minutes from Puerto Vallarta."
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar205_01.jpg"
        locationFilter="La Cruz de Huanacaxtle"
      >
        <Section title="Where La Cruz de Huanacaxtle Fits on Bahía de Banderas">
          <p>
            La Cruz de Huanacaxtle sits roughly midway up Bahía de Banderas between Bucerías and Punta Mita,
            about 30-35 minutes from Puerto Vallarta International Airport (PVR). It grew up as a fishing
            village and still has that quieter, more local character, built around a working marina rather
            than a hotel strip.
          </p>
        </Section>

        <Section title="What La Cruz de Huanacaxtle Is Known For">
          <p>
            The town is best known for its marina, a well-loved Friday market, live music at local restaurants,
            fresh seafood, and easy access to whale watching tours during the winter season. MAR Collection's
            properties here are all in the Zantamar complex, a gated development with a resort-style pool and
            ocean views, a short walk from the marina and town center.
          </p>
        </Section>

        <Section title="Frequently Asked Questions">
          <div className="space-y-6">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-serif text-lg text-navy mb-1">{question}</h3>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <p className="text-sm text-gray-500">
            Comparing areas? See our guide to{' '}
            <Link href="/guides/where-to-stay-puerto-vallarta-area" className="text-gold underline hover:text-navy">
              where to stay near Puerto Vallarta
            </Link>{' '}
            or browse{' '}
            <Link href="/bucerias" className="text-gold underline hover:text-navy">Bucerías</Link> and{' '}
            <Link href="/punta-mita" className="text-gold underline hover:text-navy">Punta Mita</Link> villas.
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
