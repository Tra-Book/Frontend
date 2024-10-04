'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, Suspense } from 'react'

import PlanSideBar from '@/components/plan/PlanSideBar'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/HTTP/cacheKey'

interface MainLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const MainLayout = ({ children, modal }: MainLayoutProps): ReactNode => {
  return (
    <main className='flex h-dvh w-dvw'>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <PlanSideBar className='flex h-full w-[16vw] max-w-[100px] flex-col border-r-[1px] border-tbPlaceholder' />
          <Suspense>{children}</Suspense>
          <Toaster />
          {modal}
        </QueryClientProvider>
      </ToastProvider>
    </main>
  )
}

export default MainLayout
