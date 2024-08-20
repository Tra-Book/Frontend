import { Mail } from 'lucide-react'
import Image from 'next/image'
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
      <div className='flex flex-col items-center gap-5'>
        <Button variant='kakao' className='h-13 w-96 shadow-md'>
          <div className='flex w-2/3 items-center justify-start gap-14 pl-4'>
            <Image src='/kakao.png' width={24} height={24} alt='' />
            카카오 로그인
          </div>
        </Button>
        <Button variant='naver' className='h-13 w-96 shadow-md'>
          <div className='flex w-2/3 items-center justify-start gap-14 pl-4'>
            <Image src='/naver.png' width={24} height={24} alt='' />
            네이버 로그인
          </div>
        </Button>
        <Button variant='google' className='h-13 w-96 shadow-md'>
          <div className='flex w-2/3 items-center justify-start gap-14 pl-4'>
            <Image src='/google.png' width={24} height={24} alt='' />
            구글 로그인
          </div>
        </Button>
        <Button variant='email' className='h-13 w-96 shadow-md'>
          <div className='flex w-2/3 items-center justify-start gap-14 pl-4'>
            <Mail width={24} height={24} />
            이메일 로그인
          </div>
        </Button>
      </div>
      <div className='mt-12 w-full text-center text-slate-500'>
        계정이 없으신가요?&nbsp;&nbsp;
        <Link className='text-black underline' href='/signup'>
          이메일로 회원가입
        </Link>
      </div>
    </div>
  )
}

export default LoginPage