import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import { toast } from '@/lib/utils/hooks/useToast'

import { BACKEND_ROUTES } from '../../constants/routes'
import { ArrangeChoiceType, StateChoicesType } from '../../utils/hooks/useFilters'
import { attachQuery, Queries } from '../http'

//Plans

interface fetchPlansParams {
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

export type FetchPlansResponse = {
  datas: Array<Place>
  totalPages: number
}

export const SCROLL_SIZE = 12
export const fetchPlans = async (params: fetchPlansParams): Promise<FetchPlansResponse> => {
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

export const addPlaceToPlan = (originPlan: Plan, place: Place, currentDay: number): Plan => {
  // #1. Schedule에서 currentDay와 일치하는 항목을 찾음
  const updatedSchedule = originPlan.schedule.map(schedule => {
    if (schedule.day === currentDay) {
      // #2. Order (순서), Duration (머무는 시간) 필드 추가하기

      const newPlace: Place = {
        ...place,
        order: schedule.places ? schedule.places.length + 1 : 1,
        duration: 60,
      }
      const updatedPlaces: Place[] = schedule.places ? [...schedule.places, newPlace] : [newPlace]
      return {
        ...schedule,
        places: updatedPlaces,
      }
    }
    return schedule // 변경되지 않은 일정은 그대로 반환
  })

  return {
    ...originPlan,
    schedule: updatedSchedule, // 업데이트된 스케줄 반영
  }
}
