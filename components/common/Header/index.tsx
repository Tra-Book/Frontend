'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'

import Slogan from './Slogan'

const Header = (): ReactNode => {
  return (
    <header className='fixed left-0 right-0 top-0 z-10 flex h-24 w-full items-center justify-center bg-transparent xl:h-24'>
      <nav className='flex h-full w-full max-w-[1280px] items-center justify-between'>
        {/* Logo */}
        <Link href={ROUTES.HOME.url} className='pl-6'>
          <Slogan />
        </Link>

        {/* width(Mobile) <= sm */}
        <Menu onClick={() => console.log('Hello')} />
        {/* <Button></Button> */}

        {/* width(Desktop) >= md */}

        {/* width(Desktop) >= xl */}
        <div className='hidden h-full w-fit items-center justify-center gap-9 pr-6 text-2xl xl:flex'>
          <div className='flex items-center gap-2'>
            커뮤니티
            <LucideIcon name='ChevronDown' />
          </div>
          <Link href='/plan'>여행 계획하기</Link>
          {/* Todo: 로그인 상태에 따라 내 여행 or 로그인 구분  */}
          {/* <Link href={ROUTES.MAIN.url}>내 여행</Link> */}
          <Link href={ROUTES.LOGIN.url}>로그인</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
