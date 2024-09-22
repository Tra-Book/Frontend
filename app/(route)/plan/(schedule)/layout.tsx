'use client'
import React, { ReactNode } from 'react'

import PlanSchedule from '@/components/plan/PlanSchedule'
import { DUMMY_PLAN } from '@/lib/constants/dummy_data'
import usePlanStore from '@/lib/context/planStore'

interface AddPlaceLayoutProps {
  children: React.ReactNode
}

const AddPlaceLayout = ({ children }: AddPlaceLayoutProps): ReactNode => {
  const { planData } = usePlanStore()
  console.log(planData)

  // Todo: DUMMY_PLAN > 전역변수 plan
  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      <PlanSchedule id='schedule' plan={DUMMY_PLAN} />
      {children}
    </div>
  )
}

export default AddPlaceLayout
