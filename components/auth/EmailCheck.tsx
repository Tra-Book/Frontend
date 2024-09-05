'use client'

import React, { ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface EmailCheckProps {
  setIsNext: Dispatch<SetStateAction<boolean>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
}

// Eamil Validation Check Function
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

const EmailCheck = ({ setIsNext, email, setEmail }: EmailCheckProps): ReactNode => {
  // const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [isSend, setIsSend] = useState<boolean>(false)
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
  const [isCodeVerify, setIsCodeVerify] = useState<boolean>(true)

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const email = e.target.value
    setEmail(email)

    if (validateEmail(email)) {
      setIsEmailValid(true)
    }
  }

  const onBlurEmail: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setIsEmailValid(prev => {
      return validateEmail(email)
    })
  }

  const onClickSendButton = async (): Promise<void> => {
    if (!validateEmail(email) || email.trim() === '') {
      setIsEmailValid(false)
      return
    }

    try {
      const res = await fetch(`server/${BACKEND_ROUTES.AUTH.VERIFY_EMAIL.url}`, {
        method: BACKEND_ROUTES.AUTH.VERIFY_EMAIL.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
        credentials: 'include',
      })

      const status = res.status

      switch (status) {
        case 200:
          setIsEmailValid(true)
          setIsSend(true)
          // modal로 바꿀 예정
          alert('이메일로 인증번호 발송 완료')
          return
        case 400:
          // modal로 바꿀 예정
          alert('이미 가입된 이메일입니다.')
          break
        default:
          alert('인증 이메일 전송이 실패하였습니다. 다시 시도해주세요')
          break
      }
    } catch (error) {
      alert('인증 이메일 전송이 실패하였습니다. 다시 시도해주세요')
    }
  }

  const onClickVerifyButton = async (): Promise<void> => {
    if (code.trim() === '') {
      setIsCodeVerify(false)
      return
    }

    try {
      console.log(email, code)

      const res = await fetch(`server/${BACKEND_ROUTES.AUTH.VERIFY_CODE.url}`, {
        method: BACKEND_ROUTES.AUTH.VERIFY_CODE.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          email: email,
        }),
        credentials: 'include',
      })

      const status = res.status

      console.log(status)

      switch (status) {
        case 200:
          setIsCodeVerify(true)
          setIsNext(true)
          return
        case 400:
          setIsCodeVerify(false)
          break
        default:
          alert('이메일 인증이 실패하였습니다. 다시 시도해주세요')
          break
      }
    } catch (error) {
      alert('이메일 인증이 실패하였습니다. 다시 시도해주세요')
    }
  }

  useEffect(() => {
    setIsNext(prev => false)
  }, [])

  useEffect(() => {
    if (isCodeVerify && isSend) setIsNext(true)
  }, [isCodeVerify])

  return (
    <>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='email' className='mb-2 text-base'>
          이메일 <span className='text-tbRed'>*</span>
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input
            value={email}
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            type='text'
            id='email'
            placeholder=''
            className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', !isEmailValid && 'ring-2 ring-tbRed')}
          />
          <Button onClick={onClickSendButton} variant='tbSecondary' className='h-13 w-1/5 p-2'>
            {!isSend ? '전송' : '재전송'}
          </Button>
        </div>
        <p className={cn(isEmailValid ? 'invisible' : 'pl-3 pt-1 text-sm text-red-600')}>
          * 올바른 이메일 형식이 아닙니다
        </p>
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='code' className='mb-2 text-base'>
          인증번호 <span className='text-tbRed'>*</span>
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input
            value={code}
            onChange={e => setCode(e.target.value)}
            type='text'
            id='code'
            placeholder=''
            className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', !isCodeVerify && 'ring-2 ring-tbRed')}
          />
          <Button onClick={onClickVerifyButton} variant='tbSecondary' className='h-13 w-1/5 p-2'>
            확인
          </Button>
        </div>
        <p className={cn(isCodeVerify ? 'invisible' : 'pl-3 pt-1 text-sm ring-tbRed')}>* 올바른 인증번호가 아닙니다.</p>
      </div>

      <div className='mt-2 text-center text-slate-500'>
        혹시 메일을 받지 못하셨다면
        <br />
        재전송 버튼을 클릭해 주세요
      </div>
    </>
  )
}

export default EmailCheck
