import Image from 'next/image'
import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import communityPlanImg from '@/public/images/communityPlan.webp'

interface PlanBannerProps {}

const PlanBanner = ({}: PlanBannerProps): ReactNode => {
  return (
    <>
      <p className='my-5'>{`홈 > 커뮤니티 > 여행지`}</p>
      <div className='flex items-center justify-center gap-16 max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-10'>
        <div className='flex flex-col justify-center gap-14 text-xl max-[1200px]:gap-10'>
          <p className='text-3xl font-semibold'>
            다양한 <span className='text-tbPrimaryHover'>여행 계획</span>를 둘러보세요
          </p>
          <p className='text-3xl font-semibold'>
            <span className='text-tbPrimaryHover'>퍼오기</span>를 통해 여행 계획을 가져오세요
          </p>
          <p className='text-3xl font-semibold'>
            <span className='text-tbPrimaryHover'>공유하기</span>를 통해{' '}
            <span className='text-tbPrimaryHover'>지인</span>에게 계획을 공유하세요
          </p>
        </div>
        <Image
          src={communityPlanImg}
          alt='BusanImg'
          height={400}
          width={600}
          className={cn('rounded-md shadow-tb-shadow')}
        />
      </div>
    </>
  )
}

export default PlanBanner
