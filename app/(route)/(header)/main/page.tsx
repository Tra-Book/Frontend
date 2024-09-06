import React, { ReactNode } from 'react'

import Contents from '@/components/main/Contents'
import { PlanRegionType } from '@/lib/types/Entity/plan'
import DummyThumbNail from '@/public/dummy/dummy_plan_thumbnail.png'
interface MainPageProps {}

// Todo: 실제 데이터 Fetch하여 사용하기
const dummy_plan = {
  id: 1,
  title: '가족 여행',
  description: '아들 전역 기념 여행',
  region: '제주도' as PlanRegionType,
  likes: 30,
  comments: 3,
  scraps: 15,
  schedule: '24.04.20~24.04.23',
  imageSrc: DummyThumbNail,
  isFinished: true,
}
const dummy_plan2 = {
  id: 1,
  title: '가족 여행',
  description: '아들 전역 기념 여행',
  region: '제주도' as PlanRegionType,
  likes: 32,
  comments: 3,
  scraps: 15,
  schedule: '24.04.20~24.04.23',
  imageSrc: DummyThumbNail,
  isFinished: true,
}
export type DummyPlanType = typeof dummy_plan
// Todo: 서버 컴포넌트로 따로 뺴서 Data Fetching

const dummy_plans1 = new Array(5).fill({
  ...dummy_plan,
})
const dummy_plans2 = new Array(5).fill({
  ...dummy_plan2,
})
const dummy_plans = []

const MainPage = ({}: MainPageProps): ReactNode => {
  return (
    <div className='relative flex h-min min-h-screen-header flex-grow flex-col items-start justify-start gap-2 bg-white px-6 md:px-10'>
      <p className='flex h-[10dvh] min-h-[60px] w-full items-end pl-1 text-3xl font-semibold xl:text-4xl'>
        내 여행 계획
      </p>
      <Contents name='Plan' datas={dummy_plans} />
    </div>
  )
}

export default MainPage
