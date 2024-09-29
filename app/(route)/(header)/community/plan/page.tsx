import React, { ReactNode } from 'react'

import PlanBanner from '@/components/community/plan/PlanBanner'
import PlanFilter from '@/components/community/plan/PlanFilter'
import PopularPlan from '@/components/community/plan/PopluarPlan'

interface CommunityPlanPageProps {}

const CommunityPlanPage = ({}: CommunityPlanPageProps): ReactNode => {
  return (
    <div className='flex h-screen w-full justify-center'>
      <div className='flex h-screen w-[80%] max-w-[1400px] flex-col'>
        <PlanBanner />
        <PopularPlan />
        <PlanFilter />
      </div>
    </div>
  )
}

export default CommunityPlanPage
