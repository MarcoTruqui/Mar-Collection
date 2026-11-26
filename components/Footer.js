'use client'

import Link from '@/components/LocaleLink'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { BRAND_NAME, INSTAGRAM_URL, FACEBOOK_URL } from '@/lib/brand'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567'
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@menacollection.com'

// Simple WhatsApp icon (lucide doesn't include it)
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const heading = 'text-[11px] uppercase tracking-label text-navy/50 mb-5'
  const link = 'text-navy/80 hover:text-gold transition-colors'
  const icon = 'w-9 h-9 border border-navy/20 flex items-center justify-center text-navy/70 hover:border-navy hover:text-navy transition-colors'

  return (
    <footer className="bg-linen text-navy border-t border-navy/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Image src="/images/tc-logo.svg" alt={BRAND_NAME} width={150} height={112} className="mb-6 -ml-2" />
            <p className="font-serif text-xl leading-snug text-navy/85 max-w-xs mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-2.5">
              {INSTAGRAM_URL && (
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={icon} aria-label="Instagram">
                  <Instagram size={15} strokeWidth={1.5} />
                </a>
              )}
              {FACEBOOK_URL && (
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={icon} aria-label="Facebook">
                  <Facebook size={15} strokeWidth={1.5} />
                </a>
              )}
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className={icon} aria-label="WhatsApp">
                <WhatsAppIcon size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className={heading} style={{ fontFamily: 'inherit' }}>{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/" className={link}>{t.nav.home}</Link></li>
              <li><Link href="/properties" className={link}>{t.nav.properties}</Link></li>
              <li><Link href="/about" className={link}>{t.nav.about}</Link></li>
              <li><Link href="/guides" className={link}>{t.footer.guides}</Link></li>
              <li><Link href="/faq" className={link}>{t.footer.faq}</Link></li>
              <li><Link href="/contact" className={link}>{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="md:col-span-2">
            <h4 className={heading} style={{ fontFamily: 'inherit' }}>{t.footer.locations}</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/puerto-vallarta" className={link}>{t.nav.puertoVallartaArea}</Link></li>
              <li><Link href="/punta-mita" className={link}>{t.footer.puntaMita}</Link></li>
              <li><Link href="/bucerias" className={link}>{t.footer.bucerias}</Link></li>
              <li><Link href="/la-cruz-de-huanacaxtle" className={link}>{t.footer.laCruz}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <h4 className={heading} style={{ fontFamily: 'inherit' }}>{t.footer.contact}</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a href={`mailto:${EMAIL}`} className={link}>{EMAIL}</a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${link}`}>
                  <WhatsAppIcon size={14} />
                  WhatsApp
                </a>
              </li>
              <li className="text-navy/50 text-sm pt-2">
                Riviera Nayarit, México
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-navy/10 flex flex-col sm:flex-row gap-2 justify-between text-xs text-navy/45">
          <span>{t.footer.copyright.replace('{year}', year)}</span>
          <span className="tracking-[0.16em] uppercase text-[10px]">Punta Mita · Bucerías · La Cruz</span>
        </div>
      </div>
    </footer>
  )
}
