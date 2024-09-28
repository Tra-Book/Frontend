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
