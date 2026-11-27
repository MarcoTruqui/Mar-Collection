// Single source of truth for the brand name and logo.
// To rename the business, change BRAND_NAME here — every page title, SEO
// description, FAQ, email sender, structured data and /llms.txt reads from it.
export const BRAND_NAME = 'Truqui Collection'

// Logos (all in /public/brand, built from Marco's source files kept there too).
//   Wordmark "TRUQUI / COLLECTION" — header, footer, opening animation, link previews
//   Icon "CT" mark — browser tab, phone home screen, Google, profile pictures
export const BRAND_WORDMARK = '/brand/truqui-wordmark.png'         // dark ink, transparent
export const BRAND_WORDMARK_LIGHT = '/brand/truqui-wordmark-light.png' // white, for over photos/video
export const BRAND_WORDMARK_SIZE = { width: 821, height: 204 }
export const BRAND_OG_IMAGE = '/brand/og-truqui-collection.jpg'   // 1200×630 link preview

// Square logo used in Google structured data (JSON-LD). Path is relative to /public.
export const BRAND_LOGO = '/brand/icon-512.png'

// Social pages (official Truqui Collection accounts, set 2026-11-26). The
// footer hides any icon whose link is empty. Never use Marco's personal accounts.
export const INSTAGRAM_URL = 'https://www.instagram.com/truqui.collection'
export const FACEBOOK_URL = 'https://www.facebook.com/truqui.collection'

// Public contact email by site language. Shown in the footer and on the
// Contact page, and where website inquiries / signed-contract notices are sent.
export const CONTACT_EMAILS = { en: 'hello@truqui.com', es: 'hola@truqui.com' }
export const contactEmail = lang => CONTACT_EMAILS[lang] || CONTACT_EMAILS.en
