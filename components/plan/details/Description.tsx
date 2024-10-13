'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'

import UserAvatar from '@/components/common/UserAvatar'
import { PLAN_DEFAULT_IMAGE, USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ClientModalData } from '@/lib/constants/errors'
import { NO_USER_DESCRIPTION, NO_USER_NAME } from '@/lib/constants/no_data'
import { ROUTES } from '@/lib/constants/routes'
import { useMutationStore } from '@/lib/HTTP/cacheKey'
import { attachQuery, Queries } from '@/lib/HTTP/http'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import { formatKoreanDate } from '@/lib/utils/dateUtils'
import useModal from '@/lib/utils/hooks/useModal'
import { toast } from '@/lib/utils/hooks/useToast'
import { formatBudget, formatNumOfReview } from '@/lib/utils/stringUtils'

interface DescriptionProps {
  plan: Plan
  planUser: any
  user: any
  className?: string
}

const Description = ({ plan, planUser, user, className }: DescriptionProps): ReactNode => {
  const router = useRouter()
  // Modal Values
  const { modalData, handleModalStates, Modal } = useModal()

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
    id,
  } = plan
  const [tmpLikeData, setTmpLikeData] = useState({
    likeCnt: likeCnt,
    isLiked: isLiked,
  })
  const [tmpScrapData, setTmpScrapData] = useState({
    scrapCnt: scrapCnt,
    isScraped: isScraped,
  })

  const onConfirm = () => {
    if (modalData.id === 'confirm') {
      switch (modalData) {
        // Case: 로그인 필요
        case ClientModalData.loginRequiredError:
          router.push(ROUTES.AUTH.LOGIN.url)
          break
        // Case: 계획 삭제
        case ClientModalData.deletePlan:
          deletePlanMutate(
            { planId: id, accessToken: user.accessToken },
            {
              onSuccess: () => {
                router.push(ROUTES.MAIN.MY_PLAN.url) // 내 계획으로 이동
              },
            },
          )
          break
      }
    }
  }

  // #1. Plan Likes Mutation
  const { mutate: planLikeMutate, isPending: isLikesPending } = useMutationStore(
    !tmpLikeData.isLiked ? ['addPlanLikes'] : ['deletePlanLikes'],
  )

  const likeHandler = () => {
    if (isLikesPending) {
      toast({ title: '다른 작업 수행중입니다.' })
    }
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!user) {
      handleModalStates(ClientModalData.loginRequiredError, 'open')
    }
    // #2. 로그인 상태
    setTmpLikeData(prev => ({
      likeCnt: !tmpLikeData.isLiked ? (prev.likeCnt += 1) : (prev.likeCnt -= 1),
      isLiked: !prev.isLiked,
    }))
    planLikeMutate(
      { planId: id, accessToken: user.accessToken },
      {
        onError: error => {
          setTmpLikeData(prev => ({
            likeCnt: !tmpLikeData.isLiked ? (prev.likeCnt += 1) : (prev.likeCnt -= 1),
            isLiked: !prev.isLiked,
          }))
        },
      },
    )
  }

  // #1. Plan Scrap Mutations
  const { mutate: planScrapMutate, isPending: isScrapPending } = useMutationStore(
    !tmpScrapData.isScraped ? ['addPlanScrap'] : ['deletePlanScrap'],
  )
  const scrapHandler = () => {
    console.log('클릭은됨')
    if (isScrapPending) {
      toast({ title: '다른 작업 수행중입니다.' })
    }
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!user) {
      handleModalStates(ClientModalData.loginRequiredError, 'open')
    }
    // #2. 로그인 상태
    setTmpScrapData(prev => ({
      scrapCnt: !tmpScrapData.isScraped ? (prev.scrapCnt += 1) : (prev.scrapCnt -= 1),
      isScraped: !prev.isScraped,
    }))

    planScrapMutate(
      { planId: id, accessToken: user.accessToken },
      {
        onError: () => {
          setTmpScrapData(prev => ({
            scrapCnt: !tmpScrapData.isScraped ? (prev.scrapCnt += 1) : (prev.scrapCnt -= 1),
            isScraped: !prev.isScraped,
          }))
        },
      },
    )
  }

  // #2. Plan Delete Mutation
  const { mutate: deletePlanMutate } = useMutationStore(['deletePlan'])
  const planDeleteHandler = () => {
    // #1. 권한 없는 유저의 접근
    if (!user && planUser.userId === user.userId) {
      handleModalStates(ClientModalData.noAuthorizationError, 'open')
    }
    // #2. 권한 있는 사람의 접근
    handleModalStates(ClientModalData.deletePlan, 'open')
  }
  // Fc: 수정버튼 클릭시
  const updateClickHandler = () => {
    const params: Queries = [
      {
        key: 'planId',
        value: id,
      },
    ]

    router.push(attachQuery(ROUTES.PLAN.PlAN.url, params)) // PlanId 붙여서 계획 세우기 열기
  }

  return (
    <div className={cn('relative flex items-start justify-start gap-6 px-3 pb-2 pt-6', className)}>
      <div className='items-cente relative flex h-full w-80 justify-center'>
        <Image
          src={(imgSrc as string) || PLAN_DEFAULT_IMAGE}
          alt='Plan Image'
          width={320}
          height={200}
          className='aspect-video w-full rounded-md object-cover shadow-md'
        />
      </div>

      <div className={cn('flex h-fit min-h-full w-fit flex-grow origin-left flex-col items-start justify-start gap-3')}>
        {/* 유저정보 */}
        <div className='flex items-center justify-start gap-4'>
          <UserAvatar imgSrc={planUser.image || USER_DEFAULT_IMAGE} />
          <div>
            <p className='text-lg font-semibold'>{planUser.username || NO_USER_NAME}</p>
            <p className='text-sm text-tbGray'>{planUser.status_message || NO_USER_DESCRIPTION}</p>
          </div>
        </div>
        {/* 정보 */}
        {/* 계획정보 */}
        <div className='flex w-fit flex-col items-start justify-start gap-3'>
          <span className='truncate text-3xl font-semibold'>{title}</span>
          <span className='truncate text-base font-semibold text-tbGray'>{description}</span>
          <span className='font-medium'>{`${formatKoreanDate(startDate)} ~ ${formatKoreanDate(endDate)}`}</span>
        </div>

        <div className='flex w-full items-center justify-start gap-3 text-base font-medium'>
          <span>{memberCnt}명</span>
          <span>{budget ? formatBudget(budget) : 0}원</span>
        </div>
        <div className='flex items-center justify-start gap-3'>
          <div onClick={likeHandler} className='flex w-fit cursor-pointer items-center justify-start gap-1 text-base'>
            <LucideIcon
              name='Heart'
              fill={tmpLikeData.isLiked ? 'tbRed' : undefined}
              // strokeWidth={tmpLikeData ? 0 : 2}
              size={20}
              // className={cn(tmpScrapData ? 'hover:fill-none' : 'hover:fill-tbRed')}
            />
            <span>{formatNumOfReview(tmpLikeData.likeCnt)}</span>
          </div>
          <div className='flex w-fit cursor-pointer items-center justify-start gap-1 text-base'>
            <LucideIcon name='MessageCircle' size={20} />
            <span>{comments ? formatNumOfReview(comments?.length) : 0}</span>
          </div>
          <div onClick={scrapHandler} className='flex w-fit cursor-pointer items-center justify-start gap-1 text-base'>
            <LucideIcon
              name='Bookmark'
              // className={cn(tmpScrapData ? 'hover:fill-none' : 'hover:fill-tbPrimaryHover')}
              fill={tmpScrapData.isScraped ? 'tbPrimaryHover' : undefined}
              size={20}
            />
            <span>{formatNumOfReview(tmpScrapData.scrapCnt)}</span>
          </div>
        </div>
      </div>
      {/* 버튼들: 계획 소유자만 보임 */}
      {!user && planUser.userId === user.userId && (
        <div className='asbolute right-0 top-0 flex items-center justify-center gap-2 font-medium'>
          <div onClick={updateClickHandler} className='cursor-pointer hover:text-tbBlueHover'>
            수정
          </div>
          <div onClick={planDeleteHandler} className='cursor-pointer hover:text-tbRed'>
            삭제
          </div>
        </div>
      )}

      <Modal onConfirm={onConfirm} />
    </div>
  )
}

export default Description
