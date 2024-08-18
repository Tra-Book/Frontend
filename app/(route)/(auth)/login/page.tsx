import React, { ReactNode } from 'react'

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps): ReactNode => {
  return (
    <div className='w-3/4'>
      <div className='my-6 flex items-center justify-center'>
        <div className='flex-grow border-t border-gray-500'></div>
        <span className='px-4 text-gray-500'>로그인 / 회원가입</span>
        <div className='flex-grow border-t border-gray-500'></div>
      </div>
    </div>
  )
}

export default LoginPage
