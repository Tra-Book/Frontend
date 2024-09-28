'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

interface SideBarProps {}

const MainSideBar = ({}: SideBarProps): ReactNode => {
  const session: any = useSession()

  const pathname = usePathname()

  return (
    // md부터 보임
    <div className='relative hidden h-auto min-h-screen-header w-1/6 min-w-[140px] max-w-[200px] flex-col items-center justify-start md:flex'>
      {/* 프로필 */}
      <div className='flex w-full flex-col items-center justify-start border-b border-solid border-tbGray py-7'>
        <Image
          alt='프로필 이미지'
          src={session.data?.image || USER_DEFAULT_IMAGE}
          className='aspect-square w-2/5 rounded-full'
          width={80}
          height={80}
        />
        <div className='py-3 text-lg font-semibold'>{session.data?.nickname}</div>
        <div className='text-pretty text-center text-sm font-medium'>{session.data?.status_message}</div>
      </div>
      {/* 링크 */}
      <div className='flex w-3/4 flex-col items-start justify-start gap-8 py-10 text-xl font-medium 2xl:text-2xl'>
        <Link href={ROUTES.MAIN.MY_PLAN.url} className='flex items-center justify-center gap-4'>
          <LucideIcon name='Plane' size={26} strokeWidth={1.5} />
          <span className={cn('hover:text-tbRed', pathname === '/main' && 'font-semibold text-tbRed')}>내 계획</span>
        </Link>

        <div className='flex w-full items-start justify-start gap-4'>
          <LucideIcon name='Bookmark' size={26} strokeWidth={1.5} />
          <div className='flex flex-col items-start justify-start gap-2'>
            <Link href={ROUTES.MAIN.STORE_PLAN.url}>보관함</Link>
            <Link
              href={ROUTES.MAIN.STORE_PLAN.url}
              className={cn(
                'text-base hover:text-tbRed 2xl:text-lg',
                pathname.includes('store_plan') && 'font-semibold text-tbRed',
              )}
            >
              여행 계획
            </Link>
            <Link
              href={ROUTES.MAIN.STORE_PLACE.url}
              className={cn(
                'text-base hover:text-tbRed 2xl:text-lg',
                pathname.includes('store_place') && 'font-semibold text-tbRed',
              )}
            >
              여행지
            </Link>
          </div>
        </div>

        <div className='flex w-full items-start justify-start gap-4'>
          <LucideIcon name='Settings' size={26} strokeWidth={1.5} />
          <div className='flex flex-col items-start justify-start gap-2'>
            <Link href={ROUTES.MAIN.INFO.url}>내 정보</Link>
            <Link
              href={ROUTES.MAIN.INFO.url}
              className={cn(
                'text-base hover:text-tbRed 2xl:text-lg',
                pathname.includes('info') && 'font-semibold text-tbRed',
              )}
            >
              프로필 수정
            </Link>
            {session.data?.provider === 'credentials' && (
              <Link
                href={ROUTES.MAIN.CHANGE_PASSWORD.url}
                className={cn(
                  'text-base hover:text-tbRed 2xl:text-lg',
                  pathname.includes('password') && 'font-semibold text-tbRed',
                )}
              >
                비밀번호 변경
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSideBar
