'use client'

import { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import LucideIcon from '@/lib/icons/LucideIcon'

import { cn } from '../cn'
interface DayDropdownProps {
  isReduced: boolean
  className?: string
}

const useDayDropdown = (totalDays: number) => {
  const [day, setDay] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Dropdown UI
  const DayDropdown = ({ isReduced, className }: DayDropdownProps) => {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          className={cn(
            'relative flex cursor-pointer items-center justify-center gap-2 rounded-md bg-tbPrimary text-base font-semibold hover:bg-tbPrimaryHover',
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
              onClick={() => setDay(dayOpt)}
              className={cn(
                'mb-1 flex w-full items-center justify-center hover:bg-tbPrimary',
                dayOpt === day && 'bg-tbPrimary hover:bg-tbPrimaryHover',
              )}
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
