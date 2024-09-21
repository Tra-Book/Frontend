'use client'
import React, { ReactNode, useRef } from 'react'

import { DUMMY_PLACES, DUMMY_PLAN } from '@/lib/constants/dummy_data'
import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import useFilters from '@/lib/utils/hooks/useFilters'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { PlaceCard, PlanCard } from './Cards'

interface SearchAreaProps {
  className?: string
  name: 'Plan' | 'Place'
  handleClickCard: (card: Place | Plan) => void
  focusCard: Place | Plan | undefined
  // setFocusedPlaceCard: React.Dispatch<React.SetStateAction<Place | undefined>>
}

const SearchArea = ({ name, handleClickCard, focusCard, className }: SearchAreaProps): ReactNode => {
  const { filter, filterHandler, applyAllFilters, arrange, UseArrange, UseFilter } = useFilters(name)
  const { isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()

  const searchInputRef = useRef<HTMLInputElement>(null) // Ref를 사용하여 input 값 관리

  // Todo: Default 지역 Filter : 여행계획의 필터
  // Todo: search / filter / sort가 적용된 데이터
  let data: Array<Place> = DUMMY_PLACES
  let tmpPlanData: Array<Plan> = Array(14).fill(DUMMY_PLAN)
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
          handleClickCard={handleClickCard as (card: Place) => void}
        />
      ))
    } else {
      contents = tmpPlanData.map((plan, index) => (
        <PlanCard key={index} data={plan} handleClickCard={handleClickCard as (card: Plan) => void} />
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
      <div className='relative flex min-h-[7dvh] w-full items-center justify-start px-2'>
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
