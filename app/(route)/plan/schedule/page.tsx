'use client'
import React, { ReactNode } from 'react'

import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'

interface PlanSchedulePageProps {}

const PlanSchedulePage = ({}: PlanSchedulePageProps): ReactNode => {
  const { day, DayDropdown } = useDayDropdown(10)
  return (
    <div className='flex h-dvh flex-grow justify-start'>
      <div className='relative flex w-1/4 flex-col items-center justify-start bg-tbPrimary'>
        <div className='relative flex h-[10%] w-full items-center bg-tbPlaceholder'>
          <p className='mx-4'>강원도</p>
          <DayDropdown className='mx-4 h-9 flex-grow' />
        </div>
      </div>
      <div className='flex-grow bg-tbGreen'>지도</div>
    </div>
  )
}

export default PlanSchedulePage
