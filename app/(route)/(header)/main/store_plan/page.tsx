import React, { ReactNode } from 'react'

import Contents from '@/components/main/Contents'
import LucideIcon from '@/lib/icons/LucideIcon'

interface MainStorePlanPageProps {}

const MainStorePlanPage = ({}: MainStorePlanPageProps): ReactNode => {
  return (
    <div className='relative flex h-min min-h-screen-header flex-grow flex-col items-start justify-start gap-2 bg-white px-6 md:px-10'>
      <p className='flex h-[10dvh] min-h-[60px] w-full items-end pl-1 text-3xl font-semibold xl:text-4xl'>
        보관함
        <LucideIcon name='ChevronRight' size={36} />
        여행 계획
      </p>

      <Contents name='Plan' />
    </div>
  )
}

export default MainStorePlanPage
