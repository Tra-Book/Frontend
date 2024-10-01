'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import usePlanStore from '@/lib/context/planStore'
import { queryClient } from '@/lib/HTTP/http'
import { fetchPlaces, PlaceCardType, SCROLL_SIZE } from '@/lib/HTTP/places/API'
import { fetchPlans, PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import { bounce } from '@/lib/types/animation'
import { cn } from '@/lib/utils/cn'
import useFilters, { initArrange } from '@/lib/utils/hooks/useFilters'

import { Motion } from '../common/MotionWrapper'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { PlaceCard, PlanCard } from './Cards'

interface SearchAreaProps {
  name: 'Plan' | 'Place'
  focusCard: PlaceCardType | PlanCardType | undefined
  handleClickCard: (card: PlaceCardType | PlanCardType) => void
  className?: string
  // setFocusedPlaceCard: React.Dispatch<React.SetStateAction<Place | undefined>>
}

const SearchArea = ({ name, focusCard, handleClickCard, className }: SearchAreaProps): ReactNode => {
  console.log('SearchArea name:', name)

  const pathname = usePathname()
  const session: any = useSession()

  const { filter, filterHandler, arrange, arrangeHandler, UseArrange, UseFilter } = useFilters(name)
  const { planData, isReduced, isSearching, setIsReduced, setIsSearching } = usePlanStore()
  const { ref, inView } = useInView({ threshold: 0.5 })
  const searchInputRef = useRef<HTMLInputElement>(null) // Ref를 사용하여 input 값 관리

  // # 처음 들어오면 설정한 지역으로 설정
  const [isFirstQueryDone, setIsFirstQueryDone] = useState(false)
  useEffect(() => {
    setIsFirstQueryDone(true)
    filterHandler('state', 'change', [planData.state])
  }, [])

  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey:
      name === 'Plan' ? ['plans', 'scrap'] : pathname.includes('scrap') ? ['places', 'scrap'] : ['places', 'schedule'],
    queryFn: async ({ pageParam = 0 }) => {
      const commonParams = {
        searchInput: searchInputRef.current?.value || '',
        states: !isFirstQueryDone ? [planData.state] : filter.state.includes('전체') ? [] : filter.state,
        arrange: arrange,
        scrollNum: pageParam,
        accessToken: session.data.accessToken,
      }

      // 조건에 따라 다른 함수 호출
      if (name === 'Place') {
        console.log('Enetered fetchPlaces')

        const response = await fetchPlaces({
          ...commonParams,
          isScrap: pathname.includes('scrap'), // 일반 여행지 Fetching: False
        })
        return response
      } else {
        const response = await fetchPlans({
          ...commonParams,
          isScrap: true, // 스크랩한 여행 계획
        })
        return response
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage에는 fetch callback의 리턴값이 전달됨
      // allPage에는 배열안에 지금까지 불러온 데이터를 계속 축적하는 형태 [[data], [data1], .......]
      const maxPage = lastPage.totalPages
      const nextPage = allPages.length + 1 //
      return nextPage <= maxPage ? nextPage : undefined // 다음 데이터가 있는지 없는지 판단
    },
    enabled: session.data !== undefined,
  })

  // #0-1. Scroll Event Data Fetching
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  // #0-2. New Data Fetching
  useEffect(() => {
    queryClient.refetchQueries({
      queryKey:
        name === 'Plan'
          ? ['plans', 'scrap']
          : pathname.includes('scrap')
            ? ['places', 'scrap']
            : ['places', 'schedule'],
    })
    refetch() // 첫 페이지부터 refetch하도록 설정
  }, [filter, arrange])

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    refetch()
  }
  const resetHandler = () => {
    if (searchInputRef.current) searchInputRef.current.value = ''
    filterHandler('all', 'reset')
    name === 'Plan' ? arrangeHandler(initArrange['Plan']) : arrangeHandler(initArrange['Place'])
  }

  let contents

  if (!session.data) {
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-lg font-bold'>
        잠시만 기다려주세요
      </div>
    )
  }
  if (isFetching && !isFetchingNextPage) {
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-lg font-bold'>
        <Motion animation={bounce()}>{name === 'Place' ? '여행지 로딩중입니다!' : '여행계획 로딩중입니다'}</Motion>
      </div>
    )
  } else if (data?.pages[0].datas.length === 0) {
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-xl font-bold'>
        <p>검색 결과가 없습니다!</p>
        <Button
          variant='tbPrimary'
          className='relative flex h-14 w-40 items-center justify-center gap-3 text-lg font-semibold'
          onClick={resetHandler}
        >
          초기화
          <LucideIcon name='RotateCw' size={20} />
        </Button>
      </div>
    )
  } else {
    // #2. 무한스크롤 적용
    if (name === 'Place') {
      contents =
        data &&
        data.pages.map((page, scrollIndex) =>
          page.datas.map((place, index) => {
            place = place as PlaceCardType

            // Fetch boundary를 8번째 카드 이후에 배치
            const isBoundary = scrollIndex === data.pages.length - 1 && index === SCROLL_SIZE / 2
            return (
              <React.Fragment key={place.id}>
                <PlaceCard
                  data={place as PlaceCardType}
                  focusedPlaceCard={focusCard as PlaceCardType | undefined}
                  handleClickCard={handleClickCard as (card: PlaceCardType) => void}
                />
                {/* 무한스크롤 경계(중간에 위치) */}
                {isBoundary && <div ref={ref} />}
              </React.Fragment>
            )
          }),
        )
    } else {
      contents =
        data &&
        data.pages.map((page, scrollIndex) =>
          page.datas.map((plan, index) => {
            plan = plan as PlanCardType
            // Fetch boundary를 8번째 카드 이후에 배치
            const isBoundary = scrollIndex === data.pages.length - 1 && index === SCROLL_SIZE / 2
            return (
              <React.Fragment key={index}>
                <PlanCard
                  data={plan as PlanCardType}
                  handleClickCard={handleClickCard as (card: PlanCardType) => void}
                />
                {/* 무한스크롤 경계(중간에 위치) */}
                {isBoundary && <div ref={ref} />}
              </React.Fragment>
            )
          }),
        )
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
