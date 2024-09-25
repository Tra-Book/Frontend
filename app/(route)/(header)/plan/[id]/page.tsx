'use client'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import Description from '@/components/plan/details/Description'
import PlanDetailSchedule from '@/components/plan/details/Schedule'
import { DUMMY_PLAN } from '@/lib/constants/dummy_data'

interface PlanDetailsPageProps {
  params: {
    id: number
  }
}

const PlanDetailsPage = ({ params }: PlanDetailsPageProps): ReactNode => {
  const { id } = params // PlanId
  const session: any = useSession() // 해당 Plan의 User 정보 받기

  // #0. Fetch Plan & User Info using planId & userId (useQuery)
  const data = DUMMY_PLAN
  // TODO: 데이터 페칭
  // const {data, isPending, isError, error } = useQuery({
  //   queryKey: ['plan', id],
  //   queryFn: fetchPlan,
  // })

  return (
    <div className='relative flex w-4/5 max-w-[1200px] flex-col items-start justify-start'>
      {/* 설명 */}
      <Description plan={data} user={session.data?.user} className='h-60 min-h-min w-full' />
      {/* 지도 */}
      <Title title='여행 지도 ' />
      <div className='relative aspect-video w-full'>
        <KakaoMap />
      </div>
      {/* 여행 일정 */}
      <Title title='여행 일정 ' />
      <PlanDetailSchedule plan={data} />
      {/* 댓글 */}
    </div>
  )
}

export default PlanDetailsPage

const Title = ({ title }: { title: string }): ReactNode => {
  return (
    <div className='my-3 w-full border-t-2 border-solid border-tbPlaceholder pt-5 text-3xl font-semibold'>{title}</div>
  )
}
