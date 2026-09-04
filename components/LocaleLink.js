'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

// Assumes identical slugs across locales (e.g. /properties/villa-girasol <-> /es/properties/villa-girasol).
// If a locale-specific slug is ever introduced, this simple prefixing breaks silently.
export default function LocaleLink({ href, ...props }) {
  const { lang } = useLanguage()
  const localized = lang === 'es' && typeof href === 'string' && href.startsWith('/')
    ? `/es${href === '/' ? '' : href}`
    : href
  return <Link href={localized} {...props} />
}
