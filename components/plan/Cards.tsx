'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'

import { PLACE_DEFAULT_IMAGE, PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ClientModalData } from '@/lib/constants/errors'
import { NO_PLAN_TITLE, NO_REVIEW_TEXT, NO_TAGS, NO_USER_DESCRIPTION } from '@/lib/constants/no_data'
import { ROUTES } from '@/lib/constants/routes'
import useMapStore from '@/lib/context/mapStore'
import { useMutationStore } from '@/lib/HTTP/cacheKey'
import { AddPlaceScrapType, DeletePlaceScrapType } from '@/lib/HTTP/place/API'
import { PlaceCardType } from '@/lib/HTTP/places/API'
import { AddPlanLikesType, AddPlanScrapType, DeletePlanLikesType, DeletePlanScrapType } from '@/lib/HTTP/plan/API'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'
import useModal from '@/lib/utils/hooks/useModal'
import { toast } from '@/lib/utils/hooks/useToast'
import { formatNumOfReview } from '@/lib/utils/stringUtils'

import Backdrop from '../common/Backdrop'
import { MapPin } from '../common/MapPin'

interface SchedulePlaceCardProps {
  id: 'schedule' | 'scrap' | 'dummy'
  data: Place
  deletePlaceHandler?: (placeId: number) => void
  fillIndex: number
  isReduced: boolean
  className?: string
}

export const SchedulePlaceCard = ({
  id,
  data,
  deletePlaceHandler,
  fillIndex,
  isReduced,
  className,
}: SchedulePlaceCardProps): ReactNode => {
  const { imgSrc, order, name, address, tag, stars, visitCnt, duration, geo } = data
  const { setCenter } = useMapStore()

  const deleteHandler = () => {
    if (deletePlaceHandler) deletePlaceHandler(data.id)
  }
  return (
    <>
      <div
        onClick={() => setCenter(geo)}
        className={cn(
          'relative flex min-h-min w-full cursor-pointer items-start justify-start gap-3 border-b-[0.5px] border-tbPlaceholder px-3 py-4 hover:bg-tbPlaceHolderHover',
          id === 'dummy' && 'pointer-events-none invisible opacity-0',
          className,
        )}
      >
        {!isReduced && (
          <div className='group relative aspect-square h-full origin-left'>
            <Image
              width={124}
              height={124}
              src={(imgSrc as string) || PLACE_DEFAULT_IMAGE}
              alt='Place Image'
              className='h-full w-full origin-center rounded-md'
            />
            <Backdrop className='hidden h-full w-full items-center justify-center rounded-md group-hover:flex' />
          </div>
        )}

        {/* 정보 */}
        <div
          className={cn(
            'relative flex flex-grow origin-left flex-col items-start justify-start gap-2',
            !isReduced && 'w-fit min-w-[170px]',
          )}
        >
          <div className='group relative flex w-fit items-center justify-start'>
            <MapPin num={order as number} size={22} fillIndex={fillIndex} className='group-hover:scale-125' />
            <span className='line-clamp-1 text-base font-semibold group-hover:text-tbBlue'>{name}</span>
          </div>

          <p className='w-fit text-sm'>{address}</p>

          <div className='flex w-full items-center justify-between text-sm'>
            <p># {tag || '태그 없음'}</p>
            <p className='text-tbGray'>{duration}분</p>
          </div>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
            <span>{stars || 0}</span>
          </div>
          {!isReduced && <span className='w-fit text-sm'>방문자 {formatNumOfReview(visitCnt)}</span>}
        </div>
        {deletePlaceHandler && (
          <LucideIcon
            onClick={deleteHandler}
            name='X'
            className='absolute right-3 top-3 hover:text-tbRed'
            strokeWidth={3}
          />
        )}
      </div>
    </>
  )
}

interface PlaceCardProps {
  data: PlaceCardType
  focusedPlaceCard: PlaceCardType | undefined
  handleClickCard: (card: PlaceCardType) => void
}

