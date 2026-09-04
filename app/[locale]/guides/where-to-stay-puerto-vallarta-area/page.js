import Link from '@/components/LocaleLink'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    metaTitle: 'Where to Stay Near Puerto Vallarta: Punta Mita vs. Bucerías vs. La Cruz de Huanacaxtle',
    metaDescription: 'Comparing the three Riviera Nayarit towns near Puerto Vallarta — Punta Mita, Bucerías, and La Cruz de Huanacaxtle — by distance, vibe, and who each is best for.',
    breadcrumbHome: 'Home',
    breadcrumbGuides: 'Guides',
    breadcrumbSelf: 'Where to Stay Near Puerto Vallarta',
    eyebrow: 'Guide',
    title: 'Where to Stay Near Puerto Vallarta',
    subtitle: 'Punta Mita, Bucerías, and La Cruz de Huanacaxtle, compared.',
    intro: "Puerto Vallarta gets the name recognition, but a lot of the best places to stay on Bahía de Banderas are technically outside the city, in the neighboring Riviera Nayarit towns of Punta Mita, Bucerías, and La Cruz de Huanacaxtle. Each sits on the same bay, each is a manageable drive from Puerto Vallarta International Airport (PVR), and each has a distinct character. Here's how they compare.",
    tableHeaders: { area: 'Area', drive: 'Drive from PVR Airport', character: 'Character', bestFor: 'Best For' },
    rows: [
      { area: 'Bucerías', drive: '~20-25 min', character: 'Walkable art-and-beach town', bestFor: 'First-time visitors, easy airport access, walkable dining' },
      { area: 'La Cruz de Huanacaxtle', drive: '~30-35 min', character: 'Quiet marina village', bestFor: 'Travelers wanting a slower pace, boating, whale watching' },
      { area: 'Punta Mita', drive: '~40-45 min', character: 'Gated luxury peninsula', bestFor: 'Privacy, golf, surf, larger groups wanting resort-style seclusion' },
    ],
    buceriasTitle: 'Bucerías: closest to the airport',
    buceriasBody: "Bucerías is the nearest of the three to Puerto Vallarta, just across the Ameca River in Nayarit, about 20-25 minutes from PVR. It has a walkable town center with cobblestone streets, art galleries, and long-running seafood restaurants, alongside a beach that runs for miles along the bay. It's the practical choice if you want easy airport access and a town you can explore on foot.",
    buceriasLink: 'See Bucerías villas',
    laCruzTitle: 'La Cruz de Huanacaxtle: the quiet marina town',
    laCruzBody: "About 30-35 minutes from PVR, La Cruz de Huanacaxtle grew up as a fishing village and still feels that way, built around a working marina instead of a resort corridor. It's known for its Friday market, live music, and being a common departure point for winter whale watching tours. It suits travelers who want a slower pace without giving up good restaurants and easy Puerto Vallarta access.",
    laCruzLink: 'See La Cruz de Huanacaxtle villas',
    puntaMitaTitle: 'Punta Mita: privacy, golf, and surf',
    puntaMitaBody: "Furthest from the airport at about 40-45 minutes, Punta Mita occupies the peninsula at the northern tip of Bahía de Banderas. Most properties sit inside gated communities, and a golf cart (often included with your rental) is the standard way to get around. It's the right choice if privacy, golf, and surf matter more to you than a short airport transfer.",
    puntaMitaLink: 'See Punta Mita villas',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'Is Punta Mita or Bucerías better for a family trip?', answer: 'Both work well for families. Bucerías suits families who want to walk to restaurants and keep the airport transfer short. Punta Mita suits families who want a gated, resort-style environment with a golf cart to get around and calmer swimming beaches.' },
      { question: 'Which area is quietest?', answer: 'La Cruz de Huanacaxtle is generally the quietest of the three, with a smaller town center built around its marina rather than a beach strip or resort corridor.' },
      { question: 'Can I visit Puerto Vallarta from any of these areas as a day trip?', answer: 'Yes. All three towns are within about 20-45 minutes of downtown Puerto Vallarta by car, making a day trip into the city straightforward from any of them.' },
    ],
    nextPre: 'Next:',
    nextLink: 'How to get from Puerto Vallarta Airport to each area',
  },
  es: {
    metaTitle: 'Dónde Hospedarse Cerca de Puerto Vallarta: Punta Mita vs. Bucerías vs. La Cruz de Huanacaxtle',
    metaDescription: 'Comparación de los tres pueblos de la Riviera Nayarit cerca de Puerto Vallarta — Punta Mita, Bucerías y La Cruz de Huanacaxtle — por distancia, ambiente y para quién es mejor cada uno.',
    breadcrumbHome: 'Inicio',
    breadcrumbGuides: 'Guías',
    breadcrumbSelf: 'Dónde Hospedarse Cerca de Puerto Vallarta',
    eyebrow: 'Guía',
    title: 'Dónde Hospedarse Cerca de Puerto Vallarta',
    subtitle: 'Punta Mita, Bucerías y La Cruz de Huanacaxtle, comparados.',
    intro: 'Puerto Vallarta tiene el reconocimiento del nombre, pero muchos de los mejores lugares para hospedarse en la Bahía de Banderas están técnicamente fuera de la ciudad, en los pueblos vecinos de la Riviera Nayarit: Punta Mita, Bucerías y La Cruz de Huanacaxtle. Cada uno está en la misma bahía, cada uno tiene un trayecto manejable desde el Aeropuerto Internacional de Puerto Vallarta (PVR), y cada uno tiene un carácter distinto. Así se comparan.',
    tableHeaders: { area: 'Zona', drive: 'Trayecto desde el Aeropuerto PVR', character: 'Carácter', bestFor: 'Ideal Para' },
    rows: [
      { area: 'Bucerías', drive: '~20-25 min', character: 'Pueblo caminable de arte y playa', bestFor: 'Visitantes primerizos, fácil acceso al aeropuerto, restaurantes a pie' },
      { area: 'La Cruz de Huanacaxtle', drive: '~30-35 min', character: 'Pueblo tranquilo de marina', bestFor: 'Viajeros que buscan un ritmo más lento, náutica, avistamiento de ballenas' },
      { area: 'Punta Mita', drive: '~40-45 min', character: 'Península privada de lujo', bestFor: 'Privacidad, golf, surf, grupos grandes que buscan aislamiento tipo resort' },
    ],
    buceriasTitle: 'Bucerías: la más cercana al aeropuerto',
    buceriasBody: 'Bucerías es la más cercana de las tres a Puerto Vallarta, cruzando el Río Ameca en Nayarit, a unos 20-25 minutos del PVR. Tiene un centro caminable con calles empedradas, galerías de arte y restaurantes de mariscos de larga tradición, además de una playa que se extiende por kilómetros a lo largo de la bahía. Es la opción práctica si buscas fácil acceso al aeropuerto y un pueblo que puedas explorar a pie.',
    buceriasLink: 'Ver villas en Bucerías',
    laCruzTitle: 'La Cruz de Huanacaxtle: el tranquilo pueblo de marina',
    laCruzBody: 'A unos 30-35 minutos del PVR, La Cruz de Huanacaxtle creció como pueblo pesquero y todavía se siente así, construido alrededor de una marina activa en lugar de un corredor de resorts. Es conocido por su mercado del viernes, música en vivo y ser un punto de salida común para tours de avistamiento de ballenas en invierno. Es ideal para viajeros que buscan un ritmo más lento sin renunciar a buenos restaurantes y fácil acceso a Puerto Vallarta.',
    laCruzLink: 'Ver villas en La Cruz de Huanacaxtle',
    puntaMitaTitle: 'Punta Mita: privacidad, golf y surf',
    puntaMitaBody: 'La más lejana del aeropuerto con unos 40-45 minutos, Punta Mita ocupa la península en la punta norte de la Bahía de Banderas. La mayoría de las propiedades están dentro de comunidades privadas, y un carrito de golf (a menudo incluido con tu renta) es la forma habitual de moverse. Es la opción correcta si la privacidad, el golf y el surf te importan más que un traslado corto desde el aeropuerto.',
    puntaMitaLink: 'Ver villas en Punta Mita',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { question: '¿Punta Mita o Bucerías es mejor para un viaje familiar?', answer: 'Ambas funcionan bien para familias. Bucerías es ideal para familias que quieren caminar a restaurantes y mantener corto el traslado desde el aeropuerto. Punta Mita es ideal para familias que buscan un ambiente privado tipo resort con carrito de golf para moverse y playas más tranquilas para nadar.' },
      { question: '¿Cuál zona es la más tranquila?', answer: 'La Cruz de Huanacaxtle es generalmente la más tranquila de las tres, con un centro más pequeño construido alrededor de su marina en lugar de una franja de playa o corredor de resorts.' },
      { question: '¿Puedo visitar Puerto Vallarta desde cualquiera de estas zonas en una excursión de un día?', answer: 'Sí. Los tres pueblos están a unos 20-45 minutos del centro de Puerto Vallarta en auto, lo que hace sencilla una excursión de un día a la ciudad desde cualquiera de ellos.' },
    ],
    nextPre: 'Siguiente:',
    nextLink: 'Cómo llegar del Aeropuerto de Puerto Vallarta a cada zona',
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/guides/where-to-stay-puerto-vallarta-area', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function WhereToStayGuide({ params }) {
  const c = copy[params.locale] ?? copy.en
  const jsonLd = [
    breadcrumbJsonLd([
      { name: c.breadcrumbHome, path: '/' },
      { name: c.breadcrumbGuides, path: '/guides' },
      { name: c.breadcrumbSelf, path: '/guides/where-to-stay-puerto-vallarta-area' },
    ], params.locale),
    faqJsonLd(c.faqs),
  ]

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-navy pt-24 pb-16 px-4 text-center">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">{c.eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-3xl mx-auto">
          {c.title}
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
          {c.subtitle}
        </p>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>{c.intro}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-navy">
                <th className="py-3 pr-4 font-serif text-navy">{c.tableHeaders.area}</th>
                <th className="py-3 pr-4 font-serif text-navy">{c.tableHeaders.drive}</th>
                <th className="py-3 pr-4 font-serif text-navy">{c.tableHeaders.character}</th>
                <th className="py-3 font-serif text-navy">{c.tableHeaders.bestFor}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map(row => (
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
            <h2 className="font-serif text-2xl text-navy mb-3">{c.buceriasTitle}</h2>
            <p className="text-gray-600 leading-relaxed">
              {c.buceriasBody}{' '}
              <Link href="/bucerias" className="text-gold underline hover:text-navy">{c.buceriasLink} &rarr;</Link>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy mb-3">{c.laCruzTitle}</h2>
            <p className="text-gray-600 leading-relaxed">
              {c.laCruzBody}{' '}
              <Link href="/la-cruz-de-huanacaxtle" className="text-gold underline hover:text-navy">{c.laCruzLink} &rarr;</Link>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy mb-3">{c.puntaMitaTitle}</h2>
            <p className="text-gray-600 leading-relaxed">
              {c.puntaMitaBody}{' '}
              <Link href="/punta-mita" className="text-gold underline hover:text-navy">{c.puntaMitaLink} &rarr;</Link>
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-navy mb-5">{c.faqTitle}</h2>
          <div className="space-y-6">
            {c.faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-serif text-lg text-navy mb-1">{question}</h3>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {c.nextPre} <Link href="/guides/airport-transfers-puerto-vallarta" className="text-gold underline hover:text-navy">
              {c.nextLink}
            </Link>
          </p>
        </div>
      </article>
    </div>
  )
}
