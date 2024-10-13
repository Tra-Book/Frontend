import { StateType } from '@/lib/constants/regions'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { CommentRequest, CommentResponse } from '@/lib/types/Entity/comment'
import { Place } from '@/lib/types/Entity/place'
import { Plan, Schedule } from '@/lib/types/Entity/plan'
import { formatDateToHyphenDate, parseHypenDateToDate } from '@/lib/utils/dateUtils'
import { Nullable } from '@/lib/utils/typeUtils'

import { attachQuery, Queries } from '../http'
import { PlaceCardType } from '../places/API'

/**
 * {state: 지역, startDate: Date, endDate: Date, accessToken: string}
 */
export interface CreatePlanType {
  state: StateType
  startDate: Date
  endDate: Date
  accessToken: string
}
/**
 * 새로운 여행 계획 만들기
 * @param param0 `{state: 지역, startDate: Date, endDate: Date, accessToken: string}`
 * @returns data: `{planId: number}`
 */
export const createPlan = async ({ state, startDate, endDate, accessToken }: CreatePlanType) => {
  console.log('creating plan!')

  let backendRoute = BACKEND_ROUTES.PLAN.CREATE
  const body = {
    state: state,
    startDate: formatDateToHyphenDate(startDate),
    endDate: formatDateToHyphenDate(endDate),
  }

  const res = await fetch('/server' + backendRoute.url, {
    method: backendRoute.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  })

  if (!res.ok) {
    const error = new Error('계획 생성 실패')
    error.message = await res.json()
    throw error
  }

  const data = await res.json()

  return data
}

/**
 * {plan: Plan, userId: number}
 */
export interface UpdatePlanType {
  plan: Plan
  userId: number
}
/**
 * Plan Update (DB 반영하기) 함수입니다.
 * @param param0 `{plan: Plan, userId: number}`
 * @returns`planId: number,
    message: string,
    imgSrc: 이미지 경로`
 */
