'use client'

import React, { ReactNode } from 'react'

import { STATES } from '@/lib/constants/regions'
import LucideIcon from '@/lib/icons/LucideIcon'

import { Input } from '../ui/input'

interface PlanStartModalProps {}

const PlanStartModal = ({}: PlanStartModalProps): ReactNode => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='flex h-2/3 w-2/3 flex-col rounded-[30px] border-2 border-black bg-white'>
        <div className='flex h-[15%] w-full rounded-t-[30px] border-b-2 border-black bg-amber-300'>
          <div className='flex grow items-center justify-center border-r-2 border-black text-[27px] font-semibold'>
            여행 지역
          </div>
          <div className='flex grow items-center justify-center text-[27px] font-semibold'>여행기간</div>
        </div>

        <div className='flex h-full w-full flex-col items-center justify-center'>
          <p>어디로 떠나시나요?</p>
          <p>* 지역을 이동하는 경우, 첫 방문지로 설정해주세요.</p>

          <div className='relative h-full w-1/2 border-[1px] border-tbPlaceholder'>
            <Input
              // value={searchInput}
              // onChange={e => setSearchInput(e.target?.value)}
              type='text'
              className='h-[10%] w-full justify-self-end rounded-b-none pl-12 text-lg shadow-none'
              placeholder='여행지를 검색해보세요'
            />
            <LucideIcon name='Search' className='absolute left-3 top-0 h-[10%]' size={24} />
            <div className='mt-[1px] h-2/3 w-full bg-slate-100'>
              {STATES.map(state => (
                <div key={state + 'start plan'}>{state}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanStartModal
