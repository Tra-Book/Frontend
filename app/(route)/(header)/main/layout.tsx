'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import MainSideBar from '@/components/main/MainSideBar'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/HTTP/http'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps): ReactNode => {
  const session: any = useSession()
  console.log()

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
