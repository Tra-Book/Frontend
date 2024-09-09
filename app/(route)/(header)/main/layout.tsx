import React, { ReactNode } from 'react'

import { auth } from '@/auth'
import SideBar from '@/components/main/SideBar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps): Promise<ReactNode> => {
  const s: any = await auth()

  return (
    <main className='flex min-h-screen w-dvw bg-tbSecondary pt-24'>
      <SideBar
        isCredentails={s.user.provider === 'credentials'}
        image={s.user.image}
        status_message={s.user.status_message}
        nickname={s.user.nickname}
      />
      {children}
    </main>
  )
}

export default MainLayout
