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
 * Plan Create > 새로운 여행 계획 만들기 함수입니다.
 */
interface CreatePlanProps {
  state: StateType
  startDate: Date
  endDate: Date
  accessToken: string
}
export const createPlan = async ({ state, startDate, endDate, accessToken }: CreatePlanProps) => {
  console.log('creating plan')

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
 * Plan Update (DB 반영하기) 함수입니다.
 */
interface UpdatePlanProps {
  plan: Plan
  userId: number
}
export const updatePlan = async ({ plan, userId }: UpdatePlanProps) => {
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

interface FetchPlanProps {
  planId: number
  accessToken: string
}

/**
 * Plan 정보를 받아오는 API 입니다.
 * @param planId: Params로 입력된 Id
 */
export const fetchPlan = async ({ planId, accessToken }: FetchPlanProps) => {
  const queries: Queries = [
    {
      key: 'planId',
      value: planId,
    },
  ]

  const API = BACKEND_ROUTES.PLAN.GET
  console.log('accessToken')

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
  console.log('FetchedPlan:', plan)

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
 * #3. 댓글 추가하기
 */
interface AddCommentProps {
  newComment: CommentRequest
  accessToken: string
}
export const addComment = async ({ newComment, accessToken }: AddCommentProps) => {
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

  // toast({ title: 'Internal Server Error Occured!' })
}

/**
 * 여행계획 삭제하기 DELTE
 */
interface PlanDeleteType {
  planId: number
  accessToken: string
}
export const deletePlan = async ({ planId, accessToken }: PlanDeleteType) => {
  const Route = BACKEND_ROUTES.PLAN.DELETE
  console.log('Plan Delete API Entered')

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
 * 여행계획 스크랩하기 POST
 */
interface PlanAddScrapType {
  planId: number
  accessToken: string
}
export const planAddScrap = async ({ planId, accessToken }: PlanAddScrapType) => {
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

  return
}

/**
 * 여행계획 스크립 삭제하기 POST
 */
interface PlanDeleteScrapType {
  planId: number
  accessToken: string
}
export const planDeleteScrap = async ({ planId, accessToken }: PlanDeleteScrapType) => {
  const Route = BACKEND_ROUTES.PLAN.SCRAP.DELETE
  console.log('Plan Delete scrap')

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
 * 여행계획 좋아요 추가하기 POST
 */
interface PlanAddLikesType {
  planId: number
  accessToken: string
}
export const planAddLikes = async ({ planId, accessToken }: PlanAddLikesType) => {
  console.log('planaddlikes executed')

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
 * 여행계획 좋아요 삭제하기 POST
 */
interface PlanDeleteLikesType {
  planId: number
  accessToken: string
}
export const planDeleteLikes = async ({ planId, accessToken }: PlanDeleteLikesType) => {
  const Route = BACKEND_ROUTES.PLAN.LIKE.DELETE

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
