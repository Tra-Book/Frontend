'use client'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { ReadOnly } from '@/lib/utils/typeUtils'

import { isFinishedChoices, IsFinishedChoicesType, PlanFilterType, stateChoices, StateChoicesType } from './Contents'
import Filter from './Filter'

// export type PlaceFilterType = {

// }

interface FiltersProps {
  filter: PlanFilterType // Or PlaceFilterType
  handleFilters: (
    id: 'isFinished' | 'state' | 'all',
    type: 'change' | 'reset',
    filterValues?: Array<IsFinishedChoicesType> | Array<StateChoicesType>,
  ) => void
}

export interface FilterDisplayType {
  id: 'isFinished' | 'state'
  filter: Array<IsFinishedChoicesType> | Array<StateChoicesType>
  placeHolder: string // 처음에 보여줄 값
  choices: ReadOnly<Array<IsFinishedChoicesType>> | ReadOnly<Array<StateChoicesType>>
}

// 역할: UI 보여주고, onClick 핸들링
const Filters = ({ filter, handleFilters }: FiltersProps): ReactNode => {
  const pathname = usePathname()
  /**
   * URL에 따른 필터 버튼
   */
  const makeFilterButton = (id: 'isFinished' | 'state'): FilterDisplayType | undefined => {
    if (id === 'isFinished') {
      return {
        id: 'isFinished',
        filter: filter.isFinished,
        placeHolder: filter.isFinished.includes('전체') ? '완료 여부' : filter.isFinished[0],
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
    }
    return undefined
  }
  let FILTER_BUTTONS: Array<FilterDisplayType> = []

  if (pathname === ROUTES.MAIN.MY_PLAN.url) {
    FILTER_BUTTONS = [makeFilterButton('isFinished'), makeFilterButton('state')] as Array<FilterDisplayType>
  }
  if (pathname === ROUTES.MAIN.STORE_PLAN.url) {
    FILTER_BUTTONS = [makeFilterButton('state')] as Array<FilterDisplayType>
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
