'use client'

import { Suspense, useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { AlertCircle } from 'lucide-react'
import { getClauses, contractTitle, guestLabel } from '@/lib/contractContent'
import { compressImage } from '@/lib/compressImage'

const COUNTRY_CODES = [
  ['+52', '🇲🇽 +52'], ['+1', '🇺🇸 +1 (US)'], ['+1', '🇨🇦 +1 (CA)'], ['+54', '🇦🇷 +54'],
  ['+55', '🇧🇷 +55'], ['+56', '🇨🇱 +56'], ['+57', '🇨🇴 +57'], ['+51', '🇵🇪 +51'],
  ['+593', '🇪🇨 +593'], ['+58', '🇻🇪 +58'], ['+34', '🇪🇸 +34'], ['+44', '🇬🇧 +44'],
  ['+33', '🇫🇷 +33'], ['+49', '🇩🇪 +49'], ['+39', '🇮🇹 +39'], ['+31', '🇳🇱 +31'],
  ['+41', '🇨🇭 +41'], ['+46', '🇸🇪 +46'], ['+47', '🇳🇴 +47'], ['+45', '🇩🇰 +45'],
  ['+351', '🇵🇹 +351'], ['+353', '🇮🇪 +353'], ['+61', '🇦🇺 +61'], ['+64', '🇳🇿 +64'],
  ['+81', '🇯🇵 +81'], ['+82', '🇰🇷 +82'], ['+86', '🇨🇳 +86'], ['+91', '🇮🇳 +91'],
  ['+971', '🇦🇪 +971'], ['+27', '🇿🇦 +27'],
]

const PROGRESS_STEPS = ['details', 'preview', 'sign']

// Temporary switch: while payments aren't live yet, signing a contract ends
// on a thank-you screen instead of redirecting to /booking-payment. Flip to
// true once real Stripe/PayPal keys are in and payment should resume.
const PAYMENT_ENABLED = false

function fmt(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function computeAge(dob) {
  const d = new Date(dob)
  const today = new Date()
  let a = today.getFullYear() - d.getFullYear()
  const m = today.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) a--
  return a
}

function ProgressBar({ step, t }) {
  const idx = PROGRESS_STEPS.indexOf(step)
  const finished = step === 'processing' || step === 'done'
  const items = [
    { key: 'details', label: t.contract.progInfo },
    { key: 'preview', label: t.contract.progContract },
    { key: 'sign', label: t.contract.progSign },
    ...(PAYMENT_ENABLED ? [{ key: 'pay', label: t.contract.progPay }] : []),
  ]
  return (
    <div className="flex items-center justify-center mb-6">
      {items.map((item, i) => {
        const itemIdx = PROGRESS_STEPS.indexOf(item.key)
        const isPay = item.key === 'pay'
        const active = isPay ? finished : (!finished && itemIdx === idx)
        const done = isPay ? false : (finished || itemIdx < idx)
        return (
          <div key={item.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                active ? 'bg-navy text-white' : done ? 'bg-gold text-navy' : 'bg-gray-100 text-gray-400'
              }`}>
                {i + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-wide whitespace-nowrap ${active ? 'text-navy font-semibold' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </div>
            {i < items.length - 1 && <div className="w-7 h-0.5 bg-gray-200 mx-1 mb-4" />}
          </div>
        )
      })}
    </div>
  )
}

function ContractPageContent() {
  const { t, lang } = useLanguage()
  const params = useSearchParams()
  const token = params.get('token') || ''

  const [booking, setBooking] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [step, setStep] = useState('details')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [detailsError, setDetailsError] = useState('')

  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [country, setCountry] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [countryCode, setCountryCode] = useState('+52')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [idFile, setIdFile] = useState(null)
  const [idProcessing, setIdProcessing] = useState(false)

  const canvasRef = useRef(null)
  const drawingRef = useRef(false)
  const cameraInputRef = useRef(null)
  const uploadInputRef = useRef(null)

  useEffect(() => {
    if (!token) {
      setLoadError(t.contract.notFound)
      return
    }
    fetch(`/api/contract-lookup?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setLoadError(data.error)
        else setBooking(data)
      })
      .catch(() => setLoadError(t.contract.notFound))
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  // Signature canvas — attach draw handlers only while the sign step is visible.
  useEffect(() => {
    if (step !== 'sign') return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#0b1f3a'

    function pos(e) {
      const r = canvas.getBoundingClientRect()
      const p = e.touches ? e.touches[0] : e
      return { x: p.clientX - r.left, y: p.clientY - r.top }
    }
    function start(e) { drawingRef.current = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault() }
    function move(e) { if (!drawingRef.current) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault() }
    function end() { drawingRef.current = false }

    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', end)
    canvas.addEventListener('mouseleave', end)
    canvas.addEventListener('touchstart', start, { passive: false })
    canvas.addEventListener('touchmove', move, { passive: false })
    canvas.addEventListener('touchend', end)

    return () => {
      canvas.removeEventListener('mousedown', start)
      canvas.removeEventListener('mousemove', move)
      canvas.removeEventListener('mouseup', end)
      canvas.removeEventListener('mouseleave', end)
      canvas.removeEventListener('touchstart', start)
      canvas.removeEventListener('touchmove', move)
      canvas.removeEventListener('touchend', end)
    }
  }, [step])

  async function handleIdFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setIdProcessing(true)
    setDetailsError('')
    try {
      const { base64, mimeType } = await compressImage(file)
      setIdFile({ name: file.name, base64, mimeType })
    } catch {
      setDetailsError(t.contract.errIdRead)
    } finally {
      setIdProcessing(false)
    }
  }

  function goToPreview() {
    if (!fullName.trim() || !dob || !country.trim() || !street.trim() || !city.trim() || !zip.trim() || !phoneNumber.trim() || !email.trim() || !idFile) {
      setDetailsError(t.contract.errMissing)
      return
    }
    setDetailsError('')
    setStep('preview')
  }

  function clearSig() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }

  function isSigBlank() {
    const canvas = canvasRef.current
    if (!canvas) return true
    const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
    return !data.some(v => v !== 0)
  }

  async function handleSubmit() {
    setSubmitError('')
    if (isSigBlank()) {
      setSubmitError(t.contract.errSign)
      return
    }
    setSubmitting(true)
    setStep('processing')
    try {
      const signatureBase64 = canvasRef.current.toDataURL('image/png')
      const res = await fetch('/api/submit-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          fullName: fullName.trim(),
          dob,
          country: country.trim(),
          street: street.trim(),
          city: city.trim(),
          zip: zip.trim(),
          countryCode,
          phoneNumber: phoneNumber.trim(),
          email: email.trim(),
          idPhotoBase64: idFile.base64,
          idPhotoMimeType: idFile.mimeType,
          signatureBase64,
          language: lang,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setSubmitError(data.error)
        setStep('sign')
        setSubmitting(false)
        return
      }
      if (PAYMENT_ENABLED) {
        const localePrefix = lang === 'es' ? '/es' : ''
        window.location.href = `${localePrefix}/booking-payment?token=${encodeURIComponent(token)}`
        return
      }
      setStep('done')
      setSubmitting(false)
    } catch {
      setSubmitError(t.contract.errIdRead)
      setStep('sign')
      setSubmitting(false)
    }
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10 text-center">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">{loadError}</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
        <p className="text-gray-400 text-sm">{t.contract.loading}</p>
      </div>
    )
  }

  const isWebsiteBooking = booking.agentName === 'Website'
  const clauses = step === 'preview' || step === 'sign'
    ? getClauses({
        lang, checkin: booking.checkin, checkout: booking.checkout, currency: booking.currency,
        price: booking.price, group: booking.group, villa: booking.villa, numGuests: booking.numGuests,
        isWebsiteBooking,
      })
    : []

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-16">
      <div className="max-w-lg mx-auto bg-white border border-gray-100 rounded-2xl shadow-lg p-8">
        {step !== 'processing' && step !== 'done' && (
          <>
            <h1 className="font-serif text-navy text-2xl mb-1">{t.contract.title}</h1>
            <p className="text-gray-500 text-sm mb-6">{t.contract.subtitle}</p>

            <div className="bg-navy text-white rounded-xl p-4 mb-6 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-white/60">{t.contract.property}</span><span className="font-medium">{booking.propertyName}</span></div>
              <div className="flex justify-between"><span className="text-white/60">{t.contract.total}</span><span className="font-medium">{booking.currency} {Number(booking.price).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-white/60">{t.contract.checkIn}</span><span>{fmt(booking.checkin)}</span></div>
              <div className="flex justify-between"><span className="text-white/60">{t.contract.checkOut}</span><span>{fmt(booking.checkout)}</span></div>
              <div className="flex justify-between"><span className="text-white/60">{t.contract.guests}</span><span>{booking.numGuests}</span></div>
            </div>

            <ProgressBar step={step} t={t} />
          </>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblFullName}</label>
              <input type="text" name="fullName" autoComplete="name" value={fullName} onChange={e => setFullName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblDob}</label>
              <input type="date" name="dob" autoComplete="bday" value={dob} onChange={e => setDob(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              {dob && <p className="text-xs text-gray-400 mt-1">{t.contract.ageLabel}: {computeAge(dob)}</p>}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblCountry}</label>
              <input type="text" name="country" autoComplete="country-name" value={country} onChange={e => setCountry(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblStreet}</label>
              <input type="text" name="street" autoComplete="address-line1" value={street} onChange={e => setStreet(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblCity}</label>
              <input type="text" name="city" autoComplete="address-level2" value={city} onChange={e => setCity(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblZip}</label>
              <input type="text" name="zip" autoComplete="postal-code" value={zip} onChange={e => setZip(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblPhone}</label>
              <div className="flex gap-2">
                <select name="countryCode" autoComplete="tel-country-code" value={countryCode} onChange={e => setCountryCode(e.target.value)}
                  className="flex-none w-[110px] border border-gray-200 rounded-lg px-2 py-2 text-sm">
                  {COUNTRY_CODES.map(([val, label], i) => <option key={i} value={val}>{label}</option>)}
                </select>
                <input type="tel" name="phoneNumber" autoComplete="tel-national" placeholder="322 123 4567" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblEmail}</label>
              <input type="email" name="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.contract.lblIdPhoto}</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 border border-navy text-navy rounded-lg py-2 text-sm">{t.contract.takePhoto}</button>
                <button type="button" onClick={() => uploadInputRef.current?.click()}
                  className="flex-1 border border-navy text-navy rounded-lg py-2 text-sm">{t.contract.uploadPhoto}</button>
              </div>
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleIdFile} />
              <input ref={uploadInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleIdFile} />
              <p className="text-xs text-gray-400 mt-1">
                {idProcessing ? t.contract.compressing : (idFile ? idFile.name : '')}
              </p>
            </div>

            {detailsError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{detailsError}</span>
              </div>
            )}

            <button onClick={goToPreview} disabled={idProcessing}
              className="w-full bg-navy text-white font-semibold py-3 rounded-xl hover:bg-navy/90 transition-colors text-sm disabled:opacity-50">
              {t.contract.continueBtn}
            </button>
          </div>
        )}

        {step === 'preview' && (
          <div>
            <div className="border border-gray-200 rounded-lg p-4 max-h-[420px] overflow-y-auto text-sm">
              <h2 className="font-serif text-navy text-center mb-3">{contractTitle(lang)}</h2>
              {clauses.map(([heading, body], i) => (
                <div key={i} className="mb-3">
                  <p className="text-xs font-bold text-navy mb-1">{heading}</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{body}</p>
                </div>
              ))}
              <p className="text-xs font-bold text-navy">{guestLabel(lang)}{fullName || '—'}</p>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep('details')} className="flex-1 border border-navy text-navy font-semibold py-3 rounded-xl text-sm">
                {t.contract.backBtn}
              </button>
              <button onClick={() => setStep('sign')} className="flex-1 bg-navy text-white font-semibold py-3 rounded-xl text-sm">
                {t.contract.toSignBtn}
              </button>
            </div>
          </div>
        )}

        {step === 'sign' && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t.contract.lblSignature}</label>
            <canvas ref={canvasRef} className="w-full h-40 border border-gray-200 rounded-lg bg-white touch-none" />
            <button onClick={clearSig} className="text-xs text-gray-400 underline mt-1">{t.contract.clearSig}</button>

            {submitError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mt-3 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep('preview')} className="flex-1 border border-navy text-navy font-semibold py-3 rounded-xl text-sm">
                {t.contract.backBtn}
              </button>
              <button onClick={handleSubmit} disabled={submitting} className="flex-1 bg-navy text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50">
                {submitting ? t.contract.submitting : t.contract.submitBtn}
              </button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-navy rounded-full animate-spin mx-auto mb-4" />
            <p className="text-navy font-medium">{t.contract.submitting}</p>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">✓</div>
            <h1 className="font-serif text-navy text-2xl mb-2">{t.contract.doneTitle}</h1>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">{t.contract.doneSubtitle}</p>
            <a href={lang === 'es' ? '/es' : '/'} className="inline-block bg-navy text-white font-semibold py-3 px-8 rounded-xl text-sm hover:bg-navy/90 transition-colors">
              {t.contract.backHome}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingContractPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ContractPageContent />
    </Suspense>
  )
}
