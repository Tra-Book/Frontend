'use client'

import { addDays } from 'date-fns'
import { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useDropdownStore from '@/lib/context/dropdownStore'
import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { ColorType } from '@/public/colors/colors'

import { cn } from '../cn'
import { formatToKoreanShortDate } from '../dateUtils'
export interface DayDropdownProps {
  id: 'days' | 'showAll'
  startDate: Date
  handleDayChange: (day: number) => void

  color?: ColorType
  className?: string
}

const useDayDropdown = (totalDays: number) => {
  // const [day, setDay] = useState<number>(1)
  const { day, setDay } = useDropdownStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Dropdown UI
  const DayDropdown = ({ id, startDate, handleDayChange, color = 'tbPrimary', className }: DayDropdownProps) => {
    const { isReduced } = usePlanStore()

    const selectedDate = formatToKoreanShortDate(addDays(startDate, day - 1))

    const dropdownItemHandler = (day: number) => {
      handleDayChange(day)
      setDay(day)
    }

    // style
    let [bgStyle, bgStyleHover]: Array<string> = ['bg-tbPrimary', 'hover:bg-tbPrimaryHover']
    if (color === 'tbGreen') [bgStyle, bgStyleHover] = ['bg-tbGreen', 'hover:bg-tbGreenHover']

    const getDropdownItemStyle = (dayOpt: number) => {
      return cn('mb-1 flex w-full items-center justify-center', bgStyleHover, day === dayOpt && bgStyle)
    }
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
          <p>{id === 'showAll' && day === 0 ? '전체 일정' : `${day}일차`}</p>
          {!isReduced && <p className='flex items-center text-xs text-tbGray'>{selectedDate}</p>}
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
          {id === 'showAll' && (
            <DropdownMenuItem onClick={() => dropdownItemHandler(0)} className={getDropdownItemStyle(0)}>
              전체 일정
            </DropdownMenuItem>
          )}
          {Array.from({ length: totalDays }, (_, index) => index + 1).map(dayOpt => (
            <DropdownMenuItem
              key={dayOpt}
              onClick={() => dropdownItemHandler(dayOpt)}
              className={getDropdownItemStyle(dayOpt)}
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
