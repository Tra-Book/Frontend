import { Comment } from '@/lib/types/comment'
import { Place } from '@/lib/types/place'

export interface DayPlan {
  date: Date
  startTime: string
  endTime: string
  places?: Array<Place>
}

export interface Plan {
  id: number // 백엔드 제공 데이터
  region: string
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
