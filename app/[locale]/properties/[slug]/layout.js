import properties from '@/data/properties'
import { breadcrumbJsonLd } from '@/lib/structuredData'
import { buildMetadata } from '@/lib/seo'
import { getPricingConfig } from '@/lib/pricingSheet'
import { getCurrentRate } from '@/lib/currentRate'

const AREA_SLUGS = {
  'Punta Mita': '/punta-mita',
  'Bucerías': '/bucerias',
  'La Cruz de Huanacaxtle': '/la-cruz-de-huanacaxtle',
}

export async function generateMetadata({ params }) {
  const property = properties.find(p => p.slug === params.slug)
  if (!property) return {}

  const { locale } = params
  const path = `/properties/${property.slug}`

  if (locale === 'es') {
    const title = `${property.name} — Villa de Lujo en ${property.location}, Cerca de Puerto Vallarta`
    const description = property.shortDescriptionEs
      ? `${property.shortDescriptionEs} En la Bahía de Banderas, a minutos de Puerto Vallarta.`
      : `${property.shortDescription} On Bahía de Banderas, minutes from Puerto Vallarta.`
    return buildMetadata({
      path,
      locale,
      title,
      description,
      openGraph: { images: [{ url: property.images[0] }] },
    })
  }

  const title = `${property.name} — Luxury Villa in ${property.location}, Near Puerto Vallarta`
  const description = `${property.shortDescription} On Bahía de Banderas, minutes from Puerto Vallarta.`
  return buildMetadata({
    path,
    locale,
    title,
    description,
    openGraph: { images: [{ url: property.images[0] }] },
  })
}

function propertyJsonLd(property, locale, fromRate) {
  const description = locale === 'es' && property.shortDescriptionEs ? property.shortDescriptionEs : property.shortDescription
  const amenities = locale === 'es' && property.amenitiesEs ? property.amenitiesEs : property.amenities

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.name,
    description,
    image: property.images.slice(0, 5),
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: 'Nayarit',
      addressCountry: 'MX',
    },
    numberOfRooms: property.bedrooms,
    petsAllowed: false,
    amenityFeature: amenities.map(name => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    priceRange: `$${fromRate}+ USD/night`,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: property.maxGuests,
    },
  }
}

export default async function PropertyLayout({ children, params }) {
  const property = properties.find(p => p.slug === params.slug)
  const { locale } = params
  const homeLabel = locale === 'es' ? 'Inicio' : 'Home'
  const propertiesLabel = locale === 'es' ? 'Propiedades' : 'Properties'

  // Same live pricing-sheet rate the page itself shows, so Google sees the real price.
  let fromRate = property?.nightlyRate
  if (property) {
    const { rates } = await getPricingConfig()
    fromRate = getCurrentRate(rates, property.slug, property.nightlyRate)
  }

  const jsonLd = property
    ? [
        propertyJsonLd(property, locale, fromRate),
        breadcrumbJsonLd([
          { name: homeLabel, path: '/' },
          { name: propertiesLabel, path: '/properties' },
          ...(AREA_SLUGS[property.location]
            ? [{ name: property.location, path: AREA_SLUGS[property.location] }]
            : []),
          { name: property.name, path: `/properties/${property.slug}` },
        ], locale),
      ]
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
