export interface Geo {
  latitude: number
  longitude: number
}
/**
 여행지는 Server로부터 받는 데이터가 "Base" | Place가 클라이언트에서 추가한 데이터
*/
export interface Place {
  id: number

  name: string // 여행지명
  imgSrc: string
  address: string // 한글 주소
  geo: Geo // 위치

  tags: string
  duration: number // Minutes

  stars: number // 평점
  visitCnt: number // 실제 계획에 담긴 횟수

  reviews: Array<Comment>
  reviewCnt: number

  isAdded: boolean // 계획에 들어갔는지 여부
  isScraped: boolean

  order: number // 계획세우기에 담긴 순서
}
