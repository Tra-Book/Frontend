'use client'
import React, { ReactElement, ReactNode, useEffect } from 'react'

import PlanSchedule from '@/components/plan/PlanSchedule'
import useDropdownStore from '@/lib/context/dropdownStore'
import useMapStore from '@/lib/context/mapStore'
import usePlanStore from '@/lib/context/planStore'

interface AddPlaceLayoutProps {
  children: ReactElement
}

const AddPlaceLayout = ({ children }: AddPlaceLayoutProps): ReactNode => {
  const { planData } = usePlanStore()
  const { clearAllPins } = useMapStore()
  const { setDay } = useDropdownStore()

  // #2.2 Pin 업데이트
  useEffect(() => {
    setDay(1)
    return () => clearAllPins()
  }, [clearAllPins]) // schedule 변경될 때만 호출

  // children에 day 값을 prop으로 전달
  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      <PlanSchedule id='schedule' plan={planData} />
      {children}
    </div>
  )
}

export default AddPlaceLayout
