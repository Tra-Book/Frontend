'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, useEffect } from 'react'

import MainSideBar from '@/components/main/MainSideBar'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { INITIAL_PLAN } from '@/lib/constants/dummy_data'
import usePlanStore from '@/lib/context/planStore'
import { queryClient } from '@/lib/HTTP/cacheKey'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps): ReactNode => {
  const { setPlanData } = usePlanStore()

  useEffect(() => {
    setPlanData(INITIAL_PLAN)
  }, [])
  return (
    <main className='flex min-h-screen w-dvw bg-tbSecondary pt-24'>
      <QueryClientProvider client={queryClient}>
        <MainSideBar />
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </QueryClientProvider>
    </main>
  )
}

export default MainLayout
