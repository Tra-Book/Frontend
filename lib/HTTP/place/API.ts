'use client'
/**
 * Place 관련 API 들을 모아두는 저장소입니다.
 */

import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { toast } from '@/lib/utils/hooks/useToast'

/**
 * placeId: number, accessToken: string
 */
export interface AddPlaceScrapType {
  placeId: number
  accessToken: string
}
export const addPlaceScrap = async ({ placeId, accessToken }: AddPlaceScrapType) => {
  const Route = BACKEND_ROUTES.PLACE.SCRAP.ADD
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
 * placeId: number, accessToken: string
 */
export interface DeletePlaceScrapType {
  placeId: number
  accessToken: string
}
export const deletePlaceScrap = async ({ placeId, accessToken }: DeletePlaceScrapType) => {
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
