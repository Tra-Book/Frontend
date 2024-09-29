'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import React, { ReactNode, useEffect, useState } from 'react'
import Slider from 'react-slick'

import Loading from '@/components/common/Loading'
import { BACKEND_ROUTES } from '@/lib/constants/routes'

import PlanCard from './PlanCard'
import { Plan } from './planType'

interface PopularPlanProps {}

const PopularPlan = ({}: PopularPlanProps): ReactNode => {
  const [popular, setPopular] = useState<Plan[]>()

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

  const getPopularPlan = async () => {
    const URL = BACKEND_ROUTES.PLANS.POPULAR
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
      const data: Plan[] = await getPopularPlan()
      setPopular(data)
    }
    getPlace()
  }, [])

  return (
    <div className='mb-7'>
      <p className='mb-7 mt-10 text-3xl'>TraBook 인기 여행계획</p>
      {!popular && (
        <div className='flex h-[320px] items-center justify-center'>
          <Loading size={30} />
        </div>
      )}
      <div className='h-[320px]'>
        {popular && (
          <Slider {...setting}>
            {popular.map(item => (
              <div key={item.description} className='h-[320px]' style={{ width: 400 }}>
                <PlanCard plan={item} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  )
}

export default PopularPlan
