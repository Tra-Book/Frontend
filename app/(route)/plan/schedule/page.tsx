'use client'
import React, { ReactNode, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import { SpriteMapMarker } from '@/components/common/MapPin'
import { Motion } from '@/components/common/MotionWrapper'
import { AddedPlaceCards } from '@/components/plan/PlaceCards'
import SearchArea from '@/components/plan/SerachArea'
import { Button } from '@/components/ui/button'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
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
    latitude: 33.450701,
    longitude: 126.570667,
  },
  //reviews: Array<Comment>
  reviewCnt: 10,

  isAdded: true, // 계획에 들어갔는지 여부
  isScraped: true,

  order: 1, // 계획세우기에 담긴 순서
}

// Dummy places
const DUMMY_PLACES: Array<Place> = new Array(12).fill(DUMMY_PLACE)

// Dummy DayPlan
const DUMMY_DAYPLAN: DayPlan = {
  day: 1,
  startTime: '08:00',
  endTime: '20:00',
  places: DUMMY_PLACES,
}

const PlanSchedulePage = ({}: PlanSchedulePageProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩

  const { day, DayDropdown } = useDayDropdown(10)
  const [isReduced, setIsReduced] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const [focusedPlaceCard, setFocusedPlaceCard] = useState<Place>() // 유저가 클릭한 카드

  const handleSearchBtn = () => {
    setIsReduced(true)
    setIsSearching(true)
  }

  const handleReduceBtn = () => {
    setIsReduced(prev => !prev)
  }
  // Todo: UPDATE fetch 만들기
  const update = async () => {
    try {
      const res = await fetch(`server/${BACKEND_ROUTES.PLAN.UPDATE.url}`, {
        method: BACKEND_ROUTES.PLAN.UPDATE.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include',
      })

      if (res.ok) {
      }
      const status = res.status
    } catch (error) {}
  }

  const handleAddPlace = () => {
    // update();
    setFocusedPlaceCard(undefined) // 초기화
  }
  // Todo: DayPlan 정보 받아오기
  const DayPlan: DayPlan = DUMMY_DAYPLAN

  let AddedPlanContents
  if (DayPlan.places?.length === 0) {
    AddedPlanContents = (
      <div
        className={cn(
          'relative flex w-full flex-grow items-center justify-center gap-10 text-balance pb-1 text-center font-bold',
          isReduced ? 'text-lg' : 'text-2xl',
        )}
      >
        여행일정이 없습니다!
      </div>
    )
  } else {
    AddedPlanContents = DayPlan.places?.map((dayPlan, index) => (
      <AddedPlaceCards key={index} data={dayPlan} isReduced={isReduced} />
    ))
  }

  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      {/* 사이드바 */}
      <Motion
        animation={{
          animate: { width: isReduced ? '12dvw' : '25dvw' },
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
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-xs text-tbGray'>시작시간</p>
              <div className='flex items-center justify-start gap-1'>
                <span className='text-base'>08:00</span>
                {!isReduced && <LucideIcon name='Clock' />}
              </div>
            </div>
            {!isReduced && <LucideIcon name='MoveRight' size={26} className='self-center' />}
            <div>
              <p className='text-xs text-tbGray'>종료시간</p>
              <div className='flex items-center justify-start gap-1'>
                <span className='text-base'>08:00</span>
                {!isReduced && <LucideIcon name='Clock' />}
              </div>
            </div>
          </div>
          <div className=''>
            <p className='text-xs text-tbGray'>남은 시간</p>
            <div className='flex items-center justify-start gap-1'>
              <span className='text-base'>08:00</span>
              {!isReduced && <LucideIcon name='Clock' />}
            </div>
          </div>
        </div>
        {/* 카드들 (서버 컴포넌트) */}
        <div className='flex w-full flex-grow flex-col items-center justify-start overflow-y-auto overflow-x-hidden'>
          {AddedPlanContents}
        </div>
        {/* 축소 확대 버튼 */}
        {!isSearching && (
          <div
            onClick={handleReduceBtn}
            className='absolute right-0 top-1/2 z-10 h-fit w-fit translate-x-full transform cursor-pointer rounded-r-md bg-tbWhite'
          >
            <LucideIcon name={isReduced ? 'ChevronsRight' : 'ChevronsLeft'} size={28} />
          </div>
        )}
      </Motion>
      {/* 검색창 */}
      {isSearching && (
        <SearchArea
          name='Plan'
          setIsSearching={setIsSearching}
          focusedPlaceCard={focusedPlaceCard}
          setFocusedPlaceCard={setFocusedPlaceCard}
          className='h-dvh w-[23dvw] min-w-[280px]'
        />
      )}
      {/* 지도 */}
      <div className='relative h-full flex-grow'>
        <Map // 지도를 표시할 Container
          id='map'
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={8} // 지도의 확대 레벨
        >
          {/* <SpriteMapMarker geo={DUMMY_PLACE.geo} order={0} id='search' /> */}

          {/* 유저가 클릭한 여행지 마커 위치 */}
          {focusedPlaceCard && <SpriteMapMarker geo={focusedPlaceCard.geo} order={0} id='focus' />}
        </Map>

        {!isSearching && (
          <Button
            onClick={handleSearchBtn}
            variant='tbPrimary'
            size='lg'
            className='absolute bottom-4 right-1/2 z-10 px-12 text-base'
          >
            장소 검색하기
          </Button>
        )}

        {focusedPlaceCard && (
          <Button
            onClick={handleAddPlace}
            variant='tbGreen'
            size='lg'
            className='absolute bottom-4 right-1/2 z-10 px-12 text-base'
          >
            해당 장소 추가하기
          </Button>
        )}
      </div>
    </div>
  )
}

export default PlanSchedulePage
