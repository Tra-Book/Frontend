import React, { ReactNode } from 'react'

import AddedPlaceLists from '@/components/plan/AddedPlaceLists'
import { Place } from '@/lib/types/Entity/place'
import { DayPlan } from '@/lib/types/Entity/plan'
import DUMMYPLACEIMG from '@/public/dummy/dummy_place_image.png'

interface AddPlaceLayoutProps {
  children: React.ReactNode
}

const DUMMY_PLACE: Place = {
  id: 125405,
  name: '토함산자연휴양림',
  imgSrc: DUMMYPLACEIMG,
  address: '경상북도 경주시 양북면 불국로',

  tag: '관광지',
  duration: 60,
  stars: 5,
  visitCnt: 100, // 실제 계획에 담긴 횟수

  geo: {
    latitude: 33.450701,
    longitude: 126.570667,
  },
  //reviews: Array<Comment>
  reviewCnt: 10,

  isAdded: true, // 계획에 들어갔는지 여부
  isScraped: true,

  order: 1, // 계획세우기에 담긴 순서
}

const DUMMY_PLACES: Array<Place> = new Array(12).fill(DUMMY_PLACE)

export const DUMMY_DAYPLAN: DayPlan = {
  day: 1,
  startTime: '08:00',
  endTime: '20:00',
  places: DUMMY_PLACES,
}

// Todo: DayPlan 정보 받아오기
const DayPlanData: DayPlan = DUMMY_DAYPLAN

const AddPlaceLayout = ({ children }: AddPlaceLayoutProps): ReactNode => {
  // Layout에서 전역 변수의 DayPlan에 접근하기
  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      <AddedPlaceLists DayPlan={DayPlanData} />
      {children}
    </div>
  )
}

export default AddPlaceLayout
