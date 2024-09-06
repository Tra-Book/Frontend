'use client'
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'

import { DummyPlanType } from '@/app/(route)/(header)/main/page'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { planRegions, PlanRegionType } from '@/lib/types/Entity/plan'

import CustomPagination from '../common/Pagination'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import Filters from './Filters'
import PlaceCard from './PlaceCard'
import PlanCard from './PlanCard'

// Todo: Type 변경
interface ContentsProps {
  name: 'Plan' | 'Place'
  datas: Array<DummyPlanType>
}

export const isFinishedChoices = ['전체', '계획 중', '계획 완료'] as const
export type IsFinishedChoicesType = (typeof isFinishedChoices)[number]

export const regionChoices = ['전체', ...planRegions] as const
export type RegionChoicesType = PlanRegionType | '전체'

const arrangeChoices = ['좋아요순', '최신순', '리뷰순'] as const

export type PlanFilterType = {
  isFinished: Array<IsFinishedChoicesType>
  region: Array<RegionChoicesType>
}

const initFilters = {
  plan: { isFinished: ['전체'], region: ['전체'] } as PlanFilterType,
  // place: {}
}

const Contents = ({ name, datas }: ContentsProps): ReactNode => {
  const [filter, setFilter] = useState(initFilters.plan)
  const [arrangement, setArrangement] = useState('좋아요순')

  // FilterHandling
  const handleFilters = (
    spec: 'isFinished' | 'region' | 'all',
    type: 'change' | 'reset',
    filterValues?: Array<IsFinishedChoicesType> | Array<RegionChoicesType>,
  ) => {
    // #. 완료 여부
    if (spec === 'isFinished') {
      if (type === 'reset') {
        setFilter(prev => ({ ...prev, isFinished: initFilters.plan.isFinished }))
        return
      }
      if (filterValues) setFilter(prev => ({ ...prev, isFinished: filterValues as Array<IsFinishedChoicesType> }))
    }
    // # 지역
    if (spec === 'region') {
      if (type === 'reset') {
        setFilter(prev => ({ ...prev, region: initFilters.plan.region }))
        return
      }
      if (filterValues) setFilter(prev => ({ ...prev, region: filterValues as Array<RegionChoicesType> }))
    }
    // # 전체 초기화
    if (spec === 'all' && type === 'reset') {
      setFilter(initFilters.plan)
      return
    }
  }

  useEffect(() => {
    console.log(filter)
  }, [filter])

  // Todo: index를 id로 변경
  let contents =
    datas.length !== 0 ? (
      <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-1 pl-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {datas.map((data, index) =>
          name === 'Plan' ? <PlanCard key={index} data={data} /> : <PlaceCard key={index} data={data} />,
        )}
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
      <Filters filter={filter} handleFilters={handleFilters} />
      <div className='relative mb-3 flex h-[5dvh] w-full items-center justify-between pl-1'>
        <p className='hidden text-xl font-medium md:block'>총 계획 {datas.length}개</p>
        <div className='mr-3 flex w-full flex-row-reverse flex-wrap-reverse items-center justify-between gap-4 text-xs text-tbGray md:w-fit md:flex-row md:flex-nowrap md:text-sm'>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex h-full w-fit items-end justify-between gap-1 md:items-center'>
              <span className='w-fit'>{arrangement}</span>
              <LucideIcon name='ChevronDown' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-fit min-w-0 p-0 text-tbGray'>
              {arrangeChoices.map(choice => (
                <DropdownMenuItem
                  key={choice}
                  className='px-3 py-2 text-xs hover:!bg-tbPrimary hover:font-medium hover:text-black md:text-sm'
                  onClick={() => setArrangement(choice)}
                >
                  {choice}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            className='h-full w-full min-w-[140px] justify-self-end md:w-fit'
            placeholder='🔎 여행 제목으로 검색해보세요'
          />
        </div>
      </div>
      {contents}

      <CustomPagination className='my-4' />
    </>
  )
}
export default Contents
