'use client'
/**
 * Place 관련 API 들을 모아두는 저장소입니다.
 */

import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { toast } from '@/lib/utils/hooks/useToast'

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
