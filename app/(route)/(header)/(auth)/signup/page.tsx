'use client'

import { Circle } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

import EmailCheck from '@/components/auth/EmailCheck'
import PolicyCheck from '@/components/auth/PolicyCheck'
import UserInfoCheck from '@/components/auth/UserInfoCheck'
import { TextDivider } from '@/components/common/Dividers'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

interface SignUpPageProps {}

const SignUpPage = ({}: SignUpPageProps): ReactNode => {
  const [step, setStep] = useState<number>(0)
  const [isNext, setIsNext] = useState<boolean>(false)

  const onClickListener = () => {
    setStep(prev => (prev + 1) % 3)
  }

  const onClickSignUp = () => {
    signUp
  }

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const res = await fetch('/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
        credentials: 'include',
      })

      const status = res.status

      switch (status) {
        case 200:
        // signin credentails
        case 400:
          break
        default:
          alert('이메일 인증이 실패하였습니다. 다시 시도해주세요')
          break
      }
    } catch (error) {}
  }

  return (
    <div className='flex h-full w-3/4 flex-col'>
      <div className='mb-5 mt-10 flex items-center justify-center'>
        <TextDivider text='이메일 회원가입' />
      </div>
      <div className='flex grow flex-col items-center justify-between'>
        <div className='mb-3 flex w-full flex-col items-center justify-center gap-5'>
          {step === 0 ? (
            <PolicyCheck setIsNext={setIsNext} />
          ) : step === 1 ? (
            <EmailCheck setIsNext={setIsNext} />
          ) : (
            <UserInfoCheck setIsNext={setIsNext} />
          )}
        </div>
        <div className='mb-8 flex w-full flex-col items-center justify-center gap-2'>
          <div className='flex items-center justify-end gap-4'>
            <Circle size={step == 0 ? 16 : 12} fill='#00000080' color='#00000080' />
            <Circle size={step == 1 ? 16 : 12} fill='#00000080' color='#00000080' />
            <Circle size={step == 2 ? 16 : 12} fill='#00000080' color='#00000080' />
          </div>
          {step === 2 ? (
            <Button
              onClick={onClickSignUp}
              variant='tbPrimary'
              className={cn('mt-2 h-11 w-full', `${!isNext && 'pointer-events-none opacity-60 hover:brightness-100'}`)}
            >
              회원가입 완료
            </Button>
          ) : (
            <Button
              onClick={onClickListener}
              variant='tbPrimary'
              className={cn('mt-2 h-11 w-full', `${!isNext && 'pointer-events-none opacity-60 hover:brightness-100'}`)}
            >
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
