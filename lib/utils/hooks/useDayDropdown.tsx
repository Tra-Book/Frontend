'use client'

import { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useDropdownStore from '@/lib/context/dropdownStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { ColorType } from '@/public/colors/colors'

import { cn } from '../cn'
export interface DayDropdownProps {
  color?: ColorType
  isReduced: boolean
  handleDayChange: (day: number) => void
  className?: string
}

const useDayDropdown = (totalDays: number) => {
  // const [day, setDay] = useState<number>(1)
  const { day, setDay } = useDropdownStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Dropdown UI
  const DayDropdown = ({ color = 'tbPrimary', isReduced, handleDayChange, className }: DayDropdownProps) => {
    const dropdownItemHandler = (day: number) => {
      handleDayChange(day)
      setDay(day)
    }

    // style
    let [bgStyle, bgStyleHover]: Array<string> = ['bg-tbPrimary', 'hover:bg-tbPrimaryHover']
    if (color === 'tbGreen') [bgStyle, bgStyleHover] = ['bg-tbGreen', 'hover:bg-tbGreenHover']

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          className={cn(
            'relative flex cursor-pointer items-center justify-center gap-2 rounded-md text-base font-semibold',
            bgStyle,
            bgStyleHover,
            className,
          )}
        >
          <p>{`${day}일차`}</p>
          {!isReduced && <p className='text-xs text-tbGray'>12/29(수)</p>}
          <LucideIcon name='ChevronDown' size={26} className='absolute right-2' />
        </DropdownMenuTrigger>
        {/* 드롭다운 */}

        <DropdownMenuContent
          style={{
            minWidth: 'var(--radix-dropdown-menu-trigger-width)',
            maxHeight: 'calc(4*var(--radix-dropdown-menu-trigger-height))',
          }}
          className='relative max-h-[20px] overflow-y-auto shadow-tb-shadow'
        >
          {Array.from({ length: totalDays }, (_, index) => index + 1).map(dayOpt => (
            <DropdownMenuItem
              key={dayOpt}
              onClick={() => dropdownItemHandler(dayOpt)}
              className={cn('mb-1 flex w-full items-center justify-center', bgStyleHover, dayOpt === day && bgStyle)}
            >
              <p>{`${dayOpt}일차`}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return { day, DayDropdown }
}

export default useDayDropdown
