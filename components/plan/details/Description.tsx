'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'

import UserAvatar from '@/components/common/UserAvatar'
import { USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ClientModalData } from '@/lib/constants/errors'
import { NO_USER_DESCRIPTION, NO_USER_NAME } from '@/lib/constants/no_data'
import { ROUTES } from '@/lib/constants/routes'
import { queryClient } from '@/lib/HTTP/http'
import { planAddLikes, planAddScrap, planDeleteLikes, planDeleteScrap } from '@/lib/HTTP/plan/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import { formatKoreanDate } from '@/lib/utils/dateUtils'
import useModal from '@/lib/utils/hooks/useModal'
import { toast } from '@/lib/utils/hooks/useToast'

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
  console.log(plan)

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
  const [tmpIsLiked, setTmpIsLiked] = useState<boolean>(isLiked)
  const [tmpIsScraped, setTmpIsScraped] = useState<boolean>(isScraped)

  const onConfirm = () => {
    if (modalData.id === 'confirm') {
      switch (modalData) {
        case ClientModalData.loginRequiredError:
          router.push(ROUTES.AUTH.LOGIN.url)
          break

        default:
          break
      }
    }
  }

  // #1. Plan Likes Mutation
  const { mutate: likesMutate } = useMutation({
    mutationKey: ['plan', 'likes', { planId: id }],
    mutationFn: !tmpIsLiked ? planAddLikes : planDeleteLikes,
    onSuccess: () => {
      setTmpIsLiked(prev => !prev)
      toast({ title: '변경 완료!' })
    },
    onError: () => {
      setTmpIsLiked(prev => !prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', 'likes', { planId: id }] })
    },
  })

  const likeHandler = () => {
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!user) {
      handleModalStates(ClientModalData.loginRequiredError, 'open')
    }
    // #2. 로그인 상태
    likesMutate({ planId: id, accessToken: user.accessToken })
  }

  // #1. Plan Scrap Mutations
  const { mutate: scrapMutate } = useMutation({
    mutationKey: ['plan', 'scrap', { planId: id }],
    mutationFn: !tmpIsScraped ? planAddScrap : planDeleteScrap,
    onSuccess: () => {
      setTmpIsScraped(prev => !prev)
      toast({ title: '변경 완료!' })
    },
    onError: () => {
      setTmpIsScraped(prev => !prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', 'scrap', { planId: id }] })
    },
  })
  const scrapHandler = () => {
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!user) {
      handleModalStates(ClientModalData.loginRequiredError, 'open')
    }
    // #2. 로그인 상태
    scrapMutate({ planId: id, accessToken: user.accessToken })
  }

  return (
    <div className={cn('relative flex-col items-start justify-start gap-6 px-3 pb-2 pt-6', className)}>
      {/* <div className='group relative h-48 min-h-min'>
        <Image
          src={(imgSrc as string) || PLAN_DEFAULT_IMAGE}
          alt='Plan Image'
          width={320}
          height={200}
          className='h-full rounded-md object-contain'
        />

        <Backdrop className='hidden h-full w-full items-center justify-center rounded-md group-hover:flex' />
      </div> */}
      {/* <Title title='여행 설명' /> */}
      {/* 정보 */}
      <div className={cn('flex h-fit min-h-full w-fit flex-grow origin-left flex-col items-start justify-start gap-3')}>
        {/* 유저정보 */}
        <div className='flex items-center justify-start gap-4'>
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
          <div className='flex w-fit cursor-pointer items-center justify-start gap-1 text-base'>
            <LucideIcon name='MessageCircle' size={20} />
            <span>{comments?.length}</span>
          </div>
          <div className='flex w-fit cursor-pointer items-center justify-start gap-1 text-base'>
            <LucideIcon
              onClick={likeHandler}
              name='Heart'
              fill={tmpIsLiked ? 'tbRed' : undefined}
              // strokeWidth={tmpIsLiked ? 0 : 2}
              size={20}
              // className={cn(tmpIsScraped ? 'hover:fill-none' : 'hover:fill-tbRed')}
            />
            <span>{likeCnt}</span>
          </div>
          <div className='flex w-fit cursor-pointer items-center justify-start gap-1 text-base'>
            <LucideIcon
              onClick={scrapHandler}
              name='Bookmark'
              // className={cn(tmpIsScraped ? 'hover:fill-none' : 'hover:fill-tbPrimaryHover')}
              fill={tmpIsScraped ? 'tbPrimaryHover' : undefined}
              size={20}
            />
            <span>{scrapCnt}</span>
          </div>
        </div>
      </div>
      <Modal onConfirm={onConfirm} />
    </div>
  )
}

export default Description
