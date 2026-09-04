import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import IntroLoader from '@/components/IntroLoader'
import { LanguageProvider } from '@/lib/LanguageContext'
import { buildMetadata } from '@/lib/seo'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.truqui.com'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

const copy = {
  en: {
    title: 'MAR Collection — Luxury Villas Near Puerto Vallarta | Punta Mita, Bucerías, Bahía de Banderas',
    description: 'Handpicked luxury villas and estates on Bahía de Banderas, minutes from Puerto Vallarta — in Punta Mita, Bucerías, and La Cruz de Huanacaxtle, Mexico.',
  },
  es: {
    title: 'MAR Collection — Villas de Lujo Cerca de Puerto Vallarta | Punta Mita, Bucerías, Bahía de Banderas',
    description: 'Villas y residencias de lujo seleccionadas en la Bahía de Banderas, a minutos de Puerto Vallarta — en Punta Mita, Bucerías y La Cruz de Huanacaxtle, México.',
  },
}

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return {
    ...buildMetadata({ path: '/', locale: params.locale, ...c }),
    metadataBase: new URL(SITE_URL),
    title: { default: c.title, template: '%s | MAR Collection' },
    keywords: 'places to stay in Puerto Vallarta, Puerto Vallarta villa rental, Punta Mita luxury rentals, Bahía de Banderas vacation rental, Bucerías villa, Riviera Nayarit, La Cruz de Huanacaxtle, Mexico vacation rental',
    icons: {
      icon: '/images/logo.svg',
      shortcut: '/images/logo.svg',
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: SITE_URL,
      siteName: 'MAR Collection',
      type: 'website',
    },
  }
}

const organizationJsonLd = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'MAR Collection',
    url: SITE_URL,
    logo: `${SITE_URL}/images/mar-logo.png`,
    description: 'Luxury villa rentals on Bahía de Banderas near Puerto Vallarta, Mexico — Punta Mita, Bucerías, and La Cruz de Huanacaxtle.',
    areaServed: [
      { '@type': 'Place', name: 'Puerto Vallarta, Jalisco, Mexico' },
      { '@type': 'Place', name: 'Punta Mita, Nayarit, Mexico' },
      { '@type': 'Place', name: 'Bucerías, Nayarit, Mexico' },
      { '@type': 'Place', name: 'La Cruz de Huanacaxtle, Nayarit, Mexico' },
      { '@type': 'Place', name: 'Bahía de Banderas, Mexico' },
    ],
  },
  es: {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'MAR Collection',
    url: SITE_URL,
    logo: `${SITE_URL}/images/mar-logo.png`,
    description: 'Renta de villas de lujo en la Bahía de Banderas cerca de Puerto Vallarta, México — Punta Mita, Bucerías y La Cruz de Huanacaxtle.',
    areaServed: [
      { '@type': 'Place', name: 'Puerto Vallarta, Jalisco, México' },
      { '@type': 'Place', name: 'Punta Mita, Nayarit, México' },
      { '@type': 'Place', name: 'Bucerías, Nayarit, México' },
      { '@type': 'Place', name: 'La Cruz de Huanacaxtle, Nayarit, México' },
      { '@type': 'Place', name: 'Bahía de Banderas, México' },
    ],
  },
}

export default function RootLayout({ children, params }) {
  const { locale } = params

  return (
    <html lang={locale}>
      <body className="bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd[locale] ?? organizationJsonLd.en) }}
        />
        <LanguageProvider locale={locale}>
          <IntroLoader />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
