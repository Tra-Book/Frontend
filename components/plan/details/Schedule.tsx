'use client'
import React, { ReactNode, useEffect } from 'react'

import useDropdownStore from '@/lib/context/dropdownStore'
import { Plan } from '@/lib/types/Entity/plan'
import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'

interface PlanDetailScheduleProps {
  plan: Plan
  className?: string
}

const PlanDetailSchedule = ({ plan, className }: PlanDetailScheduleProps): ReactNode => {
  const { startDate, schedule } = plan

  const { day, DayDropdown } = useDayDropdown(plan.schedule.length)
  const { setDay } = useDropdownStore()

  // #0. Day:0 is UI for all Schedule
  useEffect(() => {
    setDay(0)
    return () => setDay(1)
  }, [])

  // Change Day
  const handleDayChange = (day: number) => {
    setDay(day)
  }
  return (
    <>
      <DayDropdown
        id='showAll'
        startDate={startDate}
        handleDayChange={handleDayChange}
        className='h-10 w-52 px-4 py-2'
      />
    </>
  )
}

export default PlanDetailSchedule
