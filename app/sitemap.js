import properties from '@/data/properties'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.truqui.com'

export default function sitemap() {
  const staticRoutes = [
    '', '/properties', '/about', '/contact', '/faq',
    '/puerto-vallarta', '/punta-mita', '/bucerias', '/la-cruz-de-huanacaxtle',
    '/guides', '/guides/where-to-stay-puerto-vallarta-area', '/guides/airport-transfers-puerto-vallarta',
  ].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  const propertyRoutes = properties.map(property => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...propertyRoutes]
}
