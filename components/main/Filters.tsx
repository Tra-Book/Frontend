'use client'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

import { STATES } from '@/lib/constants/regions'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { ReadOnly } from '@/lib/utils/typeUtils'

import { FilterType, isFinishedChoices, IsFinishedChoicesType, stateChoices, StateChoicesType } from './Contents'
import Filter from './Filter'

interface FiltersProps {
  filter: FilterType
  handleFilters: (
    id: 'isFinished' | 'state' | 'city' | 'all',
    type: 'change' | 'reset',
    filterValues?: FilterType['isFinished' | 'state' | 'city'],
    selectedState?: string,
  ) => void
}

export interface FilterDisplayType {
  id: 'isFinished' | 'state' | 'city'
  filter: FilterType['isFinished' | 'state' | 'city']
  placeHolder: string // 처음에 보여줄 값
  choices: ReadOnly<Array<IsFinishedChoicesType>> | ReadOnly<Array<StateChoicesType>>
}

// 역할: UI 보여주고, onClick 핸들링
const Filters = ({ filter, handleFilters }: FiltersProps): ReactNode => {
  const pathname = usePathname()
  /**
   * URL에 따른 필터 버튼
   */
  const makeFilterButton = (id: 'isFinished' | 'state' | 'city'): FilterDisplayType | undefined => {
    if (id === 'isFinished') {
      return {
        id: 'isFinished',
        filter: filter.isFinished,
        placeHolder: filter.isFinished.includes('전체')
          ? '완료 여부'
          : filter.isFinished.length === 1
            ? filter.isFinished[0]
            : `${filter.isFinished[0]} 외 1`,
        choices: isFinishedChoices,
      }
    }
    //
    else if (id === 'state') {
      return {
        id: 'state',
        filter: filter.state,
        placeHolder: filter.state.includes('전체')
          ? '지역'
          : filter.state.length === 1
            ? filter.state[0]
            : `${filter.state[0]} 외 ${filter.state.length - 1}`,
        choices: stateChoices,
      }
    } else if (id === 'city') {
      // "city" 필터의 경우

      if (filter.city.length === 1) {
        return {
          id: 'city',
          filter: filter.city,
          placeHolder: '지역',
          choices: stateChoices,
        }
      }
      filter.city = filter.city as string[][]
      // 모든 state에서 선택된 도시의 총 개수 계산
      let totalSelectedCount = 0
      let [firstSelectedCity, firstSelectedState] = ['', '']

      // 각 state별로 "전체"를 제외한 선택된 도시 수를 계산
      filter.city.forEach((stateCities, index) => {
        const selectedCities = stateCities.filter(city => city !== '전체')
        totalSelectedCount += selectedCities.length

        // 첫 번째 선택된 도시를 저장
        if (firstSelectedCity === '' && selectedCities.length > 0) {
          firstSelectedCity = selectedCities[0]
          firstSelectedState = STATES[index]
        }
      })

      // 첫 번째 선택된 도시가 있는 경우에만 placeHolder 생성
      const placeHolder = firstSelectedCity
        ? `${firstSelectedState} ${firstSelectedCity} 외 ${totalSelectedCount - 1}개`
        : '지역'

      return {
        id: 'city',
        filter: filter.city,
        placeHolder: placeHolder,
        choices: stateChoices,
      }
    }
    return undefined
  }
  let FILTER_BUTTONS: Array<FilterDisplayType> = []

  if (pathname === ROUTES.MAIN.MY_PLAN.url) {
    FILTER_BUTTONS = [makeFilterButton('isFinished'), makeFilterButton('state')] as Array<FilterDisplayType>
  } else if (pathname === ROUTES.MAIN.STORE_PLAN.url) {
    FILTER_BUTTONS = [makeFilterButton('state')] as Array<FilterDisplayType>
  } else if (pathname === ROUTES.MAIN.STORE_PLACE.url) {
    FILTER_BUTTONS = [makeFilterButton('city')] as Array<FilterDisplayType>
  }

  return (
    <div className='flex h-[8dvh] min-h-[30px] w-full items-center justify-start gap-4 pl-1 text-xs font-medium md:text-sm'>
      <LucideIcon name='SlidersHorizontal' size={24} />
      {FILTER_BUTTONS.map(FILTER_BUTTON => (
        <Filter
          key={FILTER_BUTTON.placeHolder}
          id={FILTER_BUTTON.id}
          filter={FILTER_BUTTON.filter}
          placeHolder={FILTER_BUTTON.placeHolder}
          choices={FILTER_BUTTON.choices}
          handleFilters={handleFilters}
        />
      ))}
      <div
        onClick={() => handleFilters('all', 'reset')}
        className='flex cursor-pointer items-center gap-2 text-tbGray hover:text-tbRed'
      >
        <LucideIcon name='RotateCw' size={20} />
        <p>초기화</p>
      </div>
    </div>
  )
}

export default Filters