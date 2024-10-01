import { Nullable } from '@/lib/utils/typeUtils'

import { Review } from './comment'

export interface Geo {
  latitude: number
  longitude: number
}

export interface Place {
  id: number

  name: string // 여행지명
  // 임시 Dummy Data를 위해
  imgSrc: Nullable<string>
  address: string // 한글 주소
  geo: Geo // 위치

  tag: string
  duration?: number // Minutes

  stars: number // 평점
  visitCnt: number // 실제 계획에 담긴 횟수

  reviews: Array<Review>
  reviewCnt: number

  isScraped: boolean

  order?: number // 계획세우기에 담긴 순서
}
