import Link from 'next/link'
import { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'

import MobileMenu from './MobileMenu'
import Slogan from './Slogan'

const Header = (): ReactNode => {
  return (
    <header className='fixed left-0 right-0 top-0 z-10 flex h-24 w-full items-center justify-center bg-transparent xl:h-24'>
      <nav className='relative flex h-full w-full max-w-[1280px] items-center justify-between px-6'>
        {/* Logo */}
        <Link href={ROUTES.HOME.url}>
          <Slogan />
        </Link>

        {/* Mobile, Tablet <= xl */}
        <MobileMenu className='lg:hidden' />

        {/* Desktop >= xl */}
        <div className='hidden h-full w-fit items-center justify-center gap-9 text-2xl lg:flex'>
          <div className='flex items-center gap-2'>
            커뮤니티
            <LucideIcon name='ChevronDown' />
          </div>
          <Link href='/plan'>여행 계획하기</Link>
          {/* Todo: 로그인 상태에 따라 내 여행 or 로그인 구분  */}
          {/* <Link href={ROUTES.MAIN.url}>내 여행</Link> */}
          <Link href={ROUTES.AUTH.LOGIN.url}>로그인</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
