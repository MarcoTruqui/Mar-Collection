import Link from 'next/link'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'

export const metadata = {
  title: 'Getting from Puerto Vallarta Airport (PVR) to Punta Mita, Bucerías & La Cruz',
  description: 'Drive times and transportation options from Puerto Vallarta International Airport (PVR) to Punta Mita, Bucerías, and La Cruz de Huanacaxtle.',
  alternates: { canonical: '/guides/airport-transfers-puerto-vallarta' },
  openGraph: {
    title: 'Puerto Vallarta Airport to Riviera Nayarit: Transfer Guide',
    description: 'Drive times from PVR to Punta Mita, Bucerías, and La Cruz de Huanacaxtle.',
    url: '/guides/airport-transfers-puerto-vallarta',
  },
}

const distances = [
  { area: 'Bucerías', drive: '~20-25 minutes', notes: 'Closest area; a short, straightforward drive north along the coastal highway.' },
  { area: 'La Cruz de Huanacaxtle', drive: '~30-35 minutes', notes: 'A bit further north than Bucerías, on the same coastal highway.' },
  { area: 'Punta Mita', drive: '~40-45 minutes', notes: 'Furthest of the three, at the northern tip of the bay; the last stretch runs through Punta Mita\'s peninsula road.' },
]

const faqs = [
  {
    question: 'What is the airport code for Puerto Vallarta?',
    answer: 'Puerto Vallarta International Airport uses the code PVR (Licenciado Gustavo Díaz Ordaz International Airport).',
  },
  {
    question: 'Is it better to rent a car or arrange a private transfer?',
    answer: 'It depends on your plans. A rental car gives you flexibility to explore multiple towns and visit Puerto Vallarta on your own schedule. A private transfer is more convenient if you plan to stay mostly at your villa and don\'t want to navigate driving in Mexico. Many guests do one or the other rather than relying on taxis for every trip, since the towns are spread along the bay rather than clustered together.',
  },
  {
    question: 'Do I need to arrange transportation in advance?',
    answer: 'It\'s a good idea, especially for Punta Mita given the longer drive. Contact MAR Collection ahead of your stay and we can advise on transfer options for your specific villa.',
  },
]

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: 'Airport Transfers', path: '/guides/airport-transfers-puerto-vallarta' },
  ]),
  faqJsonLd(faqs),
]

export default function AirportTransfersGuide() {
  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-navy pt-24 pb-16 px-4 text-center">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Guide</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-3xl mx-auto">
          Puerto Vallarta Airport to Riviera Nayarit
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
          Drive times and options for reaching Punta Mita, Bucerías, and La Cruz de Huanacaxtle from PVR.
        </p>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            All three of the Riviera Nayarit towns where MAR Collection has properties are reached the same
            way from Puerto Vallarta International Airport (PVR): north along the coastal highway that follows
            Bahía de Banderas. The main difference is how far you're going.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-navy">
                <th className="py-3 pr-4 font-serif text-navy">Destination</th>
                <th className="py-3 pr-4 font-serif text-navy">Approx. Drive Time</th>
                <th className="py-3 font-serif text-navy">Notes</th>
              </tr>
            </thead>
            <tbody>
              {distances.map(row => (
                <tr key={row.area} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-navy">{row.area}</td>
                  <td className="py-3 pr-4 text-gray-600">{row.drive}</td>
                  <td className="py-3 text-gray-600">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">
            Drive times are approximate and vary with traffic, time of day, and season.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-navy mb-3">Transportation Options</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              <strong className="text-navy">Rental car:</strong> Available at the airport, and the most
              flexible option if you plan to explore multiple towns or make day trips into Puerto Vallarta.
            </p>
            <p>
              <strong className="text-navy">Private transfer:</strong> Pre-arranged transfers take you
              directly to your villa without the logistics of renting and driving. Contact MAR Collection
              ahead of your stay for guidance on arranging one.
            </p>
            <p>
              <strong className="text-navy">Authorized airport taxis:</strong> Available at the airport's
              official taxi stand for point-to-point trips.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-navy mb-5">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-serif text-lg text-navy mb-1">{question}</h3>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Back to: <Link href="/guides/where-to-stay-puerto-vallarta-area" className="text-gold underline hover:text-navy">
              Where to Stay Near Puerto Vallarta
            </Link>
          </p>
        </div>
      </article>
    </div>
  )
}
