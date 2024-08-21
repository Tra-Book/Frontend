import React, { ReactNode } from 'react'

import Header from '@/components/common/Header/index'

interface IncludeHeaderLayoutProps {
  children: React.ReactNode
}

const IncludeHeaderLayout = ({ children }: IncludeHeaderLayoutProps): ReactNode => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default IncludeHeaderLayout
