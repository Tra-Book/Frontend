'use client'
import Image from 'next/image'
import { ReactNode } from 'react'

import Backdrop from '@/components/common/Backdrop'
import UserAvatar from '@/components/common/UserAvatar'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import { formatKoreanDate } from '@/lib/utils/dateUtils'

interface DescriptionProps {
  plan: Plan
  user: any
  className?: string
}

const Description = ({ plan, user, className }: DescriptionProps): ReactNode => {
  // #0. 데이터
  const {
    imgSrc,
    title,
    description,
    startDate,
    endDate,
    memberCnt,
    budget,
    likeCnt,
    isLiked,
    scrapCnt,
    isScraped,
    comments,
  } = plan
  // # 유저 더미 데이터

  return (
    <div className={cn('relative flex cursor-pointer items-start justify-start gap-6 px-3 py-6', className)}>
      <div className='group relative aspect-video h-full origin-left'>
        <Image
          src={imgSrc as string}
          alt='Plan Image'
          width={320}
          height={200}
          className='h-full w-full origin-center rounded-md'
        />

        <Backdrop className='hidden h-full w-full items-center justify-center rounded-md group-hover:flex' />
      </div>

      {/* 정보 */}
      <div className={cn('flex h-fit w-fit flex-grow origin-left flex-col items-start justify-start gap-3')}>
        {/* 유저정보 */}
        <div className='flex items-center justify-start gap-2'>
          <UserAvatar imgSrc='https://storage.cloud.google.com/trabook-20240822/frontendComponent/map_marker_focus.png' />
          <div>
            <p className='text-lg font-semibold'>힐링여행</p>
            <p className='text-sm text-tbGray'>좋은 사람과 좋은 여행</p>
          </div>
        </div>
        {/* 계획정보 */}
        <div className='flex w-fit flex-col items-start justify-start gap-3'>
          <span className='truncate text-3xl font-semibold'>{title}</span>
          <span className='truncate text-base font-semibold text-tbGray'>{description}</span>
          <span className='font-medium'>{`${formatKoreanDate(startDate)} ~ ${formatKoreanDate(endDate)}`}</span>
        </div>

        <div className='flex w-full items-center justify-start gap-3 text-sm font-medium'>
          <span>{memberCnt}명</span>
          <span>{budget}원</span>
        </div>
        <div className='flex items-center justify-start gap-3'>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Heart' fill='tbRed' strokeWidth={0} />
            <span>{likeCnt}</span>
          </div>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='MessageCircle' />
            <span>{comments?.length}</span>
          </div>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Bookmark' />
            <span>{scrapCnt}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description
