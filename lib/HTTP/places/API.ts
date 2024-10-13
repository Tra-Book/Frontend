/**
 * 다수 여행지 페칭하기
 * 필터값이 적용된 여행지를 가져오는 API입니다.
 */
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { Review } from '@/lib/types/Entity/comment'
import { Place } from '@/lib/types/Entity/place'
import { ArrangeChoiceType, StateChoicesType } from '@/lib/utils/hooks/useFilters'

import { attachQuery, Queries } from '../http'

const get_arrange = (arrange: ArrangeChoiceType): string => {
  switch (arrange) {
    case '리뷰순':
      return 'reviews'
    case '방문자순':
      return 'numOfAdded'
    case '평점순':
      return 'star'
    default:
      return ''
  }
}
interface fetchPlacesParams {
  searchInput: string
  states: Array<StateChoicesType>
  arrange: ArrangeChoiceType
  scrollNum: number
  isScrap: boolean
  accessToken: string
}

export type PlaceResponse = {
  place: {
    placeId: number
    cityId: number
    address: string
    placeName: string
    description: string
    latitude: number
    longitude: number
    star: number
    category: string
    imgSrc: string
    subcategory: string
    ratingScore: number
    scraps: number
    numOfAdded: number
    numOfReview: number
    isScrapped: boolean
  }
  comments: Array<Review>
}

export type PlaceCardType = Omit<Place, 'duration' | 'order'>

export const SCROLL_SIZE = 12
export const fetchPlaces = async (
  params: fetchPlacesParams,
): Promise<{
  datas: PlaceCardType[]
  totalPages: number
}> => {
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
  // #1. 그냥 여행지 + 유저가 스크랩한 여행지
  res = await fetch(API_ROUTE, {
    method: API.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken as string,
    },
    credentials: 'include',
  })

  if (!res.ok) {
    const error = new Error('An error occurred while fetching places')
    error.message = await res.json()
    throw error
  }
  const { places, totalPages } = await res.json()
  const datas: PlaceCardType[] = places.map(
    (data: PlaceResponse) =>
      ({
        id: data.place.placeId,
        name: data.place.placeName,
        imgSrc: data.place.imgSrc,
        address: data.place.address,
        geo: {
          latitude: data.place.latitude,
          longitude: data.place.longitude,
        },
        tag: data.place.category,
        // duration: 필요 없음(선택한 여행지에서 필요)
        // order: 필요 없음(선택한 여행지에서 필요)
        stars: data.place.star,
        visitCnt: data.place.numOfAdded,

        reviewCnt: data.place.numOfReview,
        reviews: data.comments,

        isScraped: data.place.isScrapped,
      }) as PlaceCardType,
  )

  return { datas, totalPages }
}
