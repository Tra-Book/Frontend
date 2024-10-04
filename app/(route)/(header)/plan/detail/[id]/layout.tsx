'use client'
import { ToastProvider } from '@radix-ui/react-toast'
import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'

import { Toaster } from '@/components/ui/toaster'
import { INITIAL_PLAN } from '@/lib/constants/dummy_data'
import usePlanStore from '@/lib/context/planStore'
import { queryClient } from '@/lib/HTTP/cacheKey'

export default function PlanDetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setPlanData } = usePlanStore()

  useEffect(() => {
    setPlanData(INITIAL_PLAN)
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div className='justiy-start flex h-min min-h-screen-header w-full flex-col items-center pt-24'>
          {children}
          <Toaster />
        </div>
      </ToastProvider>
    </QueryClientProvider>
  )
}
