import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const seg1 = pathname.split('/')[1]

  if (seg1 === 'es') return NextResponse.next()

  if (seg1 === 'en') {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
}
