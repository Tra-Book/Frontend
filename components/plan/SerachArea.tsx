'use client'
import React, { ReactNode, useRef } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'
import useFilters from '@/lib/utils/hooks/useFilters'
import DUMMYPLACEIMG from '@/public/dummy/dummy_place_image.png'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { PlaceCard } from './PlaceCards'

interface SearchAreaProps {
  className?: string
  name: 'Plan' | 'Place'
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
  focusedPlaceCard: Place | undefined
  setFocusedPlaceCard: React.Dispatch<React.SetStateAction<Place | undefined>>
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
    latitude: 33.450701,
    longitude: 126.570667,
  },
  //reviews: Array<Comment>
  reviewCnt: 10,

  isAdded: true, // 계획에 들어갔는지 여부
  isScraped: true,

  order: 1, // 계획세우기에 담긴 순서
}

const SearchArea = ({
  name,
  setIsSearching,
  focusedPlaceCard,
  setFocusedPlaceCard,
  className,
}: SearchAreaProps): ReactNode => {
  const searchInputRef = useRef<HTMLInputElement>(null) // Ref를 사용하여 input 값 관리
  const { filter, filterHandler, applyAllFilters, arrange, UseArrange, UseFilter } = useFilters(name)

  // Todo: Default 지역 Filter : 여행계획의 필터
  // Todo: search / filter / sort가 적용된 데이터
  const data: Array<Place> = Array(14).fill(DUMMY_PLACE)

  let contents
  if (data.length === 0) {
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-xl font-bold'>
        <p>검색 결과가 없습니다!</p>
        <Button
          variant='tbPrimary'
          className='relative flex h-14 w-40 items-center justify-center gap-3 text-lg font-semibold'
          onClick={() => filterHandler('all', 'reset')}
        >
          초기화
          <LucideIcon name='RotateCw' size={20} />
        </Button>
      </div>
    )
  } else {
    // #2. 무한스크롤 적용
    contents = data.map((place, index) => (
      <PlaceCard
        key={index}
        data={place}
        focusedPlaceCard={focusedPlaceCard}
        setFocusedPlaceCard={setFocusedPlaceCard}
      />
    ))
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    const input = searchInputRef.current?.value || ''
    // TODO: 백엔드 새로운 데이터 받아오기
  }
  const movePageHandler = () => {}
  return (
    <div className={cn('relative flex flex-col items-start justify-start', className)}>
      {/* 유저 입력 */}
      <div className='relative flex min-h-[10dvh] w-full items-center justify-start px-2'>
        <form onSubmit={submitHandler} className='flex-grow'>
          <Input
            id='input'
            ref={searchInputRef}
            placeholder='🔎 여행지를 검색하세요'
            className='h-9 bg-tbWhite'
            type='text'
          />
        </form>
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
      <div className='flex w-full flex-grow flex-col items-center overflow-y-auto'>{contents}</div>
    </div>
  )
}

export default SearchArea
