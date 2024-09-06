import React, { ReactNode } from 'react'

import Contents from '@/components/main/Contents'
import LucideIcon from '@/lib/icons/LucideIcon'
import { PlanRegionType } from '@/lib/types/Entity/plan'
import DummyThumbNail from '@/public/dummy/dummy_plan_thumbnail.png'

interface MainStorePlanPageProps {}

// Todo: 실제 데이터 Fetch하여 사용하기
const dummy_plan = (randomLikes: number) => {
  return {
    id: 1,
    title: '가족 여행',
    description: '아들 전역 기념 여행',
    region: '제주도' as PlanRegionType,
    likes: randomLikes,
    comments: 3,
    scraps: 15,
    schedule: '24.04.20~24.04.23',
    imageSrc: DummyThumbNail,
    isFinished: false,
  }
}
const dummy_plan2 = (randomLikes: number) => {
  return {
    id: 1,
    title: '가족 여행',
    description: '아들 전역 기념 여행',
    region: '서울특별시' as PlanRegionType,
    likes: Math.floor(Math.random() * 20),
    comments: 3,
    scraps: 15,
    schedule: '24.04.20~24.04.23',
    imageSrc: DummyThumbNail,
    isFinished: true,
  }
}
let dummy_plans = []
for (let i = 0; i < 40; i++) {
  dummy_plans.push(dummy_plan(Math.floor(Math.random() * 10)))
}
for (let i = 0; i < 21; i++) {
  dummy_plans.push(dummy_plan2(Math.floor(Math.random() * 20)))
}

const MainStorePlanPage = ({}: MainStorePlanPageProps): ReactNode => {
  return (
    <div className='relative flex h-min min-h-screen-header flex-grow flex-col items-start justify-start gap-2 bg-white px-6 md:px-10'>
      <p className='flex h-[10dvh] min-h-[60px] w-full items-end pl-1 text-3xl font-semibold xl:text-4xl'>
        보관함
        <LucideIcon name='ChevronRight' size={36} />
        여행 계획
      </p>

      <Contents name='Plan' datas={dummy_plans} />
    </div>
  )
}

export default MainStorePlanPage
