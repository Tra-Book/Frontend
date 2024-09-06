'use client'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { ReadOnly } from '@/lib/utils/typeUtils'

import { isFinishedChoices, IsFinishedChoicesType, PlanFilterType, regionChoices, RegionChoicesType } from './Contents'
import Filter from './Filter'

// export type PlaceFilterType = {

// }

interface FiltersProps {
  filter: PlanFilterType // Or PlaceFilterType
  handleFilters: (
    id: 'isFinished' | 'region' | 'all',
    type: 'change' | 'reset',
    filterValues?: Array<IsFinishedChoicesType> | Array<RegionChoicesType>,
  ) => void
}

export interface FilterDisplayType {
  id: 'isFinished' | 'region'
  filter: Array<IsFinishedChoicesType> | Array<RegionChoicesType>
  placeHolder: string // 처음에 보여줄 값
  choices: ReadOnly<Array<IsFinishedChoicesType>> | ReadOnly<Array<RegionChoicesType>>
}

// 역할: UI 보여주고, onClick 핸들링
const Filters = ({ filter, handleFilters }: FiltersProps): ReactNode => {
  const pathname = usePathname()
  /**
   * URL에 따른 필터 버튼
   */
  let FILTER_BUTTONS: Array<FilterDisplayType> = []
  if (pathname === ROUTES.MAIN.MY_PLAN.url) {
    FILTER_BUTTONS = [
      {
        id: 'isFinished',
        filter: filter.isFinished,
        placeHolder: filter.isFinished.includes('전체') ? '완료 여부' : '바뀐 값',
        choices: isFinishedChoices,
      },
      {
        id: 'region',
        filter: filter.region,
        placeHolder: '지역',
        choices: regionChoices,
      },
    ]
  }
  if (pathname === ROUTES.MAIN.STORE_PLAN.url) {
    FILTER_BUTTONS = [
      {
        id: 'region',
        filter: filter.region,
        placeHolder: '지역',
        choices: regionChoices,
      },
    ]
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
