'use client'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Route, ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import ToggleWrapper, { useDropdown } from '@/lib/utils/useToggle'

import { Divider } from '../common/Dividers'

interface MobileMenuProps {
  className?: string
}

type NavSection = {
  title?: string
  sections: Array<Route>
}

// Section 상수들
const HOME_SECTION: NavSection = {
  sections: [
    { name: '홈', url: ROUTES.AUTH.LOGIN.url },
    { name: '내 여행', url: ROUTES.HOME.url },
  ],
}
const STORE_SECTION: NavSection = {
  title: '보관함',
  sections: [
    { name: '여행 계획', url: ROUTES.MAIN.STORE_PLAN.url },
    { name: '여행지', url: ROUTES.MAIN.STORE_PLACE.url },
  ],
}

const COMMUNITY_SECTION: NavSection = {
  title: '커뮤니티',
  sections: [
    { name: '여행 계획', url: ROUTES.COMMUNITY.PLAN.url },
    { name: '여행지', url: ROUTES.COMMUNITY.PLACE.url },
    { name: '동행 모집', url: ROUTES.COMMUNITY.COMPANION.url },
  ],
}
const MY_SECTION: NavSection = {
  title: 'MY',
  sections: [{ name: '내 정보', url: ROUTES.MAIN.INFO.url }],
}

const MobileMenu = ({ className }: MobileMenuProps): ReactNode => {
  const { ref, isOpen, toggleDropdown } = useDropdown() // 드롭다운 상태 관리

  /**
   * 각 Session 상수에 대한 Link를 렌더링합니다
   */
  const renderNavLinks = (SECTION: NavSection) => {
    return (
      <ul className='w-full p-4'>
        {SECTION.title && <li className='mb-1 text-sm text-tbGray'>{SECTION.title}</li>}
        {SECTION.sections.map((section, index) => (
          <li key={index}>
            <Link href={section.url} onClick={toggleDropdown} className='flex h-8 items-center justify-between'>
              <span>{section.name}</span>
              <LucideIcon name='ChevronRight' />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <LucideIcon
        name='Menu'
        size={40}
        onClick={toggleDropdown}
        className={cn(className, 'rounded-md bg-white focus:bg-tbPlaceHolderHover')}
      />
      <ToggleWrapper
        ref={ref}
        isOpen={isOpen}
        className='right-6 top-3/4 flex w-1/3 min-w-[250px] max-w-[300px] flex-grow flex-col items-center justify-start rounded-md bg-white font-medium shadow-tb-shadow'
      >
        <LucideIcon name='X' className='mr-4 mt-4 self-end' size={20} onClick={toggleDropdown} />
        {/* Todo: 로그인 상태에 따라 로그인하기 or 여행 계획하기 표시하기 */}
        <Link href={ROUTES.AUTH.LOGIN.url} className='mx-2 w-full p-4'>
          <Button variant='tbPrimary' className='w-full'>
            로그인하기
          </Button>
        </Link>
        {/* <Link href={ROUTES.PLAN.url}>여행 계획하기</Link> */}
        {renderNavLinks(HOME_SECTION)}
        <Divider />
        {renderNavLinks(STORE_SECTION)}
        <Divider />

        {renderNavLinks(COMMUNITY_SECTION)}
        <Divider />
        {renderNavLinks(MY_SECTION)}
      </ToggleWrapper>
    </>
  )
}

export default MobileMenu
