import { StaticImageData } from 'next/image'

import { StateType } from '@/lib/constants/regions'

import { Comment } from './comment'
import { Place } from './place'

export interface Plan {
  id: number
  userId: number

  // #1. 기본 정보
  state: StateType // 불변
  city: string // 추가될 수 있음
  startDate: Date // "yyyy-MM-dd" 형태
  endDate: Date

  // imgSrc: string
  // Todo: string으로 바꾸기
  imgSrc: StaticImageData

  title: string
  description: string
  memberCnt: number
  budget: number

  isDone: boolean // 공개 여부 (끝난 여부)

  // #2. 여행 일정
  schedule: Array<Schedule>

  // #3. 커뮤니티 정보
  likeCnt: number
  scrapCnt: number
  comments?: Array<Comment>

  // #4. 요청 유저관련 정보
  isScraped: boolean
  isLiked: boolean
}

export interface Schedule {
  // #1. 기본 정보
  day: number // 몇일차
  startTime: string // "HH:MM" 형식
  endTime: string

  // #2. 여행지 일정
  places?: Array<Place>
}
