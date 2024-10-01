'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ClientModalData } from '@/lib/constants/errors'
import { NO_USER_DESCRIPTION, NO_USER_NAME } from '@/lib/constants/no_data'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import useModal from '@/lib/utils/hooks/useModal'

interface SideBarProps {}

const MainSideBar = ({}: SideBarProps): ReactNode => {
  const { handleModalStates, Modal } = useModal()
  const session: any = useSession()
  const router = useRouter()

  const onClickLogOut = () => {
    handleModalStates(ClientModalData.logOutSuccess, 'open')
  }

  const pathname = usePathname()

  return (
    // md부터 보임
    <div className='relative hidden h-auto min-h-screen-header min-w-[210px] flex-col items-center justify-start md:flex'>
      {/* 프로필 */}
      <div className='flex w-full flex-col items-center justify-start border-b border-solid border-tbGray py-7'>
        <Image
          alt='프로필 이미지'
          src={session.data?.image || USER_DEFAULT_IMAGE}
          className='aspect-square w-2/5 rounded-full'
          width={80}
          height={80}
        />
        <div className='py-3 text-lg font-semibold'>{session.data?.nickname || NO_USER_NAME}</div>
        <div className='text-pretty text-center text-sm font-medium'>
          {session.data?.status_message || NO_USER_DESCRIPTION}
        </div>
      </div>

      <div className='grid grid-cols-[40px_1fr] grid-rows-[20px_repeat(2,_minmax(80px,_auto))] items-start gap-x-2 gap-y-8 py-10 text-xl font-medium 2xl:text-2xl'>
        {/* First Row - "내 계획" */}
        <div className='flex items-center justify-center'>
          <LucideIcon name='Plane' size={26} strokeWidth={1.5} />
        </div>
        <Link href={ROUTES.MAIN.MY_PLAN.url} className='flex items-center gap-4'>
          <span className={cn('hover:text-tbRed', pathname === '/main' && 'font-semibold text-tbRed')}>내 계획</span>
        </Link>

        {/* Second Row - "보관함" */}
        <div className='flex items-center justify-center'>
          <LucideIcon name='Bookmark' size={26} strokeWidth={1.5} />
        </div>
        <div className='flex flex-col items-start justify-start gap-2'>
          <Link href={ROUTES.MAIN.STORE_PLAN.url} className='text-xl'>
            보관함
          </Link>
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

        {/* Third Row - "내 정보" */}
        <div className='flex items-center justify-center'>
          <LucideIcon name='Settings' size={26} strokeWidth={1.5} />
        </div>
        <div className='flex flex-col items-start justify-start gap-2'>
          <Link href={ROUTES.MAIN.INFO.url} className='text-xl'>
            내 정보
          </Link>
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
          <div onClick={onClickLogOut} className={cn('text-base hover:cursor-pointer hover:text-tbRed 2xl:text-lg')}>
            로그아웃
          </div>
        </div>
      </div>
      <Modal
        onConfirm={async () => {
          await signOut()
          router.push('/')
        }}
      />
    </div>
  )
}

export default MainSideBar
