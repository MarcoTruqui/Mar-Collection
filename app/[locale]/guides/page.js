import Link from '@/components/LocaleLink'
import Image from 'next/image'
import { breadcrumbJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'

const copy = {
  en: {
    metaTitle: 'Guides — Staying Near Puerto Vallarta',
    metaDescription: 'Practical guides to staying on Bahía de Banderas near Puerto Vallarta: where to stay, airport transfers, and what each Riviera Nayarit town offers.',
    breadcrumbHome: 'Home',
    eyebrow: 'Plan Your Trip',
    title: 'Guides',
    subtitle: 'Practical guides to staying on Bahía de Banderas, near Puerto Vallarta.',
    guides: [
      { slug: 'where-to-stay-puerto-vallarta-area', title: 'Where to Stay Near Puerto Vallarta: Punta Mita vs. Bucerías vs. La Cruz de Huanacaxtle', description: 'A side-by-side comparison of the three Riviera Nayarit towns near Puerto Vallarta, to help you pick the right base for your trip.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/terrazas_01.jpg' },
      { slug: 'airport-transfers-puerto-vallarta', title: 'Getting from Puerto Vallarta Airport (PVR) to Punta Mita, Bucerías, or La Cruz de Huanacaxtle', description: 'Drive times and transportation options from Puerto Vallarta International Airport to each Riviera Nayarit town.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_02.jpg' },
    ],
  },
  es: {
    metaTitle: 'Guías — Hospedaje Cerca de Puerto Vallarta',
    metaDescription: 'Guías prácticas para hospedarte en la Bahía de Banderas cerca de Puerto Vallarta: dónde hospedarte, traslados desde el aeropuerto y qué ofrece cada pueblo de la Riviera Nayarit.',
    breadcrumbHome: 'Inicio',
    eyebrow: 'Planea tu Viaje',
    title: 'Guías',
    subtitle: 'Guías prácticas para hospedarte en la Bahía de Banderas, cerca de Puerto Vallarta.',
    guides: [
      { slug: 'where-to-stay-puerto-vallarta-area', title: 'Dónde Hospedarse Cerca de Puerto Vallarta: Punta Mita vs. Bucerías vs. La Cruz de Huanacaxtle', description: 'Una comparación directa de los tres pueblos de la Riviera Nayarit cerca de Puerto Vallarta, para ayudarte a elegir la base correcta para tu viaje.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/terrazas_01.jpg' },
      { slug: 'airport-transfers-puerto-vallarta', title: 'Cómo Llegar del Aeropuerto de Puerto Vallarta (PVR) a Punta Mita, Bucerías o La Cruz de Huanacaxtle', description: 'Tiempos de traslado y opciones de transporte desde el Aeropuerto Internacional de Puerto Vallarta a cada pueblo de la Riviera Nayarit.', image: 'https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_02.jpg' },
    ],
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return buildMetadata({ path: '/guides', locale: params.locale, title: c.metaTitle, description: c.metaDescription })
}

export default function GuidesIndexPage({ params }) {
  const c = copy[params.locale] ?? copy.en
  const jsonLd = breadcrumbJsonLd([
    { name: c.breadcrumbHome, path: '/' },
    { name: c.title, path: '/guides' },
  ], params.locale)

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-8">
          {c.guides.map(guide => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl text-navy mb-2 leading-snug">{guide.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{guide.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
