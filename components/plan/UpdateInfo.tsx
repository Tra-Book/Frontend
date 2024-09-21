import Image from 'next/image'
import React, { ReactNode } from 'react'

import { Label } from '@/components/ui/label'
import LucideIcon from '@/lib/icons/LucideIcon'
import Dummy_thumbnail from '@/public/dummy/dummy_plan_thumbnail.png'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface UpdateInfoProps {}

const UpdateInfo = ({}: UpdateInfoProps): ReactNode => {
  return (
    <section className='flex h-full w-full flex-col gap-5 p-10'>
      <div className='flex items-end gap-5'>
        <h2 className='inline-block border-b-[2px] border-tbPrimary text-2xl font-semibold'>계획 정보</h2>
        <LucideIcon name='SquarePen' size={20} />
      </div>

      <div className='flex h-3/4 w-full gap-10'>
        <div className='h-full w-1/3'>
          <Label htmlFor='image' className='h-full w-full hover:cursor-pointer'>
            <p className='text-base'>썸네일</p>
            <Image
              alt='썸네일 이미지'
              src={Dummy_thumbnail}
              className='mt-2 w-full rounded-lg'
              width={100}
              height={100}
              quality={70}
            />
          </Label>
          <Input id='image' type='file' className='hidden' />
        </div>

        <div className='flex h-full w-1/4 flex-col gap-10'>
          <div className='w-full'>
            <Label htmlFor='' className='mb-2 flex text-base'>
              제목
            </Label>
            <Input className='h-13' id='' type='text' />
          </div>
          <div className='w-full'>
            <Label htmlFor='' className='mb-2 flex text-base'>
              인원수
            </Label>
            <Input className='h-13' id='' type='text' />
          </div>
        </div>

        <div className='flex h-full w-1/4 flex-col gap-10'>
          <div className='w-full'>
            <Label htmlFor='' className='mb-2 flex text-base'>
              설명
            </Label>
            <Input className='h-13' id='' type='text' />
          </div>
          <div className='w-full'>
            <Label htmlFor='' className='mb-2 flex text-base'>
              예산
            </Label>
            <Input className='h-13' id='' type='text' />
          </div>
          <Button variant='tbPrimary' className='w-20 self-end'>
            글쓰기
          </Button>
        </div>
      </div>
    </section>
  )
}

export default UpdateInfo
