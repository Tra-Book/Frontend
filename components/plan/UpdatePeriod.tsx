'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { calculateTripDuration, formatKoreanDate } from '@/lib/utils/dateUtils'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

interface UpdatePeriodProps {}

const UpdatePeriod = ({}: UpdatePeriodProps): ReactNode => {
  useKakaoLoader()
  const router = useRouter()
  const { planData } = usePlanStore()

  const onClickIcon = () => {
    router.push(ROUTES.PLAN.INDEX.url)
  }

  return (
    <section className='flex h-full w-full flex-col gap-5 px-10 pt-10'>
      <article className='flex items-end gap-5'>
        <h2 className='inline-block border-b-[2px] border-tbPrimary text-2xl font-semibold'>여행 정보</h2>
        <LucideIcon name='SquarePen' size={20} onClick={onClickIcon} />
      </article>

      <article className='flex h-full w-full grow'>
        <div className='w-1/3'>
          <h3 className='mb-3 text-xl'>
            {planData.state}{' '}
            <span className='text-base'>({calculateTripDuration(planData.startDate, planData.endDate)})</span>
          </h3>
          <div>{`${formatKoreanDate(planData.startDate)} ~ ${formatKoreanDate(planData.endDate)}`}</div>
        </div>

        <Map // 지도를 표시할 Container
          id='map'
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            flexGrow: '1',
            height: '100%',
          }}
          level={8} // 지도의 확대 레벨
        />
      </article>
    </section>
  )
}

export default UpdatePeriod
