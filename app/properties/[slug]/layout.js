import properties from '@/data/properties'

export async function generateMetadata({ params }) {
  const property = properties.find(p => p.slug === params.slug)
  if (!property) return {}

  return {
    title: `${property.name} — ${property.location} | MAR Collection`,
    description: property.shortDescription,
    openGraph: {
      title: `${property.name} — Luxury Villa in ${property.location}`,
      description: property.shortDescription,
      images: [{ url: property.images[0] }],
    },
  }
}

export default function PropertyLayout({ children }) {
  return children
}
