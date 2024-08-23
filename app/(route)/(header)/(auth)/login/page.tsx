import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'

type SocialLoginButton = {
  variant: 'kakao' | 'naver' | 'google' | 'tbPrimary'
  name: string
  ImageSrc?: string
}

const LOGIN_BUTTONS: Array<SocialLoginButton> = [
  {
    variant: 'kakao',
    name: '카카오 로그인',
    ImageSrc: '/images/auth/kakao.png',
  },
  {
    variant: 'naver',
    name: '네이버 로그인',
    ImageSrc: '/images/auth/naver.png',
  },
  {
    variant: 'google',
    name: '구글 로그인',
    ImageSrc: '/images/auth/google.png',
  },
  {
    variant: 'tbPrimary',
    name: '이메일 로그인',
  },
]

const Divider = ({ text }: { text: string }) => (
  <>
    <div className='flex-grow border-t border-tbGray' />
    <span className='px-4 text-tbGray'>{text}</span>
    <div className='flex-grow border-t border-tbGray' />
  </>
)

const LoginPage = (): ReactNode => {
  return (
    <div className='w-3/4 xl:w-3/5 2xl:w-1/2'>
      <div className='my-10 flex items-center justify-center'>
        <Divider text='로그인/회원가입' />
      </div>

      <div className='flex flex-col items-center gap-5'>
        {LOGIN_BUTTONS.map(button => (
          <Button
            key={button.name}
            variant={button.variant}
            className='flex h-13 w-full items-center justify-center gap-14 pl-4'
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
        <Link className='text-black underline hover:text-tbBlue' href={ROUTES.SIGNUP.url}>
          이메일로 회원가입
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
