import React, { ReactNode } from 'react'

import PlaceBanner from '@/components/community/place/PlaceBanner'
import PlaceFilter from '@/components/community/place/PlaceFilter'
import PopularPlace from '@/components/community/place/PopularPlace'

interface CommunityPlacePageProps {}

const CommunityPlacePage = ({}: CommunityPlacePageProps): ReactNode => {
  return (
    <div className='flex h-screen w-full justify-center'>
      <div className='flex h-screen w-[80%] flex-col'>
        <PlaceBanner />
        <PopularPlace />
        <PlaceFilter />
      </div>
    </div>
  )
}

export default CommunityPlacePage
