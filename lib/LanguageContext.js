'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const MXN_RATE = 17.5

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang]         = useState('en')
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    const savedLang = localStorage.getItem('tc-lang')
    if (savedLang === 'en' || savedLang === 'es') setLang(savedLang)
    const savedCur = localStorage.getItem('tc-currency')
    if (savedCur === 'USD' || savedCur === 'MXN') setCurrency(savedCur)
  }, [])

  const t = translations[lang]

  function toggleLang() {
    setLang(prev => {
      const next = prev === 'en' ? 'es' : 'en'
      localStorage.setItem('tc-lang', next)
      return next
    })
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
    <LanguageContext.Provider value={{ lang, toggleLang, t, currency, toggleCurrency, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
