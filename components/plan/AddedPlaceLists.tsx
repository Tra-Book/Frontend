'use client'
import React, { ReactNode } from 'react'

import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { DayPlan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'

import { Motion } from '../common/MotionWrapper'
import { AddedPlaceCards } from './Cards'

interface AddedPlaceListsProps {
  DayPlan: DayPlan
}

const AddedPlaceLists = ({ DayPlan }: AddedPlaceListsProps): ReactNode => {
  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()

  const { day, DayDropdown } = useDayDropdown(10)

  const handleReduceBtn = () => {
    setIsReduced(prev => !prev)
  }
  // Contents
  let AddedPlaceContents
  if (DayPlan.places?.length === 0) {
    AddedPlaceContents = (
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
    AddedPlaceContents = DayPlan.places?.map((dayPlan, index) => (
      <AddedPlaceCards key={index} data={dayPlan} isReduced={isReduced} />
    ))
  }
  return (
    <Motion
      animation={{
        animate: { width: isReduced ? '12dvw' : '25dvw' },
        transition: { type: 'spring', duration: 0.5 },
      }}
      className={cn('relative flex h-dvh flex-col items-center justify-start')}
    >
      {/* 지역/일자선택 */}

      <div className='relative flex min-h-[7%] w-full items-end'>
        {!isReduced && <p className='mx-4'>강원도</p>}
        <DayDropdown isReduced={isReduced} className='mx-4 h-9 flex-grow' />
      </div>

      {/* 여행일자 정보 */}
      <div className='flex min-h-[7%] w-full items-center justify-between border-b border-tbPlaceholder px-3'>
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
        {AddedPlaceContents}
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
  )
}

export default AddedPlaceLists
