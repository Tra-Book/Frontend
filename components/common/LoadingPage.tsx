import Image from 'next/image'
import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import LogoImage from '@/public/images/logo.svg'

import Loading from './Loading'
import Slogan from './Slogan'

interface LoadingPageProps {
  className?: string
}

const LoadingPage = ({ className }: LoadingPageProps): ReactNode => {
  return (
    <>
      <MobileLoading className='sm:hidden' />
      <DesktopLoading className='hidden sm:flex' />
    </>
  )
}

export default LoadingPage

const MobileLoading = ({ className }: LoadingPageProps) => {
  return (
    <div className={cn('flex h-screen w-screen flex-col items-center justify-center gap-4', className)}>
      <div className='flex flex-col items-center justify-center'>
        <Image src={LogoImage} alt='TraBook Logo' width={200} height={180} />
        <Slogan subTitleClassName='text-xs' />
      </div>
      <div className='sm:gap- flex flex-col items-center justify-center text-lg font-semibold sm:flex-row'>
        로딩중입니다 잠시만 기다려주세요!
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='border-b border-solid border-tbPrimary font-semibold'>알고 계셨나요?</div>
        <div className='mt-10'>
          <p className='text-center'>
            <span className='font-medium'>여행</span>은{' '}
            <span className='font-medium'>스트레스 해소, 자기 성장, 창의성 개발, 감사의식 강화,</span>
          </p>
          <p className='text-center font-medium'> 행복감과 만족감의 증진에 도움이 됩니다.</p>
        </div>
      </div>
      <p className='flex items-center gap-3 font-semibold text-tbBlue'>
        Loading...
        <Loading />
      </p>
    </div>
  )
}

const DesktopLoading = ({ className }: LoadingPageProps) => {
  return (
    <div className={cn('h-screen w-screen items-center justify-center', className)}>
      <div className='flex w-1/2 min-w-fit max-w-[760px] flex-col items-start justify-start gap-4'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={LogoImage} alt='TraBook Logo' width={94} height={69} />
          <Slogan subTitleClassName='text-xs' />
        </div>
        <p className='text-2xl font-semibold xl:text-3xl'>로딩중입니다 잠시만 기다려주세요!</p>
        <div className='mt-10 border-b border-solid border-tbPrimary font-semibold xl:text-lg'>알고 계셨나요?</div>
        <p className='xl:text-lg'>
          <span className='font-medium'>여행</span>은{' '}
          <span className='font-medium'>
            스트레스 해소, 자기 성장, 창의성 개발, 감사의식 강화, 행복감과 만족감의 증진
          </span>
          에 도움이 됩니다.
        </p>
        <p className='flex items-center gap-3 font-semibold text-tbBlue'>
          Loading...
          <Loading />
        </p>
      </div>
    </div>
  )
}
