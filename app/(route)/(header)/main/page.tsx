import React, { ReactNode } from 'react'

import Contents from '@/components/main/Contents'
import DummyThumbNail from '@/public/dummy/dummy_plan_thumbnail.png'
interface MainPageProps {}

// Todo: 실제 데이터 Fetch하여 사용하기
const dummy_plan = {
  id: 1,
  title: '가족 여행',
  description: '아들 전역 기념 여행',
  region: '제주도',
  likes: 30,
  comments: 3,
  scraps: 15,
  schedule: '24.04.20~24.04.23',
  imageSrc: DummyThumbNail,
}
export type DummyPlanType = typeof dummy_plan
// Todo: 서버 컴포넌트로 따로 뺴서 Data Fetching

const dummy_plans = new Array(6).fill({
  ...dummy_plan,
})

const MainPage = ({}: MainPageProps): ReactNode => {
  return (
    <div className='relative flex h-min min-h-screen-header flex-grow flex-col items-center justify-start bg-white px-10'>
      {/* Title */}
      <p className='flex h-[8dvh] min-h-[60px] w-full items-end pl-1 text-2xl font-semibold xl:text-3xl'>
        내 여행 계획
      </p>

      <Contents plans={dummy_plans} />
    </div>
  )
}

export default MainPage
