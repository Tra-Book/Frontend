import { StaticImageData } from 'next/image'

import { StateType } from '@/lib/constants/regions'
import { Nullable } from '@/lib/utils/typeUtils'

import { Comment } from './comment'
import { Place } from './place'

export interface Plan {
  id: number
  userId: number

  // #1. 기본 정보
  state: StateType // 불변
  startDate: Date
  endDate: Date

  // imgSrc: string
  // Todo: string으로 바꾸기
  imgSrc: StaticImageData // Default : 아무 여행 이미지

  title: Nullable<string> // Default: null
  description: Nullable<string> // Default: null
  memberCnt: Nullable<number> // Default: null
  budget: Nullable<number> // Default: null

  isDone: boolean

  // #2. 여행 일정
  schedule: Array<Schedule>

  // #3. 커뮤니티 정보
  likeCnt: number // default: 0
  scrapCnt: number // default: 0
  comments: Nullable<Array<Comment>> // default: null

  // #4. 요청 유저관련 정보
  isScraped: boolean
  isLiked: boolean
}

export interface Schedule {
  // #1. 기본 정보
  day: number // 몇일차
  // "HH:MM" 형식
  startTime: string
  endTime: string

  // #2. 여행지 일정
  places: Nullable<Array<Place>>
}
