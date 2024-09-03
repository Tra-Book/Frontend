'use client'

import React, { ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

interface UserInfoCheckProps {
  setIsNext: Dispatch<SetStateAction<boolean>>
  email: string
  password: string
  validPassword: string
  setNickname: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setValidPassword: Dispatch<SetStateAction<string>>
}

function isValidPassword(password: string) {
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const length = password.trim().length >= 10 ? true : false

  return hasLetter && hasNumber && hasSpecialChar && length
}

const UserInfoCheck = ({
  setIsNext,
  email,
  password,
  validPassword,
  setNickname,
  setPassword,
  setValidPassword,
}: UserInfoCheckProps): ReactNode => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isSame, setIsSame] = useState<boolean>(true)

  const [isShowPw, setIsShowPw] = useState<boolean>(false)
  const [isShowValidPw, setIsShowValidPw] = useState<boolean>(false)

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value)

    if (isValidPassword(password)) setIsValid(true)
  }
  const onBlurPassword: ChangeEventHandler<HTMLInputElement> = () => {
    if (isValidPassword(password)) setIsValid(true)
    else setIsValid(false)
  }

  const onChangeValidPassword: ChangeEventHandler<HTMLInputElement> = e => {
    setValidPassword(e.target.value)

    if (password === e.target.value) setIsSame(true)
    else setIsSame(false)
  }

  const onClickPwEye = () => {
    setIsShowPw(!isShowPw)
  }

  const onClickValidPwEye = () => {
    setIsShowValidPw(!isShowValidPw)
  }

  const renderEye = (isShow: boolean, onClickEye: () => void) => {
    return !isShow ? (
      <LucideIcon name='EyeOff' onClick={onClickEye} className='absolute right-2 h-full opacity-40' size={24} />
    ) : (
      <LucideIcon name='Eye' onClick={onClickEye} className='absolute right-2 h-full opacity-40' size={24} />
    )
  }

  useEffect(() => {
    setIsNext(false)
  }, [])

  useEffect(() => {
    if (isValid && isSame && password.length !== 0) setIsNext(true)
    else setIsNext(false)
  }, [password, validPassword])

  return (
    <>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='nickname' className='mb-1 text-base'>
          닉네임 <span className='text-tbRed'>*</span>
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input
            onChange={e => setNickname(e.target.value)}
            type='text'
            id='nickname'
            placeholder=''
            className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow')}
          />
        </div>
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='password' className='mb-1 text-base'>
          비밀번호 <span className='text-tbRed'>*</span> &#40;10문자 이상&#41;
        </Label>
        <div className='gap relative flex justify-between gap-2'>
          <Input
            onChange={onChangePassword}
            onBlur={onBlurPassword}
            type={isShowPw ? 'text' : 'password'}
            id='password'
            placeholder=''
            className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', !isValid && 'ring-2 ring-tbRed')}
          />
          {renderEye(isShowPw, onClickPwEye)}
        </div>

        <p className={cn(isValid ? 'invisible text-sm' : 'pl-2 text-sm text-tbRed')}>* 올바른 형식이 아닙니다.</p>

        <div className='text-center text-sm text-slate-500'>
          안전한 비밀번호를 위해
          <br />
          영문자, 숫자, 특수문자를 포함해야 합니다.
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='validPassword' className='mb-1 text-base'>
            비밀번호 확인 <span className='text-tbRed'>*</span>
          </Label>
          <div className='gap relative flex justify-between gap-2'>
            <Input
              onChange={onChangeValidPassword}
              type={isShowValidPw ? 'text' : 'password'}
              id='validPassword'
              placeholder=''
              className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', !isSame && 'ring-2 ring-tbRed')}
            />
            {renderEye(isShowValidPw, onClickValidPwEye)}
          </div>

          <p className={cn(isSame ? 'invisible text-sm' : 'pl-2 text-sm text-tbRed')}>* 비밀번호를 확인해주세요.</p>
        </div>
      </div>
    </>
  )
}

export default UserInfoCheck
