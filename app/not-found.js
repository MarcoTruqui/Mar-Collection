import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-gold text-xs tracking-[0.5em] font-light mb-4 uppercase">404</p>
        <h1 className="font-serif text-5xl text-white mb-4">Page Not Found</h1>
        <p className="text-white/50 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block bg-gold text-navy font-semibold px-8 py-3 rounded-full hover:bg-gold/90 transition-colors text-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
