'use client'
import React, { ReactNode, useRef } from 'react'

import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Comment } from '@/lib/types/Entity/comment'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import useFilters from '@/lib/utils/hooks/useFilters'
import DUMMYPLACEIMG from '@/public/dummy/dummy_place_image.png'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { PlaceCard, PlanCard } from './Cards'

interface SearchAreaProps {
  className?: string
  name: 'Plan' | 'Place'
  handleClickCard:
    | React.Dispatch<React.SetStateAction<Place | undefined>>
    | React.Dispatch<React.SetStateAction<Plan | undefined>>
  focusCard: Place | Plan | undefined
  // setFocusedPlaceCard: React.Dispatch<React.SetStateAction<Place | undefined>>
}

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

const DUMMY_COMMENT: Comment = {
  id: 10,
  parentId: 9,
  content: '댓글',
  date: new Date(),
  thumbCnt: 100,
  userId: 41,
}
const DUMMY_PLAN: Plan = {
  id: 12345,
  title: '가족 여행',
  likeCnt: 30,
  isDone: true,
  startDate: new Date(),
  endDate: new Date(),
  budget: 10000,
  state: '서울특별시',
  city: '강서구',
  description: '전역한 아들들과 떠나는 즐겨운 여행입니다! 전역한 아들들과 떠나는 즐겨운 여행입니다!',
  imgSrc: DUMMYPLACEIMG,
  scrapCnt: 200,
  memberCnt: 10,
  userId: 41,
  comments: new Array(12).fill(DUMMY_COMMENT),
  isScraped: true,
  isLiked: true,
}

const SearchArea = ({ name, handleClickCard, focusCard, className }: SearchAreaProps): ReactNode => {
  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()

  const searchInputRef = useRef<HTMLInputElement>(null) // Ref를 사용하여 input 값 관리
  const { filter, filterHandler, applyAllFilters, arrange, UseArrange, UseFilter } = useFilters(name)

  // Todo: Default 지역 Filter : 여행계획의 필터
  // Todo: search / filter / sort가 적용된 데이터
  let data: Array<Place> = Array(14).fill(DUMMY_PLACE)
  let tmpPlaceData: Array<Plan> = Array(14).fill(DUMMY_PLAN)
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
    if (name === 'Place') {
      contents = data.map((place, index) => (
        <PlaceCard
          key={index}
          data={place}
          focusedPlaceCard={focusCard as Place | undefined}
          handleClickCard={handleClickCard as React.Dispatch<React.SetStateAction<Place | undefined>>}
        />
      ))
    } else {
      contents = tmpPlaceData.map((plan, index) => (
        <PlanCard
          key={index}
          data={plan}
          handleClickCard={handleClickCard as React.Dispatch<React.SetStateAction<Plan | undefined>>}
        />
      ))
    }
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
      <div className='relative flex min-h-[7dvh] w-full items-end justify-start px-2'>
        <form onSubmit={submitHandler} className='flex-grow'>
          <Input
            id='input'
            ref={searchInputRef}
            placeholder='🔎 여행지를 검색하세요'
            className='h-9 bg-tbWhite'
            type='text'
          />
        </form>
        {/* <LucideIcon
          onClick={() => setIsSearching(false)}
          name='X'
          size={22}
          className='my-2 ml-2 self-start hover:text-tbRed'
        /> */}
      </div>
      {/* 필터 */}
      <div className='flex w-full items-center justify-between'>
        <UseFilter movePageHandler={movePageHandler} hasReset={false} className='h-[7dvh]' />
        <div className='mr-3 flex min-w-fit items-center text-xs text-tbGray md:w-fit md:text-sm'>
          <UseArrange />
        </div>
      </div>
      {/* 데이터 */}
      <div className='flex w-full flex-grow flex-col items-center overflow-y-auto'>{contents}</div>
      {/* 축소 확대 버튼 */}
      {isSearching && (
        <div
          onClick={() => setIsSearching(prev => !prev)}
          className='absolute right-0 top-1/2 z-10 h-fit w-fit translate-x-full transform cursor-pointer rounded-r-md bg-tbWhite'
        >
          <LucideIcon name={isSearching ? 'ChevronsLeft' : 'ChevronsRight'} size={28} />
        </div>
      )}
    </div>
  )
}

export default SearchArea
