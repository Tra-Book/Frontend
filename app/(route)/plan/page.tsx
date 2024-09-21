import React, { ReactNode } from 'react'

import UpdateInfo from '@/components/plan/UpdateInfo'
import UpdatePeriod from '@/components/plan/UpdatePeriod'

interface TravelInfoPageProps {}

const TravelInfoPage = ({}: TravelInfoPageProps): ReactNode => {
  return (
    <div className='h-full w-full'>
      <div className='h-1/2 w-full'>
        <UpdatePeriod />
      </div>
      <div className='h-1/2 w-full'>
        <UpdateInfo />
      </div>
    </div>
  )
}

export default TravelInfoPage
