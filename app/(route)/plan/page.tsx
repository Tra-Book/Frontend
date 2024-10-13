'use client'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect } from 'react'

import LoadingPage from '@/components/common/LoadingPage'
import UpdateInfo from '@/components/plan/UpdateInfo'
import UpdatePeriod from '@/components/plan/UpdatePeriod'
import usePlanStore from '@/lib/context/planStore'
import { QUERY_KEYS } from '@/lib/HTTP/cacheKey'
import { getPlan } from '@/lib/HTTP/plan/API'
interface TravelInfoPageProps {}

const TravelInfoPage = ({}: TravelInfoPageProps): ReactNode => {
  const { planData, setPlanData } = usePlanStore()
  const params = useSearchParams()
  /**
   * Case1: planId == -1 (default) -> 새로운 계획일때 넘겨준 값 (데이터 페칭X)
   * Case2: planId != -1 (기존 여행 계획, 데이터 페칭 필요)
   */
  const planId = parseInt(params.get('planId') as string)
  const session: any = useSession()

  useEffect(() => {
    console.log(planData)
  }, [planData])

  // #0. Fetch Plan & User Info using planId & userId (useQuery)
  const { data, isPending, isError, error } = useQuery({
    queryKey: QUERY_KEYS.GENERAL.PLAN.INDEX(planId),
    queryFn: () => getPlan({ planId: planId, accessToken: session.data ? session.data.accessToken : null }),
    enabled: planId !== -1 && planId !== planData.id,
    //select는 data가 존재할때만 호출된다. 그렇기때문에 data가 undefined인 경우를 고려할 필요가 없다.
    select: data => data.planData,
  })
  // #1. 가져온 값 대입하기
  useEffect(() => {
    if (data && data.id !== planData.id) {
      console.log('fetched data:', data)

      setPlanData(data) // data가 변경될 때만 상태 업데이트
    }
  }, [data, planData, setPlanData])

  let contents
  // 쿼리가 실행될 때만 로딩 페이지를 보여줌
  if (isPending && planId !== -1 && planId !== planData.id) {
    contents = <LoadingPage className='h-full w-full' />
  } else if (data || planData.id) {
    // 데이터가 있으면 해당 내용을 렌더링
    contents = (
      <>
        <div className='h-1/2 w-full'>
          <UpdatePeriod />
        </div>
        <div className='h-1/2 w-full'>
          <UpdateInfo />
        </div>
      </>
    )
  } else {
    // 데이터가 없을 때 보여줄 기본 상태
    contents = <div>No Plan Data Available</div>
  }

  return <div className='h-full w-full'>{contents}</div>
}

export default TravelInfoPage
