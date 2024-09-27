'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import KakaoMap from '@/components/common/KakaoMap'
import Comments from '@/components/plan/details/Comments'
import Description from '@/components/plan/details/Description'
import PlanDetailSchedule from '@/components/plan/details/Schedule'
import { fetchPlan } from '@/lib/HTTP/plan/API'
import { CommentResponse } from '@/lib/types/Entity/comment'
import { Plan } from '@/lib/types/Entity/plan'
import { toast } from '@/lib/utils/hooks/useToast'
import { Nullable } from '@/lib/utils/typeUtils'

interface PlanDetailsPageProps {
  params: {
    id: string
  }
}

const PlanDetailsPage = ({ params }: PlanDetailsPageProps): ReactNode => {
  const router = useRouter()

  const planId = parseInt(params.id) // PlanId
  const session: any = useSession() // 해당 Plan의 User 정보 받기

  // const data = DUMMY_PLAN
  // #0. Fetch Plan & User Info using planId & userId (useQuery)
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['plan', planId],
    queryFn: ({ signal }) => fetchPlan({ planId: planId, accessToken: session.data.accessToken, signal }),
  })

  let content
  if (isError) {
    toast({ title: error.message })
  }
  if (isPending) {
    content = <div>Pending...</div>
  }
  if (data) {
    content = (
      <div className='relative flex w-4/5 max-w-[1400px] flex-col items-start justify-start'>
        {/* 설명 */}
        {/* TODO: 글쓴이의 정보로 user바꾸기 */}
        <Description plan={data?.planData as Plan} user={data?.planUser} className='h-60 min-h-min w-full' />
        {/* 지도 */}
        <Title title='여행 지도 ' />
        <div className='relative aspect-video w-full'>
          <KakaoMap />
        </div>
        {/* 여행 일정 */}
        <Title title='여행 일정 ' />
        <PlanDetailSchedule plan={data?.planData as Plan} />
        {/* 댓글 */}
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
