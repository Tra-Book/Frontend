import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'

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

/**
 * Plan Update (DB 반영하기) 함수입니다.
 */
// export const updatePlan = async(plan: Plan) => {
//   const {id,state, likeCnt, scrapCnt, } = plan
//   const Route = BACKEND_ROUTES.PLAN.UPDATE

//   const body = {

//       planId: ,
//       userId: 3,
//       state: string,
//       likes: 0,
//       scraps: 0,
//       numOfPeople: 0,
//       budget: 0,
//       image: string,
//       startDate: 2024-09-17,
//       endDate: 2024-09-17,
//       title: string,
//       description: string,
//       img: string,
//       dayPlanList: [
//         {
//           day: 0,
//           startTime:10:00:00,
//           endTime: 10:00:00,
//           scheduleList: [
//             {
//               order: 0,
//               time: 0,
//               placeId: 125405,
//               imageSrc: string,
//               placeName: string,
//               latitude: 0,
//               longtitude: 0
//             }
//           ]
//         }
//       ],
//       isPublic: true,
//       isFinished: true

//   }
// }
