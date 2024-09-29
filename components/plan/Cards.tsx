'use client'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'

import { PLACE_DEFAULT_IMAGE, PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import useMapStore from '@/lib/context/mapStore'
import { queryClient } from '@/lib/HTTP/http'
import { placeAddScrap } from '@/lib/HTTP/place/API'
import { PlaceCardType } from '@/lib/HTTP/places/API'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'
import { toast } from '@/lib/utils/hooks/useToast'

import Backdrop from '../common/Backdrop'
import { MapPin } from '../common/MapPin'

interface SchedulePlaceCardProps {
  id: 'schedule' | 'scrap' | 'dummy'
  data: Place
  fillIndex: number
  isReduced: boolean
  className?: string
}

export const SchedulePlaceCard = ({ id, data, fillIndex, isReduced, className }: SchedulePlaceCardProps): ReactNode => {
  const { imgSrc, order, name, address, tag, stars, visitCnt, duration, geo } = data
  const { setCenter } = useMapStore()

  // const addressArr = address
  //   .split(' ')
  //   .filter((val, index) => index === 0 || index === 1)
  //   .join(' ')
  // console.log('schedulePalceCArd Data:', data)

  return (
    <>
      <div
        onClick={() => setCenter(geo)}
        className={cn(
          'relative flex min-h-min w-full cursor-pointer items-start justify-start gap-3 border-b-[0.5px] border-tbPlaceholder px-3 py-4',
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
            'flex flex-grow origin-left flex-col items-start justify-start gap-2',
            !isReduced && 'w-fit min-w-[170px]',
          )}
        >
          <div className='group flex w-fit items-center justify-start'>
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
          {!isReduced && <span className='w-fit text-sm'>방문자 {visitCnt}+</span>}
        </div>
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
    setTmpIsScrap(prev => !prev)
  }

  /**
   * 스크랩하기
   */
  const { mutate } = useMutation({
    mutationKey: ['place', 'scrap', { planId: data.id }],
    mutationFn: placeAddScrap,
    onSuccess: () => {
      toast({ title: '보관함에 추가되었습니다!' })
    },
    onError: () => {
      setTmpIsScrap(prev => !prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['places', 'search'] })
    },
  })

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
              className={cn('absolute right-2 top-1', tmpIsScrap ? 'hover:fill-none' : 'hover:fill-tbRed')}
              fill={tmpIsScrap ? 'tbRed' : undefined}
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
          <span className='w-fit text-sm'>리뷰 {reviewCnt}+</span>
          <span className='w-fit text-sm'>방문자 {visitCnt}+</span>
        </div>

        <div className='flex w-full items-center rounded-md bg-tbPlaceholder px-2 py-2 hover:bg-tbPlaceHolderHover'>
          <div className='line-clamp-2 w-full break-words text-sm'>
            {reviews.length !== 0 ? reviews[0].content : '리뷰 준비중입니다...'}
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
  const { imgSrc, title, likeCnt, scrapCnt, description, isScraped, commentCnt } = data
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
      <div className={cn('h- flex w-fit min-w-32 flex-grow origin-left flex-col items-start justify-start gap-2')}>
        <div className='group flex w-fit items-center justify-start'>
          {/* <MapPin num={order} size={22} className='group-hover:scale-125' /> */}
          <span className='text-base font-semibold group-hover:text-tbBlue'>{title}</span>
        </div>

        <div className='flex w-full items-center justify-between text-sm'>
          <p># 태그</p>
        </div>
        <div className='flex items-center justify-start gap-2'>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Heart' fill='tbRed' strokeWidth={0} />
            <span>{likeCnt}</span>
          </div>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='MessageCircle' strokeWidth={2.5} />
            <span>{commentCnt}</span>
          </div>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Bookmark' strokeWidth={2.5} />
            <span>{scrapCnt}</span>
          </div>
        </div>
        <div className='flex w-full items-center rounded-md bg-tbPlaceholder px-2 py-2 hover:bg-tbPlaceHolderHover'>
          <div className='line-clamp-2 w-full break-words text-sm'>{description}</div>
        </div>
      </div>
    </div>
  )
}
