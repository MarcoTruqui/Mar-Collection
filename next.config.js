/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co', 'images.unsplash.com'],
    unoptimized: false,
  },
  // Required for Netlify deployment
  output: 'standalone',
}

module.exports = nextConfig
