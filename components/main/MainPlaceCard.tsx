'use client'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'

import { PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ClientModalData } from '@/lib/constants/errors'
import { NO_REVIEW_TEXT } from '@/lib/constants/no_data'
import { queryClient } from '@/lib/HTTP/http'
import { placeDeleteScrap } from '@/lib/HTTP/place/API'
import { PlaceCardType } from '@/lib/HTTP/places/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import useModal from '@/lib/utils/hooks/useModal'
import { toast } from '@/lib/utils/hooks/useToast'
import ToggleWrapper, { useDropdown } from '@/lib/utils/hooks/useToggle'

import Backdrop from '../common/Backdrop'

interface PlaceCardProps {
  data: PlaceCardType
  user: any
}

// Todo: data props type 지정
const MainPlaceCard = ({ data, user }: PlaceCardProps): ReactNode => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const { imgSrc, name, tag, stars, visitCnt, reviews, reviewCnt, id } = data
  return (
    <div className='relative flex h-min w-full cursor-pointer flex-col justify-start gap-2 overflow-hidden rounded-lg bg-white p-3 shadow-tb-shadow'>
      <div className='group relative w-full overflow-hidden rounded-md'>
        <Image
          width={300}
          height={200}
          src={imgSrc || PLAN_DEFAULT_IMAGE}
          alt='Plan Image'
          className='aspect-video w-full rounded-md object-cover'
        />
        <Backdrop className='hidden aspect-video w-full items-center justify-center rounded-md group-hover:flex' />
      </div>
      <div className='relative flex flex-col justify-start gap-4'>
        <div className='relative flex items-end justify-start gap-3'>
          <h2 className='text-lg font-bold hover:text-tbBlueHover lg:text-xl'>{name}</h2>
          <span className='text-sm'>&#35;{tag}</span>
          <Menu id={id} setIsDeleted={setIsDeleted} user={user} />
        </div>

        <div className='flex w-full flex-col items-start justify-between gap-2 text-sm lg:text-sm'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Star' fill='tbPrimary' strokeWidth={0} />
              <span>{stars}</span>
            </div>
            <div className='flex items-center gap-1'>
              <LucideIcon name='Plane' strokeWidth={2} />
              <span>{visitCnt}</span>
            </div>
            <div className='flex items-center gap-1'>
              <span>리뷰</span>
              <span>{reviewCnt}+</span>
            </div>
          </div>
          <div className='flex min-h-16 w-full items-center text-wrap break-words rounded-md bg-tbPlaceholder px-2 py-2 hover:bg-tbPlaceHolderHover lg:text-sm'>
            <div className='line-clamp-2 w-full break-words text-sm'>
              {reviews.length === 0 ? NO_REVIEW_TEXT : reviews[0].content}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPlaceCard

interface MenuProps {
  id: number
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
  user: any
}

const Menu = ({ id, setIsDeleted, user }: MenuProps) => {
  const { ref, isOpen, toggleDropdown } = useDropdown() // 드롭다운 상태 관리
  const { modalData, handleModalStates, Modal, isOpen: isModalOpen } = useModal()

  // Todo: 리뷰삭제 및 쓰기 API 연결
  const options = [
    {
      name: '리뷰',
      // route: ROUTES.HOME.url,
    },
    {
      name: '삭제',
      // route: ROUTES.HOME.url,
      // action: 리뷰 삭제 API
    },
  ]

  /**
   * 스크랩 삭제하기
   */
  const { mutate } = useMutation({
    mutationKey: ['place', 'scrap', { placeId: id }],
    mutationFn: placeDeleteScrap,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['places', 'scrap'] })
    },
  })

  const deleteScrapHandler = () => {
    handleModalStates(ClientModalData.deleteScrap, 'open')
  }

  const addReviewHandler = () => {
    handleModalStates(ClientModalData.serviceOnReady, 'open')
  }
  const onConfirmHandler = () => {
    if (modalData.id === 'confirm') {
      switch (modalData) {
        case ClientModalData.deleteScrap:
          mutate(
            { placeId: id, accessToken: user.accessToken },
            {
              onSuccess: () => {
                setIsDeleted(prev => !prev)
                toast({ title: '여행지가 삭제되었습니다' })
              },
            },
          )
          toggleDropdown() // 드롭다운 닫기
          break
      }
    }
  }

  return (
    <>
      <LucideIcon name='EllipsisVertical' className='absolute right-0' onClick={toggleDropdown} />
      {isOpen && (
        <ToggleWrapper
          ref={ref}
          isOpen={isOpen}
          className='absolute bottom-[-260%] right-0 z-10 rounded-md border border-solid border-black bg-white text-xs'
        >
          <div
            onClick={addReviewHandler}
            className='flex items-center justify-center gap-2 border-b border-solid border-black px-2 py-2 hover:bg-tbPrimary'
          >
            <span>{options[0].name}</span>
            <LucideIcon name='PencilLine' size={16} />
          </div>
          <div
            onClick={deleteScrapHandler}
            className='flex items-center justify-center gap-2 px-2 py-2 hover:bg-tbPrimary'
          >
            <span>{options[1].name}</span>
            <LucideIcon name='Trash2' size={16} />
          </div>
        </ToggleWrapper>
      )}
      <Modal onConfirm={onConfirmHandler} />
    </>
  )
}
