import React, { ReactNode } from 'react'

import Schedule from '@/components/plan/Schedule'
import { DUMMY_PLAN } from '@/lib/constants/dummy_data'

interface AddPlaceLayoutProps {
  children: React.ReactNode
}

const AddPlaceLayout = ({ children }: AddPlaceLayoutProps): ReactNode => {
  // Todo: DUMMY_PLAN > 전역변수 plan
  return (
    <div className='relative flex h-dvh flex-grow justify-start'>
      <Schedule id='schedule' plan={DUMMY_PLAN} />
      {children}
    </div>
  )
}

export default AddPlaceLayout
