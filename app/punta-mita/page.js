import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import Link from 'next/link'

export const metadata = {
  title: 'Punta Mita Luxury Villa Rentals Near Puerto Vallarta',
  description: 'Gated-community luxury villas for rent on the Punta Mita peninsula, about 40-45 minutes from Puerto Vallarta International Airport. Private pools, golf carts included, and access to some of Riviera Nayarit\'s best beaches.',
  alternates: { canonical: '/punta-mita' },
  openGraph: {
    title: 'Punta Mita Luxury Villa Rentals | MAR Collection',
    description: 'Gated-community luxury villas on the Punta Mita peninsula, Riviera Nayarit.',
    url: '/punta-mita',
  },
}

const faqs = [
  {
    question: 'How far is Punta Mita from Puerto Vallarta?',
    answer: 'Punta Mita is about 40-45 minutes by car from Puerto Vallarta International Airport (PVR), at the northern tip of Bahía de Banderas in the state of Nayarit.',
  },
  {
    question: 'Do Punta Mita villas include a golf cart?',
    answer: 'Several MAR Collection properties in Punta Mita, including Palmas 8 and Las Terrazas G-32, include a complimentary golf cart for getting around the peninsula\'s gated communities and beach clubs.',
  },
  {
    question: 'Is Punta Mita good for golf and surfing?',
    answer: 'Yes. The peninsula is home to some of Mexico\'s most exclusive golf courses and a string of well-known surf breaks along its point, alongside calmer beaches suited to swimming and families.',
  },
]

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Punta Mita', path: '/punta-mita' },
  ]),
  faqJsonLd(faqs),
]

export default function PuntaMitaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaPageLayout
        eyebrow="Riviera Nayarit"
        title="Punta Mita Luxury Villa Rentals"
        subtitle="Gated-community estates at the tip of Bahía de Banderas, roughly 40 minutes from Puerto Vallarta — golf, surf, and privacy."
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/palmas_01.jpg"
        locationFilter="Punta Mita"
      >
        <Section title="Where Punta Mita Fits on Bahía de Banderas">
          <p>
            Punta Mita occupies the peninsula at the northern point of Bahía de Banderas, about 40-45 minutes
            from Puerto Vallarta International Airport (PVR). It's the most exclusive of the three areas where
            MAR Collection operates — most properties sit inside gated communities with private security,
            landscaped grounds, and direct or short-walk access to the peninsula's beach clubs.
          </p>
        </Section>

        <Section title="What Punta Mita Is Known For">
          <p>
            The peninsula is known for its golf courses, world-class surf breaks, and calm swimming beaches on
            its bay-facing side — a rare combination in one place. Both MAR Collection properties in Punta
            Mita, Palmas 8 and Las Terrazas G-32, include a complimentary golf cart with every stay, the
            standard way to get around the peninsula's private communities and reach nearby beach clubs and
            restaurants.
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
            <Link href="/la-cruz-de-huanacaxtle" className="text-gold underline hover:text-navy">La Cruz de Huanacaxtle</Link> villas.
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
