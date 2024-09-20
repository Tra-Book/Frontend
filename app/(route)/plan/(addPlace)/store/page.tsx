'use client'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import { Motion } from '@/components/common/MotionWrapper'
import SearchArea from '@/components/plan/SerachArea'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { Place } from '@/lib/types/Entity/place'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

interface PlanStorePageProps {}

const PlanStorePage = ({}: PlanStorePageProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩

  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()
  const [focusedPlaceCard, setFocusedPlaceCard] = useState<Place>() // 유저가 클릭한 카드

  const openSearchBar = () => {
    setIsReduced(true)
    setIsSearching(true)
  }

  // Todo: 전역 변수에서 DayPlan 가져오기
  return (
    <>
      {/* 선택바 */}

      <AnimatePresence initial={false}>
        {isSearching && (
          <Motion
            animation={{
              initial: { width: '23dvw' },
              animate: { width: '23dvw' },
              exit: { width: 0 },
              transition: { type: 'spring', duration: 10 },
            }}
            className='relative flex h-dvh min-w-[280px] flex-col items-center justify-start'
          >
            <div className='relative flex h-[7dvh] w-full shrink-0 items-center justify-center font-semibold'>
              <div className='flex h-full w-1/2 cursor-pointer items-center justify-center bg-tbPrimary'>여행지</div>
              <Link
                href={ROUTES.PLAN.STORE.PLACE.url}
                className='flex h-full w-1/2 cursor-pointer items-center justify-center'
              >
                여행계획
              </Link>
            </div>
            <SearchArea
              name='Place'
              handleClickCard={setFocusedPlaceCard}
              focusCard={focusedPlaceCard}
              className='min-h-0 w-[23dvw] min-w-[280px] flex-grow'
            />
            {/* 축소 확대 버튼
            {isReduced && (
              <div
                onClick={() => setIsSearching(prev => !prev)}
                className='absolute right-0 top-1/2 z-10 h-fit w-fit translate-x-full transform cursor-pointer rounded-r-md bg-tbWhite'
              >
                <LucideIcon name={isSearching ? 'ChevronsLeft' : 'ChevronsRight'} size={28} />
              </div>
            )} */}
          </Motion>
        )}
      </AnimatePresence>

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
            onClick={openSearchBar}
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
