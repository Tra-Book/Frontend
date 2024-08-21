import { ChevronUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import TraBookLogo from '@/public/images/logo.svg'

import Slogan from './Slogan'

const Header = (): ReactNode => {
  return (
    <header className='fixed left-0 right-0 top-0 z-10 h-24 w-full bg-transparent xl:h-24'>
      <nav className='flex h-full w-full max-w-[1280px] items-center justify-between'>
        {/* Logo */}
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <Image src={TraBookLogo} alt='TraBook Logo' width={94} height={69} />
            <Slogan />
          </div>
        </Link>

        {/* Desktop: Links */}
        <Link href='/plan'>여행 계획하기</Link>
        <div>
          커뮤니티
          <ChevronUp />
        </div>

        <Link href='/plan'>내 여행</Link>
      </nav>
    </header>
  )
}

export default Header
