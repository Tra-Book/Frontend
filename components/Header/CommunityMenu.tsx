'use client'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { Route, ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import ToggleWrapper, { useDropdown } from '@/lib/utils/hooks/useToggle'

interface CommunityMenuProps {
  className?: string
}

interface RouteWithDescription extends Route {
  firstDescription: string
  secondDescription: string
}

const NavSections: Array<RouteWithDescription> = [
  {
    name: '여행계획',
    firstDescription: '다양하고 참신한',
    secondDescription: '여행계획 둘러보기',
    url: ROUTES.COMMUNITY.PLAN.url,
  },
  {
    name: '여행지',
    firstDescription: '숨겨진 보물같은',
    secondDescription: '여행지 찾기',
    url: ROUTES.COMMUNITY.PLACE.url,
  },
  {
    name: '동행',
    firstDescription: '함께 떠날',
    secondDescription: '동반자 모집하기',
    url: ROUTES.COMMUNITY.COMPANION.url,
  },
]

const CommunityMenu = ({ className }: CommunityMenuProps): ReactNode => {
  const { ref, isOpen, toggleDropdown } = useDropdown() // 드롭다운 상태 관리
  return (
    <div className={cn(className, 'relative flex cursor-pointer items-center gap-2')} onClick={toggleDropdown}>
      커뮤니티
      <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} />
      {isOpen && (
        <ToggleWrapper
          isOpen={isOpen}
          ref={ref}
          className='absolute right-[-140%] top-3/4 flex items-center justify-center gap-2 rounded-lg bg-tbSecondaryHover px-2 py-2'
        >
          {NavSections.map(section => (
            <Link
              key={section.name}
              href={section.url}
              className='flex aspect-square min-w-[110px] flex-col items-center justify-center rounded-md bg-white'
            >
              <div className='py-4 text-base font-semibold'>{section.name}</div>
              <div className='text-xs'>{section.firstDescription}</div>
              <div className='py-1 text-xs'>{section.secondDescription}</div>
            </Link>
          ))}
        </ToggleWrapper>
      )}
    </div>
  )
}

export default CommunityMenu
