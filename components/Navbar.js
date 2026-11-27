'use client'

import { useState, useEffect, useRef } from 'react'
import Link from '@/components/LocaleLink'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { BRAND_NAME, BRAND_WORDMARK, BRAND_WORDMARK_LIGHT, BRAND_WORDMARK_SIZE } from '@/lib/brand'

export default function Navbar() {
  const { t, lang, toggleLang, currency, toggleCurrency } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const pathname = usePathname()
  const normalizedPath = pathname.replace(/^\/es(?=\/|$)/, '') || '/'
  const exploreRef = useRef(null)
  const lastScrollY = useRef(0)

  // Mobile-only (see lg:translate-y-0 below): hides the fixed header when
  // scrolling down past the top, so it stops covering buttons further down
  // the page, and brings it back on any scroll up or near the top.
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y < 80) {
        setHidden(false)
      } else {
        setHidden(y > lastScrollY.current)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Never stay hidden while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) setHidden(false)
  }, [menuOpen])

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

  // Transparent with light text only while sitting on top of the homepage video.
  const solid = scrolled || menuOpen || normalizedPath !== '/'

  const linkBase = 'text-[12px] uppercase tracking-[0.16em] transition-colors'
  const linkIdle = solid ? 'text-navy/75 hover:text-navy' : 'text-white/85 hover:text-white'
  const linkActive = solid ? 'text-navy' : 'text-white'
  const underline = 'relative after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:bg-current'
  const chip = `text-[11px] tracking-[0.16em] px-2.5 py-1 border transition-colors ${
    solid ? 'border-navy/25 text-navy/70 hover:border-navy hover:text-navy' : 'border-white/40 text-white/85 hover:border-white hover:text-white'
  }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-bone/95 backdrop-blur-sm border-b border-navy/10 py-2.5'
          // Over the video: a soft, feathered shade (darkens + slightly blurs,
          // fading out below the bar) so the menu reads but the video shows through.
          : "border-b border-transparent py-4 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[165%] before:-z-10 before:pointer-events-none before:bg-gradient-to-b before:from-black/55 before:via-black/25 before:to-transparent before:backdrop-blur-[3px] before:[mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
      } ${hidden ? '-translate-y-full' : 'translate-y-0'} lg:translate-y-0`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        {/* Wordmark — white over the homepage video, ink everywhere else.
            The link box keeps the header at 77px (phone) / 85px (desktop). */}
        <Link href="/" className="flex items-center h-14 md:h-16 group" aria-label={BRAND_NAME}>
          <Image
            src={solid ? BRAND_WORDMARK : BRAND_WORDMARK_LIGHT}
            alt={BRAND_NAME}
            width={BRAND_WORDMARK_SIZE.width}
            height={BRAND_WORDMARK_SIZE.height}
            priority
            className={`h-[30px] md:h-[38px] w-auto group-hover:opacity-75 transition-opacity ${solid ? '' : 'drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]'}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${linkBase} ${normalizedPath === link.href ? `${linkActive} ${underline}` : linkIdle}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Explore dropdown */}
          <div className="relative" ref={exploreRef}>
            <button
              onClick={() => setExploreOpen(o => !o)}
              className={`flex items-center gap-1 ${linkBase} ${
                exploreLinks.some(l => l.href === normalizedPath) ? linkActive : linkIdle
              }`}
            >
              {t.nav.explore}
              <ChevronDown size={13} strokeWidth={1.5} className={`transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
            </button>

            {exploreOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-bone border border-navy/10 shadow-lg py-3">
                {exploreLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setExploreOpen(false)}
                    className={`block px-5 py-2 text-sm transition-colors ${
                      normalizedPath === link.href
                        ? 'text-gold'
                        : 'text-navy/80 hover:text-gold'
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
              className={`${linkBase} ${normalizedPath === link.href ? `${linkActive} ${underline}` : linkIdle}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={toggleCurrency} className={chip}>
            {currency === 'USD' ? 'MXN' : 'USD'}
          </button>
          <button onClick={toggleLang} className={chip}>
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <Link
            href="/properties"
            className={`ml-2 text-[12px] uppercase tracking-[0.16em] px-5 py-2.5 transition-colors ${
              solid ? 'bg-navy text-bone hover:bg-gold' : 'bg-bone text-navy hover:bg-white'
            }`}
          >
            {t.nav.bookNow}
          </Link>
        </div>

        {/* Mobile: Book + menu */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            href="/properties"
            className={`text-[11px] uppercase tracking-[0.16em] px-3.5 py-2 ${
              solid ? 'bg-navy text-bone' : 'bg-bone text-navy'
            }`}
          >
            {t.nav.bookNow}
          </Link>
          <button
            className={`p-1 ${solid ? 'text-navy' : 'text-white'}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-bone border-t border-navy/10 px-5 pt-5 pb-7 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {[...navLinks, ...endLinks].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-serif text-2xl py-1 transition-colors ${
                  normalizedPath === link.href ? 'text-gold' : 'text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-navy/10">
            <p className="eyebrow mb-3">{t.nav.explore}</p>
            <div className="flex flex-col gap-2.5">
              {exploreLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[15px] transition-colors ${
                    normalizedPath === link.href ? 'text-gold' : 'text-navy/75'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-navy/10">
            <button
              onClick={() => { toggleCurrency(); setMenuOpen(false) }}
              className="text-[11px] tracking-[0.16em] text-navy/75 border border-navy/25 px-3 py-1.5"
            >
              {currency === 'USD' ? 'MXN' : 'USD'}
            </button>
            <button
              onClick={() => { toggleLang(); setMenuOpen(false) }}
              className="text-[11px] tracking-[0.16em] text-navy/75 border border-navy/25 px-3 py-1.5"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
