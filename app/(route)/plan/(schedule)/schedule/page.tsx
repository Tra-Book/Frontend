'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import { Motion } from '@/components/common/MotionWrapper'
import SearchArea from '@/components/plan/SearchArea'
import { Button } from '@/components/ui/button'
import useDropdownStore from '@/lib/context/dropdownStore'
import useMapStore from '@/lib/context/mapStore'
import usePlanStore from '@/lib/context/planStore'
import { PlaceCardType } from '@/lib/HTTP/places/API'
import { addPlaceToPlan } from '@/lib/HTTP/plan/API'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import { bounce } from '@/lib/types/animation'
import { Plan } from '@/lib/types/Entity/plan'

const PlanSchedulePage = (): ReactNode => {
  const { planData, setPlanData, isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()
  const { setCenter, setFocusedPlacePin } = useMapStore()
  const { day } = useDropdownStore()
  const [focusedPlaceCard, setFocusedPlaceCard] = useState<PlaceCardType>() // 유저가 클릭한 카드

  const handleSearchBtn = () => {
    setIsReduced(true)
    setIsSearching(true)
  }

  const handleAddPlace = () => {
    if (focusedPlaceCard) {
      const newPlan: Plan = addPlaceToPlan(planData, focusedPlaceCard, day)
      console.log('newplan:', newPlan)

      setPlanData(newPlan)
    }
    // 초기화
    setFocusedPlaceCard(undefined)
    setFocusedPlacePin(null)
  }

  const handleClickCard = (card: PlaceCardType) => {
    setFocusedPlaceCard(card)
    setFocusedPlacePin(card.geo)
    setCenter(card.geo)
  }

  const handleSetFocusedCard = (val: PlaceCardType | undefined) => {
    setFocusedPlaceCard(val)
    setFocusedPlacePin(null)
  }
  useEffect(() => {
    return () => setFocusedPlacePin(null)
  }, [])

  return (
    <>
      {/* 검색창 */}
      {isSearching && (
        <SearchArea
          name='Place'
          focusCard={focusedPlaceCard}
          handleSetFocusedCard={handleSetFocusedCard as (val: PlaceCardType | PlanCardType | undefined) => void}
          handleClickCard={handleClickCard as (card: PlaceCardType | PlanCardType) => void}
          className='h-dvh w-[23dvw] min-w-[280px]'
        />
      )}

      {/* 지도 */}
      <div className='relative h-full flex-grow'>
        <KakaoMap />

        {!isSearching && (
          <Motion animation={bounce()} className='absolute bottom-4 right-1/2 z-10'>
            <Button onClick={handleSearchBtn} variant='tbPrimary' size='lg' className='px-12 text-base'>
              장소 검색하기
            </Button>
          </Motion>
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

export default PlanSchedulePage
