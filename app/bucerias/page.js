import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import Link from 'next/link'

export const metadata = {
  title: 'Bucerías Villa Rentals — Beachfront Homes Minutes from Puerto Vallarta',
  description: 'Luxury beachfront villas for rent in Bucerías, Nayarit — the closest Bahía de Banderas town to Puerto Vallarta, about 20-25 minutes from the airport. Cobblestone streets, art galleries, and direct beach access.',
  alternates: { canonical: '/bucerias' },
  openGraph: {
    title: 'Bucerías Villa Rentals — Beachfront Homes Near Puerto Vallarta',
    description: 'Luxury beachfront villas in Bucerías, the closest Bahía de Banderas town to Puerto Vallarta.',
    url: '/bucerias',
  },
}

const faqs = [
  {
    question: 'How far is Bucerías from Puerto Vallarta?',
    answer: 'Bucerías is about 20-25 minutes by car from Puerto Vallarta International Airport (PVR) and roughly the same from downtown Puerto Vallarta, just across the Ameca River in the state of Nayarit.',
  },
  {
    question: 'Is Bucerías walkable?',
    answer: 'Yes. Bucerías has a compact, walkable town center with cobblestone streets, art galleries, and seafood restaurants, all within a short walk of the beach.',
  },
  {
    question: 'Do I need a car to stay in Bucerías?',
    answer: 'Not necessarily. Many MAR Collection villas in Bucerías are within walking distance of restaurants and the beach, though a rental car or taxi is useful for day trips to Puerto Vallarta, Punta Mita, or La Cruz de Huanacaxtle.',
  },
]

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Bucerías', path: '/bucerias' },
  ]),
  faqJsonLd(faqs),
]

export default function BuceriasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaPageLayout
        eyebrow="Riviera Nayarit"
        title="Bucerías Villa Rentals — Beachfront Homes Near Puerto Vallarta"
        subtitle="The closest Bahía de Banderas town to Puerto Vallarta — cobblestone streets, art galleries, and villas that open straight onto the sand."
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_01.jpg"
        locationFilter="Bucerías"
      >
        <Section title="Where Bucerías Fits on Bahía de Banderas">
          <p>
            Bucerías sits on Bahía de Banderas immediately north of Puerto Vallarta, just across the Ameca River
            that marks the border between the states of Jalisco and Nayarit. It's the nearest of the three
            Riviera Nayarit towns where MAR Collection operates to Puerto Vallarta International Airport (PVR) —
            about 20-25 minutes by car — which makes it a popular choice for travelers who want easy airport
            access without staying inside the city itself.
          </p>
        </Section>

        <Section title="What Bucerías Is Known For">
          <p>
            Bucerías has kept the character of a real Mexican beach town while building a reputation for its
            arts scene — galleries and studios line several blocks of the town center, alongside long-running
            seafood restaurants and a beach that stretches for miles along the bay. It's quieter and more
            local-feeling than Puerto Vallarta's hotel zone, but close enough to reach it for a night out or
            a day of shopping.
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
            <Link href="/punta-mita" className="text-gold underline hover:text-navy">Punta Mita</Link> and{' '}
            <Link href="/la-cruz-de-huanacaxtle" className="text-gold underline hover:text-navy">La Cruz de Huanacaxtle</Link> villas.
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
