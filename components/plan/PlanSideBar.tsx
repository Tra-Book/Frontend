'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { updatePlan } from '@/lib/HTTP/plan/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import { toast } from '@/lib/utils/hooks/useToast'

import Loading from '../common/Loading'

interface PlanSideBarProps {
  className?: string
}

const style =
  'flex flex-col h-1/6 max-h-[100px] w-full items-center justify-center text-l font-semibold gap-2 hover:bg-tbPrimary cursor-pointer'
const iconSize: number = 24

const PlanSideBar = ({ className }: PlanSideBarProps): ReactNode => {
  const pathname = usePathname()
  const { planData, setPlanData } = usePlanStore()
  const session: any = useSession()

  const { mutate, isPending } = useMutation({
    mutationKey: ['plan', 'update', planData.id],
    mutationFn: updatePlan,
    onSuccess: data => {
      const { imgSrc } = data
      toast({ title: '저장되었습니다' }) // 성공 메세지
      // 이미지 업데이트
      setPlanData({
        imgSrc,
      })
    },
    onError: () => {
      toast({ title: 'Error occured on Saving...' })
    },
  })

  const savePlanHandler = () => {
    mutate({ plan: planData, userId: session.data.userId })
  }
  return (
    <div className={className}>
      <Link href={ROUTES.HOME.url} className={cn(style, 'font- text-center font-mono text-xl font-bold')}>
        TRABOOK
      </Link>

      <Link
        href={ROUTES.PLAN.PlAN.url}
        className={cn(
          style,
          (pathname === ROUTES.PLAN.PlAN.url || pathname === ROUTES.PLAN.INDEX.url) &&
            'bg-tbPrimary hover:bg-tbPrimaryHover',
        )}
      >
        <LucideIcon name='Plane' size={iconSize} />
        <div>여행 정보</div>
      </Link>

      <Link
        href={ROUTES.PLAN.SCHEDULE.url}
        className={cn(style, pathname.includes(ROUTES.PLAN.SCHEDULE.url) && 'bg-tbPrimary hover:bg-tbPrimaryHover')}
      >
        <LucideIcon name='MapPin' size={iconSize} />
        <div>장소 검색</div>
      </Link>

      <div className='grow'>
        <Link
          href={ROUTES.PLAN.SCRAP.PLACE.url}
          className={cn(
            style,
            pathname.includes(ROUTES.PLAN.SCRAP.PLACE.url.replace('/place', '')) &&
              'bg-tbPrimary hover:bg-tbPrimaryHover',
            'h-full max-h-[100px]',
          )}
        >
          <LucideIcon name='Bookmark' size={iconSize} />
          <div>보관함</div>
        </Link>
      </div>

      <div onClick={savePlanHandler} className={cn(style)}>
        {isPending ? (
          <Loading />
        ) : (
          <>
            <LucideIcon name='Save' size={iconSize} />
            저장
          </>
        )}
      </div>
      <div className={cn(style)}>
        <LucideIcon name='Settings' size={iconSize} />
        설정
      </div>
    </div>
  )
}

export default PlanSideBar
