'use client'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'

import { PLACE_DEFAULT_IMAGE, PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { NO_REVIEW_TEXT, NO_TAGS, NO_USER_DESCRIPTION } from '@/lib/constants/no_data'
import useMapStore from '@/lib/context/mapStore'
import { queryClient } from '@/lib/HTTP/http'
import { placeAddScrap, placeDeleteScrap } from '@/lib/HTTP/place/API'
import { PlaceCardType } from '@/lib/HTTP/places/API'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'
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
        {!deleteHandler && (
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
  const focusHandler = () => {
    handleClickCard(data)
  }
  // scrap
  const scrapHandler = () => {
    mutate({ placeId: data.id, accessToken: session.data.accessToken })
  }

  /**
   * 스크랩하기 및 삭제하기
   */
  const { mutate } = useMutation({
    mutationKey: ['place', 'scrap', { placeId: data.id }],
    mutationFn: !tmpIsScrap ? placeAddScrap : placeDeleteScrap,
    onSuccess: () => {
      setTmpIsScrap(prev => !prev)
      toast({ title: '변경되었습니다!' })
    },
    onError: () => {
      toast({ title: '다시 시도해주세요!' })
      setTmpIsScrap(prev => !prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['places', 'search'] })
    },
  })

  useEffect(() => {
    console.log(tmpIsScrap)
  }, [tmpIsScrap])

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
              className={cn('absolute right-2 top-1', tmpIsScrap ? 'hover:fill-none' : 'hover:fill-tbPrimaryHover')}
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
  const { imgSrc, title, likeCnt, scrapCnt, description, isScraped, commentCnt, tags } = data
  return (
    <div
      className={cn(
        'relative flex min-h-48 w-full cursor-pointer items-center justify-start gap-3 border-t-[0.5px] border-tbPlaceholder px-3 py-4',
      )}
      onClick={() => handleClickCard(data)}
    >
      <div className='group relative aspect-square h-full origin-left'>
        <Image
          src={(imgSrc as string) || PLAN_DEFAULT_IMAGE}
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
        <div className='group flex w-fit flex-col items-start justify-start gap-1'>
          {/* <MapPin num={order} size={22} className='group-hover:scale-125' /> */}
          <span className='text-base font-semibold group-hover:text-tbBlue'>{title}</span>
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
            <div className='flex w-fit items-center justify-start gap-1 text-sm'>
              <LucideIcon name='Heart' fill='tbRed' strokeWidth={0} />
              <span>{likeCnt}</span>
            </div>
            <div className='flex w-fit items-center justify-start gap-1 text-sm'>
              <LucideIcon name='MessageCircle' strokeWidth={2.5} />
              <span>{formatNumOfReview(commentCnt)}</span>
            </div>
            <div className='flex w-fit items-center justify-start gap-1 text-sm'>
              <LucideIcon name='Bookmark' strokeWidth={2.5} />
              <span>{formatNumOfReview(scrapCnt)}</span>
            </div>
          </div>
          <div className='flex w-full items-center rounded-md bg-tbPlaceholder px-2 py-2 hover:bg-tbPlaceHolderHover'>
            <div className='line-clamp-2 w-full break-words text-sm'>{description || NO_USER_DESCRIPTION}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
