'use client'
import { addDays } from 'date-fns'
import React, { ReactNode, useEffect, useState } from 'react'

import { DUMMY_PLACES } from '@/lib/constants/dummy_data'
import useDropdownStore from '@/lib/context/dropdownStore'
import useMapStore from '@/lib/context/mapStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Geo } from '@/lib/types/Entity/place'
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
  console.log('schedule fetched: ', schedule)

  const { DayDropdown } = useDayDropdown(schedule.length)
  const { setDay } = useDropdownStore()
  const { setCenter, pins, setPins, clearPins } = useMapStore()

  useEffect(() => {
    console.log(pins)
  }, [pins])
  const handleDayChange = (day: number) => {
    setDay(day)
    // 해당하는 날짜의 Pin만 남기기
    // #1. 전체인 경우 (day == 0)
    if (day === 0) {
      // 전체 pin 더하기
      schedule.map((item, index) => {
        const geoArray: Geo[] = item.places.map(place => place.geo)
        console.log('geoArray:', geoArray)

        setPins(index + 1, geoArray)
        // 첫 위치로 Map Center 두기
        if (index === 0) {
          setCenter(geoArray[0])
        }
      })
    }
    // #2. 특정 day인 경우
    else {
      // #1. day에 해당하는 schedule 찾기
      const targetSchedule: Schedule | undefined = plan.schedule?.find(item => item.day === day)
      // #2. Schedule의 핀 가져오기
      if (targetSchedule?.places) {
        const newPins: Array<Geo> = targetSchedule.places.map(place => place.geo)
        clearPins()
        setPins(day, newPins)
        if (newPins.length) setCenter(newPins[0]) // 처음 핀으로 이동
      } else {
        clearPins()
      }
    }
  }

  // # 모든 Schedule의 Pin 더하기
  useEffect(() => {
    schedule.map((item, index) => {
      const geoArray: Geo[] = item.places.map(place => place.geo)
      setPins(index + 1, geoArray)
    })
  }, [schedule])

  return (
    <>
      <DayDropdown
        id='showAll'
        startDate={startDate}
        handleDayChange={handleDayChange}
        className='h-10 w-52 px-4 py-2'
      />
      <Schedules schedules={schedule} startDate={startDate} className='my-6 w-full overflow-x-auto' />
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
  className?: string
}
const Schedules = ({ schedules, startDate, className }: SchedulesType): ReactNode => {
  const { day } = useDropdownStore()

  let contents
  // #1. 전체 인경우
  if (day === 0) {
    contents = schedules.map((schedule, index) => (
      <UniSchedule
        schedule={schedule}
        fillIndex={index + 1}
        key={schedule.day}
        date={addDays(startDate, schedule.day)}
      />
    ))
  }
  // #2. 특정 Day인 경우
  else {
    const scheduleIndex = schedules.findIndex(schedule => schedule.day === day)
    const schedule = schedules[scheduleIndex]
    contents = <UniSchedule schedule={schedule} fillIndex={scheduleIndex + 1} date={addDays(startDate, schedule.day)} />
  }
  return <div className={cn('flex items-start justify-start', className)}>{contents}</div>
}

interface ScheduleProps {
  schedule: Schedule
  fillIndex: number
  date: Date
}
const UniSchedule = ({ schedule, fillIndex, date }: ScheduleProps): ReactNode => {
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
  useEffect(() => {
    calculateDurations()
  }, [])

  // #2. 카드
  let contents
  // width만 차지하고 보이지 않는 카드를 만들어라!
  if (places.length === 0) {
    contents = (
      <>
        <SchedulePlaceCard
          id='dummy'
          data={DUMMY_PLACES[0]}
          fillIndex={fillIndex}
          isReduced={false}
          className='h-[200px]'
        />
        <div className='flex w-full items-center justify-center'>추가된 여행지가 없습니다!</div>
      </>
    )
  }
  // 원래 카드
  else {
    console.log('schedule: ', schedule)

    contents = places.map((place, index) => (
      <React.Fragment key={place.order}>
        <SchedulePlaceCard id='schedule' data={place} fillIndex={fillIndex} isReduced={false} className='h-[200px]' />
        {index + 1 !== places?.length && (
          <div className='relative flex min-h-14 w-full items-center justify-center border-t-[0.5px] border-tbPlaceholder px-3'>
            <LucideIcon name='CarFront' size={26} />
            <div className='absolute right-4 text-sm text-tbGray'>
              {durations[index] !== null ? `${durations[index]}분` : 'Loading...'}
            </div>
          </div>
        )}
      </React.Fragment>
    ))
  }

  return (
    <div className='relative flex w-fit flex-col items-start justify-start'>
      <div className='mb-3 flex w-full items-center justify-start gap-3'>
        <p className='text-lg font-semibold'>{day}일차</p>
        <p className='mr-3 text-xs text-tbGray'>{formatKoreanDate(date)}</p>
      </div>
      <div className='flex w-full items-center justify-between text-sm text-tbGray'>
        <span>{startTime}&nbsp;출발</span>
        <span className='mr-3'>{endTime}&nbsp;도착</span>
      </div>
      <div className={cn('relative my-3 w-full', places.length && 'border-l border-t border-solid border-tbGray')}>
        {contents}
      </div>
    </div>
  )
}
