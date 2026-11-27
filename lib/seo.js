import { BRAND_OG_IMAGE, BRAND_NAME } from '@/lib/brand'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.truqui.com'

// Every page shares with the Truqui Collection wordmark as its preview image
// (WhatsApp, iMessage, Facebook, LinkedIn…) unless it passes its own, like the
// villa pages do with their main photo.
const DEFAULT_SHARE_IMAGE = { url: BRAND_OG_IMAGE, width: 1200, height: 630, alt: BRAND_NAME }

export function localizedPath(path, locale) {
  return locale === 'es' ? `/es${path === '/' ? '' : path}` : path
}

export function localizedUrl(path, locale) {
  return `${SITE_URL}${localizedPath(path, locale)}`
}

export function buildMetadata({ path, locale, title, description, openGraph = {} }) {
  return {
    title,
    description,
    alternates: {
      canonical: localizedUrl(path, locale),
      languages: {
        en: localizedUrl(path, 'en'),
        es: localizedUrl(path, 'es'),
        'x-default': localizedUrl(path, 'en'),
      },
    },
    openGraph: {
      title,
      description,
      url: localizedUrl(path, locale),
      siteName: BRAND_NAME,
      images: [DEFAULT_SHARE_IMAGE],
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [(openGraph.images && openGraph.images[0]?.url) || BRAND_OG_IMAGE],
    },
  }
}
