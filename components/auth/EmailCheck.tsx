'use client'

import React, { ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClientModalData } from '@/lib/constants/errors'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'
import { useToast } from '@/lib/utils/hooks/useToast'

import { ModalData } from '../common/Modals'

interface EmailCheckProps {
  isNext: boolean
  setIsNext: Dispatch<SetStateAction<boolean>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  handleModalStates: (modalData: ModalData, openBool: 'open' | 'close') => void
}

// Eamil Validation Check Function
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

const EmailCheck = ({ isNext, setIsNext, email, setEmail, handleModalStates }: EmailCheckProps): ReactNode => {
  const { toast } = useToast()

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
      if (res.ok) {
        setIsEmailValid(true)
        setIsSend(true)
        toast({ title: '이메일로 인증번호 발송 완료' })
        return
      }
      switch (status) {
        case 400:
          handleModalStates(ClientModalData.dupEmailError, 'open') // 동일 이메일 존재
          break
        case 500:
          handleModalStates(ClientModalData.serverError, 'open') // Server Error
          break
      }
    } catch (error) {
      console.log('Fetch Error ouccred!')
    }
  }

  const onClickVerifyButton = async (): Promise<void> => {
    if (code.trim() === '') {
      setIsCodeVerify(false)
      return
    }

    try {
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
      if (res.ok) {
        setIsCodeVerify(true)
        setIsNext(true)
        return
      }
      switch (status) {
        case 400:
          setIsCodeVerify(false)
          handleModalStates(ClientModalData.diffCodeError, 'open') // Server Error

          break
        case 500:
          handleModalStates(ClientModalData.serverError, 'open') // Server Error
          break
      }
    } catch (error) {
      console.log('이메일 인증이 실패하였습니다. 다시 시도해주세요')
    }
  }

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
      <div className='mt-2 text-center text-slate-500'>
        혹시 메일을 받지 못하셨다면
        <br />
        재전송 버튼을 클릭해 주세요
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
            className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', !isCodeVerify && 'text-tbRed')}
          />
          <Button onClick={onClickVerifyButton} variant='tbSecondary' className='h-13 w-1/5 p-2'>
            확인
          </Button>
        </div>
        <p
          className={cn(
            !isSend ? 'invisible' : isNext ? 'pl-3 pt-1 text-sm text-tbBlue' : 'pl-3 pt-1 text-sm text-tbRed',
          )}
        >
          {isNext ? '* 올바른 인증번호입니다' : '* 올바른 인증번호가 아닙니다'}
        </p>
      </div>{' '}
    </>
  )
}

export default EmailCheck
