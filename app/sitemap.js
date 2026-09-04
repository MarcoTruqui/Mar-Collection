import properties from '@/data/properties'
import { localizedUrl } from '@/lib/seo'

const ROUTES = [
  '', '/properties', '/about', '/contact', '/faq',
  '/puerto-vallarta', '/punta-mita', '/bucerias', '/la-cruz-de-huanacaxtle',
  '/guides', '/guides/where-to-stay-puerto-vallarta-area', '/guides/airport-transfers-puerto-vallarta',
]

function entries(path, opts) {
  const languages = { en: localizedUrl(path, 'en'), es: localizedUrl(path, 'es') }
  return ['en', 'es'].map(locale => ({
    url: localizedUrl(path, locale),
    lastModified: new Date(),
    ...opts,
    alternates: { languages },
  }))
}

export default function sitemap() {
  const staticEntries = ROUTES.flatMap(route =>
    entries(route, { changeFrequency: route === '' ? 'daily' : 'weekly', priority: route === '' ? 1 : 0.8 })
  )

  const propertyEntries = properties.flatMap(property =>
    entries(`/properties/${property.slug}`, { changeFrequency: 'weekly', priority: 0.9 })
  )

  return [...staticEntries, ...propertyEntries]
}
