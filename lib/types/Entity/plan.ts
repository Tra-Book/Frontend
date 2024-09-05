import { BaseEntity, Mutable } from '../../utils/typeUtils'
import { Comment } from './comment'
import { Place } from './place'

export interface DayPlan {
  date: Date
  startTime: string
  endTime: string
  places?: Array<Place>
}

export interface Plan extends BaseEntity {
  region: PlanRegionType
  schedule: {
    startDate: Date
    endDate: Date
  }
  memberCount: number
  purpose: string
  budget: number
  plans?: Array<DayPlan>
  comments?: Array<Comment>
  isFinished: boolean
}

export const planRegions = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주도',
] as const

export type PlanRegionType = Mutable<(typeof planRegions)[number]>
