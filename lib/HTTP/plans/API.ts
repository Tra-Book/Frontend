import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { Plan } from '@/lib/types/Entity/plan'
import { ArrangeChoiceType, StateChoicesType } from '@/lib/utils/hooks/useFilters'
import { Nullable } from '@/lib/utils/typeUtils'

import { attachQuery, Queries } from '../http'
import { SCROLL_SIZE } from '../places/API'

interface FetchUserPlansProps {
  type: 'user' | 'scrap'
  accessToken: string
  signal: AbortSignal
}
export type PlanCardType = Omit<Plan, 'userId' | 'memberCnt' | 'budget' | 'schedule' | 'comments'> & {
  tags: string[]
}

/**
 * 특정 유저와 관련된 여행 계획을 가져오는 함수 (메인페이지, 내 계획)
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

interface fetchPlansParams {
  searchInput: string
  states: Array<StateChoicesType>
  arrange: ArrangeChoiceType
  scrollNum: number
  isScrap: boolean
  accessToken?: string
}

export type PlanResponse = {
  plan: {
    planId: number
    planTitle: string
    description: string
    state: string
    likes: number
    scraps: number
    numOfComment: number
    imgSrc: string
    startDate: string
    endDate: string
    isLiked: boolean
    isScrapped: boolean

    numOfPeople: number
    tags: Nullable<string[]>

    public: boolean
    finished: boolean
  }
  comments: Array<{
    commentId: number
    userId: number
    planId: number
    content: string
    refOrder: number
    time: string // Date를 string으로 바꾼 값
  }>
}

const get_arrange = (arrange: ArrangeChoiceType): string => {
  switch (arrange) {
    case '댓글순':
      return 'numOfComment'
    case '스크랩순':
      return 'numOfPeople'
    case '좋아요순':
      return 'likes'
    case '최신순':
      return 'startDate'
    default:
      return ''
  }
}
/**
 * 임의의 여행계획, 유저가 스크랩한 여행계획 페칭
 */
export const fetchPlans = async (
  params: fetchPlansParams,
): Promise<{
  datas: PlanCardType[]
  totalPages: any
}> => {
  const { searchInput, states, arrange, scrollNum, isScrap, accessToken } = params
  console.log('Exectued fetch plans')

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

  const API = BACKEND_ROUTES.PLANS.GENERAL

  const API_ROUTE = attachQuery(`/server${API.url}`, queries)

  let res: Response
  // #1. 유저가 스크랩한 여행 계획
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
  // #2. 그냥 여행 계획
  else {
    res = await fetch(API_ROUTE, {
      method: API.method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  if (!res.ok) {
    const error = new Error('An error occurred while fetching plans')
    error.message = await res.json()
    throw error
  }
  const { plans, totalPages } = await res.json()

  const datas: PlanCardType[] = plans.map(
    (data: PlanResponse) =>
      ({
        id: data.plan.planId,

        state: data.plan.state,
        startDate: new Date(data.plan.startDate),
        endDate: new Date(data.plan.endDate),

        imgSrc: data.plan.imgSrc,

        title: data.plan.planTitle,
        description: data.plan.description,
        isDone: data.plan.finished,
        isPublic: data.plan.public,

        commentCnt: data.plan.numOfComment,
        likeCnt: data.plan.likes,
        scrapCnt: data.plan.scraps,

        isScraped: data.plan.isScrapped,
        isLiked: data.plan.isLiked,
        tags: data.plan.tags,
      }) as PlanCardType,
  )
  console.log('FetchedPlans:', datas)
  console.log('totalPages:', totalPages)

  return { datas, totalPages }
}
