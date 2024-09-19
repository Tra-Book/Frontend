'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

interface PlanSideBarProps {
  className?: string
}

const style = 'flex flex-col h-1/6 max-h-[100px] w-full items-center justify-center text-l font-semibold gap-2'
const iconSize: number = 24

const PlanSideBar = ({ className }: PlanSideBarProps): ReactNode => {
  const pathname = usePathname()

  return (
    <div className={className}>
      <Link href={ROUTES.HOME.url} className={cn(style, 'font- text-center font-mono text-xl font-bold')}>
        TRABOOK
      </Link>

      <Link
        href={ROUTES.PLAN.PlAN.url}
        className={cn(
          style,
          (pathname === ROUTES.PLAN.PlAN.url || pathname === ROUTES.PLAN.INDEX.url) && 'bg-tbPrimary',
        )}
      >
        <LucideIcon name='Plane' size={iconSize} />
        <div>기본 정보</div>
      </Link>

      <Link
        href={ROUTES.PLAN.SCHEDULE.url}
        className={cn(style, pathname.includes(ROUTES.PLAN.SCHEDULE.url) && 'bg-tbPrimary')}
      >
        <LucideIcon name='Calendar' size={iconSize} />
        <div>여행 일정</div>
      </Link>

      <div className='grow'>
        <Link
          href={ROUTES.PLAN.STORE.url}
          className={cn(style, pathname.includes(ROUTES.PLAN.STORE.url) && 'bg-tbPrimary', 'h-full max-h-[100px]')}
        >
          <LucideIcon name='Bookmark' size={iconSize} />
          <div>보관함</div>
        </Link>
      </div>

      <div className={cn(style)}>
        <LucideIcon name='Save' size={iconSize} />
        저장
      </div>
      <div className={cn(style)}>
        <LucideIcon name='Settings' size={iconSize} />
        설정
      </div>
    </div>
  )
}

export default PlanSideBar
