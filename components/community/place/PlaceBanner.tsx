import Image from 'next/image'
import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import communityPlaceImg from '@/public/images/communityPlaceImg.jpg'

interface PlaceBannerProps {}

const PlaceBanner = ({}: PlaceBannerProps): ReactNode => {
  return (
    <>
      <p className='my-5'>{`홈 > 커뮤니티 > 여행지`}</p>
      <div className='flex items-center justify-center gap-16 max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-10'>
        <Image
          src={communityPlaceImg}
          alt='BusanImg'
          height={400}
          width={600}
          className={cn('rounded-md shadow-tb-shadow')}
        />
        <div className='flex flex-col justify-center gap-20 text-xl max-[1200px]:gap-10'>
          <p className='text-3xl font-semibold'>
            다양한 <span className='text-tbPrimaryHover'>여행지</span>를 둘러보세요
          </p>
          <p className='ml-28 text-3xl font-semibold'>
            <span className='text-tbPrimaryHover'>여행하고 싶은 곳</span>을 저장해두세요
          </p>
          <p className='text-3xl font-semibold'>
            유명 여행지를 <span className='text-tbPrimaryHover'>동행인</span>에게 공유해보세요
          </p>
        </div>
      </div>
    </>
  )
}

export default PlaceBanner
