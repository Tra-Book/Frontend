import React, { ReactNode } from 'react'

import Loading from '@/components/common/Loading'

interface LoadingPageProps {}

const LoadingPage = ({}: LoadingPageProps): ReactNode => {
  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40'>
      <Loading size={40} />
    </div>
  )
}

export default LoadingPage
