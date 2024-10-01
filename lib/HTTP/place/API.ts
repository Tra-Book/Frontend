'use client'
/**
 * Place 관련 API 들을 모아두는 저장소입니다.
 */

import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { toast } from '@/lib/utils/hooks/useToast'

/**
 * 여행지 스크랩하기 POST
 */
interface PlaceAddScrapType {
  placeId: number
  accessToken: string
}
export const placeAddScrap = async ({ placeId, accessToken }: PlaceAddScrapType) => {
  const Route = BACKEND_ROUTES.PLACE.SCRAP.ADD
  console.log('여행지 스크랩 넣기 들어옴')

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

  return
}

/**
 * 여행지 스크립 삭제하기 POST
 */
interface PlaceDeleteScrapType {
  placeId: number
  accessToken: string
}
export const placeDeleteScrap = async ({ placeId, accessToken }: PlaceDeleteScrapType) => {
  console.log('여행지 스크랩 삭제 들어옴')

  const Route = BACKEND_ROUTES.PLACE.SCRAP.DELETE

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
    toast({ title: '보관함 삭제 실패' })

    error.message = await res.json()
    throw error
  }

  return
}
