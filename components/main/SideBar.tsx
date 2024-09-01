import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import ProfileImage from '@/public/dummy/dummy_profile_image.png'

interface SideBarProps {}

// Dummy Data
// Todo: 로그인 성공 후 실제 데이터로 교체 (Frontend Entity Type 교체)
const dummy_user = {
  name: '힐링여행',
  imageSrc: ProfileImage,
  statusMessage: '좋은 사람과 가는 좋은 여행',
}

const SideBar = ({}: SideBarProps): ReactNode => {
  return (
    <div className='h-screen-header relative flex w-1/6 max-w-[200px] flex-col items-center justify-start bg-tbSecondary'>
      {/* 프로필 */}
      <div className='flex w-full flex-col items-center justify-start border-b border-solid border-tbGray py-7'>
        <Image alt='프로필 이미지' src={dummy_user.imageSrc} className='aspect-square w-2/5 rounded-full' />
        <div className='py-3 text-lg font-semibold'>{dummy_user.name}</div>
        <div className='text-sm font-medium'>{dummy_user.statusMessage}</div>
      </div>
      {/* 링크 */}
      <div className='flex w-full flex-col items-center justify-start gap-8 py-10'>
        <Link href={ROUTES.MAIN.MY_PLAN.url} className='flex items-center justify-center gap-4'>
          <LucideIcon name='Plane' size={30} strokeWidth={1.5} />
          <span className='text-xl font-medium hover:text-tbRed'>내 계획</span>
        </Link>
        <div className='flex w-full items-start justify-center gap-4'>
          <LucideIcon name='Bookmark' size={30} strokeWidth={1.5} />
          <div className='flex flex-col items-start justify-start gap-2 text-xl font-medium'>
            <Link href={ROUTES.MAIN.STORE_PLAN.url} className='hover:text-tbRed'>
              보관함
            </Link>
            <Link href={ROUTES.MAIN.STORE_PLAN.url} className='text-base hover:text-tbRed'>
              여행 계획
            </Link>
            <Link href={ROUTES.MAIN.STORE_PLACE.url} className='text-base hover:text-tbRed'>
              여행지
            </Link>
          </div>
        </div>
        <Link href={ROUTES.MAIN.STORE_PLACE.url} className='flex items-center justify-center gap-4'>
          <LucideIcon name='Settings' size={30} strokeWidth={1.5} />
          <span className='text-xl font-medium hover:text-tbRed'>내 정보</span>
        </Link>
      </div>
    </div>
  )
}

export default SideBar
