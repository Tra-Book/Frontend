'use client'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import LoadingPage from '@/components/common/LoadingPage'
import Comments from '@/components/plan/details/Comments'
import Description from '@/components/plan/details/Description'
import PlanDetailSchedule from '@/components/plan/details/Schedule'
import useDropdownStore from '@/lib/context/dropdownStore'
import { fetchPlan } from '@/lib/HTTP/plan/API'
import { CommentResponse } from '@/lib/types/Entity/comment'
import { Plan } from '@/lib/types/Entity/plan'
import { Nullable } from '@/lib/utils/typeUtils'

interface PlanDetailsPageProps {
  params: {
    id: string
  }
}

const PlanDetailsPage = ({ params }: PlanDetailsPageProps): ReactNode => {
  const planId = parseInt(params.id) // PlanId
  const session: any = useSession() // 해당 Plan의 User 정보 받기

  // #0. Day:0 is UI for all Schedule
  const { setDay } = useDropdownStore()
  useEffect(() => {
    setDay(0)
    return () => setDay(1)
  }, [])

  // #0. Fetch Plan & User Info using planId & userId (useQuery)
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['plan', planId],
    queryFn: () => fetchPlan({ planId: planId, accessToken: session.data ? session.data.accessToken : null }),
    enabled: session.data !== undefined,
  })

  // #2. Add Likes

  let content
  if (isError) {
    // toast({ title: error.message })
  }
  if (isPending) {
    content = <LoadingPage />
  }
  if (data) {
    console.log('Fetched from ID:', data)

    content = (
      <div className='relative flex w-4/5 max-w-[1400px] flex-col items-start justify-start'>
        <Description
          plan={data?.planData as Plan}
          planUser={data?.planUser}
          user={session.data}
          className='h-60 min-h-min w-full'
        />
        <Title title='여행도 ' />
        <div className='relative aspect-video w-full'>
          <KakaoMap />
        </div>

        <Title title='여행 일정 ' />
        <PlanDetailSchedule plan={data?.planData as Plan} />

        <Comments
          planId={planId}
          comments={data?.planData.comments as Nullable<CommentResponse[]>}
          user={session.data}
          className='mb-10 w-full'
        />
      </div>
    )
  }

  return content
}

export default PlanDetailsPage

const Title = ({ title }: { title: string }): ReactNode => {
  return (
    <div className='mb-6 mt-10 w-full border-t-2 border-solid border-tbPlaceholder pt-5 text-3xl font-semibold'>
      {title}
    </div>
  )
}
