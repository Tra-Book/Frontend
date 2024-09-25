'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import SearchArea from '@/components/plan/SerachArea'
import { Button } from '@/components/ui/button'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import useDropdownStore from '@/lib/context/dropdownStore'
import useMapStore from '@/lib/context/mapStore'
import usePlanStore from '@/lib/context/planStore'
import { addPlaceToPlan } from '@/lib/HTTP/plan/API'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'

interface PlanSchedulePageProps {}

const PlanSchedulePage = (): ReactNode => {
  const { planData, setPlanData, isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()
  const { setCenter, setFocusedPlacePin } = useMapStore()
  const { day } = useDropdownStore()
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
    console.log(focusedPlaceCard)

    if (focusedPlaceCard) {
      const newPlan: Plan = addPlaceToPlan(planData, focusedPlaceCard, day)
      console.log('newPlan')

      console.log(newPlan.schedule)

      setPlanData(newPlan)
    }
    // 초기화
    setFocusedPlaceCard(undefined)
    setFocusedPlacePin(null)
  }

  const handleClickCard = (card: Place) => {
    setFocusedPlaceCard(card)
    setFocusedPlacePin(card.geo)
    setCenter(card.geo)
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
          handleClickCard={handleClickCard as (card: Place | Plan) => void}
          className='h-dvh w-[23dvw] min-w-[280px]'
        />
      )}

      {/* 지도 */}
      <div className='relative h-full flex-grow'>
        <KakaoMap />

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
    </>
  )
}

export default PlanSchedulePage
