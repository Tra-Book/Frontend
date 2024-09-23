import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'

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

export type ResponsePlace = {
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
  places: Array<ResponsePlace>
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
    })

    if (res.ok) {
      const data = await res.json()
      console.log(data)

      return data
    }
    // 단순 GET 이므로, 에러 헨들링 없음
    // const status = res.status

    // switch (status) {
    //   default:
    //     break
    // }
  } catch (error) {
    console.log('Internal Server Error Occured!')
  }
  return {
    places: [],
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
