import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const comingSoon = ['/about', '/contact', '/gallery'];

  if (comingSoon.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/coming-soon';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
