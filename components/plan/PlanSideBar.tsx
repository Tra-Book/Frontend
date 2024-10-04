'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

import { INITIAL_PLAN, PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ClientModalData } from '@/lib/constants/errors'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { useMutationStore } from '@/lib/HTTP/cacheKey'
import { UpdatePlanType } from '@/lib/HTTP/plan/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import useModal from '@/lib/utils/hooks/useModal'
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
  const router = useRouter()
  const session: any = useSession()

  const { planData, setPlanData, setIsReduced, setIsSearching } = usePlanStore()
  const { modalData, handleModalStates, Modal } = useModal()

  const { mutate: updatePlanMutate, isPending: isUpdating } = useMutationStore<UpdatePlanType>(['updatePlan'])

  const savePlanHandler = () => {
    if (isUpdating) {
      toast({ title: '이미 저장중입니다.' })
      return
    }
    updatePlanMutate({ plan: planData, userId: session.data.userId })
  }

  // TODO: 설정 기획 / 로직 만들기
  const openModalHandler = () => {
    handleModalStates(ClientModalData.serviceOnReady, 'open')
  }

  /**
   * 홈으로 가기
   */
  const backHandler = () => {
    handleModalStates(ClientModalData.routeWithoutSave, 'open')
  }

  /**
   * 계획 작성을 마무리하고, Post로 만드는 함수
   */
  const writePostHandler = () => {
    // #0. 필수 필드 확인
    if (planData.imgSrc === PLAN_DEFAULT_IMAGE) {
      handleModalStates(ClientModalData.checkImageError, 'open')
      return
    }
    if (!planData.title) {
      handleModalStates(ClientModalData.checkTitleError, 'open')
      return
    }
    if (!planData.description) {
      handleModalStates(ClientModalData.checkDescriptionError, 'open')
      return
    }
    if (!planData.memberCnt || planData.memberCnt === 0) {
      handleModalStates(ClientModalData.checkMemberCntError, 'open')
      return
    }
    if (!planData.budget) {
      handleModalStates(ClientModalData.checkBudgetError, 'open')
      return
    }
    // #1. 제출 확인 모달 열기
    handleModalStates(ClientModalData.submitPlan, 'open')
  }

  /**
   * 모달 Confirm시 수행할 작업
   */
  const onConfirm = () => {
    if (modalData.id === 'confirm') {
      switch (modalData) {
        // Case1 메인으로 이동하기
        case ClientModalData.routeWithoutSave:
          // 초기화
          setPlanData(INITIAL_PLAN)
          setIsSearching(false)
          setIsReduced(false)
          router.push(ROUTES.HOME.url)
          break

        // Case2 포스팅
        case ClientModalData.submitPlan:
          // #0. 저장 > onSuccess
          updatePlanMutate(
            { plan: planData, userId: session.data.userId },
            {
              onSuccess: (data: any) => {
                // #1. 여행계획 디테일 페이지로 Redirect
                router.push(`${ROUTES.PLAN.DETAIL.url}/${data.planId}`)
              },
            },
          )
          break
        // #0. 필드 필드 확인
        case ClientModalData.checkImageError:
          router.push(ROUTES.PLAN.PlAN.url)
      }
    }
  }
  return (
    <div className={className}>
      <div onClick={backHandler} className={cn(style, 'font- text-center font-mono text-xl font-bold')}>
        TRABOOK
      </div>

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
        {isUpdating ? (
          <Loading />
        ) : (
          <>
            <LucideIcon name='Save' size={iconSize} />
            저장
          </>
        )}
      </div>
      <div className={cn(style)} onClick={writePostHandler}>
        <LucideIcon name='PencilLine' size={iconSize} />
        포스팅
      </div>
      <div className={cn(style)} onClick={openModalHandler}>
        <LucideIcon name='Settings' size={iconSize} />
        설정
      </div>
      <Modal onConfirm={onConfirm} />
    </div>
  )
}

export default PlanSideBar
