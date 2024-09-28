'use client'
/**
 * Place 관련 API 들을 모아두는 저장소입니다.
 */

import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { Place } from '@/lib/types/Entity/place'
import { ArrangeChoiceType, StateChoicesType } from '@/lib/utils/hooks/useFilters'
import { toast } from '@/lib/utils/hooks/useToast'

import { attachQuery, Queries } from '../http'

/**
 * 필터값이 적용된 여행지를 가져오는 API입니다.
 */

interface fetchPlacesParams {
  searchInput: string
  states: Array<StateChoicesType>
  arrange: ArrangeChoiceType
  scrollNum: number
  isScrap: boolean
  accessToken?: string
}

const get_arrange = (arrange: ArrangeChoiceType): string => {
  switch (arrange) {
    case '댓글순':
      return '' // TODO: 추가해야함 (여행 계획)

    case '리뷰순':
      return 'reviews'

    case '방문자순':
      return 'numOfAdded'

    case '스크랩순':
      return '' // TODO: 추가해야함 (여행 계획)
    case '좋아요순':
      return '' // TODO: 추가해야함 (여행 계획)
    case '최신순':
      return '' // TODO: 추가해야함 (여행 계획)
    case '평점순':
      return 'star'
  }
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

export type FetchPlacesResponse = {
  datas: Array<Place>
  totalPages: number
}

export const SCROLL_SIZE = 12
export const fetchPlaces = async (params: fetchPlacesParams): Promise<FetchPlacesResponse> => {
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
  const datas: Place[] = places.map((place: PlaceResponse) => ({
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
    // TODO: reviews 아직 없음
    // TODO: reviewCnt 아직 없음
    reviewCnt: 0,
    isScraped: place.isScraped, // Todo: 실제 데이터 받아오기
    // order 필요없음 (선택한 여행지에서 필요)
  }))
  return { datas, totalPages }
}

/**
 * 스크랩 POST
 */
interface ScrapPlaceType {
  placeId: number
  accessToken: string
}
export const scrapPlace = async ({ placeId, accessToken }: ScrapPlaceType) => {
  try {
    const Route = BACKEND_ROUTES.PLACE.SCRAP
    console.log(Route.url)

    const res = await fetch(`/server/${Route.url}`, {
      method: Route.method,
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placeId: placeId,
      }),
      credentials: 'include',
    })
    if (!res.ok) {
      const error = new Error('An error occurred while fetching places')
      toast({ title: '보관함 추가 실패' })

      error.message = await res.json()
      throw error
    }

    toast({ title: '보관함에 추가되었습니다!' })
    return
  } catch (error) {
    console.log(error)

    console.log('Internal Server error')
  }
}
