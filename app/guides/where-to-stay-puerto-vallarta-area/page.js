import Link from 'next/link'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'

export const metadata = {
  title: 'Where to Stay Near Puerto Vallarta: Punta Mita vs. Bucerías vs. La Cruz de Huanacaxtle',
  description: 'Comparing the three Riviera Nayarit towns near Puerto Vallarta — Punta Mita, Bucerías, and La Cruz de Huanacaxtle — by distance, vibe, and who each is best for.',
  alternates: { canonical: '/guides/where-to-stay-puerto-vallarta-area' },
  openGraph: {
    title: 'Where to Stay Near Puerto Vallarta: A Comparison Guide',
    description: 'Punta Mita vs. Bucerías vs. La Cruz de Huanacaxtle, compared.',
    url: '/guides/where-to-stay-puerto-vallarta-area',
  },
}

const rows = [
  { area: 'Bucerías', drive: '~20-25 min', character: 'Walkable art-and-beach town', bestFor: 'First-time visitors, easy airport access, walkable dining' },
  { area: 'La Cruz de Huanacaxtle', drive: '~30-35 min', character: 'Quiet marina village', bestFor: 'Travelers wanting a slower pace, boating, whale watching' },
  { area: 'Punta Mita', drive: '~40-45 min', character: 'Gated luxury peninsula', bestFor: 'Privacy, golf, surf, larger groups wanting resort-style seclusion' },
]

const faqs = [
  {
    question: 'Is Punta Mita or Bucerías better for a family trip?',
    answer: 'Both work well for families. Bucerías suits families who want to walk to restaurants and keep the airport transfer short. Punta Mita suits families who want a gated, resort-style environment with a golf cart to get around and calmer swimming beaches.',
  },
  {
    question: 'Which area is quietest?',
    answer: 'La Cruz de Huanacaxtle is generally the quietest of the three, with a smaller town center built around its marina rather than a beach strip or resort corridor.',
  },
  {
    question: 'Can I visit Puerto Vallarta from any of these areas as a day trip?',
    answer: 'Yes. All three towns are within about 20-45 minutes of downtown Puerto Vallarta by car, making a day trip into the city straightforward from any of them.',
  },
]

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: 'Where to Stay Near Puerto Vallarta', path: '/guides/where-to-stay-puerto-vallarta-area' },
  ]),
  faqJsonLd(faqs),
]

export default function WhereToStayGuide() {
  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-navy pt-24 pb-16 px-4 text-center">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Guide</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-3xl mx-auto">
          Where to Stay Near Puerto Vallarta
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
          Punta Mita, Bucerías, and La Cruz de Huanacaxtle, compared.
        </p>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            Puerto Vallarta gets the name recognition, but a lot of the best places to stay on Bahía de
            Banderas are technically outside the city, in the neighboring Riviera Nayarit towns of Punta
            Mita, Bucerías, and La Cruz de Huanacaxtle. Each sits on the same bay, each is a manageable drive
            from Puerto Vallarta International Airport (PVR), and each has a distinct character. Here's how
            they compare.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-navy">
                <th className="py-3 pr-4 font-serif text-navy">Area</th>
                <th className="py-3 pr-4 font-serif text-navy">Drive from PVR Airport</th>
                <th className="py-3 pr-4 font-serif text-navy">Character</th>
                <th className="py-3 font-serif text-navy">Best For</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.area} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-navy">{row.area}</td>
                  <td className="py-3 pr-4 text-gray-600">{row.drive}</td>
                  <td className="py-3 pr-4 text-gray-600">{row.character}</td>
                  <td className="py-3 text-gray-600">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-navy mb-3">Bucerías: closest to the airport</h2>
            <p className="text-gray-600 leading-relaxed">
              Bucerías is the nearest of the three to Puerto Vallarta, just across the Ameca River in Nayarit,
              about 20-25 minutes from PVR. It has a walkable town center with cobblestone streets, art
              galleries, and long-running seafood restaurants, alongside a beach that runs for miles along the
              bay. It's the practical choice if you want easy airport access and a town you can explore on
              foot. <Link href="/bucerias" className="text-gold underline hover:text-navy">See Bucerías villas &rarr;</Link>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy mb-3">La Cruz de Huanacaxtle: the quiet marina town</h2>
            <p className="text-gray-600 leading-relaxed">
              About 30-35 minutes from PVR, La Cruz de Huanacaxtle grew up as a fishing village and still feels
              that way, built around a working marina instead of a resort corridor. It's known for its Friday
              market, live music, and being a common departure point for winter whale watching tours. It suits
              travelers who want a slower pace without giving up good restaurants and easy Puerto Vallarta
              access. <Link href="/la-cruz-de-huanacaxtle" className="text-gold underline hover:text-navy">See La Cruz de Huanacaxtle villas &rarr;</Link>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy mb-3">Punta Mita: privacy, golf, and surf</h2>
            <p className="text-gray-600 leading-relaxed">
              Furthest from the airport at about 40-45 minutes, Punta Mita occupies the peninsula at the
              northern tip of Bahía de Banderas. Most properties sit inside gated communities, and a golf cart
              (often included with your rental) is the standard way to get around. It's the right choice if
              privacy, golf, and surf matter more to you than a short airport transfer.{' '}
              <Link href="/punta-mita" className="text-gold underline hover:text-navy">See Punta Mita villas &rarr;</Link>
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
            Next: <Link href="/guides/airport-transfers-puerto-vallarta" className="text-gold underline hover:text-navy">
              How to get from Puerto Vallarta Airport to each area
            </Link>
          </p>
        </div>
      </article>
    </div>
  )
}
