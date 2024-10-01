'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ClientModalData } from '@/lib/constants/errors'
import { Route, ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import useModal from '@/lib/utils/hooks/useModal'
import ToggleWrapper, { useDropdown } from '@/lib/utils/hooks/useToggle'
import { Nullable } from '@/lib/utils/typeUtils'

import { Divider } from '../common/Dividers'

interface MobileMenuProps {
  session: Nullable<Session>
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

const MY_SECTION_SOCIAL: NavSection = {
  title: 'MY',
  sections: [{ name: '프로필 변경', url: ROUTES.MAIN.INFO.url }],
}

const MY_SECTION_CREDENTIALS: NavSection = {
  title: 'MY',
  sections: [
    { name: '프로필 변경', url: ROUTES.MAIN.INFO.url },
    { name: '비밀번호 변경', url: ROUTES.MAIN.CHANGE_PASSWORD.url },
  ],
}

const MobileMenu = ({ session, className }: MobileMenuProps): ReactNode => {
  const { modalData, handleModalStates, Modal } = useModal()
  const { ref, isOpen, toggleDropdown } = useDropdown() // 드롭다운 상태 관리
  const s: any = session
  const router = useRouter()

  const onClickLogOut = () => {
    toggleDropdown()
    handleModalStates(ClientModalData.logOutSuccess, 'open')
  }

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

        <Link href={!session ? ROUTES.AUTH.LOGIN.url : ROUTES.PLAN.INDEX.url} className='mx-2 w-full p-4'>
          <Button variant='tbPrimary' className='w-full'>
            {!session ? '로그인하기' : '여행 계획하기'}
          </Button>
        </Link>
        {renderNavLinks(HOME_SECTION)}
        <Divider />
        {renderNavLinks(STORE_SECTION)}
        <Divider />

        {renderNavLinks(COMMUNITY_SECTION)}
        <Divider />
        {s?.provider === 'credentials' ? renderNavLinks(MY_SECTION_CREDENTIALS) : renderNavLinks(MY_SECTION_SOCIAL)}
        {s && (
          <>
            <Divider />
            <div className='w-full p-4 hover:cursor-pointer' onClick={onClickLogOut}>
              <div className='flex h-8 items-center justify-between'>
                <span>로그아웃</span>

                <LucideIcon name='ChevronRight' />
              </div>
            </div>
          </>
        )}
      </ToggleWrapper>
      <Modal
        onConfirm={async () => {
          await signOut()
          router.push('/')
        }}
      />
    </>
  )
}

export default MobileMenu
