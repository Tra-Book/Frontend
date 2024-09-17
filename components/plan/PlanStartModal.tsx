'use client'

import 'react-day-picker/dist/style.css'

import { ko } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'

import { STATES } from '@/lib/constants/regions'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import { formatToHyphenDate, formatToKoreanShortDate } from '@/lib/utils/dateUtils'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface PlanStartModalProps {}

// const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd')

const PlanStartModal = ({}: PlanStartModalProps): ReactNode => {
  const session: any = useSession()
  const [inputState, setInputState] = useState<string>('')
  const [step, setStep] = useState<number>(0) // 0: 여행 지역, 1: 여행 기간

  const [selected, setSelected] = useState<DateRange>()
  const handleSelect = (newSelected?: DateRange) => {
    // Update the selected dates
    setSelected(newSelected)
    console.log(newSelected)
  }

  const onClickButton = () => {
    setStep(prev => (prev === 0 ? 1 : 0))
  }

  // alert는 toast로 바꾸기
  // API 호출 : /plan, 두 가지 경우
  // 1. 계획 생성
  // 2. 계획 수정 (zustand에 정보 있으면)
  const onClickFinish = async () => {
    if (!STATES.some(state => state === inputState)) {
      alert('도시를 입력해주세요.')
      return
    }
    if (selected?.from === undefined || selected?.to === undefined) {
      alert('기간을 입력해주세요.')
      return
    }
    const body = {
      userId: 44,
      state: inputState,
      startDate: formatToHyphenDate(selected.from),
      endDate: formatToHyphenDate(selected.to),
    }

    // try {
    //   const res = await fetch('/server/plan/create', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: session.data.accessToken,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //     credentials: 'include',
    //   })
    //   console.log(res)

    //   const status = res.status
    //   const data = await res.json()
    //   if (res.ok) {
    //     console.log(data)
    //     return
    //   }
    //   switch (status) {
    //     case 400:
    //       console.log(data)
    //       break
    //     case 500: // Internal Server Error
    //       break
    //     default:
    //       console.log(data)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }

    console.log(body)
  }

  const renderState = (state: string): ReactNode | null => {
    if (inputState === '' || state.includes(inputState)) {
      return (
        <div
          key={state + 'start plan'}
          className={cn(
            'flex h-11 items-center pl-12 text-tbGray hover:cursor-pointer hover:text-black',
            state === inputState && 'text-black',
          )}
          onClick={() => {
            setStep(1)
            setInputState(state)
          }}
        >
          {state}
        </div>
      )
    }
  }

  const PlanStartRegion = (
    <div className='mt-5 flex h-3/4 w-full flex-col items-center justify-start gap-1 overflow-y-scroll scrollbar-hide'>
      <p className='flex items-center justify-center text-xl'>
        <span className='border-b-2 border-black text-2xl'>어디</span>로 떠나시나요?
      </p>
      <p className='mb-3 text-tbGray'>* 지역을 이동하는 경우, 첫 방문지로 설정해주세요.</p>

      <div className='relative h-2/3 w-1/2'>
        <Input
          value={inputState}
          onChange={e => setInputState(e.target?.value)}
          type='text'
          className='h-13 w-full justify-self-end rounded-b-none pl-12 text-lg shadow-none focus-visible:ring-0'
          placeholder='여행지를 검색해보세요'
          onKeyUp={e => {
            if (e.key === 'Enter' && STATES.some(state => state === inputState)) setStep(1)
          }}
        />
        <LucideIcon name='Search' className='absolute left-3 top-0 h-13' size={24} />
        <div className='mt-[1px] max-h-[230px] w-full overflow-y-scroll border-[1px] border-tbPlaceholder scrollbar-hide'>
          {STATES.map(state => renderState(state))}
        </div>
      </div>
    </div>
  )

  const PlanStartPeriod = (
    <div className='mt-5 flex h-3/4 w-full flex-col items-center justify-start gap-1 overflow-y-scroll scrollbar-hide'>
      <p className='flex items-center justify-center text-xl'>
        <span className='border-b-2 border-black text-2xl'>언제</span>&nbsp;떠나시나요?
      </p>
      <p className='mb-5 text-tbGray'>* 출발 날짜와 도착 날짜를 차례대로 선택해주세요.</p>

      <DayPicker
        onSelect={handleSelect}
        locale={ko}
        mode='range'
        endMonth={new Date(2026, 12)}
        formatters={{
          formatCaption: date => formatToKoreanShortDate(date),
        }}
        className={'size flex h-3/4 w-full items-start justify-center'}
        classNames={{
          months: 'relative flex flex-wrap justify-center gap-8',
          month_caption: 'flex justify-center items-center font-medium text-xl h-9 px-2 text-gray-800 mb-1 ',
          nav: 'absolute inset-x-0 flex justify-between items-center h-9 gap-2',
          button_next: 'relative inline-flex items-center justify-center size-9 hover:bg-gray-100 rounded-[50%]',
          button_previous: 'relative inline-flex items-center justify-center size-9 hover:bg-gray-100 rounded-[50%]',
          chevron: 'inline-block size-7 fill-tbPrimary',
          week: 'grid grid-cols-7',
          weekdays: 'grid grid-cols-7 ',
          weekday: 'size-9 w-full flex items-center justify-center text-gray-500',
          day: 'inline-flex items-center justify-center rounded text-gray-700 hover:bg-tbPrimaryHover hover:rounded-[50%] hover:text-white size-11 2xl:size-14  font-normal cursor-pointer',
          today: 'font-semibold',
          selected: 'bg-tbPrimary text-white hover:bg-tbPrimary hover:text-white focus:bg-tbPrimary focus:text-white',
          // outside: 'opacity-50 ',
          // day_button: 'bg-tbPrimary',
          range_start:
            'bg-tbPrimary text-white hover:bg-tbPrimary hover:text-white focus:bg-tbPrimary focus:text-white',
          range_end: 'bg-tbPrimary text-white hover:bg-tbPrimary hover:text-white focus:bg-tbPrimary focus:text-white',
          disabled: 'text-gray-500 opacity-50 cursor-auto',
          range_middle:
            'aria-selected:bg-blue-50 aria-selected:text-gray-900 aria-selected:hover:bg-blue-200 rounded-none ',
          hidden: 'invisible',
        }}
      />
    </div>
  )

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='relative flex h-2/3 max-h-[650px] w-1/2 max-w-[1000px] flex-col rounded-[30px] border-[1px] border-black bg-white'>
        <div className='flex h-[13%] w-full rounded-t-[30px] border-black'>
          <div
            className={cn(
              'b flex max-h-16 grow items-center justify-center rounded-tl-[30px] border-b-[1px] border-r-[1px] border-black text-xl font-medium hover:cursor-pointer',
              step === 0 && 'bg-tbPrimaryHover',
            )}
            onClick={() => setStep(0)}
          >
            여행 지역
          </div>
          <div
            className={cn(
              'flex max-h-16 grow items-center justify-center rounded-tr-[30px] border-b-[1px] border-black text-xl font-medium hover:cursor-pointer',
              step === 1 && 'bg-tbPrimaryHover',
            )}
            onClick={() => setStep(1)}
          >
            여행기간
          </div>
        </div>

        {step === 0 ? PlanStartRegion : PlanStartPeriod}

        <div className='absolute bottom-6 right-6'>
          <Button variant='tbSecondary' onClick={onClickButton} className={cn()}>
            {step === 0 ? '다음' : '이전'}
          </Button>
          <Button variant='tbSecondary' className='ml-3' onClick={onClickFinish}>
            완료
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlanStartModal
