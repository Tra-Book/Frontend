'use client'
import { Plane } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect } from 'react'

import { Motion } from '@/components/common/MotionWrapper'
import { SLOGANS } from '@/components/common/Slogan'
import { Button } from '@/components/ui/button'
import { INITIAL_PLAN } from '@/lib/constants/dummy_data'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { fadeIn } from '@/lib/types/animation'
import { cn } from '@/lib/utils/cn'

const INTRODUCE_FIRST_LINE: Array<string> = ['여행 계획', '을 위한 최적화 플랫폼']
const SUBINTRODUCE_FIRST_LINE: Array<string> = ['빅데이터 ', '여행지 정보와 ', '참신한 계획들을 통해']
const SUBINTRODUCE_SECOND_LINE: Array<string> = ['손쉽게 여행 일정을 완성하세요']

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

const Home = (): ReactNode => {
  const session: any = useSession()

  const { setPlanData } = usePlanStore()

  useEffect(() => {
    setPlanData(INITIAL_PLAN)
  }, [])

  return (
    <main className='relative flex min-h-screen flex-grow flex-col items-center justify-start'>
      <div className='relative flex h-dvh w-full flex-grow flex-col items-center lg:flex-row'>
        <div className='flex h-3/5 w-full flex-col items-center justify-center gap-8 lg:h-full lg:w-1/3'>
          {SLOGANS.map((slogan, index) => (
            <Motion
              key={slogan}
              animation={{
                initial: { opacity: 0, x: -100 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.9], delay: index * 0.5 },
              }}
              className='font-mclaren text-4xl font-bold md:text-5xl'
            >
              {slogan}
            </Motion>
          ))}
        </div>

        <div className='relative flex h-2/5 flex-grow flex-col items-center justify-center gap-12'>
          <div className='flex items-center justify-start text-3xl font-semibold sm:text-4xl md:text-5xl'>
            {renderAnimatedText(INTRODUCE_FIRST_LINE, 1.5)}
          </div>
          <div className='flex flex-col items-center gap-2'>
            <div className='text-lg md:text-xl'>{renderAnimatedText(SUBINTRODUCE_FIRST_LINE, 2.5)}</div>
            <div className='text-lg md:text-xl'>{renderAnimatedText(SUBINTRODUCE_SECOND_LINE, 4)}</div>
          </div>

          <Motion animation={fadeIn(0.5, 5)}>
            <Link href={!session.data ? ROUTES.AUTH.LOGIN.url : ROUTES.PLAN.INDEX.url}>
              <Button
                variant='tbPrimary'
                className='relative flex h-14 w-52 items-center justify-center gap-3 text-xl font-semibold'
              >
                여행 계획하기
                <Plane />
              </Button>
            </Link>
          </Motion>
        </div>
      </div>
    </main>
  )
}

export default Home
