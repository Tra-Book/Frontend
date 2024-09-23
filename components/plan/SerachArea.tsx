'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { ReactNode, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { DUMMY_PLAN } from '@/lib/constants/dummy_data'
import usePlanStore from '@/lib/context/planStore'
import LucideIcon from '@/lib/icons/LucideIcon'
import { fetchPlans, ResponsePlace } from '@/lib/server/plan/API'
import { Place } from '@/lib/types/Entity/place'
import { Plan } from '@/lib/types/Entity/plan'
import { cn } from '@/lib/utils/cn'
import useFilters, { StateChoicesType } from '@/lib/utils/hooks/useFilters'

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
  const { ref, inView } = useInView({ threshold: 0 })
  const searchInputRef = useRef<HTMLInputElement>(null) // Ref를 사용하여 input 값 관리

  const fetchData = async (scrollNum: number) => {
    const params = {
      searchInput: searchInputRef.current?.value || '',
      states: ['서울특별시'] as Array<StateChoicesType>,
      // states: filter.state,
      arrange: arrange,
      scrollNum: scrollNum,
    }
    try {
      const { places, totalPages } = await fetchPlans(params)
      const datas: Place[] = places.map((place: ResponsePlace) => ({
        id: place.placeId,
        name: place.placeName,
        imgSrc: place.imageSrc,
        address: place.address,
        geo: {
          latitude: place.latitude,
          longitude: place.longitude,
        },
        tag: place.category,
        // duration 없음
        stars: place.star,
        visitCnt: place.numOfAdded,
        // reviews 아직 없음
        // reviewCnt 아직 없음
        reviewCnt: 0,
        isScraped: false, // Todo: 실제 데이터 받아오기
        // order 없음
      }))
      return { datas, totalPages }
    } catch (error) {
      console.log('Failed to fetch plans')
    }
    return {
      datas: [],
      totalPages: 0,
    }
  }

  const { data, fetchNextPage, isPending, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['places', searchInputRef.current?.value || '', filter.state, arrange],
    queryFn: ({ pageParam = 0 }) => fetchData(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage에는 fetch callback의 리턴값이 전달됨
      // allPage에는 배열안에 지금까지 불러온 데이터를 계속 축적하는 형태 [[data], [data1], .......]
      const maxPage = lastPage.totalPages
      const nextPage = allPages.length + 1 //
      return nextPage <= maxPage ? nextPage : undefined // 다음 데이터가 있는지 없는지 판단
    },
  })
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView])

  // 새로운 데이터 받아오기
  useEffect(() => {
    refetch()
  }, [filter, arrange])
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    refetch()
  }

  // let data: Array<Place> = DUMMY_PLACES
  let tmpPlanData: Array<Plan> = Array(14).fill(DUMMY_PLAN)
  let contents
  if (isPending) {
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-lg font-bold'>
        <p>여행지 로딩중입니다!</p>
      </div>
    )
  } else if (!data) {
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
      contents = data.pages.map(page =>
        page.datas.map(place => (
          <PlaceCard
            key={place.id}
            data={place}
            focusedPlaceCard={focusCard as Place | undefined}
            handleClickCard={handleClickCard as (card: Place) => void}
          />
        )),
      )
    } else {
      contents = tmpPlanData.map((plan, index) => (
        <PlanCard key={index} data={plan} handleClickCard={handleClickCard as (card: Plan) => void} />
      ))
    }
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
          <button type='submit' className='hidden' />
        </form>
      </div>
      {/* 필터 */}
      <div className='flex w-full items-center justify-between'>
        <UseFilter movePageHandler={movePageHandler} hasReset={false} className='h-[7dvh]' />
        <div className='mr-3 flex min-w-fit items-center text-xs text-tbGray md:w-fit md:text-sm'>
          <UseArrange />
        </div>
      </div>
      {/* 데이터 */}
      <div className='flex w-full flex-grow flex-col items-center overflow-y-auto'>
        {contents}
        {/* 무한스크롤 경계 */}
        <div ref={ref} />
      </div>
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
