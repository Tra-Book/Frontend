'use client'

import { signIn } from 'next-auth/react'
import React, { ChangeEventHandler, FormEvent, ReactNode, useState } from 'react'

import EmailLink from '@/components/auth/EmailLink'
import PasswordFindLink from '@/components/auth/PasswordFindLink'
import { TextDivider } from '@/components/common/Dividers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LucideIcon from '@/lib/icons/LucideIcon'
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
  const [isShow, setIsShow] = useState<boolean>(false)

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

  const onClickEye = () => {
    setIsShow(!isShow)
  }

  const passwordEye = (
    <LucideIcon
      name={!isShow ? 'EyeOff' : 'Eye'}
      onClick={!isShow ? onClickEye : onClickEye}
      className='absolute right-2 h-full opacity-40'
      size={24}
    />
  )

  return (
    <div className='w-3/4 xl:w-3/5 2xl:w-1/2'>
      <div className='my-10 flex items-center justify-center'>
        <TextDivider text='이메일 로그인' />
      </div>

      <form onSubmit={onClickLogin}>
        <div className='flex flex-col items-center gap-7'>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='email' className='mb-2 text-base'>
              이메일 <span className='text-tbRed'>*</span>
            </Label>
            <Input
              onChange={onChangeEmail}
              onBlur={onBlurEmail}
              value={email}
              type='email'
              id='email'
              placeholder=''
              className={cn(`h-13 bg-tbPlaceholder shadow-tb-shadow ${!isEmailValid && 'ring-2 ring-tbRed'}`)}
            />
            <p className={cn(isEmailValid ? 'hidden' : 'pl-3 pt-1 text-sm text-tbRed')}>
              * 올바른 이메일 형식이 아닙니다
            </p>
          </div>

          <div className='relative grid w-full items-center gap-1.5'>
            <Label htmlFor='email' className='mb-2 text-base'>
              비밀번호 <span className='text-tbRed'>*</span>
            </Label>
            <div className='relative flex justify-between gap-2'>
              <Input
                onChange={onChangePassword}
                value={password}
                type={isShow ? 'text' : 'password'}
                id='password'
                placeholder=''
                className='h-13 bg-tbPlaceholder shadow-tb-shadow'
              />
              {passwordEye}
            </div>
          </div>

          <Button type='submit' variant='tbPrimary' className='mt-2 h-13 w-full'>
            로그인
          </Button>
          <div>
            <PasswordFindLink className='my-2' />
            <EmailLink />
          </div>
        </div>
      </form>
    </div>
  )
}

export default EmailLoginPage
