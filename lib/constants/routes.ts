/**
 * Route vs ApiEndpoint
 * - Route: 클라이언트에서 사용하는 path
 * - ApiEndpoint: 서버와 접속하기 위한 path
 */
export interface Route {
  name: string // 링크 버튼에 표시될 Text
  url: string
}

/**
 * 새로운 Route 생성시 추가
 */

interface Routes {
  HOME: Route
  LOGIN: Route
  SIGNUP: Route
  SIGNOUT: Route
  MAIN: Route
  COMMUNITY: Route
}

export const ROUTES: Routes = {
  HOME: {
    name: '시작페이지',
    url: '/',
  },
  LOGIN: {
    name: '로그인',
    url: '/login',
  },
  SIGNUP: {
    name: '회원가입',
    url: '/signup',
  },
  SIGNOUT: {
    name: '회원탈퇴',
    url: '/signout',
  },
  MAIN: {
    name: '내 여행',
    url: '/main',
  },
  COMMUNITY: {
    name: '커뮤니티',
    url: '/community',
  },
}
