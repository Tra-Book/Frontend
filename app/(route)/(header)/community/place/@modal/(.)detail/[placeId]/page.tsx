import React, { ReactNode } from 'react'

import PlaceDetail from '@/components/community/place/PlaceDetail'
import { DetailPlace } from '@/components/community/place/placeType'

interface CommunityPlaceDetailProps {
  params: {
    placeId: string
  }
}

const getPlace = async (placeId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/place?placeId=${placeId}`)

    if (!res.ok) {
      const error = new Error('An error occurred while fetching places')
      error.message = await res.json()
      throw error
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const CommunityPlaceDetail = async ({ params }: CommunityPlaceDetailProps): Promise<ReactNode> => {
  const detailPlace: DetailPlace = await getPlace(params.placeId)

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='relative z-50 flex h-[95%] w-[90%] min-w-[600px] flex-col rounded-[30px] border-[1px] border-black bg-white'>
        <PlaceDetail place={detailPlace} />
      </div>
    </div>
  )
}

export default CommunityPlaceDetail
