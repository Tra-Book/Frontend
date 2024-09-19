import Image from 'next/image'
import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'

import Backdrop from '../common/Backdrop'
import MapPin from '../common/MapPin'

interface AddedPlanCardsProps {
  data: Place
  isReduced: boolean
}

const AddedPlanCards = ({ data, isReduced }: AddedPlanCardsProps): ReactNode => {
  const { imgSrc, order, name, address, tag, stars, visitCnt, duration } = data

  const addressArr = address
    .split(' ')
    .filter((val, index) => index === 0 || index === 1)
    .join(' ')

  return (
    <>
      <div className='relative flex min-h-min w-full cursor-pointer items-center justify-start gap-3 border-y-[0.5px] border-tbPlaceholder px-3 py-4'>
        {!isReduced && (
          <div className='group relative aspect-square h-full origin-left'>
            <Image src={imgSrc} alt='Place Image' className='h-full w-full origin-center rounded-md' />
            <Backdrop className='hidden h-full w-full items-center justify-center rounded-md group-hover:flex' />
          </div>
        )}

        {/* 정보 */}
        <div
          className={cn(
            'flex flex-grow origin-left flex-col items-start justify-start gap-2',
            !isReduced && 'w-fit min-w-[170px]',
          )}
        >
          <div className='group flex w-fit items-center justify-start'>
            <MapPin num={order} size={22} className='group-hover:scale-125' />
            <span className='text-lg font-semibold group-hover:text-tbBlue'>{name}</span>
          </div>

          <p className='w-fit text-sm'>{address}</p>

          <div className='flex w-full items-center justify-between text-sm'>
            <p># {tag}</p>
            <p className='text-tbGray'>{duration}분</p>
          </div>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
            <span>{stars}</span>
          </div>
          {!isReduced && <span className='w-fit text-sm'>방문자 {visitCnt}+</span>}
        </div>
      </div>
      <div className='relative flex min-h-14 w-full items-center justify-center px-3'>
        <LucideIcon name='CarFront' size={26} />
        <div className='absolute right-4 text-sm text-tbGray'>30분</div>
      </div>
    </>
  )
}

export default AddedPlanCards
