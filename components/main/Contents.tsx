'use client'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

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

// Todo: DummyPlanType을 실제 받는 데이터 Type으로 변경
interface ContentsProps {
  name: 'Plan' | 'Place'
  datas: Array<DummyPlanType>
}

export const isFinishedChoices = ['전체', '계획 중', '계획 완료'] as const
export type IsFinishedChoicesType = (typeof isFinishedChoices)[number]

export const regionChoices = ['전체', ...planRegions] as const
export type RegionChoicesType = PlanRegionType | '전체'

const arrangeChoices = ['최신순', '좋아요순', '스크랩순', '댓글순'] as const
type ArrangeChoiceType = (typeof arrangeChoices)[number]

export type PlanFilterType = {
  isFinished: Array<IsFinishedChoicesType>
  region: Array<RegionChoicesType>
}

const allElements = ['전체']
const initFilters = {
  plan: { isFinished: allElements, region: allElements } as PlanFilterType,
  // place: {}
}

//Filter Apply Function
const applyRequests = (
  data: Array<DummyPlanType>,
  filter: PlanFilterType,
  searchInput: string,
  arrange: ArrangeChoiceType,
): Array<DummyPlanType> => {
  // #1. 필터 적용하기
  // #1-1. 완료여부
  if (filter.isFinished !== allElements) {
    data = filter.isFinished.includes('계획 중')
      ? data.filter(data => data.isFinished === false)
      : data.filter(data => data.isFinished === true)
  }
  // #1-2. 지역
  if (filter.region !== allElements) {
    data = data.filter(data => filter.region.includes(data.region))
  }
  // #2. 검색 적용하기
  data = data.filter(data => data.title.includes(searchInput))
  // #3. 정렬하기
  switch (arrange) {
    case '최신순':
      // Todo: 실제 Date객체를 받아서 해봐야함
      // filteredData.sort((a,b) => )
      break
    case '좋아요순':
      data.sort((a, b) => b.likes - a.likes)
      break
    case '댓글순':
      data.sort((a, b) => b.comments - a.comments)
      break
    case '스크랩순':
      data.sort((a, b) => b.scraps - a.scraps)
      break
  }
  return data
}

const Contents = ({ name, datas }: ContentsProps): ReactNode => {
  const [filter, setFilter] = useState(initFilters.plan)
  const [arrange, setArrange] = useState<ArrangeChoiceType>('좋아요순')
  const [searchInput, setSearchInput] = useState<string>('')

  const handleFilters = (
    id: 'isFinished' | 'region' | 'all',
    type: 'change' | 'reset',
    filterValues?: Array<IsFinishedChoicesType> | Array<RegionChoicesType>,
  ) => {
    // 완료 여부
    if (id === 'isFinished') {
      if (type === 'reset') {
        setFilter(prev => ({ ...prev, isFinished: initFilters.plan.isFinished }))
        return
      }
      if (filterValues) setFilter(prev => ({ ...prev, isFinished: filterValues as Array<IsFinishedChoicesType> }))
    }
    // 지역
    if (id === 'region') {
      if (type === 'reset') {
        setFilter(prev => ({ ...prev, region: initFilters.plan.region }))
        return
      }
      if (filterValues) setFilter(prev => ({ ...prev, region: filterValues as Array<RegionChoicesType> }))
    }
    // 전체 초기화
    if (id === 'all' && type === 'reset') {
      setFilter(initFilters.plan)
      return
    }
  }

  /** 필터/검색이 적용된 값
   * 1. 필터 적용하기
   * 2. 검색값 적용하기
   * 3. 정렬 하기
   */
  let contents

  if (datas.length === 0) {
    contents = (
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
  } else {
    const filteredData = applyRequests(datas, filter, searchInput, arrange) // 필터, 검색, 정렬 적용

    if (filteredData.length === 0) {
      contents = (
        <>
          <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-3xl font-bold'>
            <p>검색 결과가 없습니다!</p>
            <Button
              variant='tbPrimary'
              className='relative flex h-14 w-52 items-center justify-center gap-3 text-xl font-semibold'
              onClick={() => handleFilters('all', 'reset')}
            >
              필터 초기화
              <LucideIcon name='RotateCw' size={26} />
            </Button>
          </div>
        </>
      )
    } else {
      contents = (
        <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-1 pl-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {datas.map((data, index) =>
            name === 'Plan' ? <PlanCard key={index} data={data} /> : <PlaceCard key={index} data={data} />,
          )}
        </div>
      )
    }
  }

  return (
    <>
      <Filters filter={filter} handleFilters={handleFilters} />
      <div className='relative mb-3 flex h-auto min-h-min w-full items-center justify-between pl-1'>
        <p className='hidden text-xl font-medium md:block'>총 계획 {datas.length}개</p>
        <div className='mr-3 flex w-full flex-row-reverse flex-wrap-reverse items-center justify-between gap-4 text-xs text-tbGray md:w-fit md:flex-row md:flex-nowrap md:text-sm'>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex h-full w-fit items-end justify-between gap-1 md:items-center'>
              <span className='w-fit'>{arrange}</span>
              <LucideIcon name='ChevronDown' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-fit min-w-0 p-0 text-tbGray'>
              {arrangeChoices.map(choice => (
                <DropdownMenuItem
                  key={choice}
                  className='px-3 py-2 text-xs hover:!bg-tbPrimary hover:font-medium hover:text-black md:text-sm'
                  onClick={() => setArrange(choice)}
                >
                  {choice}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            value={searchInput}
            onChange={e => setSearchInput(e.target?.value)}
            type='text'
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
