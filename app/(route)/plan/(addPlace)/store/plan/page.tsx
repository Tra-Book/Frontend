'use client'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

interface PlanStorePageProps {}

const PlanStorePage = ({}: PlanStorePageProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩

  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()

  const handleSearchBtn = () => {
    setIsReduced(true)
    setIsSearching(true)
  }

  // Todo: 전역 변수에서 DayPlan 가져오기
  return (
    <>
      {/* 선택바 */}
      {isSearching && (
        <div className='relative h-dvh w-[23dvw] min-w-[280px]'>
          <div className='relative flex h-[7%] w-full items-center justify-center font-semibold'>
            <div className='flex h-full w-1/2 cursor-pointer items-center justify-center bg-tbPrimary'>여행지</div>
            <Link
              href={ROUTES.PLAN.STORE.PLACE.url}
              className='flex h-full w-1/2 cursor-pointer items-center justify-center'
            >
              여행계획
            </Link>
          </div>
          {/* <SearchArea
            name='Plan'
            setIsSearching={setIsSearching}
            focusedPlaceCard={focusedPlaceCard}
            setFocusedPlaceCard={setFocusedPlaceCard}
            className='h-dvh w-[23dvw] min-w-[280px]'
          /> */}
        </div>
      )}

      {/* 지도 */}
      <div className='relative h-full flex-grow'>
        <Map
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
        ></Map>

        {!isSearching && (
          <Button
            onClick={handleSearchBtn}
            variant='tbPrimary'
            size='lg'
            className='absolute bottom-4 right-1/2 z-10 px-12 text-base'
          >
            보관함 열기
          </Button>
        )}
      </div>
    </>
  )
}

export default PlanStorePage
