import { STATES } from '@/lib/constants/regions'

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
  state: StateType
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

export type StateType = Mutable<(typeof STATES)[number]>
