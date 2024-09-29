'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

import { queryClient } from '@/lib/HTTP/http'

interface CommunityLayoutProps {
  children: React.ReactNode
}

const CommunityLayout = ({ children }: CommunityLayoutProps): ReactNode => {
  return (
    <div className='mt-24'>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* {modal} */}
      </QueryClientProvider>
    </div>
  )
}

export default CommunityLayout
