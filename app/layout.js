import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import IntroLoader from '@/components/IntroLoader'
import { LanguageProvider } from '@/lib/LanguageContext'

export const metadata = {
  title: 'MAR Collection — Luxury Vacation Rentals in Riviera Nayarit',
  description: 'Handpicked luxury villas and estates in Punta Mita, Bucerías, and La Cruz de Huanacaxtle on the Mexican Pacific coast.',
  keywords: 'luxury villa rental, Riviera Nayarit, Punta Mita, Bucerías, La Cruz, Mexico vacation rental',
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
  },
  openGraph: {
    title: 'MAR Collection — Luxury Vacation Rentals',
    description: 'Handpicked luxury villas in Riviera Nayarit, Mexico.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
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
