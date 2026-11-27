import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import IntroLoader from '@/components/IntroLoader'
import { LanguageProvider } from '@/lib/LanguageContext'
import { buildMetadata } from '@/lib/seo'
import { BRAND_NAME, BRAND_LOGO, BRAND_OG_IMAGE, INSTAGRAM_URL, FACEBOOK_URL, CONTACT_EMAILS } from '@/lib/brand'
import { Cormorant_Garamond, Jost } from 'next/font/google'

// Display: Cormorant Garamond (light, editorial). Text: Jost (clean, Futura-like,
// the kind of sans you see on Mediterranean hotel signage).
const display = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.truqui.com'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

const copy = {
  en: {
    title: `${BRAND_NAME} — Luxury Villas Near Puerto Vallarta | Punta Mita, Bucerías, Bahía de Banderas`,
    description: 'Handpicked luxury villas and estates on Bahía de Banderas, minutes from Puerto Vallarta — in Punta Mita, Bucerías, and La Cruz de Huanacaxtle, Mexico.',
  },
  es: {
    title: `${BRAND_NAME} — Villas de Lujo Cerca de Puerto Vallarta | Punta Mita, Bucerías, Bahía de Banderas`,
    description: 'Villas y residencias de lujo seleccionadas en la Bahía de Banderas, a minutos de Puerto Vallarta — en Punta Mita, Bucerías y La Cruz de Huanacaxtle, México.',
  },
}

// Bone browser chrome on phones (address bar colour)
export const viewport = { themeColor: '#F6F2EB' }

export function generateMetadata({ params }) {
  const c = copy[params.locale] ?? copy.en
  return {
    ...buildMetadata({ path: '/', locale: params.locale, ...c }),
    metadataBase: new URL(SITE_URL),
    title: { default: c.title, template: `%s | ${BRAND_NAME}` },
    keywords: 'places to stay in Puerto Vallarta, Puerto Vallarta villa rental, Punta Mita luxury rentals, Bahía de Banderas vacation rental, Bucerías villa, Riviera Nayarit, La Cruz de Huanacaxtle, Mexico vacation rental',
    // "CT" icon mark: browser tab, bookmarks, phone home screen
    icons: {
      icon: [
        { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/brand/favicon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: '/brand/favicon-32.png',
      apple: { url: '/brand/apple-touch-icon.png', sizes: '180x180' },
    },
    manifest: '/site.webmanifest',
    verification: {
      google: '5JY5ELASiwjqmWfNLREwacmWoDX0pFgBjD5NUP4aS-4',
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: SITE_URL,
      siteName: BRAND_NAME,
      type: 'website',
      images: [{ url: BRAND_OG_IMAGE, width: 1200, height: 630, alt: BRAND_NAME }],
    },
  }
}

const organizationJsonLd = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${BRAND_LOGO}`,
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
    email: CONTACT_EMAILS.en,
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
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${BRAND_LOGO}`,
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
    email: CONTACT_EMAILS.es,
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
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body className="bg-bone text-navy">
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
