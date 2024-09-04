'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'

import EmailCheck from '@/components/auth/EmailCheck'
import PolicyCheck from '@/components/auth/PolicyCheck'
import UserInfoCheck from '@/components/auth/UserInfoCheck'
import { TextDivider } from '@/components/common/Dividers'
import { Button } from '@/components/ui/button'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

interface SignUpPageProps {}

const SignUpPage = ({}: SignUpPageProps): ReactNode => {
  const [step, setStep] = useState<number>(0)
  const [isNext, setIsNext] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')

  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validPassword, setValidPassword] = useState<string>('')

  const router = useRouter()

  const onClickListener = () => {
    setStep(prev => (prev + 1) % 3)
  }

  const onClickStep = (clickStep: number) => {
    if (clickStep < step) {
      setStep(clickStep)
    } else if (clickStep > step) {
      alert('현재 회원가입 단계를 완료해주세요')
    }

    return
  }

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/signup`, {
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
        case 201:
          // 모달로 변경 예정
          alert('회원가입에 성공하였습니다!')
          // signin credentails
          signIn('credentials', {
            username: email,
            password,
          })
          break
        case 400:
          alert('이미 존재하는 이메일입니다.')
          router.push('/')
          break
        default:
          alert('회원가입이 실패하였습니다. 다시 시도해주세요')
          router.push('/')
          break
      }
    } catch (error) {
      alert('회원가입이 실패하였습니다. 다시 시도해주세요')
      router.push('/')
    }
  }

  const onClickSignUp = () => {
    signUp(email, password, nickname)
  }

  //
  const signUpStep =
    step === 0 ? (
      <PolicyCheck setIsNext={setIsNext} />
    ) : step === 1 ? (
      <EmailCheck setIsNext={setIsNext} email={email} setEmail={setEmail} />
    ) : (
      <UserInfoCheck
        setIsNext={setIsNext}
        email={email}
        password={password}
        validPassword={validPassword}
        setNickname={setNickname}
        setPassword={setPassword}
        setValidPassword={setValidPassword}
      />
    )

  const nextButton =
    step === 2 ? (
      <Button
        onClick={onClickSignUp}
        variant='tbPrimary'
        className={cn('mt-2 h-11 w-full', !isNext && 'pointer-events-none opacity-70')}
      >
        회원가입 완료
      </Button>
    ) : (
      <Button
        onClick={onClickListener}
        variant='tbPrimary'
        className={cn('mt-2 h-11 w-full', `${!isNext && 'pointer-events-none opacity-70'}`)}
      >
        다음
      </Button>
    )

  return (
    <div className='flex h-full w-3/4 flex-col'>
      <div className='mb-5 mt-10 flex items-center justify-center'>
        <TextDivider text='이메일 회원가입' />
      </div>
      <div className='flex grow flex-col items-center justify-between'>
        <div className='mb-3 flex w-full grow flex-col items-center justify-start gap-5'>{signUpStep}</div>
        <div className='mb-8 flex w-full flex-col items-center justify-center gap-2'>
          <div className='flex items-center justify-end gap-4'>
            {[0, 1, 2].map(index => (
              <LucideIcon
                key={index}
                name='Circle'
                onClick={() => onClickStep(index)}
                size={step === index ? 16 : 12}
                className='opacity-50'
                color='tbGray'
                fill='tbGray'
              />
            ))}
          </div>
          {nextButton}
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
