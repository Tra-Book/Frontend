import Image from 'next/image'
import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { removeTagsAndParentheses } from '@/lib/utils/stringUtils'
import BusanImg from '@/public/images/busan.jpg'

import { CommunityPlace } from './placeType'

interface PlaceCardProps {
  place: CommunityPlace
}

const PlaceCard = ({ place }: PlaceCardProps): ReactNode => {
  return (
    <div className='h-[95%] w-[90%] rounded-lg p-3 shadow-tb-shadow hover:scale-105 hover:cursor-pointer'>
      <Image
        src={place.imageSrc || BusanImg}
        alt='BusanImg'
        width={200}
        height={200}
        quality={100}
        className='mb-2 h-2/3 w-full rounded-lg'
      />
      <div className='flex flex-col justify-between pl-2'>
        <h2 className='truncate text-lg font-medium'>{removeTagsAndParentheses(place.placeName)}</h2>
        <p># {place.category}</p>
        <div className='flex gap-3'>
          <div className='flex items-center gap-1'>
            <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
            <p>{place.star}</p>
          </div>
          <div className='flex items-center gap-1'>
            <LucideIcon name='Bookmark' strokeWidth={3} />
            <p>{place.scrapped || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard
