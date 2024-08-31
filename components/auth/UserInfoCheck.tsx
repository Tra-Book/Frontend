'use client'

import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'

interface UserInfoCheckProps {
  setIsNext: Dispatch<SetStateAction<boolean>>
  email: string
  password: string
  validPassword: string
  setNickname: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setvalidPassword: Dispatch<SetStateAction<string>>
}

function isValidPassword(password: string) {
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return hasLetter && hasNumber && hasSpecialChar
}

const UserInfoCheck = ({
  setIsNext,
  email,
  password,
  validPassword,
  setNickname,
  setPassword,
  setvalidPassword,
}: UserInfoCheckProps): ReactNode => {
  useEffect(() => {
    setIsNext(false)
  }, [])

  return (
    <>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='nickname' className='mb-2'>
          닉네임 <span className='text-tbRed'>*</span>
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='text' id='nickname' placeholder='' className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow')} />
        </div>
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='password' className='mb-2'>
          비밀번호 <span className='text-tbRed'>*</span> &#40;10문자 이상&#41;
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input
            type='password'
            id='password'
            placeholder=''
            className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow')}
          />
        </div>
        <div className='mt-2 text-center text-sm text-slate-500'>
          안전한 비밀번호를 위해
          <br />
          영문자, 숫자, 특수문자를 포함해야 합니다.
        </div>
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='validPassword' className='mb-2'>
          비밀번호 확인 <span className='text-tbRed'>*</span>
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input
            type='password'
            id='validPassword'
            placeholder=''
            className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow')}
          />
        </div>
      </div>
    </>
  )
}

export default UserInfoCheck
