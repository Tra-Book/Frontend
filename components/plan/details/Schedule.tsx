'use client'
import { addDays } from 'date-fns'
import React, { ReactNode, useEffect, useState } from 'react'

import useDropdownStore from '@/lib/context/dropdownStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Plan, Schedule } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import { formatKoreanDate } from '@/lib/utils/dateUtils'
import { fetchDuration } from '@/lib/utils/duration'
import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'

import { SchedulePlaceCard } from '../Cards'

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
      <Schedules schedules={schedule} startDate={startDate} dropdownDay={day} className='my-6 w-full overflow-x-auto' />
    </>
  )
}

export default PlanDetailSchedule

/**
 * 선택한 날짜에 따른 스케쥴을 모두 보여주는 컴포넌트
 */
interface SchedulesType {
  schedules: Schedule[]
  startDate: Date
  dropdownDay: number
  className?: string
}
const Schedules = ({ schedules, startDate, dropdownDay, className }: SchedulesType): ReactNode => {
  let contents
  if (dropdownDay === 0) {
    contents = schedules.map(schedule => (
      <UniSchedule schedule={schedule} key={schedule.day} date={addDays(startDate, schedule.day)} />
    ))
  } else {
    const schedule = schedules.find(schedule => schedule.day === dropdownDay) as Schedule
    contents = <UniSchedule schedule={schedule} date={addDays(startDate, schedule.day)} />
  }
  return <div className={cn('flex items-start justify-start', className)}>{contents}</div>
}

interface ScheduleProps {
  schedule: Schedule
  date: Date
}
const UniSchedule = ({ schedule, date }: ScheduleProps): ReactNode => {
  const { day, startTime, endTime, places } = schedule
  const [durations, setDurations] = useState<Array<number>>([])

  // #1. 거리 계산
  const calculateDurations = async () => {
    if (schedule?.places) {
      const durationPromises = schedule.places.map(async (place, index) => {
        if (schedule.places && index + 1 !== schedule.places.length) {
          return await fetchDuration(place.geo, schedule.places[index + 1].geo)
        }
        return null
      })
      const results = await Promise.all(durationPromises)

      setDurations(results as Array<number>)
    }
  }
  // useEffect(() => {
  //   calculateDurations()
  // }, [])

  // #2. 카드
  const contents = places.map((place, index) => (
    <React.Fragment key={place.order}>
      <SchedulePlaceCard id='schedule' data={place} isReduced={false} className='h-[200px]' />
      {index + 1 !== places?.length && (
        <div className='relative flex min-h-14 w-full items-center justify-center px-3'>
          <LucideIcon name='CarFront' size={26} />
          <div className='absolute right-4 text-sm text-tbGray'>
            0분
            {/* {durations[index] !== null ? `${durations[index]}분` : 'Loading...'} */}
          </div>
        </div>
      )}
    </React.Fragment>
  ))
  return (
    <div className='relative flex w-fit flex-col items-start justify-start border-b border-tbPlaceholder'>
      <div className='mb-3 flex w-full items-center justify-start gap-3'>
        <p className='text-lg font-semibold'>{day}일차</p>
        <p className='mr-3 text-xs text-tbGray'>{formatKoreanDate(date)}</p>
      </div>
      <p className='text-sm text-tbGray'>{startTime}&nbsp; 출발</p>
      <div className='my-3 w-full border-l border-solid border-tbGray'>{contents}</div>
      <p className='text-sm text-tbGray'>{endTime}&nbsp;도착</p>
    </div>
  )
}
