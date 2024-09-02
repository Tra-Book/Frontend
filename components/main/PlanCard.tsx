import Image from 'next/image'
import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'

interface PlanCardProps {
  data: {
    title: string
    description: string
    region: string
    likes: number
    comments: number
    scraps: number
    schedule: string // 변동 예정
    imageSrc: any
  }
}

// Todo: data props type 지정
const PlanCard = ({ data }: PlanCardProps): ReactNode => {
  return (
    <div className='flex h-min w-full flex-col justify-start gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-tb-shadow'>
      <Image src={data.imageSrc} alt='Plan Image' className='aspect-video w-full rounded-md object-cover' />
      <div className='relative'>
        <div className='flex items-end justify-start gap-3'>
          <h2 className='text-lg font-bold lg:text-xl'>{data.title}</h2>
          <span className='text-xs'>{data.region}</span>
        </div>

        <p className='flex items-center pb-5 pt-2 text-xs lg:text-sm'>{data.description}</p>

        <div className='flex items-center justify-between text-xs lg:text-sm'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <LucideIcon color='tbRed' name='Heart' strokeWidth={3} />
              <span>{data.likes}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='MessageCircle' strokeWidth={3} />
              <span>{data.comments}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Bookmark' strokeWidth={3} />
              <span>{data.scraps}</span>
            </div>
          </div>
          <span>{data.schedule}</span>
        </div>
      </div>
    </div>
  )
}

export default PlanCard
