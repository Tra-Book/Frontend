'use client'
import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { ReadOnly } from '@/lib/utils/typeUtils'

import { isFinishedChoices, IsFinishedChoicesType, PlanFilterType, regionChoices, RegionChoicesType } from './Contents'
import Filter from './Filter'

// export type PlaceFilterType = {

// }

interface FiltersProps {
  filter: PlanFilterType // Or PlaceFilterType
  handleFilters: (
    spec: 'isFinished' | 'region' | 'all',
    type: 'change' | 'reset',
    filterValues?: Array<IsFinishedChoicesType> | Array<RegionChoicesType>,
  ) => void
}

export interface FilterDisplayType {
  spec: 'isFinished' | 'region'
  placeHolder: string // 처음에 보여줄 값
  choices: ReadOnly<Array<IsFinishedChoicesType>> | ReadOnly<Array<RegionChoicesType>>
}

// 역할: UI 보여주고, onClick 핸들링
const Filters = ({ filter, handleFilters }: FiltersProps): ReactNode => {
  const FILTER_VALUES: Array<FilterDisplayType> = [
    {
      spec: 'isFinished',
      placeHolder: filter.isFinished.includes('전체') ? '완료 여부' : '바뀐 값',
      choices: isFinishedChoices,
    },
    {
      spec: 'region',
      placeHolder: '지역',
      choices: regionChoices,
    },
  ]
  return (
    <div className='flex h-[8dvh] min-h-[30px] w-full items-center justify-start gap-4 pl-1 text-xs font-medium md:text-sm'>
      <LucideIcon name='SlidersHorizontal' size={24} />
      {FILTER_VALUES.map(FILTER => (
        <Filter
          key={FILTER.placeHolder}
          spec={FILTER.spec}
          placeHolder={FILTER.placeHolder}
          choices={FILTER.choices}
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
