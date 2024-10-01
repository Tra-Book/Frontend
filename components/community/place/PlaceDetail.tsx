'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import ItemsCarousel from 'react-items-carousel'

import KakaoMap from '@/components/common/KakaoMap'
import { PLACE_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import LucideIcon from '@/lib/icons/LucideIcon'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

import { DetailPlace } from './placeType'

interface PlaceDetailProps {
  place: DetailPlace
}

const PlaceDetail = ({ place }: PlaceDetailProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩
  const router = useRouter()

  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const onClickBack = () => {
    router.back()
  }

  return (
    <div className='relative flex h-full w-full flex-col rounded-[30px] p-2'>
      <div className='relative mb-1 grow rounded-[30px]'>
        <Image
          src={place.place.imgSrc || PLACE_DEFAULT_IMAGE}
          alt={place.place.placeName}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex h-[250px] items-center gap-2 border-t-[1px] border-solid border-black p-3'>
        <div className='flex h-full w-[60%] flex-col gap-2'>
          <p className='mb-1 text-3xl font-semibold'>{place.place.placeName}</p>

          <div className='mr-2 flex items-center justify-between gap-2 text-lg'>
            <p className='text-lg text-tbGray'>
              #{place.place.category} #{place.place.subcategory}
            </p>
            <div className='flex items-center gap-2'>
              <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} size={30} />
              <p className='mr-4 text-lg'>{place.place.star}</p>
              <LucideIcon name='MessageCircle' strokeWidth={2} size={24} />
              <p className='text-lg'>{place.comments.length}</p>
            </div>
          </div>

          <div className='mt-4 grow'>
            {place.comments.length === 0 && (
              <div className='flex h-full w-full items-center justify-center'>리뷰가 없습니다...</div>
            )}
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={1}
              gutter={20}
              slidesToScroll={1}
              infiniteLoop={true}
              rightChevron={<LucideIcon name='ChevronRight' size={30} className='hover:scale-105' />}
              leftChevron={<LucideIcon name='ChevronLeft' size={30} className='hover:scale-105' />}
              chevronWidth={50}
            >
              {place.comments.map(comment => (
                <div key={comment.date + comment.date} className='flex h-full items-center justify-center'>
                  <div className='h-[120px] w-[80%] overflow-scroll rounded-lg bg-tbPlaceholder p-3 shadow-tb-shadow scrollbar-hide'>
                    {comment.content}
                  </div>
                </div>
              ))}
            </ItemsCarousel>
          </div>
        </div>
        <div className='flex h-[100%] w-[40%] flex-col justify-center gap-1'>
          <div className='h-[85%] w-full'>
            <KakaoMap modalLat={place.place.latitude} modalLng={place.place.longitude} />
          </div>
          <p className='mt-1'>주소 : {place.place.address}</p>
        </div>
      </div>
      <LucideIcon name='X' className='absolute right-3 top-3' size={35} onClick={onClickBack} />
    </div>
  )
}

export default PlaceDetail
