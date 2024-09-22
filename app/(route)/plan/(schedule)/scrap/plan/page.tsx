'use client'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import { Motion } from '@/components/common/MotionWrapper'
import PlanSchedule from '@/components/plan/PlanSchedule'
import SearchArea from '@/components/plan/SerachArea'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

interface PlanStorePageProps {}

const PlanStorePage = ({}: PlanStorePageProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩

  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()

  const [focusedPlanCard, setFocusPlanCard] = useState<Plan>()

  const openSearchBar = () => {
    setIsReduced(true)
    setIsSearching(true)
  }

  const handleClickCard = (card: Plan) => {
    setFocusPlanCard(card)
  }

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
                    className='flex h-full w-1/2 cursor-pointer items-center justify-center'
                  >
                    여행지
                  </Link>
                  <div className='flex h-full w-1/2 cursor-pointer items-center justify-center bg-tbPrimary'>
                    여행계획
                  </div>
                </div>
                <SearchArea
                  name='Plan'
                  handleClickCard={handleClickCard as (card: Place | Plan) => void}
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
