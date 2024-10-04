'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, useEffect } from 'react'

import { INITIAL_PLAN } from '@/lib/constants/dummy_data'
import usePlanStore from '@/lib/context/planStore'
import { queryClient } from '@/lib/HTTP/cacheKey'

interface CommunityLayoutProps {
  children: React.ReactNode
}

const CommunityLayout = ({ children }: CommunityLayoutProps): ReactNode => {
  const { setPlanData } = usePlanStore()

  useEffect(() => {
    setPlanData(INITIAL_PLAN)
  }, [setPlanData])
  return (
    <div className='mt-24'>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* {modal} */}
      </QueryClientProvider>
    </div>
  )
}

export default CommunityLayout
