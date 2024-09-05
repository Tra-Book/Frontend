'use client'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

import { DummyPlanType } from '@/app/(route)/(header)/main/page'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { PlanRegionType } from '@/lib/types/Entity/plan'
import { Nullable } from '@/lib/utils/typeUtils'

import CustomPagination from '../common/Pagination'
import { Button } from '../ui/button'
import Filters from './Filters'
import PlanCard from './PlanCard'

// Todo: Type 변경
interface ContentsProps {
  plans: Array<DummyPlanType>
}

export type FilterType = {
  isFinished: Nullable<boolean> // null: 전체
  region: Nullable<PlanRegionType> // null: 전체
}

// Todo: 필터를 적용시키기
const Contents = ({ plans }: ContentsProps): ReactNode => {
  const [filter, setFilter] = useState<FilterType>({
    isFinished: null,
    region: null,
  })
  // Todo: index를 id로 변경
  const contents =
    plans.length !== 0 ? (
      <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-1 pl-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {plans.map((plan, index) => (
          <PlanCard key={index} data={plan} />
        ))}
      </div>
    ) : (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-3xl font-bold'>
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
      </div>
    )
  return (
    <>
      {/* Filters & Search */}
      <Filters filter={filter} />
      {/* <MobileMenu className='pl-1 md:hidden' />
      <DesktopMenu className='hidden pl-1 md:flex' /> */}
      {/* Cards */}
      {contents}

      <CustomPagination className='my-4' />
    </>
  )
}

export default Contents
