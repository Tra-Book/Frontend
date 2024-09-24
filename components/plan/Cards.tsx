'use client'
import { revalidateTag } from 'next/cache'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { PLACE_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import { toast } from '@/lib/utils/hooks/useToast'

import Backdrop from '../common/Backdrop'
import { MapPin } from '../common/MapPin'

interface SchedulePlaceCardProps {
  id: 'schedule' | 'scrap'
  data: Place
  isReduced: boolean
}

export const SchedulePlaceCard = ({ id, data, isReduced }: SchedulePlaceCardProps): ReactNode => {
  const { imgSrc, order, name, address, tag, stars, visitCnt, duration } = data

  const addressArr = address
    .split(' ')
    .filter((val, index) => index === 0 || index === 1)
    .join(' ')

  return (
    <>
      <div className='relative flex min-h-min w-full cursor-pointer items-center justify-start gap-3 border-y-[0.5px] border-tbPlaceholder px-3 py-4'>
        {!isReduced && (
          <div className='group relative aspect-square h-full origin-left'>
            <Image src={imgSrc} alt='Place Image' className='h-full w-full origin-center rounded-md' />
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
            <MapPin
              num={order as number}
              size={22}
              fill={id === 'schedule' ? 'tbOrange' : 'tbGreen'}
              className='group-hover:scale-125'
            />
            <span className='text-base font-semibold group-hover:text-tbBlue'>{name}</span>
          </div>

          <p className='w-fit text-sm'>{address}</p>

          <div className='flex w-full items-center justify-between text-sm'>
            <p># {tag}</p>
            <p className='text-tbGray'>{duration}분</p>
          </div>
          <div className='flex w-fit items-center justify-start gap-1 text-sm'>
            <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
            <span>{stars}</span>
          </div>
          {!isReduced && <span className='w-fit text-sm'>방문자 {visitCnt}+</span>}
        </div>
      </div>
    </>
  )
}

interface PlaceCardProps {
  data: Place
  focusedPlaceCard: Place | undefined
  handleClickCard: (card: Place) => void
}

export const PlaceCard = ({ data, focusedPlaceCard, handleClickCard }: PlaceCardProps) => {
  const { id, imgSrc, order, name, address, tag, reviews, reviewCnt, stars, visitCnt, duration, isScraped } = data
  const session: any = useSession()

  const focusHandler = () => {
    handleClickCard(data)
    console.log(data)
  }

  /**
   * 유저의 스크랩하기 행동
   */
  const scrapHandler = async () => {
    try {
      const Route = BACKEND_ROUTES.PLACE.SCRAP

      const res = await fetch(`/server/${Route.url}`, {
        method: Route.method,
        headers: {
          Authorization: session.data.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeId: data.id,
        }),
        credentials: 'include',
      })
      if (res.ok) {
        toast({ title: '보관함에 추가되었습니다!' })
        // 낙관적 업데이트 (UI 먼저 반영)
        // Todo: 보관함 > 여행지 Revalidate Tag하기
        revalidateTag('places')
        return
      }
      // 400 에러 처리
      const status = res.status
      const errorData = await res.json() // 에러 메시지 확인

      switch (status) {
        case 400:
          console.log('Wrong Request')
          break
        default:
          console.log('Unhandled error')
          break
      }
    } catch (error) {
      console.log(error)

      console.log('Internal Server error')
    }
  }

  return (
    <div
      onClick={focusHandler}
      className={cn(
        'relative flex min-h-min w-full cursor-pointer items-center justify-start gap-3 border-t-[0.5px] border-tbPlaceholder px-3 py-4',
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
      <div className={cn('flex h-fit w-fit min-w-32 flex-grow origin-left flex-col items-start justify-start gap-2')}>
        <div className='group flex w-fit items-center justify-start'>
          {/* <MapPin num={order} size={22} className='group-hover:scale-125' /> */}
          <span className='truncate text-base font-semibold group-hover:text-tbBlue'>{name}</span>
          <LucideIcon
            name='Bookmark'
            className='absolute right-2 hover:fill-tbRed'
            fill={isScraped ? 'tbRed' : undefined}
            onClick={scrapHandler}
          />
        </div>

        <div className='flex w-full items-center justify-between text-sm'>
          <p># {tag}</p>
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
            {reviews ? reviews[0].content : '리뷰를 작성해주세요!'}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PlanCardProps {
  data: Plan
  handleClickCard: (card: Plan) => void
}

export const PlanCard = ({ data, handleClickCard }: PlanCardProps) => {
  const { imgSrc, title, likeCnt, scrapCnt, comments, description, isScraped } = data
  return (
    <div
      className={cn(
        'relative flex min-h-min w-full cursor-pointer items-center justify-start gap-3 border-t-[0.5px] border-tbPlaceholder px-3 py-4',
      )}
      onClick={() => handleClickCard(data)}
    >
      <div className='group relative aspect-square h-full origin-left'>
        <Image src={imgSrc} alt='Place Image' className='h-full w-full origin-center rounded-md' />
        <Backdrop className='hidden h-full w-full items-center justify-center rounded-md group-hover:flex' />
      </div>

      {/* 정보 */}
      <div className={cn('flex h-fit w-fit min-w-32 flex-grow origin-left flex-col items-start justify-start gap-2')}>
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
            <span>{comments?.length}</span>
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
