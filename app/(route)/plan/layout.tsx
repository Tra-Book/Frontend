'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, useEffect } from 'react'

import PlanSideBar from '@/components/plan/PlanSideBar'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import usePlanStore from '@/lib/context/planStore'
import { queryClient } from '@/lib/HTTP/http'

interface MainLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const MainLayout = ({ children, modal }: MainLayoutProps): ReactNode => {
  const { planData } = usePlanStore()

  useEffect(() => {
    console.log(planData)
    console.log(planData.startDate, typeof planData.startDate)
  }, [planData])

  return (
    <main className='flex h-dvh w-dvw'>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <PlanSideBar className='flex h-full w-[16vw] max-w-[100px] flex-col border-r-[1px] border-tbPlaceholder' />
          {children}
          <Toaster />
        </QueryClientProvider>
        {modal}
      </ToastProvider>
    </main>
  )
}

export default MainLayout
