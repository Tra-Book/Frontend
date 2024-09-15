'use client'
import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { DayPlan } from '@/lib/types/Entity/plan'
import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'
import DUMMYPLACEIMG from '@/public/dummy/dummy_place_image.png'

interface PlanSchedulePageProps {}

// Dummy Place
const DUMMY_PLACE: Place = {
  id: 125405,
  name: '토함산자연휴양림',
  imgSrc: DUMMYPLACEIMG,
  address: '경상북도 경주시 양북면 불국로 1208-45',

  tag: '관광지',
  duration: 60,
  stars: 5,
  visitCnt: 100, // 실제 계획에 담긴 횟수

  geo: {
    latitude: 127,
    longitude: 32,
  },
  //reviews: Array<Comment>
  reviewCnt: 10,

  isAdded: true, // 계획에 들어갔는지 여부
  isScraped: true,

  order: 1, // 계획세우기에 담긴 순서
}

// Dummy places
const DUMMY_PLACES: Array<Place> = new Array(15).fill(DUMMY_PLACE)

// Dummy DayPlan
const DUMMY_DAYPLAN: DayPlan = {
  day: 1,
  startTime: '08:00',
  endTime: '20:00',
  places: DUMMY_PLACES,
}

const PlanSchedulePage = ({}: PlanSchedulePageProps): ReactNode => {
  const { day, DayDropdown } = useDayDropdown(10)
  // Todo: DayPlan 정보 받아오기

  return (
    <div className='flex h-dvh flex-grow justify-start'>
      {/* 사이드바 */}
      <div className='relative flex w-1/4 flex-col items-center justify-start'>
        {/* 지역/일자선택 */}
        <div className='relative flex h-[10%] w-full items-center'>
          <p className='mx-4'>강원도</p>
          <DayDropdown className='mx-4 h-9 flex-grow' />
        </div>
        {/* 여행일자 정보 */}
        <div className='flex h-[8%] w-full items-center justify-between border-b border-tbPlaceholder px-3'>
          <div>
            <div className='text-sm text-tbGray'>일자</div>
            <div className='flex items-center justify-start gap-2'>
              <span>12/29(수)</span>
            </div>
          </div>
          <div>
            <div className='text-sm text-tbGray'>시작시간</div>
            <div className='flex items-center justify-start gap-2'>
              <span>08:00</span>
              <LucideIcon name='Clock' />
            </div>
          </div>
          <LucideIcon name='MoveRight' size={26} />
          <div>
            <div className='text-sm text-tbGray'>종료시간</div>
            <div className='flex items-center justify-start gap-2'>
              <span>08:00</span>
              <LucideIcon name='Clock' />
            </div>
          </div>
          <div className=''>
            <div className='text-sm text-tbGray'>계획가능시간</div>
            <div className='flex items-center justify-start gap-2'>
              <span>08:00</span>
              <LucideIcon name='Clock' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex-grow bg-tbGreen'>지도</div>
    </div>
  )
}

export default PlanSchedulePage
