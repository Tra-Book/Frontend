'use client'
import React, { ReactNode, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import { Motion } from '@/components/common/MotionWrapper'
import AddedPlanCards from '@/components/plan/PlanCards'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { DayPlan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'
import DUMMYPLACEIMG from '@/public/dummy/dummy_place_image.png'

interface PlanSchedulePageProps {}

// Dummy Place
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
  const [isReduced, setIsReduced] = useState<boolean>(false)

  useKakaoLoader() // 카카오 지도 로딩

  // Todo: DayPlan 정보 받아오기
  const DayPlan: DayPlan = DUMMY_DAYPLAN
  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      {/* 사이드바 */}
      <Motion
        animation={{
          animate: { width: isReduced ? '15vw' : '25vw' },
          transition: { type: 'spring', duration: 0.5 },
        }}
        className={cn('relative flex h-dvh flex-col items-center justify-start')}
      >
        {/* 지역/일자선택 */}

        <div className='relative flex min-h-[10%] w-full items-center'>
          {!isReduced && <p className='mx-4'>강원도</p>}
          <DayDropdown isReduced={isReduced} className='mx-4 h-9 flex-grow' />
        </div>

        {/* 여행일자 정보 */}
        <div className='flex min-h-[6%] w-full items-start justify-between border-b border-tbPlaceholder px-3'>
          {/* {!isReduced && (
            <div>
              <div className='text-xs text-tbGray'>일자</div>
              <div className='flex items-center justify-start gap-1'>
                <span>12/29(수)</span>
              </div>
            </div>
          )} */}

          <div className='flex items-center justify-start gap-2'>
            <div>
              <p className='text-xs text-tbGray'>시작시간</p>
              <div className='flex items-center justify-start gap-1 text-base'>
                <span>08:00</span>
                {!isReduced && <LucideIcon name='Clock' />}
              </div>
            </div>
            <LucideIcon name='MoveRight' size={isReduced ? 18 : 26} className='self-center' />
            <div>
              <p className='text-xs text-tbGray'>종료시간</p>
              <div className='flex items-center justify-start gap-1 text-base'>
                <span>08:00</span>
                {!isReduced && <LucideIcon name='Clock' />}
              </div>
            </div>
          </div>
          <div className=''>
            <p className='text-xs text-tbGray'>남은시간</p>
            <div className='flex items-center justify-start gap-1 text-base'>
              <span>08:00</span>
            </div>
          </div>
        </div>
        {/* 카드들 (서버 컴포넌트) */}
        <div className='flex w-full min-w-min flex-grow flex-col items-center justify-start overflow-y-auto overflow-x-hidden'>
          {DayPlan.places?.map((dayPlan, index) => <AddedPlanCards key={index} data={dayPlan} isReduced={isReduced} />)}
        </div>
        {/* 축소 확대 버튼 */}
        <div
          onClick={() => setIsReduced(prev => !prev)}
          className='absolute right-0 top-1/2 z-10 h-fit w-fit translate-x-full transform cursor-pointer rounded-r-md bg-tbWhite'
        >
          <LucideIcon name={isReduced ? 'ChevronsRight' : 'ChevronsLeft'} size={28} />
        </div>
      </Motion>

      {/* 지도 */}
      <Map // 지도를 표시할 Container
        id='map'
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          flexGrow: '1',
          height: '100%',
        }}
        level={8} // 지도의 확대 레벨
      />
      {/* <div className='flex-grow bg-tbGreen'>지도</div> */}
    </div>
  )
}

export default PlanSchedulePage
