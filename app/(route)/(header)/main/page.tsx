import React, { ReactNode } from 'react'

import CustomPagination from '@/components/common/Pagination'
import PlanCard from '@/components/main/PlanCard'
import { Input } from '@/components/ui/input'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import DummyThumbNail from '@/public/dummy/dummy_plan_thumbnail.png'
interface MainPageProps {}

// Todo: 실제 데이터 Fetch하여 사용하기
const dummy_plan = {
  title: '가족 여행',
  description: '아들 전역 기념 여행',
  region: '제주도',
  likes: 30,
  comments: 3,
  scraps: 15,
  schedule: '24.04.20~24.04.23',
  imageSrc: DummyThumbNail,
}

// 필터, 검색 창
const MobileMenu = ({ className }: { className?: string }): ReactNode => {
  return (
    <div className={cn(className, 'flex h-[9dvh] min-h-[60px] w-full items-center justify-between font-medium')}>
      <Input className='w-1/5 min-w-[250px] justify-self-end' placeholder='🔎 제목, 글 내용을 검색해보세요' />
      <LucideIcon name='SlidersHorizontal' size={26} />
    </div>
  )
}

const DesktopMenu = ({ className }: { className?: string }): ReactNode => {
  // Style
  const listStyle =
    'w-1/3 max-w-[80px] text-center text-base 2xl:text-lg xl:max-w-[100px] cursor-pointer hover:text-black'
  return (
    <div className={cn(className, 'h-[9dvh] min-h-[60px] w-full items-center justify-between font-medium')}>
      <div className='flex items-center justify-start'>
        <LucideIcon name='SlidersHorizontal' size={20} />
        <ul className='flex w-80 items-center justify-start'>
          <li className={cn(listStyle, 'border-r border-solid border-black')}>전체</li>
          <li className={cn(listStyle, 'border-r border-solid border-black text-tbGray')}>계획 중</li>
          <li className={cn(listStyle, 'text-tbGray')}>계획 완료</li>
        </ul>
      </div>
      <Input className='w-1/5 min-w-[270px] justify-self-end' placeholder='🔎 제목, 글 내용을 검색해보세요' />
    </div>
  )
}

const MainPage = ({}: MainPageProps): ReactNode => {
  return (
    <div className='min-h-screen-header relative flex h-min flex-grow flex-col items-center justify-start bg-white px-10'>
      {/* 제목 */}
      <div className='flex h-[8dvh] min-h-[60px] w-full items-end justify-start gap-4'>
        <span className='text-2xl font-semibold xl:text-3xl'>내 여행 계획</span>
        <span className='text-sm font-medium xl:text-base'>10개</span>
      </div>
      {/* 필터 / 검색 */}
      <MobileMenu className='md:hidden' />
      <DesktopMenu className='hidden md:flex' />
      {/* 카드 */}
      {/* Todo: 서버 컴포넌트로 따로 뺴서 Data Fetching */}
      <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        <PlanCard data={dummy_plan} />
        <PlanCard data={dummy_plan} />
        <PlanCard data={dummy_plan} />
        <PlanCard data={dummy_plan} />
        <PlanCard data={dummy_plan} />
        <PlanCard data={dummy_plan} />
        <PlanCard data={dummy_plan} />
        <PlanCard data={dummy_plan} />
      </div>
      {/* 페이지네이션 */}
      <CustomPagination className='my-4' />
    </div>
  )
}

export default MainPage
