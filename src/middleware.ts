import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('user-token');
  const url = request.nextUrl;

  const homeUrl = new URL('/', request.url);
  const systemUrl = new URL('/system', request.url);
  const restaurantsUrl = new URL('/restaurants', request.url);

  if (!tokenCookie) {
    if (url.pathname.startsWith('/restaurants') || url.pathname.startsWith('/system')) {
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  let userData;
  try {
    const decoded = decodeURIComponent(tokenCookie.value);
    userData = JSON.parse(decoded);
  } catch {
    return NextResponse.redirect(homeUrl);
  }

  const isAdmin = userData?.isAdmin;

  if (url.pathname === '/') {
    return NextResponse.redirect(isAdmin ? systemUrl : restaurantsUrl);
  }

  if (isAdmin && url.pathname.startsWith('/restaurants')) {
    return NextResponse.redirect(systemUrl);
  }

  if (!isAdmin && url.pathname.startsWith('/system')) {
    return NextResponse.redirect(restaurantsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/system/:path*', '/restaurants/:path*'],
};