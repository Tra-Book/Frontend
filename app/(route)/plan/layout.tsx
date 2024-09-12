import React, { ReactNode } from 'react'

import PlanSideBar from '@/components/main/PlanSideBar'

interface MainLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const MainLayout = ({ children, modal }: MainLayoutProps): ReactNode => {
  return (
    <main className='flex h-dvh w-dvw'>
      <PlanSideBar />
      {children}
      {modal}
    </main>
  )
}

export default MainLayout
