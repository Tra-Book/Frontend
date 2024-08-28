'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import React, { ChangeEventHandler, FormEvent, ReactNode, useState } from 'react'

import Divider from '@/components/auth/Divider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'

interface EmailLoginPageProps {}

// Eamil Validation Check Function
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

const EmailLoginPage = ({}: EmailLoginPageProps): ReactNode => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const email = e.target.value
    setEmail(email)

    if (validateEmail(email)) {
      setIsEmailValid(true)
    }
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setPassword(e.target.value)
  }

  const onBlurEmail: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setIsEmailValid(prev => {
      return validateEmail(email)
    })
  }

  const onClickLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    signIn('credentials', {
      username: email,
      password,
    })
  }

  return (
    <div className='w-3/4 xl:w-3/5 2xl:w-1/2'>
      <div className='my-10 flex items-center justify-center'>
        <Divider text='이메일 로그인' />
      </div>

      <form onSubmit={onClickLogin}>
        <div className='flex flex-col items-center gap-7'>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='email' className='mb-2'>
              이메일 <span className='text-red-600'>*</span>
            </Label>
            <Input
              onChange={onChangeEmail}
              onBlur={onBlurEmail}
              value={email}
              type='email'
              id='email'
              placeholder=''
              className={cn(`h-13 bg-tbPlaceholder shadow-tb-shadow ${!isEmailValid && 'ring-2 ring-red-600'}`)}
            />
            <p className={cn(isEmailValid ? 'hidden' : 'pl-3 pt-1 text-sm text-red-600')}>
              * 올바른 이메일 형식이 아닙니다
            </p>
          </div>

          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='email' className='mb-2'>
              비밀번호 <span className='text-red-600'>*</span>
            </Label>
            <Input
              onChange={onChangePassword}
              value={password}
              type='password'
              id='password'
              placeholder=''
              className='h-13 bg-tbPlaceholder shadow-tb-shadow'
            />
          </div>

          <Button type='submit' variant='primary' className='mt-2 h-13 w-full'>
            로그인
          </Button>

          <div className='mt-2 text-slate-500'>
            계정이 없으신가요?&nbsp;&nbsp;
            <Link className='text-black hover:underline' href='/signup'>
              이메일로 회원가입
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EmailLoginPage
