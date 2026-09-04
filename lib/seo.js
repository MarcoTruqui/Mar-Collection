const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.truqui.com'

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
      ...openGraph,
    },
  }
}
