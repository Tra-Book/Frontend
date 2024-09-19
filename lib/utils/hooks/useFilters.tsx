import { useState } from 'react'

import { DummyPlanType } from '@/app/(route)/(header)/main/page'
import { DummyPlaceType } from '@/app/(route)/(header)/main/store_place/page'
import Filters from '@/components/main/Filters'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CITIES, getStateIdx, STATES, StateType } from '@/lib/constants/regions'
import LucideIcon from '@/lib/icons/LucideIcon'

export const isFinishedChoices = ['전체', '계획 중', '계획 완료'] as const
export type IsFinishedChoicesType = (typeof isFinishedChoices)[number]

export const stateChoices = ['전체', ...STATES] as const
export type StateChoicesType = StateType | '전체'

export const cityChoices = CITIES
export type CityChoicesType = ['전체'] | string[][]

export const planArrangeChoices = ['최신순', '좋아요순', '스크랩순', '댓글순'] as const
export const placeArrangeChoices = ['최신순', '평점순', '인용순', '리뷰순'] as const
export type ArrangeChoiceType = (typeof planArrangeChoices)[number] | (typeof placeArrangeChoices)[number]

export const allElements = ['전체']
export const initFilters: FilterType = {
  isFinished: allElements as Array<IsFinishedChoicesType>,
  state: allElements as Array<StateChoicesType>,
  city: allElements as CityChoicesType,
}

export type FilterType = {
  isFinished: Array<IsFinishedChoicesType>
  state: Array<StateChoicesType>
  city: CityChoicesType // 여행지 필터
}

const useFilters = (name: 'Plan' | 'Place') => {
  const [filter, setFilter] = useState<FilterType>(initFilters)
  const [arrange, setArrange] = useState<ArrangeChoiceType>(name === 'Plan' ? '최신순' : '평점순')

  const arrangeChoices = name === 'Plan' ? planArrangeChoices : placeArrangeChoices

  // 데이터처리 함수
  const filterHandler = (
    id: 'isFinished' | 'state' | 'city' | 'all',
    type: 'change' | 'reset',
    filterValues?: FilterType['isFinished' | 'state' | 'city'],
  ) => {
    // 완료 여부
    if (id === 'isFinished') {
      if (type === 'reset') {
        setFilter(prev => ({ ...prev, isFinished: initFilters.isFinished }))
        return
      }
      if (filterValues) setFilter(prev => ({ ...prev, isFinished: filterValues as FilterType['isFinished'] }))
    }
    // 지역
    if (id === 'state') {
      if (type === 'reset') {
        setFilter(prev => ({ ...prev, state: initFilters.state }))
        return
      }
      if (filterValues) setFilter(prev => ({ ...prev, state: filterValues as FilterType['state'] }))
    }
    // 여행지
    if (id === 'city') {
      if (type === 'reset') {
        setFilter(prev => ({ ...prev, city: initFilters.city }))
        return
      }
      if (filterValues) {
        setFilter(prev => ({ ...prev, city: filterValues as FilterType['city'] }))
      }
    }

    // 전체 초기화
    if (id === 'all' && type === 'reset') {
      setFilter(initFilters)
      return
    }
  }

  //Filter Apply Function
  const applyAllFilters = (
    data: Array<DummyPlanType> | Array<DummyPlaceType>,
    filter: FilterType,
    searchInput: string,
    arrange: ArrangeChoiceType,
  ): Array<DummyPlanType> | Array<DummyPlaceType> => {
    // Plan 필터
    if ('isFinished' in data[0]) {
      data = data as Array<DummyPlanType>
      if (filter.isFinished !== allElements && filter.isFinished.length === 1) {
        // #1. 필터 적용하기
        // #1-1. 완료여부
        data = filter.isFinished.includes('계획 중')
          ? data.filter(data => data.isFinished === false)
          : data.filter(data => data.isFinished === true)
      }
      // #1-2. 지역
      if (filter.state !== allElements) {
        data = data.filter(data => filter.state.includes(data.state))
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
    }
    // Place 필터
    else {
      data = data as Array<DummyPlaceType>
      // #1. 지역 필터 적용하기
      if (filter.city !== allElements) {
        data = data.filter(item => {
          const stateIdx = getStateIdx(item.state)
          if (filter.city[stateIdx].includes('전체')) {
            return true
          }
          return filter.city[stateIdx].includes(item.city)
        })
      }
      // #2. 검색
      data = data.filter(data => data.name.includes(searchInput))
      // #3. 정렬하기
      switch (arrange) {
        case '평점순':
          data.sort((a, b) => b.star - a.star)
          break
        case '최신순':
          // Todo: 실제 Date객체를 받아서 해봐야함
          // data.sort((a, b) => b. a.likes)
          break
        case '인용순':
          data.sort((a, b) => b.usedCnt - a.usedCnt)
          break
        case '리뷰순':
          data.sort((a, b) => b.reviewCnt - a.reviewCnt)
          break
      }
    }
    return data
  }

  // 정렬
  const arrangeHandler = (arrange: ArrangeChoiceType) => {
    setArrange(arrange)
  }

  interface UseFilterProps {
    className?: string
    movePageHandler: (pageNumber: number) => void
    hasReset: boolean
  }
  const UseFilter = ({ movePageHandler, hasReset, className }: UseFilterProps) => {
    return (
      <Filters
        filter={filter}
        filterHandler={filterHandler}
        movePageHandler={movePageHandler}
        hasReset={hasReset}
        className={className}
      />
    )
  }

  const UseArrange = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className='flex h-full w-fit items-end justify-between gap-1 md:items-center'>
          <span className='w-fit'>{arrange}</span>
          <LucideIcon name='ChevronDown' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-fit min-w-0 p-0 text-tbGray'>
          {arrangeChoices.map(choice => (
            <DropdownMenuItem
              key={choice}
              className='flex items-center justify-center px-3 py-2 text-xs hover:!bg-tbPrimary hover:font-medium hover:text-black md:text-sm'
              onClick={() => arrangeHandler(choice)}
            >
              {choice}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return { filter, filterHandler, applyAllFilters, arrange, arrangeHandler, UseArrange, UseFilter }
}

export default useFilters
