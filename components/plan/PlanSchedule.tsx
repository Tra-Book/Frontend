'use client'
import React, { ReactNode, useEffect } from 'react'

import useMapStore from '@/lib/context/mapStore'
import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Geo } from '@/lib/types/Entity/place'
import { Plan, Schedule } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'

import { Motion } from '../common/MotionWrapper'
import { SchedulePlaceCard } from './Cards'

interface PlanScheduleProps {
  id: 'schedule' | 'scrap'
  plan: Plan // Todo: 일정에서는 전역 변수 + 보관함(여행계획)에서는 클릭한 여행계획
  setFocusPlanCard?: React.Dispatch<React.SetStateAction<Plan | undefined>>
  className?: string
}

const PlanSchedule = ({ id, plan, setFocusPlanCard, className }: PlanScheduleProps): ReactNode => {
  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()
  const { setPins, setFocusedPlanPins } = useMapStore()

  const { day, DayDropdown } = useDayDropdown(plan.schedule.length)

  const handleReduceBtn = () => {
    setIsReduced(prev => !prev)
  }
  const moveBack = () => {
    if (setFocusPlanCard) {
      setFocusPlanCard(undefined)
    }
  }

  // #1. day에 해당하는 schedule 찾기 (DayPlan의 day value)
  const schedule: Schedule | undefined = plan.schedule?.find(item => item.day === day)

  // #2. Pin 업데이트
  useEffect(() => {
    if (schedule?.places) {
      const newPins: Array<Geo> = schedule.places.map(place => place.geo)
      if (id === 'schedule') setPins(newPins)
      else {
        setFocusedPlanPins(newPins)
      }
    }
    return () => setFocusedPlanPins(null)
  }, [schedule, setPins, setFocusedPlanPins]) // schedule 또는 setPins가 변경될 때만 호출

  let contents
  // #2. 해당일자의 DayPlan이 없는 경우 (유저의 조작)
  if (!schedule) {
    contents = (
      <div
        className={cn(
          'relative flex w-full flex-grow items-center justify-center gap-10 text-balance pb-1 text-center font-bold',
          isReduced ? 'text-lg' : 'text-2xl',
        )}
      >
        해당 일자는 선택하지 않으셨습니다!
      </div>
    )
  }
  // #3. 해당일자의 DayPlan이 있는 경우 (places제외, 디폴트로 만들어줘서 항상 있어야 함)
  else {
    // #3-1. 유저가 추가한 여행지가 아직 없음
    if (!schedule.places) {
      contents = (
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
      contents = schedule.places.map(place => (
        <SchedulePlaceCard id={id} key={place.id} data={place} isReduced={isReduced} />
      ))
    }
  }

  // style
  const width = id === 'scrap' ? '100%' : isReduced ? '16dvw' : '21dvw'
  return (
    <Motion
      animation={{
        animate: { width: width },
        transition: { type: 'spring', duration: 0.5 },
      }}
      className={cn('relative flex h-dvh origin-left flex-col items-center justify-start', className)}
    >
      {/* 지역/일자선택 */}
      <div className='relative flex min-h-[7%] w-full items-center'>
        {id === 'scrap' && <LucideIcon name='ChevronLeft' onClick={moveBack} className='hover:text-tbRed' />}
        {!isReduced && <p className='mx-4'>강원도</p>}
        <DayDropdown
          color={id === 'scrap' ? 'tbGreen' : 'tbPrimary'}
          isReduced={isReduced}
          className={cn('mx-4 h-9 flex-grow', id === 'scrap' && 'bg-tbGreen hover:bg-tbGreenHover')}
        />
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
          <p className='text-xs text-tbGray'>여유 시간</p>
          <div className='flex items-center justify-start gap-1'>
            <span className='text-base'>08:00</span>
            {!isReduced && <LucideIcon name='Clock' />}
          </div>
        </div>
      </div>
      {/* 카드들 (서버 컴포넌트) */}
      <div className='flex w-full flex-grow flex-col items-center justify-start overflow-y-auto overflow-x-hidden'>
        {contents}
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

export default PlanSchedule
