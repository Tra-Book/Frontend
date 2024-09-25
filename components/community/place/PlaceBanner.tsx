import Image from 'next/image'
import React, { ReactNode } from 'react'

import BusanImg from '@/public/images/busan.jpg'

interface PlaceBannerProps {}

const PlaceBanner = ({}: PlaceBannerProps): ReactNode => {
  return (
    <>
      <p className='my-5'>{`홈 > 커뮤니티 > 여행지`}</p>
      <div className='flex gap-20'>
        <Image src={BusanImg} alt='BusanImg' height={400} className='rounded-md' />
        <div className='flex flex-col justify-center gap-6 text-xl'>
          <div>
            <div className='text-4xl'>✏️</div>
            <p>다양한 여행지를 둘러보세요.</p>
          </div>
          <div>
            <div className='text-4xl'>🔖</div>
            <p>여행하고 싶은 곳을 저장해두세요.</p>
          </div>
          <div>
            <div className='text-4xl'>✉️</div>
            <p>유명 여행지를 동행인에게 공유해보세요.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceBanner
