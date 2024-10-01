'use client'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import { Motion } from '@/components/common/MotionWrapper'
import PlanSchedule from '@/components/plan/PlanSchedule'
import SearchArea from '@/components/plan/SearchArea'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { PlaceCardType } from '@/lib/HTTP/places/API'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import { cn } from '@/lib/utils/cn'

interface PlanStorePageProps {}

const PlanStorePage = ({}: PlanStorePageProps): ReactNode => {
  const [focusedPlanCard, setFocusPlanCard] = useState<PlanCardType>()
  const [isLeftOverHovered, setIsLeftOverHovered] = useState(false)
  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()

  const openSearchBar = () => {
    setIsReduced(true)
    setIsSearching(true)
  }

  const handleClickCard = (card: PlanCardType) => {
    setFocusPlanCard(card)
  }

  useEffect(() => {
    console.log(isLeftOverHovered)
  }, [])
  return (
    <>
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
            {!focusedPlanCard ? (
              <>
                <div className='relative flex h-[7dvh] w-full shrink-0 items-center justify-center font-semibold'>
                  <Link
                    href={ROUTES.PLAN.SCRAP.PLACE.url}
                    onMouseEnter={() => {
                      console.log('Entered hovered')

                      setIsLeftOverHovered(true)
                    }} // 마우스가 올라왔을 때
                    onMouseLeave={() => setIsLeftOverHovered(false)} // 마우스가 떠났을 때
                    className={cn('flex h-full w-1/2 cursor-pointer items-center justify-center hover:bg-tbPrimary')}
                  >
                    여행지
                  </Link>
                  <div
                    className={cn(
                      'flex h-full w-1/2 cursor-pointer items-center justify-center bg-tbPrimary hover:bg-tbPrimaryHover',
                      isLeftOverHovered && 'bg-white',
                    )}
                  >
                    여행계획
                  </div>
                </div>
                <SearchArea
                  name='Plan'
                  handleClickCard={handleClickCard as (card: PlaceCardType | PlanCardType | undefined) => void}
                  focusCard={focusedPlanCard}
                  className='min-h-0 w-[23dvw] min-w-[280px] flex-grow'
                />
              </>
            ) : (
              <PlanSchedule id='scrap' plan={focusedPlanCard} setFocusPlanCard={setFocusPlanCard} />
            )}
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
      </div>
    </>
  )
}

export default PlanStorePage
