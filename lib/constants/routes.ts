import { ExtractValueByKey } from '../utils/typeUtils'

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
export const ROUTES = {
  HOME: {
    name: '홈',
    url: '/',
  },
  AUTH: {
    LOGIN: {
      name: '로그인',
      url: '/login',
    },
    EMAIL_LOGIN: {
      name: '이메일 로그인',
      url: '/login/email',
    },
    SIGNUP: {
      name: '회원가입',
      url: '/signup',
    },
    SIGNOUT: {
      name: '회원탈퇴',
      url: '/signout',
    },
  },
  MAIN: {
    MY_PLAN: {
      name: '내 여행',
      url: '/main',
    },
    STORE_PLAN: {
      name: '여행 계획 보관함',
      url: '/main/store_plan',
    },
    STORE_PLACE: {
      name: '여행지 보관함',
      url: '/main/store_place',
    },
    INFO: {
      name: '내 정보',
      url: '/main/info',
    },
    CHANGE_PASSWORD: {
      name: '비밀번호 변경',
      url: '/main/password',
    },
  },
  PLAN: {
    PlAN: {
      name: '기본 정보',
      url: '/plan',
    },
    INDEX: {
      name: '초기 설정',
      url: '/plan/index',
    },
    SCHEDULE: {
      name: '여행 일정',
      url: '/plan/schedule',
    },
    STORE: {
      name: '보관함',
      url: '/plan/store',
    },
  },
  COMMUNITY: {
    PLACE: {
      name: '여행 계획 커뮤니티',
      url: '/community/plan',
    },
    PLAN: {
      name: '여행지 커뮤니티',
      url: '/community/place',
    },
    COMPANION: {
      name: '동행 모집 커뮤니티',
      url: '/community/companion',
    },
  },
} as const

// 자동으로 갱신되는 Url 타입
export type RouteType = ExtractValueByKey<typeof ROUTES, 'url'>

export const BACKEND_ROUTES = {
  AUTH: {
    EMAIL_LOGIN: {
      method: 'POST',
      url: '/auth/login',
    },
    GOOGLE_LOGIN: {
      method: 'POST',
      url: '/auth/google-login',
    },
    KAKAO_LOGIN: {
      method: 'POST',
      url: '/auth/kakao-login',
    },
    NAVER_LOGIN: {
      method: 'POST',
      url: '/auth/naver-login',
    },
    SIGNUP: {
      method: 'POST',
      url: '/auth/signup',
    },
    VERIFY_EMAIL: {
      method: 'POST',
      url: '/auth/send-verify-email',
    },
    VERIFY_CODE: {
      method: 'POST',
      url: '/auth/verify-code',
    },
    SIGNOUT: {
      method: 'DELETE',
      url: '/auth/signout',
    },
    UPDATE_PROFILE: {
      method: 'POST',
      url: '/auth/update-profile',
    },
    UPDATE_PASSWORD: {
      method: 'POST',
      url: '/auth/update-password',
    },
    RENEW_TOKEN: {
      method: 'GET',
      url: '/auth/renew-token',
    },
  },
  PLAN: {
    UPDATE: {
      method: 'POST',
      url: '/plan/update',
    },
  },
}
