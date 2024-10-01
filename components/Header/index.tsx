import Link from 'next/link'
import { ReactNode } from 'react'

import { auth } from '@/auth'
import { ROUTES } from '@/lib/constants/routes'

import Slogan from '../common/Slogan'
import CommunityMenu from './CommunityMenu'
import MobileMenu from './MobileMenu'

const Header = async (): Promise<ReactNode> => {
  const session = await auth()

  return (
    <header className='fixed left-0 right-0 top-0 z-30 flex h-24 w-screen items-center justify-center border-b border-solid border-tbGray bg-white xl:h-24'>
      <nav className='relative flex h-full w-full items-center justify-between pl-10 pr-14'>
        {/* Logo */}
        <Link href={ROUTES.HOME.url}>
          <Slogan />
        </Link>

        {/* Mobile, Tablet <= xl */}
        <MobileMenu session={session} className='lg:hidden' />

        {/* Desktop >= xl */}
        <div className='hidden h-full items-center justify-center gap-9 text-xl font-medium lg:flex'>
          <CommunityMenu className='h-full' />
          <Link href={!session ? ROUTES.AUTH.LOGIN.url : ROUTES.PLAN.INDEX.url} className='flex h-full items-center'>
            여행 계획하기
          </Link>
          <Link href={!session ? ROUTES.AUTH.LOGIN.url : ROUTES.MAIN.MY_PLAN.url} className='flex h-full items-center'>
            {!session ? '로그인' : '내 여행'}
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
