import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { Plan } from '@/lib/types/Entity/plan'

import { attachQuery, Queries } from '../http'

interface FetchUserPlansProps {
  type: 'user' | 'scrap'
  accessToken: string
  signal: AbortSignal
}
export type PlanCardType = Omit<Plan, 'memberCnt' | 'budget' | 'schedule' | 'comments'>

/**
 * 특정 유저와 관련된 여행 계획을 가져오는 함수
 * @param planId: Params로 입력된 Id
 */
export const GET_userPlans = async ({ type, accessToken, signal }: FetchUserPlansProps) => {
  const queries: Queries = [
    {
      key: 'type',
      value: type,
    },
  ]

  const API = BACKEND_ROUTES.PLANS.GET
  console.log(`${attachQuery(`/server/${API.url}`, queries)}`)

  const res = await fetch(`${attachQuery(`/server/${API.url}`, queries)}`, {
    method: API.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    signal,
  })

  if (!res.ok) {
    const error = new Error('유저의 여행계획 페칭 실패!')
    error.message = await res.json()
    throw error
  }
  const datas = await res.json()

  const plans: PlanCardType[] = datas.map((data: any) => ({
    id: data.planId,
    // userId: number >> 내정보로 채우기

    // #1. 기본 정보
    state: data.state,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),

    imgSrc: data.imgSrc,

    title: data.planTitle,
    description: data.description,
    // memberCnt 필요 없는 데이터
    // budget  // 필요 없는 데이터

    isDone: data.finished,
    isPublic: data.public,
    // #2. 여행 일정
    // schedule 필요 없는 데이터

    // #3. 커뮤니티 정보
    likeCnt: data.likes,
    scrapCnt: data.scraps,
    commentCnt: data.numOfComments,
    // comments 필요 없는 데이터

    // #4. 요청 유저관련 정보
    isScraped: data.isScrapped,
    isLiked: data.isLiked,
  }))

  return { plans }
}

interface fetchPlansParams {
  searchInput: string
  states: Array<StateChoicesType>
  arrange: ArrangeChoiceType
  scrollNum: number
  isScrap: boolean
  accessToken?: string
}

export type PlaceResponse = {
  placeId: number
  cityId: number
  address: string
  category: string
  description: string
  imageSrc: string
  latitude: number
  likes: number
  longitude: number
  numOfAdded: number
  placeName: string
  ratingScore: number
  scraps: number
  star: number
  subcategory: string
  tel: string
  zipcode: string
  isScraped: boolean
}
export type PlnCardType = Omit<Plan, 'duration' | 'order'>

export const SCROLL_SIZE = 12

/**
 *
 */
export const fetchPlans = async (params: fetchPlansProps) => {
  const { searchInput, states, arrange, scrollNum, isScrap, accessToken } = params
  const queries: Queries = [
    {
      key: 'search',
      value: searchInput,
    },
    {
      key: 'sorts',
      value: get_arrange(arrange),
    },
    {
      key: 'pageSize',
      value: SCROLL_SIZE,
    },
    {
      key: 'pageNum',
      value: scrollNum,
    },
    {
      key: 'userScrapOnly',
      value: isScrap,
    },
  ]
  // states 추가하기
  states.forEach(state =>
    queries.push({
      key: 'state',
      value: state,
    }),
  )

  const API = BACKEND_ROUTES.PLACES.GENERAL

  const API_ROUTE = attachQuery(`/server${API.url}`, queries)

  let res: Response
  // #1. 유저가 스크랩한 여행지
  if (isScrap) {
    res = await fetch(API_ROUTE, {
      method: API.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken as string,
      },
      credentials: 'include',
    })
  }
  // #2. 그냥 여행지
  else {
    res = await fetch(API_ROUTE, {
      method: API.method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  if (!res.ok) {
    const error = new Error('An error occurred while fetching places')
    error.message = await res.json()
    throw error
  }
  const { places, totalPages } = await res.json()
  const datas: PlaceCardType[] = places.map((place: PlaceResponse) => ({
    id: place.placeId,
    name: place.placeName,
    imgSrc: place.imageSrc,
    address: place.address,
    geo: {
      latitude: place.latitude,
      longitude: place.longitude,
    },
    tag: place.subcategory,
    // duration 필요 없음(선택한 여행지에서 필요)
    stars: place.star,
    visitCnt: place.numOfAdded,
    // TODO: reviews 백엔드 로직 아직 없음
    reviews: ['여기 너무 좋아요~ 데이트 장소', '핫플핫플 핫핫'], // Dummy
    reviewCnt: 200, // Dummy

    isScraped: place.isScraped, // Todo: 실제 데이터 받아오기
    // order 필요없음 (선택한 여행지에서 필요)
  }))
  return { datas, totalPages }
}
