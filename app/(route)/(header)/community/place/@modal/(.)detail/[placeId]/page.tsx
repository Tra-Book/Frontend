'use client'

import React, { ReactNode } from 'react'

import PlaceDetail from '@/components/community/place/PlaceDetail'

interface CommunityPlaceDetailProps {}

const CommunityPlaceDetail = ({}: CommunityPlaceDetailProps): ReactNode => {
  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='relative flex h-2/3 w-1/2 flex-col rounded-[30px] border-[1px] border-black bg-white'>
        <PlaceDetail />
      </div>
    </div>
  )
}

export default CommunityPlaceDetail
