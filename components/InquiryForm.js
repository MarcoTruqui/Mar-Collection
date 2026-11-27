'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import properties from '@/data/properties'

const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${d}-${MONTHS_ES[parseInt(m) - 1]}-${y}`
}

const EXTRA = {
  en: { checkIn: 'Check-in', checkOut: 'Check-out', guests: 'Guests', error: 'Something went wrong. Please try WhatsApp or email us directly.' },
  es: { checkIn: 'Llegada', checkOut: 'Salida', guests: 'Huéspedes', error: 'Algo salió mal. Por favor escríbenos por WhatsApp o correo.' },
}

// The inquiry form used on the Contact page and on every property page.
// Pass `property` (a properties.js entry) to lock the inquiry to that villa —
// the property dropdown is then hidden and the villa name is sent automatically.
export default function InquiryForm({ property = null }) {
  const { t, lang } = useLanguage()
  const x = EXTRA[lang] || EXTRA.en
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', guests: '',
    property: property ? property.name : '', checkIn: '', checkOut: '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lang,
          dates: form.checkIn && form.checkOut ? `${formatDate(form.checkIn)} → ${formatDate(form.checkOut)}` : '',
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full border-0 border-b border-navy/25 bg-transparent px-0 py-2.5 text-[15px] text-navy focus:outline-none focus:ring-0 focus:border-navy transition-colors placeholder:text-navy/30 rounded-none'
  const maxGuests = property?.maxGuests || 20

  if (status === 'sent') {
    return (
      <div className="bg-linen border border-navy/10 p-10 text-center">
        <div className="w-14 h-14 border border-olive/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6E6B4F" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-navy mb-2">{t.contact.sent}</h3>
        <p className="text-gray-500">{t.contact.sentText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid sm:grid-cols-2 gap-7">
        <div>
          <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{t.contact.name} *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Ana García" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{t.contact.email} *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="ana@email.com" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-7">
        <div>
          <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{t.contact.phone}</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 123-4567" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{x.guests}</label>
          <input type="number" name="guests" min={1} max={maxGuests} value={form.guests} onChange={handleChange} className={inputClass} placeholder="2" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-7">
        <div>
          <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{x.checkIn}</label>
          <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{x.checkOut}</label>
          <input type="date" name="checkOut" min={form.checkIn || undefined} value={form.checkOut} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      {!property && (
        <div>
          <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{t.contact.propertyInterest}</label>
          <select name="property" value={form.property} onChange={handleChange} className={inputClass}>
            <option value="">{t.contact.selectProperty}</option>
            {properties.map(p => (
              <option key={p.slug} value={p.name}>{p.name} — {p.location}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-[10px] uppercase tracking-label text-navy/50 mb-1">{t.contact.message} *</label>
        <textarea name="message" required rows={5} value={form.message} onChange={handleChange} className={inputClass + ' resize-none'} placeholder={t.contact.messagePlaceholder} />
      </div>

      {status === 'error' && <p className="text-red-500 text-sm">{x.error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full !py-4"
      >
        {status === 'sending' ? t.contact.sending : t.contact.send}
      </button>
    </form>
  )
}