export const updatePlan = async ({ plan, userId }: UpdatePlanType): Promise<any> => {
  const {
    id,
    state,
    likeCnt,
    scrapCnt,
    memberCnt,
    budget,
    imgSrc, // typeof imgSrc === "object" > 바뀜 > Body에 보냄 //  tyepof imgSrc === "string" > 바뀌지 않음 > Body null
    startDate,
    endDate,
    title,
    description,
    schedule,
    isDone,
    isPublic,
  } = plan

  // 1. startTIme, endTIme에 초 없애기, longtitude > longitude
  const dayPlanList = schedule.map(item => ({
    day: item.day,
    startTime: item.startTime,
    endTime: item.endTime,
    scheduleList: item.places?.map(place => ({
      order: place.order,
      time: place.duration,
      placeId: place.id,
      imageSrc: place.imgSrc,
      placeName: place.name,
      latitude: place.geo.latitude,
      longtitude: place.geo.longitude,
    })),
  }))

  const bodyPlan = {
    planId: id,
    userId: userId,
    state: state,
    likes: likeCnt,
    scraps: scrapCnt,
    numOfPeople: memberCnt,
    budget: budget,
    startDate: formatDateToHyphenDate(startDate),
    endDate: formatDateToHyphenDate(endDate),
    title: title,
    description: description,
    dayPlanList: dayPlanList,
    isPublic: isPublic,
    isFinished: isDone,
  }
  console.log('bodyPlan: ', bodyPlan)
  console.log('imgrsc:', imgSrc)

  const formData = new FormData()
  formData.append('plan', JSON.stringify(bodyPlan))
  formData.append('image', imgSrc)

  const Route = BACKEND_ROUTES.PLAN.UPDATE

  const res = await fetch(`/server/${Route.url}`, {
    method: Route.method,
    headers: {
      // 'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
  if (!res.ok) {
    const error = new Error('다시 시도해주세요')
    error.message = await res.json()
    throw error
  }
  const data = await res.json()
  console.log('update revceived:', data)

  return data
}

/**
 * {planId: number, accessToken: string}
 */
export interface GetPlanType {
  planId: number
  accessToken: string
}
/**
 * Plan 정보를 받아오는 API
 * @param param0 {planId: number, accessToken: string}
 * @returns `planData: Plan Type 정보, planUser: Plan 만든 사람 정보, tags: Plan의 3개 태그}`
 */
export const getPlan = async ({ planId, accessToken }: GetPlanType) => {
  const queries: Queries = [
    {
      key: 'planId',
      value: planId,
    },
  ]

  const API = BACKEND_ROUTES.PLAN.GET

  const res = await fetch(`${attachQuery(`/server/${API.url}`, queries)}`, {
    method: API.method,
    headers: accessToken
      ? { Authorization: accessToken, 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (!res.ok) {
    const error = new Error('존재하지 않는 여행계획입니다')
    const errors = await res.json()
    console.log(errors)

    throw error
  }
  const { plan, user, tags, comments, liked, scrapped } = await res.json()

  const schedule: Array<Schedule> = plan.dayPlanList.map((dayPlan: any) => ({
    day: dayPlan.day,
    startTime: dayPlan.startTime,
    endTime: dayPlan.endTime,
    places: dayPlan.scheduleList.map(
      (item: any) =>
        ({
          id: item.placeId,

          name: item.placeName,
          imgSrc: item.imageSrc,
          address: item.address,
          geo: {
            latitude: item.latitude,
            longitude: item.longitude,
          },

          tag: item.subcategory,
          duration: item.time,

          stars: item.stars, // 평점
          visitCnt: item.numOfAdded, // 실제 계획에 담긴 횟수

          reviewCnt: item.numOfReview,
          isScraped: false, // 안받는 데이터

          order: item.order, // 계획세우기에 담긴 순서
        }) as Place,
    ),
  }))

  const planComments: Nullable<Array<CommentResponse>> = comments.map((comment: any) => ({
    id: comment.commentId,

    userId: comment.user.userId,
    userName: comment.user.username,
    userImgsrc: comment.user.image,
    userStatusMessage: comment.user.status_message,

    planId: comment.planId,

    parentId: comment.parentId,

    content: comment.content,
    time: comment.time,
    refOrder: comment.refOrder,
  }))

  const planData: Plan = {
    id: plan.planId,
    userId: plan.userId,

    // #1. 기본 정보
    state: plan.state, // 불변
    startDate: parseHypenDateToDate(plan.startDate),
    endDate: parseHypenDateToDate(plan.endDate),

    imgSrc: plan.imgSrc, // Default : 아무 여행 이미지

    title: plan.title, // Default: null
    description: plan.description, // Default: null
    memberCnt: plan.numOfPeople, // Default: null
    budget: plan.budget, // Default: null

    isDone: plan.isFinished,
    isPublic: plan.isPublic,
    // #2. 여행 일정
    schedule: schedule,

    // #3. 커뮤니티 정보
    likeCnt: plan.likes, // default: 0
    scrapCnt: plan.scraps, // default: 0
    comments: planComments, // default: null
    commentCnt: 0, // 쓰지 않는 데이터 (백엔드에서 보내질 않음)

    // #4. 요청 유저관련 정보
    isScraped: scrapped,
    isLiked: liked,
  }

  // 계획을 만든 사람의 정보
  const planUser = {
    userId: user.userId as number,
    username: user.username as string,
    status_message: user.status_message as string,
    image: user.image as string,
  }

  return { planData, planUser, tags }
}

/**
 * {newComment: CommentRequest, accessToken: string}
 */
export interface AddPlanCommentType {
  newComment: CommentRequest
  accessToken: string
}
/**
 * 여행계획 댓글 추가하기
 * @param param0 `newComment<CommentRequest>, accessToken: string`
 * @returns  `commentId: number` `message: string`
 */
export const addPlanComment = async ({ newComment, accessToken }: AddPlanCommentType) => {
  const body = newComment
  const Route = BACKEND_ROUTES.PLAN.COMMENT.CREATE

  const res = await fetch(`/server/${Route.url}`, {
    method: Route.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const errorData = await res.json() // 서버에서 보내는 에러 메시지를 가져옴
    const error = new Error('Error oucurred in adding comment')
    error.message = errorData.message || 'Error occured. Please try later' // 에러 메시지를 설정
    throw error
  }
  const data = await res.json()
  return data
}

/**
 * {placeId: number, accessToken: string}
 */
export interface DeletePlanType {
  planId: number
  accessToken: string
}
/**
 * 여행계획 삭제하기 DELTE
 * @param param0 `placeId: number, accessToken: string`
 * @returns
 */
export const deletePlan = async ({ planId, accessToken }: DeletePlanType) => {
  const Route = BACKEND_ROUTES.PLAN.DELETE

  const queries: Queries = [
    {
      key: 'planId',
      value: planId,
    },
  ]
  const res = await fetch(`${attachQuery(`/server/${Route.url}`, queries)}`, {
    method: Route.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!res.ok) {
    const errorData = await res.json() // 서버에서 보내는 에러 메시지를 가져옴
    const error = new Error('An error occurred while deleting scrap')
    error.message = errorData.message || 'Error occured. Please try later' // 에러 메시지를 설정
    throw error
  }

  return
}

/**
 * {planId: number, accessToken: string}
 */
export interface AddPlanScrapType {
  planId: number
  accessToken: string
}
/**
 * 여행계획 스크랩하기 POST
 * @param param0 `planId: number, accessToken: string`
 * @returns
 */
export const addPlanScrap = async ({ planId, accessToken }: AddPlanScrapType) => {
  const Route = BACKEND_ROUTES.PLAN.SCRAP.ADD

  const res = await fetch(`/server/${Route.url}`, {
    method: Route.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      planId: planId,
    }),
    credentials: 'include',
  })
  if (!res.ok) {
    const errorData = await res.json() // 서버에서 보내는 에러 메시지를 가져옴
    const error = new Error('An error occurred while adding scrap')
    error.message = errorData.message || 'Error occured. Please try later' // 에러 메시지를 설정
    throw error
  }
  console.log('스크랩 더하기 완료')

  return
}

/**
 * planId: number, accessToken: string
 */
export interface DeletePlanScrapType {
  planId: number
  accessToken: string
}
export const deletePlanScrap = async ({ planId, accessToken }: DeletePlanScrapType) => {
  const Route = BACKEND_ROUTES.PLAN.SCRAP.DELETE

  const queries: Queries = [
    {
      key: 'planId',
      value: planId,
    },
  ]
  const res = await fetch(`${attachQuery(`/server/${Route.url}`, queries)}`, {
    method: Route.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!res.ok) {
    const errorData = await res.json() // 서버에서 보내는 에러 메시지를 가져옴
    const error = new Error('An error occurred while deleting scrap')
    error.message = errorData.message || 'Error occured. Please try later' // 에러 메시지를 설정
    throw error
  }

  return
}

/**
 * planId: number, accessToken: string
 */
export interface AddPlanLikesType {
  planId: number
  accessToken: string
}
/**
 * 여행계획 좋아요 추가하기 POST
 */
export const addPlanLikes = async ({ planId, accessToken }: AddPlanLikesType) => {
  const Route = BACKEND_ROUTES.PLAN.LIKE.ADD

  const res = await fetch(`/server/${Route.url}`, {
    method: Route.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      planId: planId,
    }),
    credentials: 'include',
  })
  if (!res.ok) {
    const errorData = await res.json() // 서버에서 보내는 에러 메시지를 가져옴
    const error = new Error('An error occurred while adding scrap')
    error.message = errorData.message || 'Error occured. Please try later' // 에러 메시지를 설정
    throw error
  }
  return
}

/**
 * planId: number, accessToken: string
 */
export interface DeletePlanLikesType {
  planId: number
  accessToken: string
}
/**
 * 여행계획 좋아요 삭제하기 POST
 */
export const deletePlanLikes = async ({ planId, accessToken }: DeletePlanLikesType) => {
  const Route = BACKEND_ROUTES.PLAN.LIKE.DELETE
  console.log('planDElete lieks')

  const queries: Queries = [
    {
      key: 'planId',
      value: planId,
    },
  ]

  const res = await fetch(`${attachQuery(`/server/${Route.url}`, queries)}`, {
    method: Route.method,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!res.ok) {
    const errorData = await res.json() // 서버에서 보내는 에러 메시지를 가져옴
    const error = new Error('An error occurred while deleting scrap')
    error.message = errorData.message || 'Error occured. Please try later' // 에러 메시지를 설정
    throw error
  }

  return
}

/**
 * 선택한 여행지를 여행 계획에 추가하는 함수입니다.
 */
export const addPlaceToPlan = (originPlan: Plan, place: PlaceCardType, currentDay: number): Plan => {
  // #1. Schedule에서 currentDay와 일치하는 항목을 찾음
  const updatedSchedule = originPlan.schedule.map(schedule => {
    if (schedule.day === currentDay) {
      // #2. Order (순서), Duration (머무는 시간) 필드 추가하기

      const newPlace: Place = {
        ...place,
        duration: 60,
        order: schedule.places ? schedule.places.length + 1 : 1,
        reviews: place.reviews,
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
