export interface Geo {
  latitude: number
  longitude: number
}
/**
 여행지는 Server로부터 받는 데이터가 "Base" | Place가 클라이언트에서 추가한 데이터
*/
export interface BasePlace {
  id: number // 백엔드 제공 데이터
  location: Geo
  name: string
  category: string // 분류 (명소)
  imageSrc: Array<string>
  likes: number
  rating: number
  tags?: Array<string>
  reviews?: Array<string>
  isLiked: boolean
  isScraped: boolean
}

// order (순서)는 DayPlan - places의 순서로 판단
export interface Place extends BasePlace {
  duration: number // Minutes
}
