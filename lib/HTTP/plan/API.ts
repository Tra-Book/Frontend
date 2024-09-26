import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { CommentRequest } from '@/lib/types/Entity/comment'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import { formatDateToHyphenDate } from '@/lib/utils/dateUtils'

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
      placeId: place.id,
      order: place.order,
      time: place.duration,
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
  const body = {
    plan: bodyPlan,
    image:
      typeof imgSrc === 'object'
        ? (() => {
            const formData = new FormData()
            formData.append('image', imgSrc)
            return formData
          })()
        : null,
  }

  console.log(body)

  const Route = BACKEND_ROUTES.PLAN.UPDATE

  const res = await fetch(`/server/${Route.url}`, {
    method: Route.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const error = new Error('다시 시도해주세요')
    error.message = await res.json()
    throw error
  }
  const data = await res.json()
  return data
}

/**
 * Plan 정보를 받아오는 API 입니다.
 */
// interface FetchPlanProps {
//   planId: number
//   accessToken: string
// }

// export const fetchPlan = async ({ planId, accessToken }: FetchPlanProps) => {

//   const Route = BACKEND_ROUTES.PLAN.GET
//   const query: Queries = [
//     {
//       key: 'planId',
//       value: planId,
//     },
//   ]

//   const res = await fetch(attachQuery(Route.url, query), {
//     method: Route.method,
//     headers: {
//       Authorization: accessToken,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       planId,
//     }),
//     credentials: 'include',
//   })

//   if (!res.ok) {
//     const error = new Error('존재하지 않는 여행계획입니다')
//     error.message = await res.json()
//     throw error
//   }
//   const { plan, dayPlanList, user, tags, isLiked, scrapped  } = await res.json()

//   const schedule: Array<Schedule> = dayPlanList.map((dayPlan) => ({
//     day: dayPlan.day,
//     startTime:dayPlan.startTime,
//     endTime:dayPlan.endTime.
//     places: dayPlan.scheduleList.map((item)=> ({
//       id: item.placeId,

//       name: item.placeName,
//       imgSrc: item.imageSrc,
//       address: item., // 주소 채워넣기
//       geo: {
//         latitide: item.latitide,
//         lonitude:item.longitude,
//       },

//       tag: "string",
//       duration: item.time,

//       stars: item. // 평점
//       visitCnt: number // 실제 계획에 담긴 횟수

//       reviews?: Array<Comment>
//       reviewCnt: number

//       isScraped: boolean

//       order?: number // 계획세우기에 담긴 순서
//     })),
//   }))
//   const fetchedPlan: Plan = {
//     id: plan.planId,
//     userId: plan.userId,

//     // #1. 기본 정보
//     state: plan.state, // 불변
//     startDate: parseHypenDateToDate(plan.startDate),
//     endDate: parseHypenDateToDate(plan.endDate),

//     imgSrc: PLAN_DEFAULT_IMAGE, // Default : 아무 여행 이미지

//     title: plan.title, // Default: null
//     description: plan.description, // Default: null
//     memberCnt: plan.numOfPeople, // Default: null
//     budget: plan.budget, // Default: null

//     isDone: plan.isFinished,
//     isPublic: plan.isPublic,
//     // #2. 여행 일정
//     schedule: Array<Schedule>

//     // #3. 커뮤니티 정보
//     likeCnt: number // default: 0
//     scrapCnt: number // default: 0
//     comments: Nullable<Array<Comment>> // default: null

//     // #4. 요청 유저관련 정보
//     isScraped: boolean
//     isLiked: boolean
//   }

// }

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
    console.log(error.message)

    throw error
  }
  const data = await res.json()
  return data

  // toast({ title: 'Internal Server Error Occured!' })
}

/**
 * 선택한 여행지를 여행 계획에 추가하는 함수입니다.
 */
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
