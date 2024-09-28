import { HttpMethod } from '../HTTP/http'
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
    DETAIL: {
      name: '여행 디테일',
      url: '/plan/detail',
    },
    SCRAP: {
      PLAN: {
        name: '보관함 여행계획',
        url: '/plan/scrap/plan',
      },
      PLACE: {
        name: '보관함 여행계획',
        url: '/plan/scrap/place',
      },
    },
  },
  COMMUNITY: {
    PLAN: {
      name: '여행 계획 커뮤니티',
      url: '/community/plan',
    },
    PLACE: {
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
      method: HttpMethod.POST,
      url: '/auth/login',
    },
    GOOGLE_LOGIN: {
      method: HttpMethod.POST,
      url: '/auth/google-login',
    },
    KAKAO_LOGIN: {
      method: HttpMethod.POST,
      url: '/auth/kakao-login',
    },
    NAVER_LOGIN: {
      method: HttpMethod.POST,
      url: '/auth/naver-login',
    },
    SIGNUP: {
      method: HttpMethod.POST,
      url: '/auth/signup',
    },
    VERIFY_EMAIL: {
      method: HttpMethod.POST,
      url: '/auth/send-verify-email',
    },
    VERIFY_CODE: {
      method: HttpMethod.POST,
      url: '/auth/verify-code',
    },
    SIGNOUT: {
      method: HttpMethod.DELETE,
      url: '/auth/signout',
    },
    UPDATE_PROFILE: {
      method: HttpMethod.POST,
      url: '/auth/update-profile',
    },
    UPDATE_PASSWORD: {
      method: HttpMethod.POST,
      url: '/auth/update-password',
    },
    RENEW_TOKEN: {
      method: HttpMethod.GET,
      url: '/auth/renew-token',
    },
  },

  PLAN: {
    GET: {
      method: HttpMethod.GET,
      url: '/plan',
    },
    CREATE: {
      method: HttpMethod.POST,
      url: '/plan/create',
    },
    UPDATE: {
      method: HttpMethod.PATCH,
      url: '/plan/update',
    },
    COMMENT: {
      CREATE: {
        method: HttpMethod.POST,
        url: '/plan/comment/add',
      },
    },
  },

  PLACES: {
    GENERAL: {
      method: HttpMethod.GET,
      url: '/places/general',
    },
    POPULAR: {
      method: HttpMethod.GET,
      url: '/places/popular',
    },
  },
  PLACE: {
    SCRAP: {
      method: HttpMethod.POST,
      url: '/place/scrap',
    },
  },
}
