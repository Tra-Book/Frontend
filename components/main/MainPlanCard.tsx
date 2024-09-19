import Image from 'next/image'
import React, { ReactNode } from 'react'

import { DummyPlanType } from '@/app/(route)/(header)/main/page'
import LucideIcon from '@/lib/icons/LucideIcon'

import Backdrop from '../common/Backdrop'

interface PlanCardProps {
  data: DummyPlanType
}

// Todo: data props type 지정
const MainPlanCard = ({ data }: PlanCardProps): ReactNode => {
  return (
    <div className='relative flex h-min w-full cursor-pointer flex-col justify-start gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-tb-shadow'>
      <div className='group relative w-full overflow-hidden rounded-md'>
        <Image src={data.imageSrc} alt='Plan Image' className='aspect-video w-full rounded-md object-cover' />
        <Backdrop className='hidden aspect-video w-full items-center justify-center rounded-md group-hover:flex' />
      </div>
      <div className='relative'>
        <div className='flex items-end justify-start gap-3'>
          <h2 className='text-lg font-bold hover:text-tbBlueHover lg:text-xl'>{data.title}</h2>
          <span className='text-xs'>{data.state}</span>
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

export default MainPlanCard
