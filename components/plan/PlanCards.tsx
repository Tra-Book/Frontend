import Image from 'next/image'
import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'

import MapPin from '../common/MapPin'

interface AddedPlanCardsProps {
  data: Place
}

const AddedPlanCards = ({ data }: AddedPlanCardsProps): ReactNode => {
  const { imgSrc, order, name, address, tag, stars, visitCnt, duration } = data
  return (
    <>
      <div className='relative flex min-h-min w-full items-center justify-start gap-3 border-y-[0.5px] border-tbPlaceholder px-3 py-4'>
        <div className='relative aspect-square h-full'>
          <Image src={imgSrc} alt='Place Image' className='h-full w-full origin-center rounded-md' />
        </div>
        {/* 정보 */}
        <div className='flex flex-col items-start justify-start gap-2'>
          <div className='flex items-center justify-start gap-2'>
            <MapPin num={order} size={22} />
            <span className='text-lg font-semibold'>{name}</span>
          </div>

          <p className='text-sm'>{address}</p>

          <p className='text-sm'># {tag}</p>
          <div className='flex items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
            <span>{stars}</span>
          </div>
          <span className='text-sm'>방문자 {visitCnt}+</span>
        </div>
        <div className='absolute right-4 text-sm text-tbGray'>{duration}분</div>
      </div>
      <div className='relative flex min-h-14 w-full items-center justify-center px-3'>
        <LucideIcon name='CarFront' size={26} />
        <div className='absolute right-4 text-sm text-tbGray'>30분</div>
      </div>
    </>
  )
}

export default AddedPlanCards
