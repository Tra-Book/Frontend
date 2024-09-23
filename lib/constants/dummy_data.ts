import DUMMYPLACEIMG from '@/public/dummy/dummy_place_image.png'
import DummyThumbNail from '@/public/dummy/dummy_plan_thumbnail.png'

import { Comment } from '../types/Entity/comment'
import { Place } from '../types/Entity/place'
import { Plan, Schedule } from '../types/Entity/plan'

const PLAN_DEFAULT_IMAGE: string = 'https://storage.googleapis.com/trabook-20240822/planPhoto/thumnail.png'
export const PLACE_DEFAULT_IMAGE: string = 'https://storage.googleapis.com/trabook-20240822/placePhoto/thumbnail.png'
const get_dummy_place = (idx: number): Place => {
  return {
    id: idx,
    name: `토함산자연휴양림${idx}`,
    imgSrc: PLAN_DEFAULT_IMAGE,
    address: `경상북도 경주시 양북면 불국로${idx}`,

    tag: `관광지`,
    duration: 60,
    stars: Math.floor((4.1 + idx / 10) * 10) / 10,
    visitCnt: 100 + idx, // 실제 계획에 담긴 횟수

    geo: {
      latitude: 33.450701 + idx / 10,
      longitude: 126.570667 + idx / 10,
    },
    //reviews: Array<Comment>
    reviewCnt: 10 + idx,

    isScraped: Math.random() < 0.5, // 스크랩 여부

    order: 1 + idx, // 계획세우기에 담긴 순서}
  }
}
export const DUMMY_PLACES: Array<Place> = Array.from({ length: 6 }, (_, idx) => get_dummy_place(idx))

export const DUMMY_COMMENT: Comment = {
  id: 10,
  parentId: 9,
  content: '댓글',
  date: new Date(),
  thumbCnt: 100,
  userId: 41,
}

const get_dummy_dayplan = (idx: number): Schedule => {
  return {
    day: idx + 1,
    startTime: '08:00',
    endTime: '20:00',
    places: DUMMY_PLACES,
  }
}

export const DUMMY_PLAN: Plan = {
  id: 12345,
  title: '가족 여행',
  likeCnt: 30,
  isDone: true,
  startDate: new Date(),
  endDate: new Date(),
  budget: 10000,
  state: '서울특별시',
  description: '전역한 아들들과 떠나는 즐겨운 여행입니다! 전역한 아들들과 떠나는 즐겨운 여행입니다!',
  imgSrc: DUMMYPLACEIMG,
  scrapCnt: 200,
  memberCnt: 10,
  userId: 41,
  comments: new Array(12).fill(DUMMY_COMMENT),
  isScraped: true,
  isLiked: true,
  schedule: Array.from({ length: 6 }, (_, idx) => get_dummy_dayplan(idx)),
}

const random_Date = new Date()

export const INITIAL_PLAN: Plan = {
  id: -1, // 백엔드 값으로 대체
  userId: -1, //세션 값

  state: '서울특별시', // 초기 값으로 대체됨
  startDate: random_Date,
  endDate: random_Date,

  // imgSrc: string
  imgSrc: DummyThumbNail, // Default : 아무 여행 이미지

  title: null, // Default: null
  description: null, // Default: null
  memberCnt: null, // Default: null
  budget: null, // Default: null

  // #2. 여행 일정
  schedule: [],

  // #3. 커뮤니티 정보
  isDone: false,
  likeCnt: 0, // default: 0
  scrapCnt: 0, // default: 0
  comments: null, // default: 0

  // #4. 요청 유저관련 정보
  isScraped: false,
  isLiked: false,
}

export const generate_initial_schedule = (day: number): Array<Schedule> => {
  return Array.from({ length: day }, (_, idx) => ({
    day: idx + 1,
    startTime: '08:00',
    endTime: '22:00',
    places: null,
  }))
}
