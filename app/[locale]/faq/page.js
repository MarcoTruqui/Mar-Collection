import Link from '@/components/LocaleLink'
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    metaTitle: 'FAQ — MAR Collection Villa Rentals Near Puerto Vallarta',
    metaDescription: 'Common questions about booking a MAR Collection villa near Puerto Vallarta: location, distances, booking process, and what to expect in Punta Mita, Bucerías, and La Cruz de Huanacaxtle.',
    breadcrumbHome: 'Home',
    eyebrow: 'Good to Know',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about staying with MAR Collection near Puerto Vallarta.',
    stillQuestions: 'Still have questions?',
    contactUs: 'Contact Us',
    faqs: [
      { question: 'Where exactly are MAR Collection properties located?', answer: 'All MAR Collection villas are on Bahía de Banderas in the Riviera Nayarit region of Mexico, across three towns: Punta Mita, Bucerías, and La Cruz de Huanacaxtle. None are inside Puerto Vallarta itself, but all are within a 20-45 minute drive of Puerto Vallarta International Airport (PVR).' },
      { question: 'Which MAR Collection area is closest to Puerto Vallarta?', answer: 'Bucerías is the closest, about 20-25 minutes from Puerto Vallarta International Airport. La Cruz de Huanacaxtle is next at about 30-35 minutes, and Punta Mita is furthest at about 40-45 minutes.' },
      { question: 'How do I book a villa?', answer: 'Browse live availability on the Properties page, then submit a booking request through the property page, the Contact page, or WhatsApp. Our team confirms availability and walks you through payment directly.' },
      { question: 'Is there a minimum stay?', answer: 'Minimum stay requirements vary by property and season. Check the availability calendar on each property page, or contact us directly for specifics on your dates.' },
      { question: 'Do properties include daily housekeeping and concierge service?', answer: 'Most MAR Collection villas include daily housekeeping and concierge service as standard. Check the amenities list on each property page for exact inclusions.' },
      { question: 'Are the prices shown per night or per stay?', answer: 'Rates are shown per night. When you select check-in and check-out dates, the site calculates your total stay cost including applicable cleaning and service fees.' },
      { question: 'Do I need a rental car?', answer: "It depends on the area. Bucerías and La Cruz de Huanacaxtle have walkable town centers, while Punta Mita's gated communities are typically navigated by golf cart (included with several properties) or car. A rental car or arranged transfer is recommended for exploring beyond your immediate area or visiting Puerto Vallarta." },
    ],
  },
  es: {
    metaTitle: 'Preguntas Frecuentes — Renta de Villas MAR Collection Cerca de Puerto Vallarta',
    metaDescription: 'Preguntas comunes sobre cómo reservar una villa de MAR Collection cerca de Puerto Vallarta: ubicación, distancias, proceso de reserva y qué esperar en Punta Mita, Bucerías y La Cruz de Huanacaxtle.',
    breadcrumbHome: 'Inicio',
    eyebrow: 'Bueno Saberlo',
    title: 'Preguntas Frecuentes',
    subtitle: 'Todo lo que necesitas saber para hospedarte con MAR Collection cerca de Puerto Vallarta.',
    stillQuestions: '¿Todavía tienes preguntas?',
    contactUs: 'Contáctanos',
    faqs: [
      { question: '¿Dónde exactamente están ubicadas las propiedades de MAR Collection?', answer: 'Todas las villas de MAR Collection están en la Bahía de Banderas, en la región de la Riviera Nayarit en México, repartidas en tres pueblos: Punta Mita, Bucerías y La Cruz de Huanacaxtle. Ninguna está dentro de Puerto Vallarta, pero todas están a 20-45 minutos en auto del Aeropuerto Internacional de Puerto Vallarta (PVR).' },
      { question: '¿Qué zona de MAR Collection está más cerca de Puerto Vallarta?', answer: 'Bucerías es la más cercana, a unos 20-25 minutos del Aeropuerto Internacional de Puerto Vallarta. Le sigue La Cruz de Huanacaxtle con unos 30-35 minutos, y Punta Mita es la más lejana con unos 40-45 minutos.' },
      { question: '¿Cómo reservo una villa?', answer: 'Consulta la disponibilidad en tiempo real en la página de Propiedades, luego envía una solicitud de reserva a través de la página de la propiedad, la página de Contacto o WhatsApp. Nuestro equipo confirma la disponibilidad y te guía directamente en el pago.' },
      { question: '¿Existe una estadía mínima?', answer: 'Los requisitos de estadía mínima varían según la propiedad y la temporada. Consulta el calendario de disponibilidad en cada página de propiedad, o contáctanos directamente para conocer detalles de tus fechas.' },
      { question: '¿Las propiedades incluyen limpieza diaria y servicio de concierge?', answer: 'La mayoría de las villas de MAR Collection incluyen limpieza diaria y servicio de concierge como estándar. Consulta la lista de amenidades en cada página de propiedad para ver las inclusiones exactas.' },
      { question: '¿Los precios mostrados son por noche o por estadía?', answer: 'Las tarifas se muestran por noche. Cuando seleccionas fechas de check-in y check-out, el sitio calcula el costo total de tu estadía incluyendo las tarifas de limpieza y servicio aplicables.' },
      { question: '¿Necesito un auto rentado?', answer: 'Depende de la zona. Bucerías y La Cruz de Huanacaxtle tienen centros caminables, mientras que las comunidades privadas de Punta Mita se recorren normalmente en carrito de golf (incluido con varias propiedades) o en auto. Se recomienda un auto rentado o transporte arreglado para explorar más allá de tu zona inmediata o visitar Puerto Vallarta.' },
    ],
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/faq', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function FaqPage({ params }) {
  const c = copy[params.locale] ?? copy.en
  const jsonLd = [
    breadcrumbJsonLd([
      { name: c.breadcrumbHome, path: '/' },
      { name: 'FAQ', path: '/faq' },
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
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">{c.title}</h1>
        <p className="text-white/60 max-w-xl mx-auto">
          {c.subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {c.faqs.map(({ question, answer }) => (
            <div key={question} className="border-b border-gray-100 pb-8 last:border-0">
              <h2 className="font-serif text-xl text-navy mb-2">{question}</h2>
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">{c.stillQuestions}</p>
          <Link
            href="/contact"
            className="inline-block bg-navy text-white font-semibold px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-colors"
          >
            {c.contactUs}
          </Link>
        </div>
      </div>
    </div>
  )
}
