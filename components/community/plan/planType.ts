// Plan Type
export interface Plan {
  planId: number
  planTitle: string
  description: string
  state: string
  likes: number
  scraps: number
  numOfComment: number
  imgSrc: string
  startDate: string
  endDate: string
  isLiked: boolean
  isScrapped: boolean
  public: boolean
  finished: boolean
}

// Filter Type
export const FILTERS: string[] = ['지역별', '인원수', '기간']
export const MEMBER_FILTERS: string[] = ['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명', '9명', '10명']
export const DURATION_FILTERS: string[] = [
  '1박 2일',
  '2박 3일',
  '3박 4일',
  '4박 5일',
  '5박 6일',
  '6박 7일',
  '7박 8일',
  '8박 9일',
  '9박 10일',
  '10박 11일',
]
export type FilterType = (typeof FILTERS)[number]
export type MemberFilterType = (typeof MEMBER_FILTERS)[number]
export type DurationFilterType = (typeof DURATION_FILTERS)[number]

//dummy data...
export const dummyPlan: Plan = {
  planId: 242,
  planTitle: '제주도 여행~',
  description:
    '정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! 정말 재밌어요!! 많이 재밌어요!! ',
  state: 'string',
  likes: 3,
  scraps: 0,
  numOfComment: 0,
  imgSrc: 'https://storage.googleapis.com/trabook-20240822/planPhoto/242',
  startDate: '2024-09-03',
  endDate: '2024-09-10',
  isLiked: false,
  isScrapped: false,
  public: true,
  finished: true,
}
