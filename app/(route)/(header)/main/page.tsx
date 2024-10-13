'use client'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import LoadingPage from '@/components/common/LoadingPage'
import MainPlanContents from '@/components/main/MyPlanContents'
import { QUERY_KEYS } from '@/lib/HTTP/cacheKey'
import { GET_userPlans } from '@/lib/HTTP/plans/API'

const MainPage = (): ReactNode => {
  const session: any = useSession()

  const user = session.data
  const { data, isPending, isError, error } = useQuery({
    queryKey: QUERY_KEYS.USER.PLANS.INDEX,
    queryFn: ({ signal }) => GET_userPlans({ type: 'user', accessToken: user?.accessToken, signal }),
    enabled: user !== undefined,
  })

  let contents
  if (isPending) {
    contents = <LoadingPage className='h-0 min-h-screen-header w-fit flex-grow' />
  }
  if (data) {
    contents = (
      <div className='relative flex h-min min-h-screen-header flex-grow flex-col items-start justify-start gap-2 bg-white px-6 md:px-10'>
        <p className='flex h-[10dvh] min-h-[60px] w-full items-end pl-1 text-3xl font-semibold xl:text-4xl'>
          내 여행 계획
        </p>

        <MainPlanContents plans={data.plans} />
      </div>
    )
  }
  return contents
}

export default MainPage
