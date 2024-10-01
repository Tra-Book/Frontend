'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'

import EmailCheck from '@/components/auth/EmailCheck'
import PolicyCheck from '@/components/auth/PolicyCheck'
import UserInfoCheck from '@/components/auth/UserInfoCheck'
import { TextDivider } from '@/components/common/Dividers'
import { Button } from '@/components/ui/button'
import { ClientModalData } from '@/lib/constants/errors'
import { BACKEND_ROUTES, ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import useModal from '@/lib/utils/hooks/useModal'

interface SignUpPageProps {}

const SignUpPage = ({}: SignUpPageProps): ReactNode => {
  const router = useRouter()

  const [step, setStep] = useState<number>(0)
  const [isNext, setIsNext] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validPassword, setValidPassword] = useState<string>('')

  const onClickListener = () => {
    setStep(prev => (prev + 1) % 3)
    setIsNext(false)
  }

  const onClickStep = (clickStep: number) => {
    if (clickStep < step) {
      setStep(clickStep)
    } else if (clickStep > step) {
      handleModalStates(ClientModalData.signUpStepError, 'open')
    }

    return
  }

  // Modal Values
  const { modalData, handleModalStates, Modal } = useModal()

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const res = await fetch(`server/${BACKEND_ROUTES.AUTH.SIGNUP.url}`, {
        method: BACKEND_ROUTES.AUTH.SIGNUP.method,
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

      if (res.ok) {
        handleModalStates(ClientModalData.signInSuccess, 'open')
        return
      }
      // Errors
      const status = res.status
      switch (status) {
        case 400:
          handleModalStates(ClientModalData.dupUserError, 'open')
          break
        case 500: // Internal Server Error
          handleModalStates(ClientModalData.serverError, 'open')
          break
      }
    } catch (error) {
      console.log('Fetch Error ouccred!')
    }
  }

  const handleModalConfirm = () => {
    switch (modalData) {
      // #1. 성공
      case ClientModalData.signInSuccess:
        signIn('credentials', {
          username: email,
          password,
        })
        break
      case ClientModalData.signOutSuccess:
        // Todo: 회원탈퇴 로직 필요
        break

      // #2. 실패
      case ClientModalData.dupEmailError:
        router.push(ROUTES.AUTH.LOGIN.url)
        break
      // 단계 오류: 아무것도 하지 않음
      case ClientModalData.signUpStepError:
        break
      case ClientModalData.signUpNetError:
        router.push(ROUTES.AUTH.SIGNUP.url)
        break
    }
  }

  const onClickSignUp = () => {
    signUp(email, password, nickname)
  }

  const signUpStep =
    step === 0 ? (
      <PolicyCheck setIsNext={setIsNext} />
    ) : step === 1 ? (
      <EmailCheck
        isNext={isNext}
        setIsNext={setIsNext}
        email={email}
        setEmail={setEmail}
        handleModalStates={handleModalStates}
      />
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

  const nextButton = (
    <Button
      onClick={step === 2 ? onClickSignUp : onClickListener}
      variant='tbPrimary'
      className={cn('mt-2 h-11 w-full', !isNext && 'pointer-events-none opacity-70')}
    >
      {step === 2 ? '회원가입 완료' : '다음'}
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
                className={cn('opacity-50', index < step && 'hover:scale-150')}
                color='tbGray'
                fill='tbGray'
              />
            ))}
          </div>
          {nextButton}
        </div>
      </div>
      <Modal onConfirm={handleModalConfirm} />
    </div>
  )
}

export default SignUpPage
