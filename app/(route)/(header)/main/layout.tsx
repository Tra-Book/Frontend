import React, { ReactNode } from 'react'

import { auth } from '@/auth'
import MainSideBar from '@/components/main/MainSideBar'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps): Promise<ReactNode> => {
  const s: any = await auth()

  return (
    <main className='flex min-h-screen w-dvw bg-tbSecondary pt-24'>
      <MainSideBar
        isCredentails={s.user.provider === 'credentials'}
        image={s.user.image}
        status_message={s.user.status_message}
        nickname={s.user.nickname}
      />
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
    </main>
  )
}

export default MainLayout
