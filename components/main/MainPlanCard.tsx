'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { NO_PLAN_DESCRIPTION, NO_PLAN_TITLE } from '@/lib/constants/no_data'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { attachQuery, Queries } from '@/lib/HTTP/http'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { formatDateToShortHyphenDate } from '@/lib/utils/dateUtils'
import { formatNumOfReview } from '@/lib/utils/stringUtils'

import Backdrop from '../common/Backdrop'

interface MainPlanCardProps {
  data: PlanCardType
}

// Todo: data props type 지정
const MainPlanCard = ({ data }: MainPlanCardProps): ReactNode => {
  const router = useRouter()
  const { setPlanData } = usePlanStore()
  const session: any = useSession()

  const {
    id,
    imgSrc,
    title,
    state,
    description,
    likeCnt,
    commentCnt,
    scrapCnt,
    startDate,
    endDate,
    isDone,
    isLiked,
    isPublic,
    isScraped,
    tags,
  } = data

  // Fc: 수정하기 클릭
  const handleUpdateClick = () => {
    const params: Queries = [
      {
        key: 'planId',
        value: id,
      },
    ]

    router.push(attachQuery(ROUTES.PLAN.PlAN.url, params)) // PlanId 붙여서 계획 세우기 열기
  }

  // Fc: 계획보기 클릭
  const handleMovePostClick = () => {
    router.push(`${ROUTES.PLAN.DETAIL.url}/${id}`)
  }
  return (
    <div className='group relative flex h-min w-full cursor-pointer flex-col justify-start gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-tb-shadow hover:scale-105'>
      <div className='relative w-full overflow-hidden rounded-md'>
        <Image
          width={300}
          height={200}
          src={(imgSrc as string) || PLAN_DEFAULT_IMAGE}
          alt='Plan Image'
          className='aspect-video w-full rounded-md object-cover'
        />
        <Backdrop className='hidden aspect-video w-full flex-col items-center justify-center gap-4 rounded-md text-tbWhite group-hover:flex'>
          <div
            onClick={handleUpdateClick}
            className='flex w-fit cursor-pointer items-center justify-start gap-3 rounded-lg p-2 hover:text-blue-200'
          >
            <LucideIcon name='PencilLine' size={24} />
            <span className=''>수정하기</span>
          </div>
          <div
            onClick={handleMovePostClick}
            className='flex w-fit cursor-pointer items-center justify-start gap-3 rounded-lg p-2 hover:text-tbSecondary'
          >
            <LucideIcon name='Plane' size={24} />
            <span className=''>계획보기</span>
          </div>
        </Backdrop>
      </div>
      <div className='relative'>
        <div className='flex items-end justify-start gap-3'>
          <h2 className='text-lg font-semibold hover:text-tbBlueHover lg:text-xl'>
            {title?.trim() ? title : NO_PLAN_TITLE}
          </h2>
          <span className='text-xs'>{state}</span>
        </div>

        <p className='flex items-center pb-5 pt-2 text-xs lg:text-sm'>
          {description?.trim() ? description : NO_PLAN_DESCRIPTION}
        </p>

        <div className='flex items-center justify-between text-xs lg:text-sm'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <LucideIcon color='tbRed' name='Heart' strokeWidth={3} />
              <span>{formatNumOfReview(likeCnt) || 0}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='MessageCircle' strokeWidth={3} />
              <span>{formatNumOfReview(commentCnt) || 0}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Bookmark' strokeWidth={3} />
              <span>{formatNumOfReview(scrapCnt) || 0}</span>
            </div>
          </div>
          <span>
            {formatDateToShortHyphenDate(startDate)} ~ {formatDateToShortHyphenDate(endDate)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MainPlanCard
