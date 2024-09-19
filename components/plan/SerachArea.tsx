'use client'
import React, { ReactNode, useState } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'
import useFilters from '@/lib/utils/hooks/useFilters'
import DUMMYPLACEIMG from '@/public/dummy/dummy_place_image.png'

import { Input } from '../ui/input'
import { PlaceCard } from './PlaceCards'

interface SearchAreaProps {
  className?: string
  name: 'Plan' | 'Place'
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
}

// Dummy Place
const DUMMY_PLACE: Place = {
  id: 125405,
  name: '토함산자연휴양림',
  imgSrc: DUMMYPLACEIMG,
  address: '경상북도 경주시 양북면 불국로',

  tag: '관광지',
  duration: 60,
  stars: 5,
  visitCnt: 100, // 실제 계획에 담긴 횟수

  geo: {
    latitude: 127,
    longitude: 32,
  },
  //reviews: Array<Comment>
  reviewCnt: 10,

  isAdded: true, // 계획에 들어갔는지 여부
  isScraped: true,

  order: 1, // 계획세우기에 담긴 순서
}

const SearchArea = ({ name, setIsSearching, className }: SearchAreaProps): ReactNode => {
  const [input, setInput] = useState<string>('')
  const { filter, filterHandler, applyAllFilters, arrange, UseArrange, UseFilter } = useFilters(name)

  // Todo: 진짜 데이터로 구현
  const data: Array<Place> = Array(40).fill(DUMMY_PLACE)
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
      <div className='flex w-full items-center justify-between'>
        <UseFilter movePageHandler={movePageHandler} hasReset={false} className='h-[6dvh]' />
        <div className='mr-3 flex min-w-fit items-center text-xs text-tbGray md:w-fit md:text-sm'>
          <UseArrange />
        </div>
      </div>
      {/* 데이터 */}
      <div className='flex w-full flex-grow flex-col overflow-y-auto'>
        {data.map((place, index) => (
          <PlaceCard key={index} data={place} />
        ))}
      </div>
    </div>
  )
}

export default SearchArea
