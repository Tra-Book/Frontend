'use client'

import React, { ReactNode, useState } from 'react'

import { STATES } from '@/lib/constants/regions'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface PlanStartModalProps {}

const PlanStartModal = ({}: PlanStartModalProps): ReactNode => {
  const [inputState, setInputState] = useState<string>('')
  const [step, setStep] = useState<number>(0) // 0: 여행 지역, 1: 여행 기간

  const onClickButton = () => {
    setStep(prev => (prev === 0 ? 1 : 0))
  }

  // API 호출 : /plan
  const onClickFinish = () => {}

  const renderState = (state: string): ReactNode | null => {
    if (inputState === '' || state.includes(inputState)) {
      return (
        <div
          key={state + 'start plan'}
          className='flex h-13 items-center pl-12 text-tbGray hover:text-black'
          onClick={() => setInputState(state)}
        >
          {state}
        </div>
      )
    }
  }

  const PlanStartRegion = (
    <div className='flex h-3/4 w-full flex-col items-center justify-center gap-1 overflow-y-scroll scrollbar-hide'>
      <p className='flex items-center justify-center text-2xl'>
        <span className='text-3xl underline'>어디</span>로 떠나시나요?
      </p>
      <p className='mb-3 text-tbGray'>* 지역을 이동하는 경우, 첫 방문지로 설정해주세요.</p>

      <div className='relative h-2/3 w-1/2'>
        <Input
          value={inputState}
          onChange={e => setInputState(e.target?.value)}
          type='text'
          className='h-13 w-full justify-self-end rounded-b-none pl-12 text-lg shadow-none focus-visible:ring-0'
          placeholder='여행지를 검색해보세요'
        />
        <LucideIcon name='Search' className='absolute left-3 top-0 h-13' size={24} />
        <div className='mt-[1px] max-h-[250px] w-full overflow-y-scroll border-[1px] border-tbPlaceholder scrollbar-hide'>
          {STATES.map(state => renderState(state))}
        </div>
      </div>
    </div>
  )

  const PlanStartPeriod = <div>~~~</div>

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='relative flex h-2/3 w-2/3 flex-col rounded-[30px] border-2 border-black bg-white'>
        <div className='flex h-[15%] w-full rounded-t-[30px] border-b-2 border-black'>
          <div
            className={cn(
              'flex grow items-center justify-center rounded-tl-[30px] border-r-2 border-black text-[27px] font-semibold',
              step === 0 && 'bg-tbPrimaryHover',
            )}
            onClick={() => setStep(0)}
          >
            여행 지역
          </div>
          <div
            className={cn(
              'flex grow items-center justify-center rounded-tr-[30px] border-black text-[27px] font-semibold',
              step === 1 && 'bg-tbPrimaryHover',
            )}
            onClick={() => setStep(1)}
          >
            여행기간
          </div>
        </div>

        {step === 0 ? PlanStartRegion : PlanStartPeriod}

        <div className='absolute bottom-6 right-6'>
          <Button variant='tbSecondary' onClick={onClickButton}>
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
