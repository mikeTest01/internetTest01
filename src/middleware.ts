
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authed = request.cookies.get('firebase-auth')

  if (!authed && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (authed && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.ts|icon-192x192.png|icon-512x512.png).*)'],
}
