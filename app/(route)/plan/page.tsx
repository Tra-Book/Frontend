'use client'
import React, { ReactNode, useEffect } from 'react'

import UpdateInfo from '@/components/plan/UpdateInfo'
import UpdatePeriod from '@/components/plan/UpdatePeriod'
import usePlanStore from '@/lib/context/planStore'

interface TravelInfoPageProps {}

const TravelInfoPage = ({}: TravelInfoPageProps): ReactNode => {
  const { planData, setPlanData } = usePlanStore()

  useEffect(() => {
    console.log(planData)
  }, [planData])

  return (
    <div className='h-full w-full'>
      <div className='h-1/2 w-full'>
        <UpdatePeriod />
      </div>
      <div className='h-1/2 w-full'>
        <UpdateInfo />
      </div>
    </div>
  )
}

export default TravelInfoPage
