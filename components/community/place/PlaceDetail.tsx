'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import Slider from 'react-slick'

import KakaoMap from '@/components/common/KakaoMap'
import { PLACE_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import LucideIcon from '@/lib/icons/LucideIcon'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

import { DetailPlace } from './placeType'

interface PlaceDetailProps {
  place: DetailPlace
}

// UI
// 뒤로 가기 - 완
// 리뷰 슬라이드 기능
// 주소 복사

const dummyComments = [
  'faewfwafawf',
  'jydtfjtjt',
  '12233445',
  'ㄹㅁㄷㅈㄹㄹㅁㄹㅁㄷㅈㄹㄹㅁㅈㄹㅁㄷㅈㄹㄹㅁㅈㄹㅁㄷㅈㄹㄹㅁㅈㄹㅁㄷㅈㄹㄹㅁㅈㄹㅁㄷㅈㄹㄹㅁㅈㄹㅁㄷㅈㄹㄹㅁㅈㅈ',
]

const PlaceDetail = ({ place }: PlaceDetailProps): ReactNode => {
  console.log(place)
  useKakaoLoader() // 카카오 지도 로딩
  const router = useRouter()

  const settings = {
    variableWidth: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  }

  const onClickBack = () => {
    router.back()
  }

  return (
    <div className='relative flex h-full w-full flex-col rounded-[30px] p-2'>
      <div className='relative mb-1 grow rounded-[30px]'>
        <Image
          src={place.place.imageSrc || PLACE_DEFAULT_IMAGE}
          alt={place.place.placeName}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex h-[250px] items-center gap-2 border-t-[1px] border-solid border-black p-3'>
        <div className='flex h-full w-[60%] flex-col gap-2'>
          <p className='mb-1 text-3xl font-semibold'>{place.place.placeName}</p>
          <p className='text-lg text-tbGray'>
            #{place.place.category} #{place.place.subcategory}
          </p>
          <div className='flex items-center gap-2 text-lg'>
            <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} size={30} />
            <p className='mr-4 text-lg'>{place.place.star}</p>
            <LucideIcon name='MessageCircle' strokeWidth={2} size={24} />
            <p className='text-lg'>{place.comments.length}</p>
          </div>

          <div className='h-[100px] w-full'>
            {/* {place.comments.length === 0 && (
              <div className='flex h-full w-full items-center justify-center'>리뷰가 없습니다...</div>
            )} */}
            <Slider {...settings}>
              {dummyComments.map(comment => (
                <div key={comment + comment} style={{ width: 400 }} className='h-[70px]'>
                  <div className='h-full w-[90%] overflow-scroll rounded-lg bg-tbPlaceholder p-3 shadow-tb-shadow scrollbar-hide hover:scale-105'>
                    {comment}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='flex h-[100%] w-[40%] flex-col justify-center gap-1'>
          <div className='h-[85%] w-full'>
            <KakaoMap />
          </div>
          <p className='mt-1'>{place.place.address}</p>
        </div>
      </div>
      <LucideIcon name='X' className='absolute right-3 top-3' size={35} onClick={onClickBack} />
    </div>
  )
}

export default PlaceDetail
