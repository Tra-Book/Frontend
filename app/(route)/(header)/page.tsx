import { Plane } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { SLOGANS } from '@/components/common/Header/Slogan'
import { Motion } from '@/components/common/MotionWrapper'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'
import { fadeIn } from '@/lib/types/animation'
import { cn } from '@/lib/utils/cn'

const INTRODUCE_FIRST_LINE: Array<string> = ['여행 계획', '을 위한 최적화 플랫폼']
const SUBINTRODUCE_FIRST_LINE: Array<string> = ['빅데이터 ', '여행지 정보와 ', '참신한 계획들을 통해']
const SUBINTRODUCE_SECOND_LINE: Array<string> = ['손쉽게 여행 일정을 완성하세요']

const Home = (): ReactNode => {
  const renderAnimatedText = (text: Array<string>, delay: number) => {
    return text.map((item: string, index: number) => (
      <Motion
        key={item}
        tag='span'
        animation={fadeIn(1, 0.5 * index + delay)}
        className={cn(item === '여행 계획' && 'text-tbPrimary')}
      >
        {item}
      </Motion>
    ))
  }

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-start'>
      {/* 첫 페이지 */}
      <div className='relative flex h-screen w-full items-center'>
        <div className='flex h-full w-1/3 flex-col items-center justify-center gap-8'>
          {SLOGANS.map((slogan, index) => (
            <Motion
              key={slogan}
              animation={{
                initial: { opacity: 0, x: -100 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.9], delay: index * 0.5 },
              }}
              className='font-mclaren text-5xl font-bold'
            >
              {slogan}
            </Motion>
          ))}
        </div>
        <div className='relative flex h-full flex-grow flex-col items-center justify-center gap-12'>
          <div className='flex items-center justify-start text-5xl font-semibold'>
            {renderAnimatedText(INTRODUCE_FIRST_LINE, 1.5)}
          </div>
          <div className='flex flex-col items-center gap-2'>
            <div className='text-xl'>{renderAnimatedText(SUBINTRODUCE_FIRST_LINE, 2.5)}</div>
            <div className='text-xl'>{renderAnimatedText(SUBINTRODUCE_SECOND_LINE, 4)}</div>
          </div>

          <Motion animation={fadeIn(0.5, 5)}>
            {/* TODO: 로그인 상태 검사해서 로그인O (/plan), 로그인X(로그인 창 이동) */}
            <Link href={ROUTES.LOGIN.url}>
              <Button
                variant='email'
                className='relative flex h-14 w-52 items-center justify-center gap-5 text-xl font-semibold'
              >
                여행 계획하기
                <Plane className='absolute right-5' />
              </Button>
            </Link>
          </Motion>
        </div>
      </div>
    </main>
  )
}

export default Home
