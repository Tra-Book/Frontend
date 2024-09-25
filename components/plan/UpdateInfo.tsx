'use client'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'

import { Label } from '@/components/ui/label'
import { PLAN_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'
import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface UpdateInfoProps {}

const UpdateInfo = ({}: UpdateInfoProps): ReactNode => {
  const { planData, setPlanData } = usePlanStore()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // #1. Image Update
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

  useEffect(() => {
    console.log(previewUrl)
  }, [previewUrl])

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
            <Input className='h-13' id='' type='text' />
          </div>
          <div className='w-full'>
            <Label className='mb-2 flex text-base'>설명</Label>
            <Input className='h-13' id='' type='text' />
          </div>
          <div className='w-full'>
            <Label className='mb-2 flex text-base'>인원수</Label>
            <Input className='h-13' id='' type='text' />
          </div>
          <div className='w-full'>
            <Label className='mb-2 flex text-base'>예산</Label>
            <Input className='h-13' id='' type='text' />
          </div>
          <Button variant='tbPrimary' className='col-span-2 mt-2 w-40'>
            글쓰기
          </Button>
        </div>
      </div>
    </section>
  )
}

export default UpdateInfo
