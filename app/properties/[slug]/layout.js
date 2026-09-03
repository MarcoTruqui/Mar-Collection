import properties from '@/data/properties'
import { breadcrumbJsonLd } from '@/lib/structuredData'

const AREA_SLUGS = {
  'Punta Mita': '/punta-mita',
  'Bucerías': '/bucerias',
  'La Cruz de Huanacaxtle': '/la-cruz-de-huanacaxtle',
}

export async function generateMetadata({ params }) {
  const property = properties.find(p => p.slug === params.slug)
  if (!property) return {}

  const title = `${property.name} — Luxury Villa in ${property.location}, Near Puerto Vallarta`

  return {
    title,
    description: `${property.shortDescription} On Bahía de Banderas, minutes from Puerto Vallarta.`,
    alternates: {
      canonical: `/properties/${property.slug}`,
    },
    openGraph: {
      title,
      description: property.shortDescription,
      url: `/properties/${property.slug}`,
      images: [{ url: property.images[0] }],
    },
  }
}

function propertyJsonLd(property) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.name,
    description: property.shortDescription,
    image: property.images.slice(0, 5),
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: 'Nayarit',
      addressCountry: 'MX',
    },
    numberOfRooms: property.bedrooms,
    petsAllowed: false,
    amenityFeature: property.amenities.map(name => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    priceRange: `$${property.nightlyRate}+ USD/night`,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: property.maxGuests,
    },
  }
}

export default function PropertyLayout({ children, params }) {
  const property = properties.find(p => p.slug === params.slug)

  const jsonLd = property
    ? [
        propertyJsonLd(property),
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          ...(AREA_SLUGS[property.location]
            ? [{ name: property.location, path: AREA_SLUGS[property.location] }]
            : []),
          { name: property.name, path: `/properties/${property.slug}` },
        ]),
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
