import { ChevronUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import TraBookLogo from '@/public/images/logo.svg'

import Slogan from './Slogan'

const Header = (): ReactNode => {
  return (
    <header className='relative h-24 w-full bg-red-400 xl:h-24'>
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
