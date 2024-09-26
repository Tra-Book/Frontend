'use client'
import { ToastProvider } from '@radix-ui/react-toast'
import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/HTTP/http'

export default function PlanDetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
