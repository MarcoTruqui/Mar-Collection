import Link from 'next/link'
import Image from 'next/image'
import AreaPageLayout, { Section } from '@/components/AreaPageLayout'
import PropertyCard from '@/components/PropertyCard'
import properties from '@/data/properties'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'

export const metadata = {
  title: 'Places to Stay Near Puerto Vallarta — Luxury Villas on Bahía de Banderas',
  description: 'Looking for places to stay near Puerto Vallarta? MAR Collection manages 14 luxury villas on Bahía de Banderas in Punta Mita, Bucerías, and La Cruz de Huanacaxtle, all 20-45 minutes from Puerto Vallarta International Airport.',
  alternates: { canonical: '/puerto-vallarta' },
  openGraph: {
    title: 'Places to Stay Near Puerto Vallarta | MAR Collection',
    description: 'Luxury villas on Bahía de Banderas, minutes from Puerto Vallarta, Mexico.',
    url: '/puerto-vallarta',
  },
}

const areas = [
  {
    name: 'Bucerías',
    href: '/bucerias',
    drive: '~20-25 min from PVR',
    vibe: 'Walkable art-and-beach town, closest to the airport and Puerto Vallarta itself.',
    image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_01.jpg',
    count: properties.filter(p => p.location === 'Bucerías').length,
  },
  {
    name: 'La Cruz de Huanacaxtle',
    href: '/la-cruz-de-huanacaxtle',
    drive: '~30-35 min from PVR',
    vibe: 'Quiet marina village with a Friday market and whale watching in season.',
    image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/zantamar205_01.jpg',
    count: properties.filter(p => p.location === 'La Cruz de Huanacaxtle').length,
  },
  {
    name: 'Punta Mita',
    href: '/punta-mita',
    drive: '~40-45 min from PVR',
    vibe: 'Gated luxury communities, golf, and surf at the tip of the bay.',
    image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/palmas_01.jpg',
    count: properties.filter(p => p.location === 'Punta Mita').length,
  },
]

const faqs = [
  {
    question: 'Are MAR Collection villas actually in Puerto Vallarta?',
    answer: 'No, and we want to be upfront about that. MAR Collection villas are on Bahía de Banderas, the bay Puerto Vallarta sits on, in the neighboring Riviera Nayarit towns of Punta Mita, Bucerías, and La Cruz de Huanacaxtle, all in the state of Nayarit. They range from about 20 to 45 minutes from Puerto Vallarta International Airport and downtown Puerto Vallarta by car.',
  },
  {
    question: 'What is the closest area to Puerto Vallarta with villa rentals?',
    answer: 'Bucerías is the closest, about 20-25 minutes from Puerto Vallarta International Airport (PVR), just across the Ameca River that separates Jalisco from Nayarit.',
  },
  {
    question: 'Which area should I choose: Punta Mita, Bucerías, or La Cruz de Huanacaxtle?',
    answer: 'Bucerías suits travelers who want a walkable town and easy airport access. La Cruz de Huanacaxtle suits those who want a quieter marina-village feel. Punta Mita suits those who want gated-community privacy, golf, and surf, and don\'t mind a longer drive from the airport.',
  },
]

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Puerto Vallarta Area', path: '/puerto-vallarta' },
  ]),
  faqJsonLd(faqs),
]

const featuredSlugs = ['villa-girasol', 'palmas-8', 'zantamar-205b']
const featured = featuredSlugs.map(slug => properties.find(p => p.slug === slug)).filter(Boolean)

export default function PuertoVallartaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaPageLayout
        eyebrow="Bahía de Banderas"
        title="Places to Stay Near Puerto Vallarta"
        subtitle="14 luxury villas across three Riviera Nayarit towns, all a short drive from Puerto Vallarta International Airport."
        heroImage="https://res.cloudinary.com/dwutnv1bb/image/upload/terrazas_01.jpg"
      >
        <Section title="The Honest Geography">
          <p>
            If you're searching for places to stay near Puerto Vallarta, here's what you should know: MAR
            Collection's villas aren't inside Puerto Vallarta's city limits. They're on Bahía de Banderas —
            the same bay Puerto Vallarta sits on — in the neighboring Riviera Nayarit towns of Punta Mita,
            Bucerías, and La Cruz de Huanacaxtle, just across the state line in Nayarit. Depending on the town,
            that's roughly 20 to 45 minutes from Puerto Vallarta International Airport (PVR) and downtown
            Puerto Vallarta by car.
          </p>
          <p>
            For many travelers, that trade-off is the point: more privacy, more beachfront, and lower density
            than the city's hotel zone, while still being a short drive from Puerto Vallarta's restaurants,
            nightlife, and airport.
          </p>
        </Section>

        <Section title="Choose Your Area">
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
                    {area.count} {area.count === 1 ? 'property' : 'properties'} &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Featured Villas">
          <div className="grid sm:grid-cols-3 gap-6 not-prose">
            {featured.map(p => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
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
            Want a deeper comparison?{' '}
            <Link href="/guides/where-to-stay-puerto-vallarta-area" className="text-gold underline hover:text-navy">
              Read our full where-to-stay guide
            </Link>{' '}
            or check{' '}
            <Link href="/guides/airport-transfers-puerto-vallarta" className="text-gold underline hover:text-navy">
              airport transfer times and options
            </Link>.
          </p>
        </Section>
      </AreaPageLayout>
    </>
  )
}
