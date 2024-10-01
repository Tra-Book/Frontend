'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import React, { ReactNode, useEffect, useState } from 'react'
import Slider from 'react-slick'

import Loading from '@/components/common/Loading'
import { BACKEND_ROUTES } from '@/lib/constants/routes'

import PlaceCard from './PlaceCard'
import { CommunityPlace, DetailPlace } from './placeType'

interface PopularPlaceProps {}

const PopularPlace = ({}: PopularPlaceProps): ReactNode => {
  const [popular, setPopular] = useState<DetailPlace[]>()
  const setting = {
    variableWidth: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  }

  const getPopularPlace = async () => {
    const URL = BACKEND_ROUTES.PLACES.POPULAR
    try {
      const res = await fetch(`/server${URL.url}`, {
        method: URL.method,
      })

      if (res.ok) {
        const data = await res.json()
        return data
      }

      const status = res.status
      switch (status) {
        default:
          return
      }
    } catch (error) {
      console.log('Fetch error', error)
    }
  }

  useEffect(() => {
    const getPlace = async () => {
      const data: DetailPlace[] = await getPopularPlace()
      setPopular(data)
    }
    getPlace()
  }, [])

  const render = (item: CommunityPlace, commentsNum: number) => <PlaceCard place={item} />

  return (
    <div className='mb-7'>
      <p className='mb-7 mt-10 text-3xl'>TraBook 인기 여행지 Top 10</p>
      {!popular && (
        <div className='flex h-[320px] items-center justify-center'>
          <Loading size={30} />
        </div>
      )}
      <div className='h-[320px]'>
        <Slider {...setting}>
          {popular &&
            popular.map(item => (
              <div key={item.place.placeId} className='h-[320px]' style={{ width: 400 }}>
                {render(item.place, item.comments.length)}
              </div>
            ))}
        </Slider>
      </div>
    </div>
  )
}

export default PopularPlace
