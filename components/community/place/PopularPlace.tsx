'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import Slider from 'react-slick'

import BusanImg from '@/public/images/busan.jpg'

interface PopularPlaceProps {}

const PopularPlace = ({}: PopularPlaceProps): ReactNode => {
  const [popular, setPopular] = useState<any>([])
  const setting = {
    variableWidth: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const getPopularPlace = async () => {
    try {
      const res = await fetch(`/server/places/popular`, {
        method: 'GET',
      })

      if (res.ok) {
        const data = await res.json()
        // console.log(data)
        return data
      }

      console.log(res)

      const status = res.status
      switch (status) {
        default:
          // alert('오류입니다.')
          return
      }
    } catch (error) {
      console.log('Fetch error', error)
    }
  }

  useEffect(() => {
    const getPlace = async () => {
      const data = await getPopularPlace()
      setPopular(data)
    }
    getPlace()

    console.log('popular', popular)
  }, [])

  const render = (item: any) => (
    <div className='h-52' style={{ width: 240 }}>
      <div className='h-[90%] w-[90%] rounded-lg bg-tbSecondary p-3 hover:scale-105 hover:cursor-pointer'>
        <Image
          src={item.imageSrc || BusanImg}
          alt='BusanImg'
          width={200}
          height={200}
          quality={100}
          className='mb-2 h-2/3 w-full rounded-lg'
        />
        <h2 className='text-lg font-medium'>{item.placeName}</h2>
        <p># {item.category}</p>
      </div>
    </div>
  )

  return (
    <div className='mb-7'>
      <p className='mb-7 mt-10 text-3xl'>🔥 TraBook 인기 여행지 Top 10</p>
      <div className='h-56'>
        <Slider {...setting}>
          {popular &&
            popular.map((item: any) => {
              return render(item)
            })}
        </Slider>
      </div>
    </div>
  )
}

export default PopularPlace
