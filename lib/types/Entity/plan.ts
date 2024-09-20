import { StateType } from '@/lib/constants/regions'

import { Place } from './place'

export interface Plan {
  id: number
  userId: number

  // #1. 기본 정보
  state: StateType // 불변
  city: string // 추가될 수 있음
  startDate: Date // "yyyy-MM-dd" 형태
  endDate: Date

  imgSrc: string
  title: string
  description: string
  memberCnt: number
  budget: number

  isDone: boolean // 공개 여부 (끝난 여부)

  // #2. 여행 일정
  schedule?: Array<DayPlan>

  // #3. 커뮤니티 정보
  likeCnt: number
  scrapCnt: number
}

export interface DayPlan {
  // #1. 기본 정보
  day: number // 몇일차
  startTime: string // "HH:MM" 형식
  endTime: string

  // #2. 여행지 일정
  places?: Array<Place>
}

export const DUMMY_PLAN: Plan = {
  id: -1,
  userId: -1,

  // #1. 기본 정보
  state: '서울특별시',
  city: '강남구',
  startDate: new Date(),
  endDate: new Date(),

  imgSrc: '',
  title: '',
  description: '',
  memberCnt: 1,
  budget: 0,

  isDone: false, // 공개 여부 (끝난 여부)

  // #3. 커뮤니티 정보
  likeCnt: 1,
  scrapCnt: 1,
}
