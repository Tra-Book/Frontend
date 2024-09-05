import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { planRegions } from '@/lib/types/Entity/plan'
import { Nullable } from '@/lib/utils/typeUtils'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { FilterType } from './Contents'

interface FilterProps {
  value: Nullable<any> // 초기 filter값
  placeHolder: string // 처음에 보여줄 값
  choices: Readonly<Array<string>>
}

const Filter = ({ value, placeHolder, choices }: FilterProps): ReactNode => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='filter'>
          {placeHolder} <LucideIcon name='ChevronDown' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='min-h max-h-36 overflow-y-auto'>
          {choices.map(choice => (
            <div
              key={choice}
              className='relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-tbPlaceHolderHover focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
            >
              <Checkbox
                id={choice}
                className='border-tbGray data-[state=checked]:bg-white data-[state=checked]:text-tbPrimary'
              />
              <label htmlFor={choice} className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                {choice}
              </label>
            </div>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className='relative flex items-center justify-end gap-4 p-2'>
          <Button variant='tbGray' className='w-1/2'>
            초기화
          </Button>
          <Button variant='tbPrimary' className='w-1/2'>
            적용
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface FiltersProps {
  filter: FilterType
}

const Filters = ({ filter }: FiltersProps): ReactNode => {
  const FILTER_VALUES: Array<FilterProps> = [
    // 완료 여부
    {
      value: filter.isFinished,
      placeHolder: '완료 여부',
      choices: ['전체', '계획 중', '계획 완료'],
    },
    // 지역
    {
      value: filter.region,
      placeHolder: '지역',
      choices: planRegions,
    },
  ]
  return (
    <div className='flex h-[9dvh] min-h-[60px] w-full items-center justify-start gap-4 font-medium'>
      <LucideIcon name='SlidersHorizontal' size={26} />
      {FILTER_VALUES.map(FILTER => (
        <Filter
          key={FILTER.placeHolder}
          value={FILTER.value}
          placeHolder={FILTER.placeHolder}
          choices={FILTER.choices}
        />
      ))}
    </div>
  )
}

export default Filters
