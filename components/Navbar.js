'use client'

import { useState, useEffect, useRef } from 'react'
import Link from '@/components/LocaleLink'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Navbar() {
  const { t, lang, toggleLang, currency, toggleCurrency } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const pathname = usePathname()
  const normalizedPath = pathname.replace(/^\/es(?=\/|$)/, '') || '/'
  const exploreRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClick(e) {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) setExploreOpen(false)
    }
    if (exploreOpen) document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [exploreOpen])

  useEffect(() => {
    setExploreOpen(false)
    setMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/properties', label: t.nav.properties },
  ]

  const exploreLinks = [
    { href: '/puerto-vallarta', label: t.nav.puertoVallartaArea },
    { href: '/punta-mita', label: t.footer.puntaMita },
    { href: '/bucerias', label: t.footer.bucerias },
    { href: '/la-cruz-de-huanacaxtle', label: t.footer.laCruz },
    { href: '/guides', label: t.footer.guides },
    { href: '/faq', label: t.footer.faq },
  ]

  const endLinks = [
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen || normalizedPath !== '/'
          ? 'bg-navy shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo.svg"
            alt="MAR Collection"
            width={140}
            height={76}
            className="object-contain group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                normalizedPath === link.href
                  ? 'text-gold'
                  : 'text-white/80 hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Explore dropdown */}
          <div className="relative" ref={exploreRef}>
            <button
              onClick={() => setExploreOpen(o => !o)}
              className={`flex items-center gap-1 text-sm tracking-wide transition-colors ${
                exploreLinks.some(l => l.href === normalizedPath)
                  ? 'text-gold'
                  : 'text-white/80 hover:text-gold'
              }`}
            >
              {t.nav.explore}
              <ChevronDown size={14} className={`transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
            </button>

            {exploreOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-xl shadow-xl overflow-hidden py-2">
                {exploreLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setExploreOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      normalizedPath === link.href
                        ? 'text-gold bg-gray-50'
                        : 'text-navy hover:bg-gray-50 hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {endLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                normalizedPath === link.href
                  ? 'text-gold'
                  : 'text-white/80 hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleCurrency}
            className="text-white/70 hover:text-gold text-sm tracking-widest transition-colors border border-white/20 hover:border-gold/50 px-3 py-1 rounded"
          >
            {currency === 'USD' ? 'MXN' : 'USD'}
          </button>
          <button
            onClick={toggleLang}
            className="text-white/70 hover:text-gold text-sm tracking-widest transition-colors border border-white/20 hover:border-gold/50 px-3 py-1 rounded"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <Link
            href="/properties"
            className="bg-gold text-navy text-sm font-semibold px-5 py-2 rounded hover:bg-gold/90 transition-colors tracking-wide"
          >
            {t.nav.bookNow}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 pt-4 pb-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base py-1 transition-colors ${
                normalizedPath === link.href ? 'text-gold' : 'text-white/80'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-white/10">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{t.nav.explore}</p>
            <div className="flex flex-col gap-3">
              {exploreLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base py-1 transition-colors ${
                    normalizedPath === link.href ? 'text-gold' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            {endLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base py-1 transition-colors ${
                  normalizedPath === link.href ? 'text-gold' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            <button
              onClick={() => { toggleCurrency(); setMenuOpen(false) }}
              className="text-white/70 text-sm tracking-widest border border-white/20 px-3 py-1 rounded"
            >
              {currency === 'USD' ? 'MXN' : 'USD'}
            </button>
            <button
              onClick={() => { toggleLang(); setMenuOpen(false) }}
              className="text-white/70 text-sm tracking-widest border border-white/20 px-3 py-1 rounded"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="bg-gold text-navy text-sm font-semibold px-5 py-2 rounded"
            >
              {t.nav.bookNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
