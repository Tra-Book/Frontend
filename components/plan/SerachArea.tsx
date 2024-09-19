'use client'
import React, { ReactNode, useState } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import useFilters from '@/lib/utils/hooks/useFilters'

import Filters from '../main/Filters'
import { Input } from '../ui/input'

interface SearchAreaProps {
  className?: string
  name: 'Plan' | 'Place'
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchArea = ({ name, setIsSearching, className }: SearchAreaProps): ReactNode => {
  const [input, setInput] = useState<string>('')
  const { filter, filterHandler, applyAllFilters, arrange, arrangeChoices, arrangeHandler } = useFilters(name)

  // Todo: 페이지네이션 구현
  const movePageHandler = () => {}
  return (
    <div className={cn('relative flex flex-col items-start justify-start', className)}>
      {/* 유저 입력 */}
      <div className='relative flex min-h-[10dvh] w-full items-center justify-start px-2'>
        <Input
          id='input'
          value={input}
          placeholder='🔎 여행지를 검색하세요'
          className='h-12 flex-grow bg-tbWhite'
          type='text'
          onChange={e => setInput(e.target.value)}
        />
        <LucideIcon onClick={() => setIsSearching(false)} name='X' size={22} className='my-2 ml-2 self-start' />
      </div>
      {/* 필터 */}
      <Filters filter={filter} filterHandler={filterHandler} movePageHandler={movePageHandler} hasReset={false} />
    </div>
  )
}

export default SearchArea
