'use client'
import React, { ReactElement, ReactNode } from 'react'

import PlanSchedule from '@/components/plan/PlanSchedule'
import usePlanStore from '@/lib/context/planStore'

interface AddPlaceLayoutProps {
  children: ReactElement
}

const AddPlaceLayout = ({ children }: AddPlaceLayoutProps): ReactNode => {
  const { planData } = usePlanStore()

  console.log(planData)

  // children에 day 값을 prop으로 전달
  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      <PlanSchedule id='schedule' plan={planData} />
      {children}
    </div>
  )
}

export default AddPlaceLayout
