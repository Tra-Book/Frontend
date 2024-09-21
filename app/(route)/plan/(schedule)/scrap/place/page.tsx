'use client'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import { Motion } from '@/components/common/MotionWrapper'
import SearchArea from '@/components/plan/SerachArea'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'
import useMapStore from '@/lib/context/mapStore'
import usePlanStore from '@/lib/context/planStore'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

interface PlaceStorePageProps {}

const PlaceStorePage = ({}: PlaceStorePageProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩

  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()
  const { setCenter, setFocusedPlacePin } = useMapStore()

  const [focusedPlaceCard, setFocusedPlaceCard] = useState<Place>() // 유저가 클릭한 카드

  const openSearchBar = () => {
    setIsReduced(true)
    setIsSearching(true)
  }

  const handleAddPlace = () => {
    // update();
    setFocusedPlaceCard(undefined) // 초기화
  }

  const handleClickCard = (card: Place) => {
    setFocusedPlaceCard(card)
    setFocusedPlacePin(card.geo)
    setCenter(card.geo)
  }

  useEffect(() => {
    return () => setFocusedPlacePin(null)
  }, [])
  // Todo: 전역 변수에서 Schedule 가져오기
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
                href={ROUTES.PLAN.SCRAP.PLAN.url}
                className='flex h-full w-1/2 cursor-pointer items-center justify-center'
              >
                여행계획
              </Link>
            </div>
            <SearchArea
              name='Place'
              handleClickCard={handleClickCard as (card: Place | Plan) => void}
              focusCard={focusedPlaceCard}
              className='min-h-0 w-[23dvw] min-w-[280px] flex-grow'
            />
          </Motion>
        )}
      </AnimatePresence>

      {/* 지도 */}
      <div className='relative h-full flex-grow'>
        <KakaoMap />

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
    </>
  )
}

export default PlaceStorePage
