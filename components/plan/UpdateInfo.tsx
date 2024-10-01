'use client'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'

import { Label } from '@/components/ui/label'
import { PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import { ROUTES } from '@/lib/constants/routes'
import usePlanStore from '@/lib/context/planStore'
import { updatePlan } from '@/lib/HTTP/plan/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { toast } from '@/lib/utils/hooks/useToast'
import { Nullable } from '@/lib/utils/typeUtils'

import { Input } from '../ui/input'

interface UpdateInfoProps {}

const UpdateInfo = ({}: UpdateInfoProps): ReactNode => {
  const session: any = useSession()
  const router = useRouter()
  const { planData, setPlanData } = usePlanStore()

  // #0. 값 저장
  const saveChanges = (id: 'title' | 'description' | 'memberCnt' | 'budget', value: any) => {
    console.log({ id: value })

    setPlanData({
      [id]: value,
    })
  }
  // #1. Image Update
  const [previewUrl, setPreviewUrl] = useState<Nullable<string>>(null) // 임시 이미지 URL
  const onClickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPlanData({
        imgSrc: file,
      })

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // #2. 제출하기
  const { mutate, isPending } = useMutation({
    mutationKey: ['plan', 'update', planData.id],
    mutationFn: updatePlan,
    onSuccess: (data, variables) => {
      // #3. 여행계획 디테일 페이지로 Redirect
      router.push(`${ROUTES.PLAN.DETAIL.url}/${data.planId}`)
    },
    onError: error => {
      toast({ title: error.message })
    },
  })
  useEffect(() => {
    console.log(planData)
  }, [planData])

  // const addPostHandler = () => {
  //   // #1. 바뀐 값으로 업데이트
  //   const updatedPlan: Plan = {
  //     ...planData,
  //     title,
  //     description,
  //     memberCnt,
  //     budget,
  //     isDone: true,
  //     isPublic: true, // 완료하면 무조건 공개 (기획)
  //   }

  //   // #2. Update하기
  //   mutate({ plan: updatedPlan, userId: session.data.userId })
  // }

  return (
    <section className='mt-2 flex h-full w-full flex-col gap-5 border-t-[1px] border-tbPlaceholder p-10'>
      <div className='flex items-end gap-5'>
        <h2 className='inline-block border-b-[2px] border-tbPrimary text-2xl font-semibold'>계획 정보</h2>
        <LucideIcon name='SquarePen' size={20} />
      </div>

      <div className='flex h-3/4 w-full gap-10'>
        <div className='flex h-[90%] flex-col items-center'>
          <Label htmlFor='image' className='h-full w-full justify-center hover:cursor-pointer'>
            <p className='text-base'>썸네일</p>
            <Image
              alt='썸네일 이미지'
              src={previewUrl || (typeof planData.imgSrc === 'string' ? planData.imgSrc : PLAN_DEFAULT_IMAGE)}
              className='aspect- mt-2 h-full rounded-lg'
              quality={70}
              width={400}
              height={180}
            />
          </Label>
          <Input id='image' type='file' className='hidden' onChange={onClickImage} />
        </div>

        <div className='grid w-1/2 grid-cols-2 grid-rows-3 justify-items-center gap-10'>
          <div className='w-full'>
            <Label className='mb-2 flex text-base'>제목</Label>
            <Input
              className='h-13'
              placeholder='여행 제목을 입력해주세요'
              type='text'
              value={planData.title ? planData.title : ''}
              onChange={e => saveChanges('title', e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label className='mb-2 flex text-base'>설명</Label>
            <Input
              className='h-13'
              placeholder='어떤 여행인가요?'
              type='text'
              value={planData.description ? planData.description : ''}
              onChange={e => saveChanges('description', e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label className='mb-2 flex text-base'>인원수</Label>
            <Input
              className='h-13'
              placeholder='몇명이서 여행가시나요?'
              type='number'
              value={planData.memberCnt ? planData.memberCnt : ''}
              onChange={e => saveChanges('memberCnt', e.target.value ? parseInt(e.target.value, 10) : null)}
            />
          </div>
          <div className='w-full'>
            <Label className='mb-2 flex text-base'>예산</Label>
            <Input
              className='h-13'
              type='number'
              placeholder='예산을 입력해주세요?'
              value={planData.budget ? planData.budget : ''}
              onChange={e => saveChanges('budget', e.target.value ? parseInt(e.target.value, 10) : null)}
            />
          </div>
          {/* <Button onClick={addPostHandler} variant='tbPrimary' className='col-span-2 mt-2 w-40 justify-self-end'>
            {isPending ? <Loading /> : '여행 개시하기'}
          </Button> */}
        </div>
      </div>
    </section>
  )
}

export default UpdateInfo
