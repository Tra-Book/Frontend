import Image from 'next/image'
import React, { ReactNode } from 'react'

import Slogan from '@/components/common/Slogan'
import AuthImage from '@/public/images/auth/index.png'
import LogoImage from '@/public/images/logo.svg'
interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps): ReactNode => {
  return (
    <main className='flex h-dvh w-dvw pt-24'>
      <div className='hidden h-full w-1/2 max-w-[550px] items-center justify-center lg:flex'>
        <Image src={AuthImage} alt='TraBook' width={550} height={732} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className='flex min-h-full flex-grow flex-col items-center justify-start'>
        <div className='flex h-1/4 min-h-[180px] w-3/4 flex-col items-center justify-end gap-2'>
          <Image src={LogoImage} alt='TraBook Logo' width={94} height={69} />
          <Slogan />
        </div>
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
