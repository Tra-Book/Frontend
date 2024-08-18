import React, { ReactNode } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps): ReactNode => {
  return (
    <div className='flex h-dvh w-dvw'>
      <div className='flex h-full w-1/2 items-center justify-center bg-lime-400'>사진</div>
      <div className='flex h-full w-1/2 flex-col items-center justify-start'>
        <div className='flex h-1/4 w-3/4 items-end justify-center text-3xl'>TraBook 로고</div>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
