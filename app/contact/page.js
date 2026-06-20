'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import properties from '@/data/properties'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523221355153'

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function buildWhatsAppMessage(form) {
  const lines = ['🏡 *New MAR Collection Inquiry*', '']
  if (form.name)     lines.push(`*Name:* ${form.name}`)
  if (form.email)    lines.push(`*Email:* ${form.email}`)
  if (form.phone)    lines.push(`*Phone:* ${form.phone}`)
  if (form.property) lines.push(`*Property:* ${form.property}`)
  if (form.dates)    lines.push(`*Dates:* ${form.dates}`)
  if (form.message)  lines.push(``, `*Message:*`, form.message)
  return encodeURIComponent(lines.join('\n'))
}

export default function ContactPage() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', property: '', dates: '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const msg = buildWhatsAppMessage(form)
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
    setStatus('sent')
  }

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy focus:outline-none focus:border-gold transition-colors placeholder:text-gray-300'

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-navy pt-24 pb-20 px-4 text-center">
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-3 uppercase">Reach Out</p>
        <h1 className="font-serif text-5xl text-white mb-4">{t.contact.title}</h1>
        <p className="text-white/60 max-w-xl mx-auto">{t.contact.subtitle}</p>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl text-navy mb-8">{t.contact.formTitle}</h2>

            {status === 'sent' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-navy mb-2">{t.contact.sent}</h3>
                <p className="text-gray-500">{t.contact.sentText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">{t.contact.name} *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Ana García"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">{t.contact.email} *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="ana@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">{t.contact.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">{t.contact.preferredDates}</label>
                    <input
                      type="text"
                      name="dates"
                      value={form.dates}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. Dec 20–27, 2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">{t.contact.propertyInterest}</label>
                  <select
                    name="property"
                    value={form.property}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">{t.contact.selectProperty}</option>
                    {properties.map(p => (
                      <option key={p.slug} value={p.name}>{p.name} — {p.location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">{t.contact.message} *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={inputClass + ' resize-none'}
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#25D366] text-white font-semibold py-4 rounded-xl hover:bg-[#20bb5a] transition-colors text-sm flex items-center justify-center gap-3"
                >
                  <WhatsAppIcon />
                  {t.contact.send}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-serif text-lg text-navy mb-2">{t.contact.whatsapp}</h3>
              <p className="text-gray-500 text-sm mb-4">{t.contact.whatsappText}</p>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#20bb5a] transition-colors text-sm"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>

            {/* Location */}
            <div className="bg-navy rounded-2xl p-6 text-white">
              <h3 className="font-serif text-lg mb-3">Riviera Nayarit</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Punta Mita · Bucerías<br />
                La Cruz de Huanacaxtle<br />
                Nayarit, México
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
