import React, { ReactNode } from 'react'

import CustomPagination from '@/components/common/Pagination'
import DesktopMenu from '@/components/main/DesktopMenu'
import MobileMenu from '@/components/main/MobileMenu'
import PlanCard from '@/components/main/PlanCard'
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

const MainPage = ({}: MainPageProps): ReactNode => {
  return (
    <div className='relative flex h-min min-h-screen-header flex-grow flex-col items-center justify-start bg-white px-10'>
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
      {/* 데이터 없을때  */}
      {/* <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-3xl font-bold'>
        <p>아직 생성한 여행 계획이 없습니다!</p>
        <p>TRABOOK과 함께 신나는 여행을 계획하세요</p>
        <Link href={ROUTES.AUTH.LOGIN.url}>
          <Button
            variant='tbPrimary'
            className='relative flex h-14 w-52 items-center justify-center gap-3 text-xl font-semibold'
          >
            여행 계획하기
            <LucideIcon name='Plane' size={26} />
          </Button>
        </Link>
      </div> */}
      {/* 데이터 있을때 */}
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
      <CustomPagination className='my-4' />
    </div>
  )
}

export default MainPage
