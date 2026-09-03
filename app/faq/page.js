import Link from 'next/link'
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/structuredData'

export const metadata = {
  title: 'FAQ — MAR Collection Villa Rentals Near Puerto Vallarta',
  description: 'Common questions about booking a MAR Collection villa near Puerto Vallarta: location, distances, booking process, and what to expect in Punta Mita, Bucerías, and La Cruz de Huanacaxtle.',
  alternates: { canonical: '/faq' },
}

const faqs = [
  {
    question: 'Where exactly are MAR Collection properties located?',
    answer: 'All MAR Collection villas are on Bahía de Banderas in the Riviera Nayarit region of Mexico, across three towns: Punta Mita, Bucerías, and La Cruz de Huanacaxtle. None are inside Puerto Vallarta itself, but all are within a 20-45 minute drive of Puerto Vallarta International Airport (PVR).',
  },
  {
    question: 'Which MAR Collection area is closest to Puerto Vallarta?',
    answer: 'Bucerías is the closest, about 20-25 minutes from Puerto Vallarta International Airport. La Cruz de Huanacaxtle is next at about 30-35 minutes, and Punta Mita is furthest at about 40-45 minutes.',
  },
  {
    question: 'How do I book a villa?',
    answer: 'Browse live availability on the Properties page, then submit a booking request through the property page, the Contact page, or WhatsApp. Our team confirms availability and walks you through payment directly.',
  },
  {
    question: 'Is there a minimum stay?',
    answer: 'Minimum stay requirements vary by property and season. Check the availability calendar on each property page, or contact us directly for specifics on your dates.',
  },
  {
    question: 'Do properties include daily housekeeping and concierge service?',
    answer: 'Most MAR Collection villas include daily housekeeping and concierge service as standard. Check the amenities list on each property page for exact inclusions.',
  },
  {
    question: 'Are the prices shown per night or per stay?',
    answer: 'Rates are shown per night. When you select check-in and check-out dates, the site calculates your total stay cost including applicable cleaning and service fees.',
  },
  {
    question: 'Do I need a rental car?',
    answer: 'It depends on the area. Bucerías and La Cruz de Huanacaxtle have walkable town centers, while Punta Mita\'s gated communities are typically navigated by golf cart (included with several properties) or car. A rental car or arranged transfer is recommended for exploring beyond your immediate area or visiting Puerto Vallarta.',
  },
]

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ]),
  faqJsonLd(faqs),
]

export default function FaqPage() {
  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-navy pt-24 pb-16 px-4 text-center">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Good to Know</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Everything you need to know about staying with MAR Collection near Puerto Vallarta.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="border-b border-gray-100 pb-8 last:border-0">
              <h2 className="font-serif text-xl text-navy mb-2">{question}</h2>
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-block bg-navy text-white font-semibold px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
