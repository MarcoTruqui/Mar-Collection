import Link from '@/components/LocaleLink'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    metaTitle: 'Getting from Puerto Vallarta Airport (PVR) to Punta Mita, Bucerías & La Cruz',
    metaDescription: 'Drive times and transportation options from Puerto Vallarta International Airport (PVR) to Punta Mita, Bucerías, and La Cruz de Huanacaxtle.',
    breadcrumbHome: 'Home',
    breadcrumbGuides: 'Guides',
    breadcrumbSelf: 'Airport Transfers',
    eyebrow: 'Guide',
    title: 'Puerto Vallarta Airport to Riviera Nayarit',
    subtitle: 'Drive times and options for reaching Punta Mita, Bucerías, and La Cruz de Huanacaxtle from PVR.',
    intro: "All three of the Riviera Nayarit towns where MAR Collection has properties are reached the same way from Puerto Vallarta International Airport (PVR): north along the coastal highway that follows Bahía de Banderas. The main difference is how far you're going.",
    tableHeaders: { destination: 'Destination', drive: 'Approx. Drive Time', notes: 'Notes' },
    distances: [
      { area: 'Bucerías', drive: '~20-25 minutes', notes: 'Closest area; a short, straightforward drive north along the coastal highway.' },
      { area: 'La Cruz de Huanacaxtle', drive: '~30-35 minutes', notes: 'A bit further north than Bucerías, on the same coastal highway.' },
      { area: 'Punta Mita', drive: '~40-45 minutes', notes: "Furthest of the three, at the northern tip of the bay; the last stretch runs through Punta Mita's peninsula road." },
    ],
    driveNote: 'Drive times are approximate and vary with traffic, time of day, and season.',
    optionsTitle: 'Transportation Options',
    optionRentalLabel: 'Rental car:',
    optionRentalBody: 'Available at the airport, and the most flexible option if you plan to explore multiple towns or make day trips into Puerto Vallarta.',
    optionTransferLabel: 'Private transfer:',
    optionTransferBody: 'Pre-arranged transfers take you directly to your villa without the logistics of renting and driving. Contact MAR Collection ahead of your stay for guidance on arranging one.',
    optionTaxiLabel: 'Authorized airport taxis:',
    optionTaxiBody: "Available at the airport's official taxi stand for point-to-point trips.",
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'What is the airport code for Puerto Vallarta?', answer: 'Puerto Vallarta International Airport uses the code PVR (Licenciado Gustavo Díaz Ordaz International Airport).' },
      { question: 'Is it better to rent a car or arrange a private transfer?', answer: "It depends on your plans. A rental car gives you flexibility to explore multiple towns and visit Puerto Vallarta on your own schedule. A private transfer is more convenient if you plan to stay mostly at your villa and don't want to navigate driving in Mexico. Many guests do one or the other rather than relying on taxis for every trip, since the towns are spread along the bay rather than clustered together." },
      { question: 'Do I need to arrange transportation in advance?', answer: "It's a good idea, especially for Punta Mita given the longer drive. Contact MAR Collection ahead of your stay and we can advise on transfer options for your specific villa." },
    ],
    backTo: 'Back to:',
    backLink: 'Where to Stay Near Puerto Vallarta',
  },
  es: {
    metaTitle: 'Cómo Llegar del Aeropuerto de Puerto Vallarta (PVR) a Punta Mita, Bucerías y La Cruz',
    metaDescription: 'Tiempos de traslado y opciones de transporte desde el Aeropuerto Internacional de Puerto Vallarta (PVR) a Punta Mita, Bucerías y La Cruz de Huanacaxtle.',
    breadcrumbHome: 'Inicio',
    breadcrumbGuides: 'Guías',
    breadcrumbSelf: 'Traslados del Aeropuerto',
    eyebrow: 'Guía',
    title: 'Del Aeropuerto de Puerto Vallarta a la Riviera Nayarit',
    subtitle: 'Tiempos de traslado y opciones para llegar a Punta Mita, Bucerías y La Cruz de Huanacaxtle desde el PVR.',
    intro: 'A los tres pueblos de la Riviera Nayarit donde MAR Collection tiene propiedades se llega de la misma forma desde el Aeropuerto Internacional de Puerto Vallarta (PVR): hacia el norte por la carretera costera que bordea la Bahía de Banderas. La principal diferencia es qué tan lejos vas.',
    tableHeaders: { destination: 'Destino', drive: 'Tiempo Aprox. de Traslado', notes: 'Notas' },
    distances: [
      { area: 'Bucerías', drive: '~20-25 minutos', notes: 'La zona más cercana; un trayecto corto y directo hacia el norte por la carretera costera.' },
      { area: 'La Cruz de Huanacaxtle', drive: '~30-35 minutos', notes: 'Un poco más al norte que Bucerías, sobre la misma carretera costera.' },
      { area: 'Punta Mita', drive: '~40-45 minutos', notes: 'La más lejana de las tres, en la punta norte de la bahía; el último tramo pasa por el camino de la península de Punta Mita.' },
    ],
    driveNote: 'Los tiempos de traslado son aproximados y varían según el tráfico, la hora del día y la temporada.',
    optionsTitle: 'Opciones de Transporte',
    optionRentalLabel: 'Auto rentado:',
    optionRentalBody: 'Disponible en el aeropuerto, y la opción más flexible si planeas explorar varios pueblos o hacer excursiones de un día a Puerto Vallarta.',
    optionTransferLabel: 'Traslado privado:',
    optionTransferBody: 'Los traslados pre-arreglados te llevan directo a tu villa sin la logística de rentar y manejar. Contacta a MAR Collection antes de tu estadía para orientación sobre cómo arreglar uno.',
    optionTaxiLabel: 'Taxis autorizados del aeropuerto:',
    optionTaxiBody: 'Disponibles en la base oficial de taxis del aeropuerto para viajes de punto a punto.',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { question: '¿Cuál es el código del aeropuerto de Puerto Vallarta?', answer: 'El Aeropuerto Internacional de Puerto Vallarta usa el código PVR (Aeropuerto Internacional Licenciado Gustavo Díaz Ordaz).' },
      { question: '¿Es mejor rentar un auto o arreglar un traslado privado?', answer: 'Depende de tus planes. Un auto rentado te da flexibilidad para explorar varios pueblos y visitar Puerto Vallarta a tu propio ritmo. Un traslado privado es más conveniente si planeas quedarte principalmente en tu villa y no quieres manejar en México. Muchos huéspedes optan por una de las dos opciones en lugar de depender de taxis para cada viaje, ya que los pueblos están repartidos a lo largo de la bahía en vez de estar agrupados.' },
      { question: '¿Necesito arreglar el transporte con anticipación?', answer: 'Es buena idea, especialmente para Punta Mita dado el trayecto más largo. Contacta a MAR Collection antes de tu estadía y podemos orientarte sobre las opciones de traslado para tu villa específica.' },
    ],
    backTo: 'Regresar a:',
    backLink: 'Dónde Hospedarse Cerca de Puerto Vallarta',
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/guides/airport-transfers-puerto-vallarta', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function AirportTransfersGuide({ params }) {
  const c = copy[params.locale] ?? copy.en
  const jsonLd = [
    breadcrumbJsonLd([
      { name: c.breadcrumbHome, path: '/' },
      { name: c.breadcrumbGuides, path: '/guides' },
      { name: c.breadcrumbSelf, path: '/guides/airport-transfers-puerto-vallarta' },
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
                <th className="py-3 pr-4 font-serif text-navy">{c.tableHeaders.destination}</th>
                <th className="py-3 pr-4 font-serif text-navy">{c.tableHeaders.drive}</th>
                <th className="py-3 font-serif text-navy">{c.tableHeaders.notes}</th>
              </tr>
            </thead>
            <tbody>
              {c.distances.map(row => (
                <tr key={row.area} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-navy">{row.area}</td>
                  <td className="py-3 pr-4 text-gray-600">{row.drive}</td>
                  <td className="py-3 text-gray-600">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">
            {c.driveNote}
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-navy mb-3">{c.optionsTitle}</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              <strong className="text-navy">{c.optionRentalLabel}</strong> {c.optionRentalBody}
            </p>
            <p>
              <strong className="text-navy">{c.optionTransferLabel}</strong> {c.optionTransferBody}
            </p>
            <p>
              <strong className="text-navy">{c.optionTaxiLabel}</strong> {c.optionTaxiBody}
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
            {c.backTo} <Link href="/guides/where-to-stay-puerto-vallarta-area" className="text-gold underline hover:text-navy">
              {c.backLink}
            </Link>
          </p>
        </div>
      </article>
    </div>
  )
}
