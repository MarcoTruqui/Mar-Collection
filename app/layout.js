import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import IntroLoader from '@/components/IntroLoader'
import { LanguageProvider } from '@/lib/LanguageContext'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.truqui.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MAR Collection — Luxury Villas Near Puerto Vallarta | Punta Mita, Bucerías, Bahía de Banderas',
    template: '%s | MAR Collection',
  },
  description: 'Handpicked luxury villas and estates on Bahía de Banderas, minutes from Puerto Vallarta — in Punta Mita, Bucerías, and La Cruz de Huanacaxtle, Mexico.',
  keywords: 'places to stay in Puerto Vallarta, Puerto Vallarta villa rental, Punta Mita luxury rentals, Bahía de Banderas vacation rental, Bucerías villa, Riviera Nayarit, La Cruz de Huanacaxtle, Mexico vacation rental',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
  },
  openGraph: {
    title: 'MAR Collection — Luxury Villas Near Puerto Vallarta',
    description: 'Handpicked luxury villas on Bahía de Banderas, minutes from Puerto Vallarta, Mexico.',
    url: SITE_URL,
    siteName: 'MAR Collection',
    type: 'website',
  },
}

const organizationJsonLd = {
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
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
