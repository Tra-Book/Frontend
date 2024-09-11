import React, { ReactNode } from 'react'

import PlanSideBar from '@/components/main/PlanSideBar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps): ReactNode => {
  return (
    <main className='flex h-dvh w-dvw'>
      <PlanSideBar />
      {children}
    </main>
  )
}

export default MainLayout
