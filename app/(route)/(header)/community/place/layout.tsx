import React, { ReactNode } from 'react'

interface CommunityPlaceLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const CommunityPlaceLayout = ({ children, modal }: CommunityPlaceLayoutProps): ReactNode => {
  return (
    <div>
      {children}
      {modal}
    </div>
  )
}

export default CommunityPlaceLayout
