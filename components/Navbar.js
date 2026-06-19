'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Navbar() {
  const { t, lang, toggleLang, currency, toggleCurrency } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/properties', label: t.nav.properties },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen || pathname !== '/'
          ? 'bg-navy shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo.svg"
            alt="TC Collection"
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
                pathname === link.href
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
        <div className="md:hidden bg-navy border-t border-white/10 px-4 pt-4 pb-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base py-1 transition-colors ${
                pathname === link.href ? 'text-gold' : 'text-white/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
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
