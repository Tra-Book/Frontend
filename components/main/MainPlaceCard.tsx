'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'

import { DummyPlaceType } from '@/app/(route)/(header)/main/store_place/page'
import LucideIcon from '@/lib/icons/LucideIcon'
import ToggleWrapper, { useDropdown } from '@/lib/utils/hooks/useToggle'

import Backdrop from '../common/Backdrop'

interface PlaceCardProps {
  data: DummyPlaceType
}

// Todo: data props type 지정
const MainPlaceCard = ({ data }: PlaceCardProps): ReactNode => {
  return (
    <div className='relative flex h-min w-full cursor-pointer flex-col justify-start gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-tb-shadow'>
      <div className='group relative w-full overflow-hidden rounded-md'>
        <Image src={data.imageSrc} alt='Plan Image' className='aspect-video w-full rounded-md object-cover' />
        <Backdrop className='hidden aspect-video w-full items-center justify-center rounded-md group-hover:flex' />
      </div>
      <div className='relative flex flex-col justify-start gap-2'>
        <div className='relative flex items-end justify-start gap-3'>
          <h2 className='text-lg font-bold hover:text-tbBlueHover lg:text-xl'>{data.name}</h2>
          <span className='text-xs'>&#35;{data.tag}</span>
          <Menu />
        </div>

        <div className='flex items-center justify-between text-xs lg:text-sm'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
              <span>{data.star}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Plane' strokeWidth={2} />
              <span>{data.usedCnt}</span>
            </div>
            <div className='flex items-center gap-1'>
              <span>리뷰</span>
              <span>{data.reviewCnt}+</span>
            </div>
          </div>
        </div>

        <div className='flex items-center text-wrap break-words rounded-md bg-tbPlaceholder px-1 py-2 text-xs hover:bg-tbPlaceHolderHover lg:text-sm'>
          {data.reviews[0]}
        </div>
      </div>
    </div>
  )
}

export default MainPlaceCard

const Menu = () => {
  const { ref, isOpen, toggleDropdown } = useDropdown() // 드롭다운 상태 관리

  // Todo: 리뷰삭제 및 쓰기 API 연결
  const options = [
    {
      name: '리뷰',
      // route: ROUTES.HOME.url,
    },
    {
      name: '삭제',
      // route: ROUTES.HOME.url,
      // action: 리뷰 삭제 API
    },
  ]
  return (
    <>
      <LucideIcon name='EllipsisVertical' className='absolute right-0' onClick={toggleDropdown} />
      {isOpen && (
        <ToggleWrapper
          ref={ref}
          isOpen={isOpen}
          className='absolute bottom-[-260%] right-0 z-10 rounded-md border border-solid border-black bg-white text-xs'
        >
          <div className='flex items-center justify-center gap-2 border-b border-solid border-black px-2 py-2 hover:bg-tbPrimary'>
            <span>{options[0].name}</span>
            <LucideIcon name='PencilLine' size={16} />
          </div>
          <div className='flex items-center justify-center gap-2 px-2 py-2 hover:bg-tbPrimary'>
            <span>{options[1].name}</span>
            <LucideIcon name='Trash2' size={16} />
          </div>
        </ToggleWrapper>
      )}
    </>
  )
}
