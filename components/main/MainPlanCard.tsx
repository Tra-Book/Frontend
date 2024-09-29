import Image from 'next/image'
import React, { ReactNode } from 'react'

import { PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { formatDateToShortHyphenDate } from '@/lib/utils/dateUtils'

import Backdrop from '../common/Backdrop'

interface MainPlanCardProps {
  data: PlanCardType
}

// Todo: data props type 지정
const MainPlanCard = ({ data }: MainPlanCardProps): ReactNode => {
  const { imgSrc, title, state, description, likeCnt, commentCnt, scrapCnt, startDate, endDate } = data
  return (
    <div className='relative flex h-min w-full cursor-pointer flex-col justify-start gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-tb-shadow'>
      <div className='group relative w-full overflow-hidden rounded-md'>
        <Image
          width={300}
          height={200}
          src={(imgSrc as string) || PLAN_DEFAULT_IMAGE}
          alt='Plan Image'
          className='aspect-video w-full rounded-md object-cover'
        />
        <Backdrop className='hidden aspect-video w-full items-center justify-center rounded-md group-hover:flex' />
      </div>
      <div className='relative'>
        <div className='flex items-end justify-start gap-3'>
          <h2 className='text-lg font-bold hover:text-tbBlueHover lg:text-xl'>{title || '계획 제목'}</h2>
          <span className='text-xs'>{state}</span>
        </div>

        <p className='flex items-center pb-5 pt-2 text-xs lg:text-sm'>{description || '계획 설명을 입력해주세요!'}</p>

        <div className='flex items-center justify-between text-xs lg:text-sm'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <LucideIcon color='tbRed' name='Heart' strokeWidth={3} />
              <span>{likeCnt || 0}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='MessageCircle' strokeWidth={3} />
              <span>{commentCnt || 0}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Bookmark' strokeWidth={3} />
              <span>{scrapCnt || 0}</span>
            </div>
          </div>
          <span>
            {formatDateToShortHyphenDate(startDate)} ~ {formatDateToShortHyphenDate(endDate)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MainPlanCard
