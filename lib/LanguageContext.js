'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import translations from './translations'

const MXN_RATE = 17.5

const LanguageContext = createContext(null)

export function LanguageProvider({ children, locale }) {
  const router = useRouter()
  const pathname = usePathname()
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    // Preference record only — never auto-redirect based on this. The URL's
    // locale segment is the single source of truth so Googlebot (which
    // carries no localStorage) always sees a consistent, crawlable page.
    localStorage.setItem('tc-lang', locale)
    const savedCur = localStorage.getItem('tc-currency')
    if (savedCur === 'USD' || savedCur === 'MXN') setCurrency(savedCur)
  }, [locale])

  const t = translations[locale]

  function toggleLang() {
    const next = locale === 'en' ? 'es' : 'en'
    localStorage.setItem('tc-lang', next)
    const bare = pathname.replace(/^\/es(?=\/|$)/, '') || '/'
    router.push(next === 'es' ? `/es${bare === '/' ? '' : bare}` : bare)
  }

  function toggleCurrency() {
    setCurrency(prev => {
      const next = prev === 'USD' ? 'MXN' : 'USD'
      localStorage.setItem('tc-currency', next)
      return next
    })
  }

  function formatPrice(usdAmount) {
    if (currency === 'MXN') {
      return '$' + Math.round(usdAmount * MXN_RATE).toLocaleString() + ' MXN'
    }
    return '$' + usdAmount.toLocaleString() + ' USD'
  }

  return (
    <LanguageContext.Provider value={{ lang: locale, toggleLang, t, currency, toggleCurrency, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
