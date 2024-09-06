'use client'
import React, { ReactNode, useState } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { ReadOnly } from '@/lib/utils/typeUtils'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { IsFinishedChoicesType, RegionChoicesType } from './Contents'

interface FilterProps {
  spec: 'isFinished' | 'region'
  placeHolder: string // 처음에 보여줄 값
  choices: ReadOnly<Array<IsFinishedChoicesType>> | ReadOnly<Array<RegionChoicesType>>
  handleFilters: (
    spec: 'isFinished' | 'region' | 'all',
    type: 'change' | 'reset',
    filterValues?: Array<IsFinishedChoicesType> | Array<RegionChoicesType>,
  ) => void
}

const Filter = ({ spec, placeHolder, choices, handleFilters }: FilterProps): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false) // 드롭다운 열림 상태 관리

  const [checkedFilters, setCheckedFilters] = useState<Array<IsFinishedChoicesType> | Array<RegionChoicesType>>([])

  const handleCheckBox = (choice: IsFinishedChoicesType | RegionChoicesType) => {
    if (!checkedFilters.includes(choice as any)) {
      setCheckedFilters(prev => [...prev, choice] as IsFinishedChoicesType[] | RegionChoicesType[])
    }
  }
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className='relative flex h-3/4 max-h-8 items-center justify-between gap-1 rounded-2xl border-[0.5px] border-solid border-black px-2'>
        <span>{placeHolder}</span>
        <LucideIcon name='ChevronDown' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='min-h max-h-36 overflow-y-auto'>
          {choices.map(choice => (
            <div
              key={choice}
              className='relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-tbPlaceHolderHover focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 md:text-sm'
            >
              <Checkbox
                id={choice}
                className='border-tbGray data-[state=checked]:bg-white data-[state=checked]:text-tbPrimary'
                onClick={() => handleCheckBox(choice)}
              />
              <label htmlFor={choice} className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                {choice}
              </label>
            </div>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className='relative flex items-center justify-end gap-4 p-2'>
          <Button
            variant='tbGray'
            className='w-1/2'
            onClick={() => {
              handleFilters(spec, 'reset')
              setIsOpen(false)
            }}
          >
            초기화
          </Button>
          <Button
            variant='tbPrimary'
            className='w-1/2'
            onClick={() => {
              handleFilters(spec, 'change', checkedFilters)
              setIsOpen(false)
            }}
          >
            적용
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filter
