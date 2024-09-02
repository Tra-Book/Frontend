import { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

import { Input } from '../ui/input'

const DesktopMenu = ({ className }: { className?: string }): ReactNode => {
  // Style
  const listStyle =
    'w-1/3 max-w-[80px] text-center text-base 2xl:text-lg xl:max-w-[100px] cursor-pointer hover:text-black'
  return (
    <div className={cn(className, 'h-[9dvh] min-h-[60px] w-full items-center justify-between font-medium')}>
      <div className='flex items-center justify-start'>
        <LucideIcon name='SlidersHorizontal' size={20} />
        <ul className='flex w-80 items-center justify-start'>
          <li className={cn(listStyle, 'border-r border-solid border-black')}>전체</li>
          <li className={cn(listStyle, 'border-r border-solid border-black text-tbGray')}>계획 중</li>
          <li className={cn(listStyle, 'text-tbGray')}>계획 완료</li>
        </ul>
      </div>
      <Input className='w-1/5 min-w-[270px] justify-self-end' placeholder='🔎 제목, 글 내용을 검색해보세요' />
    </div>
  )
}

export default DesktopMenu
