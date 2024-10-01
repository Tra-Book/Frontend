'use client'

import Image from 'next/image'
import React, { ReactNode, useState } from 'react'

import { PLACE_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import { formatKoreanDate, parseHypenDateToDate } from '@/lib/utils/dateUtils'
import BusanImg from '@/public/images/busan.jpg'

import { Plan } from './planType'

interface PlanCardProps {
  plan: Plan
  comments?: Comment[]
}

const formatPeriod = (date: string) => {
  const d = date && parseHypenDateToDate(date)
  const d1 = typeof d === 'object' && formatKoreanDate(d)

  return d1
}

const PlanCard = ({ plan }: PlanCardProps): ReactNode => {
  const [isHovered, setIsHovered] = useState(false)
  // console.log(plan)

  return (
    <div
      // href={`/community/plan/detail/${plan.planId}`}
      // scroll={false}
      className='relative block h-[95%] w-[90%] rounded-lg shadow-tb-shadow hover:scale-105 hover:cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={PLACE_DEFAULT_IMAGE || BusanImg}
        alt='BusanImg'
        width={200}
        height={200}
        quality={100}
        className='absolute h-full w-full rounded-lg p-3'
      />
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 m-auto w-[80%] rounded-t-lg bg-tbPrimary pl-2 transition-all duration-500 ease-in-out',
          isHovered ? 'h-[50%]' : 'h-[30%]',
        )}
      >
        <div className='flex gap-3'>
          <h2 className='ml-1 mt-1 grow truncate text-[20px] font-medium'>{plan.planTitle}</h2>
          <div className='flex items-center gap-1'>
            <LucideIcon name='Heart' strokeWidth={3} />
            <p>{plan.likes || 0}</p>
          </div>
          <div className='flex items-center gap-1'>
            <LucideIcon name='Bookmark' strokeWidth={3} />
            <p>{plan.scraps || 0}</p>
          </div>
          <div className='mr-3 flex items-center gap-1'>
            <LucideIcon name='MessageCircle' strokeWidth={3} />
            <p>{plan.numOfComment || 0}</p>
          </div>
        </div>
        <p
          className={cn('m-1 text-sm', isHovered && 'border-b-[1px] border-solid border-black')}
        >{`${formatPeriod(plan.startDate)} ~ ${formatPeriod(plan.endDate)}`}</p>
        {isHovered && (
          <p className='h-[80px] grow overflow-scroll break-words px-1 scrollbar-hide'>{plan.description}</p>
        )}
      </div>
    </div>
  )
}

export default PlanCard
