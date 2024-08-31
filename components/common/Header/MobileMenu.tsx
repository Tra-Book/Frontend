'use client'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

import { Divider } from '../Dividers'

interface MobileMenuProps {
  className?: string
}

const MobileMenu = ({ className }: MobileMenuProps): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  //Functions
  const toggleMenu = () => setIsOpen(prev => !prev)
  return (
    <>
      <LucideIcon
        name='Menu'
        size={40}
        onClick={toggleMenu}
        className={cn(className, 'rounded-md bg-white focus:bg-tbPlaceHolderHover')}
      />
      {isOpen && (
        <div className='absolute right-6 top-3/4 z-10 flex w-1/3 max-w-[300px] flex-grow flex-col items-center justify-start rounded-md bg-white font-medium shadow-tb-shadow'>
          <LucideIcon name='X' className='mr-4 mt-4 self-end' size={20} onClick={toggleMenu} />
          {/* Todo: 로그인 상태에 따라 로그인하기 or 여행 계획하기 표시하기 */}
          <Link href={ROUTES.AUTH.LOGIN.url} className='p-4'>
            로그인하기
          </Link>
          {/* <Link href={ROUTES.PLAN.url}>여행 계획하기</Link> */}
          <Divider />

          <ul className='w-full p-4'>
            <li>
              <Link href={ROUTES.HOME.url} className='flex h-8 items-center justify-between'>
                <span>홈</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
            <li>
              <Link href={ROUTES.MAIN.MYPLAN.url} className='flex h-8 items-center justify-between'>
                <span>내 여행</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
          </ul>
          <Divider />
          <ul className='w-full p-4'>
            <li className='mb-1 text-sm text-tbGray'>보관함</li>
            <li>
              <Link href={ROUTES.MAIN.STORE_PLAN.url} className='flex h-8 items-center justify-between'>
                <span>여행 계획</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
            <li>
              <Link href={ROUTES.MAIN.STORE_PLACE.url} className='flex h-8 items-center justify-between'>
                <span>여행지</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
          </ul>
          <Divider />

          <ul className='w-full p-4'>
            <li className='mb-1 text-sm text-tbGray'>커뮤니티</li>
            <li>
              <Link href={ROUTES.COMMUNITY.PLAN.url} className='flex h-8 items-center justify-between'>
                <span>여행 계획</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
            <li>
              <Link href={ROUTES.COMMUNITY.PLAN.url} className='flex h-8 items-center justify-between'>
                <span>여행지</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
            <li>
              <Link href={ROUTES.COMMUNITY.COMPANION.url} className='flex h-8 items-center justify-between'>
                <span>동행 모집</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
          </ul>
          <Divider />
          <ul className='w-full p-4'>
            <li className='mb-1 text-sm text-tbGray'>MY</li>
            <li>
              <Link href={ROUTES.MAIN.INFO.url} className='flex h-8 items-center justify-between'>
                <span>내 정보</span>
                <LucideIcon name='ChevronRight' />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default MobileMenu
