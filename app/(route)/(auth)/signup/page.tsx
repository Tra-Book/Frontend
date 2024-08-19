'use client'

import { Circle } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'

import EmailCheck from './_component/EmailCheck'
import PolicyCheck from './_component/PolicyCheck'
import UserInfoCheck from './_component/UserInfoCheck'

interface SignUpPageProps {}

const SignUpPage = ({}: SignUpPageProps): ReactNode => {
  const [step, setStep] = useState(0)

  const onClickListener = () => {
    setStep(prev => (prev + 1) % 3)
  }

  return (
    <div className='flex h-full w-3/4 flex-col'>
      <div className='my-6 flex items-center justify-center'>
        <div className='flex-grow border-t border-gray-500'></div>
        <span className='px-4 text-gray-500'>이메일 회원가입</span>
        <div className='flex-grow border-t border-gray-500'></div>
      </div>
      <div className='flex grow flex-col items-center justify-between'>
        <div className='flex w-full flex-col items-center justify-center gap-5'>
          {step === 0 ? <PolicyCheck /> : step === 1 ? <EmailCheck /> : <UserInfoCheck />}
        </div>
        <div className='mb-16 flex w-full grow-0 flex-col items-center justify-center gap-2'>
          <div className='flex justify-center gap-4'>
            <Circle size={16} fill={step >= 0 ? 'black' : 'white'} />
            <Circle size={16} fill={step >= 1 ? 'black' : 'white'} />
            <Circle size={16} fill={step >= 2 ? 'black' : 'white'} />
          </div>
          <Button
            onClick={onClickListener}
            variant='secondary'
            className='mt-2 h-11 w-full max-w-sm bg-slate-200 hover:bg-slate-300'
          >
            {step === 2 ? '회원가입 완료' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
