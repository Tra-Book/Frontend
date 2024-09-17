import React, { ReactNode } from 'react'

import PlanSideBar from '@/components/plan/PlanSideBar'

interface MainLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const MainLayout = ({ children, modal }: MainLayoutProps): ReactNode => {
  return (
    <main className='flex h-dvh w-dvw'>
      <PlanSideBar className='flex h-full w-[16vw] max-w-[100px] flex-col' />
      {children}
      {modal}
    </main>
  )
}

export default MainLayout
