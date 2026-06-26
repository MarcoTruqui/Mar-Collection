'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { Check } from 'lucide-react'

function TeamCard({ member }) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-navy/20 to-gold/20 mx-auto mb-4 flex items-center justify-center">
        <span className="font-serif text-2xl text-navy font-bold">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <h3 className="font-serif text-lg text-navy">{member.name}</h3>
      <p className="text-gold text-xs tracking-wide mb-2">{member.role}</p>
      <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
    </div>
  )
}

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-navy pt-24 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=60"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
          <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Our Story</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">{t.about.title}</h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-light">{t.about.subtitle}</p>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-serif text-4xl text-navy mb-6">{t.about.storyTitle}</h2>
            <p className="text-gray-600 leading-relaxed mb-5">{t.about.storyText1}</p>
            <p className="text-gray-600 leading-relaxed">{t.about.storyText2}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden h-72 relative">
              <Image
                src="/images/about-4.jpg"
                alt="Punta Mita peninsula aerial"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-72 relative mt-10">
              <Image
                src="/images/about-1.webp"
                alt="Islas Marietas hidden beach"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>
        </div>

        {/* Full-width image strip */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden h-64 relative">
            <Image
              src="/images/about-2.jpg"
              alt="Puerto Vallarta church and culture"
              fill
              className="object-cover"
              sizes="700px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white text-sm font-semibold tracking-wide">Puerto Vallarta</span>
          </div>
          <div className="rounded-2xl overflow-hidden h-64 relative">
            <Image
              src="/images/about-3.jpg"
              alt="La Cruz de Huanacaxtle marina"
              fill
              className="object-cover"
              sizes="700px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white text-sm font-semibold tracking-wide">La Cruz de Huanacaxtle</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Our Standards</p>
            <h2 className="font-serif text-4xl text-navy mb-4">{t.about.valuesTitle}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.about.valuesSubtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                  <Check size={18} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg text-navy mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">The People</p>
          <h2 className="font-serif text-4xl text-navy mb-4">{t.about.teamTitle}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.about.teamSubtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {t.team.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </section>

      {/* Location strip */}
      <section className="bg-navy py-16 px-4 text-center">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-4 uppercase">Find Us</p>
        <h2 className="font-serif text-3xl text-white mb-3">Riviera Nayarit, México</h2>
        <p className="text-white/50 text-sm max-w-md mx-auto">
          Punta Mita · Bucerías · La Cruz de Huanacaxtle
        </p>
      </section>
    </div>
  )
}
