'use client'

import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { TextDivider } from '@/components/common/Dividers'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'

type SocialLoginButton = {
  variant: 'kakao' | 'naver' | 'google' | 'tbPrimary'
  name: string
  ImageSrc?: string
  auth: 'kakao' | 'naver' | 'google' | 'credentials'
}

const LOGIN_BUTTONS: Array<SocialLoginButton> = [
  {
    variant: 'kakao',
    name: '카카오 로그인',
    ImageSrc: '/images/auth/kakao.png',
    auth: 'kakao',
  },
  {
    variant: 'naver',
    name: '네이버 로그인',
    ImageSrc: '/images/auth/naver.png',
    auth: 'naver',
  },
  {
    variant: 'google',
    name: '구글 로그인',
    ImageSrc: '/images/auth/google.png',
    auth: 'google',
  },
  {
    variant: 'tbPrimary',
    name: '이메일 로그인',
    auth: 'credentials',
  },
]

const LoginPage = (): ReactNode => {
  const router = useRouter()

  const onClickLoginBtn = async (provider: string): Promise<void> => {
    if (provider === 'credentials') {
      router.push(ROUTES.AUTH.EMAIL_LOGIN.url)
    } else {
      const res = await signIn(provider)
    }
  }

  return (
    <div className='w-3/4 xl:w-3/5 2xl:w-1/2'>
      <div className='my-10 flex items-center justify-center'>
        <TextDivider text='로그인/회원가입' />
      </div>

      <div className='flex flex-col items-center gap-5'>
        {LOGIN_BUTTONS.map(button => (
          <Button
            key={button.name}
            variant={button.variant}
            className='flex h-13 w-full items-center justify-center gap-14 pl-4'
            onClick={() => onClickLoginBtn(button.auth)}
          >
            {button.ImageSrc ? (
              <Image src={button.ImageSrc} width={24} height={24} alt={button.name} />
            ) : (
              <Mail size={24} />
            )}
            {button.name}
          </Button>
        ))}
      </div>

      <div className='mt-12 w-full text-center text-tbGray'>
        계정이 없으신가요?&nbsp;&nbsp;
        <Link className='text-black underline hover:text-tbBlue' href={ROUTES.AUTH.SIGNUP.url}>
          이메일로 회원가입
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
