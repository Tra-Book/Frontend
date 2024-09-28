'use client'
/**
 * Place 관련 API 들을 모아두는 저장소입니다.
 */

import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { toast } from '@/lib/utils/hooks/useToast'

/**
 * 여행지 스크랩하기 POST
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
