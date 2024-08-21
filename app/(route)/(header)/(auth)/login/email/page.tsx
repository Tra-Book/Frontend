import Link from 'next/link'
import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EmailLoginPageProps {}

const EmailLoginPage = ({}: EmailLoginPageProps): ReactNode => {
  return (
    <div className='w-3/4'>
      <div className='my-6 flex items-center justify-center'>
        <div className='flex-grow border-t border-gray-500'></div>
        <span className='px-4 text-gray-500'>이메일 로그인</span>
        <div className='flex-grow border-t border-gray-500'></div>
      </div>
      <div className='flex flex-col items-center gap-7'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email' className='mb-2'>
            이메일 *
          </Label>
          <Input type='email' id='email' placeholder='' className='h-11' />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email' className='mb-2'>
            비밀번호 *
          </Label>
          <Input type='password' id='password' placeholder='' className='h-11' />
        </div>
        <Button variant='secondary' className='mt-2 h-11 w-full max-w-sm bg-slate-200 hover:bg-slate-300'>
          로그인
        </Button>
        <div className='mt-2 text-slate-500'>
          계정이 없으신가요?&nbsp;&nbsp;
          <Link className='text-black' href='/signup'>
            이메일로 회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmailLoginPage
