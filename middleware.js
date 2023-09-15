middleware.js

import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request) {

  // 로그인 후 /main으로 이동 
  if (request.nextUrl.pathname === '/') {
    const session = await getToken({ req: request });
    console.log('세션', session);

    if (session) {
      return NextResponse.redirect(new URL('/main', request.url));
    }
  }
  // /main에서 로그아웃 하면 다시 로그인 페이지('/')로 이동 
  if (request.nextUrl.pathname.startsWith('/main')) {
    const session = await getToken({ req : request })
    console.log('세션', session)
    if (session == null) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
} 