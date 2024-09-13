import React, { ReactNode } from 'react'

import Header from '@/components/Header/index'

interface IncludeHeaderLayoutProps {
  children: React.ReactNode
}

const IncludeHeaderLayout = ({ children }: IncludeHeaderLayoutProps): ReactNode => {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Header />
      {children}
    </>
  )
}

export default IncludeHeaderLayout
