'use client'
import React, { ReactNode, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import { SpriteMapMarker } from '@/components/common/MapPin'
import AddedPlaceLists from '@/components/plan/AddedPlaceLists'
import SearchArea from '@/components/plan/SerachArea'
import { Button } from '@/components/ui/button'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { Place } from '@/lib/types/Entity/place'
import { DayPlan } from '@/lib/types/Entity/plan'
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
export const DUMMY_DAYPLAN: DayPlan = {
  day: 1,
  startTime: '08:00',
  endTime: '20:00',
  places: DUMMY_PLACES,
}

const PlanSchedulePage = ({}: PlanSchedulePageProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩

  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()

  const [focusedPlaceCard, setFocusedPlaceCard] = useState<Place>() // 유저가 클릭한 카드

  const handleSearchBtn = () => {
    setIsReduced(true)
    setIsSearching(true)
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

  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      <AddedPlaceLists DayPlan={DayPlan} />

      {/* 검색창 */}
      {isSearching && (
        <SearchArea
          name='Plan'
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
