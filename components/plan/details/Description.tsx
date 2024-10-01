'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import Backdrop from '@/components/common/Backdrop'
import UserAvatar from '@/components/common/UserAvatar'
import { PLAN_DEFAULT_IMAGE, USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { NO_USER_DESCRIPTION, NO_USER_NAME } from '@/lib/constants/no_data'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import { formatKoreanDate } from '@/lib/utils/dateUtils'

interface DescriptionProps {
  plan: Plan
  planUser: any
  user: any
  className?: string
}

const Description = ({ plan, planUser, user, className }: DescriptionProps): ReactNode => {
  const router = useRouter()

  // #0. 계획 데이터
  const {
    imgSrc,
    title,
    description,
    startDate,
    endDate,
    memberCnt,
    budget,
    likeCnt,
    isLiked,
    scrapCnt,
    isScraped,
    comments,
  } = plan

  /**
   * 좋아요 클릭 함수
   */
  const likeHandler = () => {
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!user) {
      router.push(ROUTES.AUTH.LOGIN.url)
    }
    // #2. 로그인 상태
  }

  const scrapHandler = () => {
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!user) {
      router.push(ROUTES.AUTH.LOGIN.url)
    }
    // #2. 로그인 상태
  }
  return (
    <div className={cn('relative flex cursor-pointer items-start justify-start gap-6 px-3 py-6', className)}>
      <div className='group relative aspect-video h-full origin-left'>
        <Image
          src={(imgSrc as string) || PLAN_DEFAULT_IMAGE}
          alt='Plan Image'
          width={320}
          height={200}
          className='h-full w-full origin-center rounded-md'
        />

        <Backdrop className='hidden h-full w-full items-center justify-center rounded-md group-hover:flex' />
      </div>

      {/* 정보 */}
      <div className={cn('flex h-fit min-h-full w-fit flex-grow origin-left flex-col items-start justify-start gap-3')}>
        {/* 유저정보 */}
        <div className='flex items-center justify-start gap-2'>
          <UserAvatar imgSrc={planUser.image || USER_DEFAULT_IMAGE} />
          <div>
            <p className='text-lg font-semibold'>{planUser.username || NO_USER_NAME}</p>
            <p className='text-sm text-tbGray'>{planUser.status_message || NO_USER_DESCRIPTION}</p>
          </div>
        </div>
        {/* 계획정보 */}
        <div className='flex w-fit flex-col items-start justify-start gap-3'>
          <span className='truncate text-3xl font-semibold'>{title}</span>
          <span className='truncate text-base font-semibold text-tbGray'>{description}</span>
          <span className='font-medium'>{`${formatKoreanDate(startDate)} ~ ${formatKoreanDate(endDate)}`}</span>
        </div>

        <div className='flex w-full items-center justify-start gap-3 text-base font-medium'>
          <span>{memberCnt}명</span>
          <span>{budget}원</span>
        </div>
        <div className='flex items-center justify-start gap-3'>
          <div className='flex w-fit items-center justify-start gap-1 text-base'>
            <LucideIcon name='Heart' fill={isLiked ? 'tbRed' : undefined} strokeWidth={isLiked ? 0 : 2} />
            <span>{likeCnt}</span>
          </div>
          <div onClick={likeHandler} className='flex w-fit items-center justify-start gap-1 text-base'>
            <LucideIcon name='MessageCircle' />
            <span>{comments?.length}</span>
          </div>
          <div onClick={scrapHandler} className='flex w-fit items-center justify-start gap-1 text-base'>
            <LucideIcon name='Bookmark' fill={isScraped ? 'tbRed' : undefined} />
            <span>{scrapCnt}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description
