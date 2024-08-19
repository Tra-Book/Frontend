import Link from 'next/link'
import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps): ReactNode => {
  return (
    <div className='w-3/4'>
      <div className='my-6 flex items-center justify-center'>
        <div className='flex-grow border-t border-gray-500'></div>
        <span className='px-4 text-gray-500'>로그인 / 회원가입</span>
        <div className='flex-grow border-t border-gray-500'></div>
      </div>
      <div className='flex flex-col gap-5'>
        <Button variant='secondary' className='h-11'>
          카카오 로그인
        </Button>
        <Button variant='secondary' className='h-11'>
          네이버 로그인
        </Button>
        <Button variant='secondary' className='h-11'>
          구글 로그인
        </Button>
        <Button variant='secondary' className='h-11'>
          이메일 로그인
        </Button>
      </div>
      <div className='mt-12 w-full text-center text-slate-500'>
        계정이 없으신가요?&nbsp;&nbsp;
        <Link className='text-black' href='/signup'>
          이메일로 회원가입
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