export const PlaceCard = ({ data, focusedPlaceCard, handleClickCard }: PlaceCardProps) => {
  const { id, imgSrc, name, address, tag, reviews, reviewCnt, stars, visitCnt, isScraped } = data
  const session: any = useSession()

  const [tmpIsScrap, setTmpIsScrap] = useState<boolean>(isScraped)

  const { mutate: scrapPlaceMutate } = useMutationStore<AddPlaceScrapType | DeletePlaceScrapType>(
    !tmpIsScrap ? ['addPlaceScrap'] : ['deletePlaceScrap'],
  )

  const focusHandler = () => {
    handleClickCard(data)
  }
  // scrap
  const scrapHandler = () => {
    scrapPlaceMutate(
      { placeId: data.id, accessToken: session.data.accessToken },
      {
        onSuccess: () => {
          setTmpIsScrap(prev => !prev)
        },
        onError: () => {
          setTmpIsScrap(prev => !prev)
        },
      },
    )
  }

  return (
    <div
      onClick={focusHandler}
      className={cn(
        'relative flex min-h-48 w-full cursor-pointer items-center justify-start gap-3 border-t-[0.5px] border-tbPlaceholder px-3 py-4',
        focusedPlaceCard?.id === id && 'bg-tbGreen hover:bg-tbGreenHover',
      )}
    >
      <div className='group relative aspect-square h-full origin-left'>
        <Image
          src={imgSrc ? imgSrc : PLACE_DEFAULT_IMAGE}
          alt='Place Image'
          width={124}
          height={124}
          className='h-full w-full origin-center rounded-md'
        />

        <Backdrop className='hidden h-full w-full items-center justify-center rounded-md group-hover:flex' />
      </div>

      {/* 정보 */}
      <div
        className={cn('flex h-full w-fit min-w-32 flex-grow origin-left flex-col items-start justify-between gap-2')}
      >
        <div className='group flex w-full flex-col items-start justify-start gap-1'>
          {/* <MapPin num={order} size={22} className='group-hover:scale-125' /> */}
          <div className='relative flex w-full items-center justify-start'>
            <span className='truncate text-base font-semibold group-hover:text-tbBlue'>{name}</span>
            <LucideIcon
              name='Bookmark'
              className={cn('absolute right-2 top-1')}
              fill={tmpIsScrap ? 'tbPrimaryHover' : undefined}
              onClick={scrapHandler}
            />
          </div>
          <div className='relative flex w-full items-center justify-between text-sm'>
            <p># {tag}</p>
          </div>
        </div>

        <div className='flex items-center justify-start gap-2'>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
            <span>{stars}</span>
          </div>
          <span className='w-fit text-sm'>리뷰 {formatNumOfReview(reviewCnt)}</span>
          <span className='w-fit text-sm'>방문자 {formatNumOfReview(visitCnt)}</span>
        </div>

        <div className='flex w-full items-center rounded-md bg-tbPlaceholder px-2 py-2 hover:bg-tbPlaceHolderHover'>
          <div className='line-clamp-2 w-full break-words text-sm'>
            {reviews.length !== 0 ? reviews[0].content : NO_REVIEW_TEXT}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PlanCardProps {
  data: PlanCardType
  handleClickCard: (card: PlanCardType) => void
}

export const PlanCard = ({ data, handleClickCard }: PlanCardProps) => {
  const router = useRouter()

  const session: any = useSession()
  const { modalData, handleModalStates, Modal } = useModal()

  const { id, imgSrc, title, likeCnt, scrapCnt, description, commentCnt, tags, isScraped, isLiked } = data

  // 임시 반영을 위한
  const [tmpLikeData, setTmpLikeData] = useState({
    likeCnt: likeCnt,
    isLiked: isLiked,
  })
  const [tmpScrapData, setTmpScrapData] = useState({
    scrapCnt: scrapCnt,
    isScraped: isScraped,
  })

  // #1. Plan Likes Mutation
  const { mutate: likesMutate, isPending: isLikesPending } = useMutationStore<AddPlanLikesType | DeletePlanLikesType>(
    !tmpLikeData.isLiked ? ['addPlanLikes'] : ['deletePlanLikes'],
  )
  // #2. Plan Scrap Mutations
  const { mutate: scrapPlaceMutate, isPending: isScrapPending } = useMutationStore<
    AddPlanScrapType | DeletePlanScrapType
  >(!tmpScrapData.isScraped ? ['addPlanScrap'] : ['deletePlanScrap'])

  const likeHandler = () => {
    if (isLikesPending) {
      toast({ title: '다른 작업 수행중입니다.' })
    }
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!session.data) {
      handleModalStates(ClientModalData.loginRequiredError, 'open')
    }
    // #2. 로그인 상태
    setTmpLikeData(prev => ({
      likeCnt: !tmpLikeData.isLiked ? (prev.likeCnt += 1) : (prev.likeCnt -= 1),
      isLiked: !prev.isLiked,
    }))
    likesMutate(
      { planId: id, accessToken: session.data.accessToken },
      {
        onError: error => {
          setTmpLikeData(prev => ({
            likeCnt: !tmpLikeData.isLiked ? (prev.likeCnt -= 1) : (prev.likeCnt += 1),
            isLiked: !prev.isLiked,
          }))
          toast({ title: '서버 오류 다시 시도해주세요' })
        },
      },
    )
  }

  const scrapHandler = () => {
    if (isScrapPending) {
      toast({ title: '다른 작업 수행중입니다.' })
    }
    // #1. 로그인X 상태 (좋아요 누르기, 스크랩 누르기)
    if (!session.data) {
      handleModalStates(ClientModalData.loginRequiredError, 'open')
    }
    // #2. 로그인 상태
    setTmpScrapData(prev => ({
      scrapCnt: !tmpScrapData.isScraped ? (prev.scrapCnt += 1) : (prev.scrapCnt -= 1),
      isScraped: !prev.isScraped,
    }))
    scrapPlaceMutate(
      { planId: id, accessToken: session.data.accessToken },
      {
        onError: () => {
          setTmpScrapData(prev => ({
            scrapCnt: !tmpScrapData.isScraped ? (prev.scrapCnt -= 1) : (prev.scrapCnt += 1),
            isScraped: !prev.isScraped,
          }))
        },
      },
    )
  }

  const onConfirm = () => {
    if (modalData.id === 'confirm') {
      switch (modalData) {
        // Case: 로그인 필요
        case ClientModalData.loginRequiredError:
          router.push(ROUTES.AUTH.LOGIN.url)
          break
      }
    }
  }
  return (
    <div
      className={cn(
        'group relative flex min-h-48 w-full items-center justify-start gap-3 border-t-[0.5px] border-tbPlaceholder px-3 py-4',
      )}
    >
      <div className='group relative aspect-square h-full origin-left'>
        <Image
          src={(imgSrc as string) || PLAN_DEFAULT_IMAGE}
          alt='Place Image'
          width={124}
          height={124}
          className='h-full w-full origin-center rounded-md'
        />
        <Backdrop className='hidden h-full w-full flex-col items-center justify-center rounded-md group-hover:flex'>
          <div
            onClick={() => handleClickCard(data)}
            // onClick={handleMovePostClick}
            className='flex w-fit cursor-pointer items-center justify-start gap-3 rounded-lg p-2 group-hover:text-tbWhite'
          >
            <LucideIcon name='Plane' />
            <span className=''>계획보기</span>
          </div>
        </Backdrop>
      </div>

      {/* 정보 */}
      <div
        className={cn('flex h-full w-fit min-w-32 flex-grow origin-left flex-col items-start justify-between gap-2')}
      >
        <div className='group flex w-fit flex-col items-start justify-start gap-1'>
          {/* <MapPin num={order} size={22} className='group-hover:scale-125' /> */}
          <span className='text-base font-semibold hover:text-tbBlue group-hover:text-tbBlue'>
            {title || NO_PLAN_TITLE}
          </span>
          {tags ? (
            tags.map((tag, index) => (
              <span className='text-sm' key={index}>
                # {tag}
              </span>
            ))
          ) : (
            <span>{NO_TAGS}</span>
          )}
        </div>

        <div className='relative flex w-full flex-col items-start justify-start gap-2'>
          <div className='flex w-full items-center justify-start gap-2'>
            <div onClick={likeHandler} className='flex w-fit cursor-pointer items-center justify-start gap-1 text-sm'>
              <LucideIcon name='Heart' fill={tmpLikeData.isLiked ? 'tbRed' : undefined} />
              <span>{tmpLikeData.likeCnt}</span>
            </div>

            <div className='flex w-fit cursor-pointer items-center justify-start gap-1 text-sm'>
              <LucideIcon name='MessageCircle' />
              <span>{formatNumOfReview(commentCnt)}</span>
            </div>

            <div onClick={scrapHandler} className='flex w-fit cursor-pointer items-center justify-start gap-1 text-sm'>
              <LucideIcon name='Bookmark' fill={tmpScrapData.isScraped ? 'tbPrimaryHover' : undefined} />
              <span>{formatNumOfReview(tmpScrapData.scrapCnt)}</span>
            </div>
          </div>
          <div className='flex w-full items-center rounded-md bg-tbPlaceholder px-2 py-2 hover:bg-tbPlaceHolderHover'>
            <div className='line-clamp-2 w-full break-words text-sm'>{description || NO_USER_DESCRIPTION}</div>
          </div>
        </div>
      </div>
      <Modal onConfirm={onConfirm} />
    </div>
  )
}
