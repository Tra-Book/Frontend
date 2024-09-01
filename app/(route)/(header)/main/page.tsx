import Image from 'next/image'
import React, { ReactNode } from 'react'

import CustomPagination from '@/components/common/Pagination'
import { Input } from '@/components/ui/input'
import LucideIcon from '@/lib/icons/LucideIcon'
import DummyThumbNail from '@/public/dummy/dummy_plan_thumbnail.png'
interface MainPageProps {}

// Todo: 실제 데이터 Fetch하여 배치
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

const PlanCard = (): ReactNode => {
  return (
    <div className='flex aspect-square w-full flex-col justify-start overflow-hidden rounded-lg bg-white p-3 shadow-tb-shadow'>
      <Image src={dummy_plan.imageSrc} alt='Plan Image' className='h-3/5 w-full rounded-lg object-cover' />
      <div className='relative h-2/5'>
        <div className='flex h-2/5 items-end justify-start gap-3'>
          <h2 className='text-lg font-bold'>{dummy_plan.title}</h2>
          <span className='text-xs'>{dummy_plan.region}</span>
        </div>
        <p className='flex h-1/3 items-center text-sm'>{dummy_plan.description}</p>
        <div className='flex h-1/3 items-center justify-between text-sm'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <LucideIcon color='tbRed' name='Heart' strokeWidth={3} />
              <span>{dummy_plan.likes}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='MessageCircle' strokeWidth={3} />
              <span>{dummy_plan.comments}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Bookmark' strokeWidth={3} />
              <span>{dummy_plan.scraps}</span>
            </div>
          </div>
          <span className='text-xs'>{dummy_plan.schedule}</span>
        </div>
      </div>
    </div>
  )
}

const MainPage = ({}: MainPageProps): ReactNode => {
  return (
    <div className='min-h-screen-header relative flex h-min flex-col items-center justify-start px-10'>
      {/* 제목 */}
      <div className='flex h-[8dvh] w-full items-end justify-start gap-4'>
        <span className='text-2xl font-semibold'>내 여행 계획</span>
        <span className='text-sm font-medium'>10개</span>
      </div>
      {/* 필터 / 검색 */}
      <div className='flex h-[8dvh] w-full items-center justify-between font-medium'>
        <div className='flex items-center justify-start gap-4'>
          <LucideIcon name='SlidersHorizontal' size={20} />
          <ul className='flex w-80 items-center justify-between'>
            <li className='w-1/3 border-r border-solid border-black text-center'>전체</li>
            <li className='w-1/3 border-r border-solid border-black text-center'>계획 중</li>
            <li className='w-1/3 text-center'>계획 완료</li>
          </ul>
        </div>
        <Input className='w-1/5 min-w-[270px] justify-self-end' placeholder='🔎 제목, 글 내용을 검색해보세요' />
      </div>
      {/* 카드 */}
      <div className='relative grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'>
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
      </div>
      {/* 페이지네이션 */}
      <CustomPagination className='py-4' />
    </div>
  )
}

export default MainPage
