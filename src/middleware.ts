import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('user-token')?.value;
  const url = request.nextUrl;
  const home = new URL('/', request.url);
  const system = new URL('/system', request.url);
  const restaurants = new URL('/restaurants', request.url);

  // ✅ Se não tiver token, pode acessar qualquer rota pública
  if (!token) return NextResponse.next();

  // ✅ Parse do cookie para pegar o isAdmin
  const userData = decodeURIComponent(token);
  let parsed;
  try {
    parsed = JSON.parse(userData);
  } catch {
    return NextResponse.redirect(home);
  }

  const isAdmin = parsed?.isAdmin;

  // 🔒 Impede que usuários logados vejam a home
  if (url.pathname === '/') {
    return NextResponse.redirect(isAdmin ? system : restaurants);
  }

  // 🔒 Admin tentando acessar restaurants → redireciona para /system
  if (isAdmin && url.pathname.startsWith('/restaurants')) {
    return NextResponse.redirect(system);
  }

  // 🔒 Usuário comum tentando acessar /system → redireciona para /restaurants
  if (!isAdmin && url.pathname.startsWith('/system')) {
    return NextResponse.redirect(restaurants);
  }

  return NextResponse.next();
}

// Aplica só nas rotas necessárias
export const config = {
  matcher: ['/', '/system', '/restaurants'],
};