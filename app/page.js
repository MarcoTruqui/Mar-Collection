'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Star, Award, Heart, Map } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import PropertyCard from '@/components/PropertyCard'
import properties from '@/data/properties'

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  const featured = properties.slice(0, 3)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dwutnv1bb/image/upload/girasol_01.jpg"
            alt="Villa Girasol — TC Collection beachfront villa in Bucerías"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold text-sm tracking-[0.5em] font-light mb-6 uppercase">
            Riviera Nayarit, México
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-bold leading-tight mb-6">
            {t.hero.headline}
          </h1>
          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            {t.hero.subheadline}
          </p>
          <Link
            href="/properties"
            className="inline-block bg-gold text-navy font-semibold px-10 py-4 rounded-full text-base hover:bg-gold/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 tracking-wide"
          >
            {t.hero.cta}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest">{t.hero.scrollDown}</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ── BRAND INTRO ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.5em] font-light mb-4 uppercase">Our Philosophy</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6 leading-snug">
              {t.home.brandTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {t.home.brandText}
            </p>
            <Link
              href="/about"
              className="inline-block mt-8 border-b border-gold text-navy text-sm tracking-wide font-medium hover:text-gold transition-colors pb-0.5"
            >
              Learn Our Story →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Award, value: '5', label: 'Luxury Villas' },
              { icon: Map, value: '2', label: 'Prime Locations' },
              { icon: Star, value: '100+', label: '5-Star Reviews' },
              { icon: Heart, value: '12', label: 'Max Guests / Villa' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-gray-50 rounded-2xl p-6 text-center">
                <Icon size={24} className="text-gold mx-auto mb-3" />
                <div className="font-serif text-3xl text-navy font-bold mb-1">{value}</div>
                <div className="text-gray-500 text-xs tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Our Portfolio</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">{t.home.featuredTitle}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.home.featuredSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featured.map(p => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-block border-2 border-navy text-navy font-semibold px-10 py-3 rounded-full hover:bg-navy hover:text-white transition-all duration-200 text-sm tracking-wide"
            >
              {t.home.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Guest Stories</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">{t.home.testimonialsTitle}</h2>
            <p className="text-white/60 max-w-xl mx-auto">{t.home.testimonialsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors">
                <StarRating count={testimonial.rating} />
                <blockquote className="text-white/80 leading-relaxed mt-4 mb-6 text-sm italic">
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-white/40 text-xs">{testimonial.location}</p>
                  <p className="text-gold text-xs mt-1">{testimonial.property}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gold text-xs tracking-[0.5em] font-light mb-4 uppercase">Begin Your Journey</p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
            Your Perfect Stay Awaits
          </h2>
          <p className="text-gray-500 text-base mb-10">
            Browse our collection of handpicked properties or reach out to our concierge team — we'll find the perfect match for your group, dates, and vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-navy text-white font-semibold px-10 py-4 rounded-full hover:bg-navy/90 transition-colors text-sm tracking-wide"
            >
              {t.hero.cta}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-navy text-navy font-semibold px-10 py-4 rounded-full hover:bg-navy hover:text-white transition-all duration-200 text-sm tracking-wide"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
