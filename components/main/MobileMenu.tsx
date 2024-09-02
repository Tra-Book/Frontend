'use client'
import { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '../ui/drawer'
import { Input } from '../ui/input'

// 선택지들
export const classifyOptions = ['전체', '계획 중', '계획 완료']
export const regionOptions = [
  '전체',
  '서울',
  '인천',
  '경기도',
  '강원도',
  '제주도',
  '부산',
  '대전',
  '광주',
  '세종',
  '울릉도',
  '울산',
  '독도',
]
export const arrangeOptions = ['좋아요순', '최신순']

// 필터, 검색 창
const MobileMenu = ({ className }: { className?: string }): ReactNode => {
  return (
    <div className={cn(className, 'flex h-[9dvh] min-h-[60px] w-full items-center justify-between font-medium')}>
      <Input className='w-1/5 min-w-[250px] justify-self-end' placeholder='🔎 제목, 글 내용을 검색해보세요' />

      <Drawer>
        <DrawerTrigger asChild>
          <LucideIcon name='SlidersHorizontal' size={26} />
        </DrawerTrigger>
        <DrawerContent className='flex items-center justify-start'>
          <DrawerHeader className='flex items-center justify-center'>
            <p className='text-3xl font-semibold'>필터</p>
            <DrawerTrigger className='absolute right-6'>
              <Button variant='ghost' className='shadow-none'>
                <LucideIcon name='X' size={24} />
              </Button>
            </DrawerTrigger>
          </DrawerHeader>
          <div className='flex w-[90%] flex-col gap-3 border-t border-solid border-tbPlaceholder py-8'>
            <p className='w-fit border-b border-solid border-black text-xl font-semibold'>분류</p>
            <div className='flex flex-wrap items-start justify-start gap-4'>
              {classifyOptions.map(option => (
                <Button key={option} variant='tbGray' className='w-[65px] text-xs'>
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className='flex w-[90%] flex-col gap-3 border-t border-solid border-tbPlaceholder py-8'>
            <p className='w-fit border-b border-solid border-black text-xl font-semibold'>지역</p>
            <div className='flex flex-wrap items-start justify-start gap-4'>
              {regionOptions.map(option => (
                <Button key={option} variant='tbGray' className='w-[65px] text-xs'>
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className='flex w-[90%] flex-col gap-3 border-t border-solid border-tbPlaceholder py-8'>
            <p className='w-fit border-b border-solid border-black text-xl font-semibold'>정렬</p>
            <div className='flex flex-wrap items-start justify-start gap-4'>
              {arrangeOptions.map(option => (
                <Button key={option} variant='tbGray' className='w-[65px] text-xs'>
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default MobileMenu
