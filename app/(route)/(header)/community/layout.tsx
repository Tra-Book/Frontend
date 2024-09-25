import React, { ReactNode } from 'react'

interface CommunityLayoutProps {
  children: React.ReactNode
}

const CommunityLayout = ({ children }: CommunityLayoutProps): ReactNode => {
  return <div className='mt-24'>{children}</div>
}

export default CommunityLayout
