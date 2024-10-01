'use client'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'

import { INITIAL_PLAN } from '@/lib/constants/dummy_data'
import useMapStore from '@/lib/context/mapStore'
import usePlanStore from '@/lib/context/planStore'
import { fetchPlan } from '@/lib/HTTP/plan/API'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { bounce } from '@/lib/types/animation'
import { Geo, Place } from '@/lib/types/Entity/place'
import { Plan, Schedule } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import { calculateLeftTIme, formatDurationTime } from '@/lib/utils/dateUtils'
import { fetchDuration } from '@/lib/utils/duration'
import useDayDropdown from '@/lib/utils/hooks/useDayDropdown'

import { Motion } from '../common/MotionWrapper'
import { SchedulePlaceCard } from './Cards'

interface PlanScheduleProps {
  id: 'schedule' | 'scrap'
  plan: Plan | PlanCardType // Todo: 일정에서는 전역 변수 + 보관함(여행계획)에서는 클릭한 여행계획
  setFocusPlanCard?:
    | React.Dispatch<React.SetStateAction<Plan | undefined>>
    | React.Dispatch<React.SetStateAction<PlanCardType | undefined>>
  className?: string
}

const PlanSchedule = ({ id, plan, setFocusPlanCard, className }: PlanScheduleProps): ReactNode => {
  const { planData, setPlanData, isReduced, isSearching, setIsReduced } = usePlanStore()
  const { setPins, clearPins } = useMapStore()
  const session: any = useSession()

  // #0. Fetch Plan & User Info using planId & userId (useQuery)
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['plan', plan.id],
    queryFn: () => fetchPlan({ planId: plan.id, accessToken: session.data ? session.data.accessToken : null }),
    enabled: id === 'scrap',
  })

  let contents
  if (isFetching) {
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center text-lg font-bold'>
        <Motion animation={bounce()}>계획 정보 로딩중입니다</Motion>
      </div>
    )
  }

  // #1. 컴포넌트에서 사용할 Data 정의

  const [fetchedData, setFetchedData] = useState<Plan>(id === 'schedule' ? (plan as Plan) : INITIAL_PLAN)

  useEffect(() => {
    if (data) {
      setFetchedData(data.planData)
    }
  }, [data])

  useEffect(() => {
    setFetchedData(plan as Plan)
  }, [plan])

  if (!fetchedData || !fetchedData.schedule) {
    contents = <div>No schedule data available</div>
  }

  const { day, DayDropdown } = useDayDropdown(fetchedData.schedule ? fetchedData.schedule.length : 1)
  const [durations, setDurations] = useState<Array<number>>([]) // 분 단위

  const handleReduceBtn = () => {
    setIsReduced(prev => !prev)
  }
  const moveBack = () => {
    if (setFocusPlanCard) {
      setFocusPlanCard(undefined)
    }
  }

  const handleDayChange = (day: number) => {
    // #1. day에 해당하는 schedule 찾기
    const targetSchedule: Schedule | undefined = fetchedData.schedule?.find(item => item.day === day)
    // #2. Schedule의 핀 가져오기
    if (targetSchedule?.places) {
      const newPins: Array<Geo> = targetSchedule.places.map(place => place.geo)
      setPins(1, newPins) // Day1 색만쓸거임
    } else {
      clearPins()
    }
  }

  const deletePlaceHandler = (placeId: number) => {
    // #1. 스케쥴 돌며 업데이트
    const newSchedule = fetchedData.schedule.map(daySchedule => {
      // 날짜 찾기
      if (daySchedule.day === day) {
        const newPlaces: Place[] = daySchedule.places
          .filter(place => place.id !== placeId)
          .map((place, index) => ({
            ...place,
            order: index + 1,
          }))

        return {
          ...daySchedule,
          places: newPlaces,
        }
      }
      return daySchedule
    })
    // #2. 전역변수 변경
    setPlanData({
      schedule: newSchedule, // schedule만 변경
    })
  }

  // #1. day에 해당하는 schedule 찾기 (DayPlan의 day value)
  const schedule: Schedule | undefined = fetchedData.schedule?.find(item => item.day === day)

  // #2.1 거리계산 함수
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

  // #2.2 Pin 업데이트
  useEffect(() => {
    if (schedule?.places) {
      const newPins: Array<Geo> = schedule.places.map(place => place.geo)
      if (id === 'schedule') {
        setPins(1, newPins) // Day1 색만쓸거임
        calculateDurations()
      } else {
        setPins(2, newPins) // Day2 : 보관함 여행계획
      }
    }
  }, [schedule, setPins]) // schedule 변경될 때만 호출

  // #3. 계획한 일정들
  // #3.1 해당일자의 DayPlan이 없는 경우 (유저의 조작)

  if (!schedule) {
    contents = (
      <div
        className={cn(
          'relative flex w-full flex-grow items-center justify-center gap-10 text-balance pb-1 text-center font-bold',
          isReduced ? 'text-lg' : 'text-xl',
        )}
      >
        잠시만 기다려주세요
      </div>
    )
  }
  // #3.2 해당일자의 DayPlan이 있는 경우 (places제외, 디폴트로 만들어줘서 항상 있어야 함)
  else {
    // #유저가 추가한 여행지가 아직 없음
    if (schedule.places.length === 0) {
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
      contents = schedule.places.map((place, index) => (
        <React.Fragment key={place.order}>
          <SchedulePlaceCard
            id={id}
            data={place}
            deletePlaceHandler={deletePlaceHandler}
            fillIndex={1}
            isReduced={isReduced}
          />
          {index + 1 !== schedule.places?.length && (
            <div className='relative flex min-h-14 w-full items-center justify-center px-3'>
              <LucideIcon name='CarFront' size={26} />
              <div className='absolute right-4 text-sm text-tbGray'>
                {durations[index] !== null ? `${formatDurationTime(durations[index])}` : 'Loading...'}
              </div>
            </div>
          )}
        </React.Fragment>
      ))
    }
  }
  // #4. 남는 시간 계산
  let totalPlaceDurations = 0
  schedule?.places?.forEach(place => (totalPlaceDurations += place.duration as number))
  const leftTime =
    schedule && calculateLeftTIme(schedule?.startTime, schedule?.endTime, [...durations, totalPlaceDurations])

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
          id='days'
          startDate={plan.startDate}
          color={id === 'scrap' ? 'tbGreen' : 'tbPrimary'}
          handleDayChange={handleDayChange}
          className={cn('mx-4 h-9 flex-grow', id === 'scrap' && 'bg-tbGreen hover:bg-tbGreenHover')}
        />
      </div>

      {/* 여행일자 정보 */}
      <div className='flex min-h-[7%] w-full items-center justify-between border-b border-tbPlaceholder px-3'>
        <div className='flex items-center justify-between gap-3'>
          <div>
            <p className='text-xs text-tbGray'>시작시간</p>
            <div className='flex items-center justify-start gap-1'>
              <span className='text-base'>{schedule?.startTime}</span>
              {!isReduced && <LucideIcon name='Clock' />}
            </div>
          </div>
          {!isReduced && <LucideIcon name='MoveRight' size={26} className='self-center' />}
          <div>
            <p className='text-xs text-tbGray'>종료시간</p>
            <div className='flex items-center justify-start gap-1'>
              <span className='text-base'>{schedule?.endTime}</span>
              {!isReduced && <LucideIcon name='Clock' />}
            </div>
          </div>
        </div>
        <div className=''>
          <p className='text-xs text-tbGray'>여유 시간</p>
          <div className='flex items-center justify-start gap-1'>
            <span className='text-base'>{leftTime}</span>
            {!isReduced && <LucideIcon name='Clock' />}
          </div>
        </div>
      </div>
      {/* 카드들*/}
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
