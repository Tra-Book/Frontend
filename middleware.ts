import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { auth } from './auth'

// 로그인이 필요한 페이지 라우트 (시작 url)
const matchersForAuth: Array<string> = ['/main', '/plan']

// 로그인 후 접근을 제한할 페이지 라우트 (시작 url)
const matchersForSignIn: Array<string> = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  if (session) {
    // 로그인된 상태에서 /login이나 /signup으로 접근할 때 홈으로 리다이렉트
    if (matchersForSignIn.some(url => pathname.startsWith(url))) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    // 로그인되지 않은 상태에서 보호된 페이지로 접근할 때 로그인 페이지로 리다이렉트
    if (matchersForAuth.some(url => pathname.startsWith(url))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// 현재는 모든 경로에 대해서 검증
export const config = {
  matcher: [
    /*
     * 다음과 같이 시작하는 경로를 제외한 모든 요청 경로와 일치:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|plan/detail).*)',
  ],
}
