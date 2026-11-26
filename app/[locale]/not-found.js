'use client'

import Link from '@/components/LocaleLink'
import { useLanguage } from '@/lib/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-linen flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-gold text-xs tracking-label font-light mb-4 uppercase">404</p>
        <h1 className="font-serif text-5xl text-navy mb-4">{t.notFound.title}</h1>
        <p className="text-navy/50 mb-8">{t.notFound.body}</p>
        <Link
          href="/"
          className="inline-block bg-navy text-bone font-semibold px-8 py-3 rounded-none hover:bg-gold transition-colors text-sm"
        >
          {t.notFound.cta}
        </Link>
      </div>
    </div>
  )
}
