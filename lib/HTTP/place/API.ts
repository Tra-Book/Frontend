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
}

export type FetchPlacesResponse = {
  datas: Array<Place>
  totalPages: number
}

export const SCROLL_SIZE = 12
export const fetchPlans = async (params: fetchPlacesParams): Promise<FetchPlacesResponse> => {
  const { searchInput, states, arrange, scrollNum } = params
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
  ]
  // states 추가하기
  states.forEach(state =>
    queries.push({
      key: 'state',
      value: state,
    }),
  )

  const API = BACKEND_ROUTES.PLACES.GENERAL

  const API_ROUTE = attachQuery(`/server/${API.url}`, queries)

  try {
    const res = await fetch(API_ROUTE, {
      method: API.method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: { tags: ['places'] },
    })
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
      tag: place.category,
      // duration 없음
      stars: place.star,
      visitCnt: place.numOfAdded,
      // reviews 아직 없음
      // reviewCnt 아직 없음
      reviewCnt: 0,
      isScraped: false, // Todo: 실제 데이터 받아오기
      // order 없음
    }))
    return { datas, totalPages }
  } catch (error) {
    toast({ title: 'Internal Server Error Occured!' })
  }
  return {
    datas: [],
    totalPages: 0,
  }
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
    if (res.ok) {
      toast({ title: '보관함에 추가되었습니다!' })
      // 낙관적 업데이트 (UI 먼저 반영)

      return
    }
    // 400 에러 처리
    const status = res.status
    const errorData = await res.json() // 에러 메시지 확인

    switch (status) {
      case 400:
        console.log('Wrong Request')
        break
      default:
        console.log('Unhandled error')
        break
    }
  } catch (error) {
    console.log(error)

    console.log('Internal Server error')
  }
}
