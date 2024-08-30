'use client'

import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='nickname' className='mb-2'>
          닉네임 <span className='text-red-600'>*</span>
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='text' id='nickname' placeholder='' className='h-13' />
        </div>
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='password' className='mb-2'>
          비밀번호 <span className='text-red-600'>*</span> &#40;10문자 이상&#41;
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='password' id='password' placeholder='' className='h-13' />
        </div>
        <div className='mt-2 text-center text-sm text-slate-500'>
          안전한 비밀번호를 위해
          <br />
          영문자, 숫자, 특수문자를 포함해야 합니다.
        </div>
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='validPassword' className='mb-2'>
          비밀번호 확인 <span className='text-red-600'>*</span>
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='password' id='validPassword' placeholder='' className='h-13' />
        </div>
      </div>
    </>
  )
}

export default UserInfoCheck
