'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import React, { ReactNode, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Loading from '@/components/common/Loading'
import { STATES, StateType } from '@/lib/constants/regions'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

import PlanCard from './PlanCard'
import { FilterPlan, FILTERS, FilterType } from './planType'
import { DURATION_FILTERS, DurationFilterType, MEMBER_FILTERS, MemberFilterType } from './planType'

interface PlanFilterProps {}

type Query = {
  filterDetail: StateType | MemberFilterType | DurationFilterType
  scrollNum: number
}

const getPlans = async (query: Query) => {
  const { filterDetail, scrollNum } = query
  const URL = BACKEND_ROUTES.PLANS.GENERAL

  let queryString = `?pageSize=100&userScrapOnly=false&search=&pageNum=${scrollNum}`
  if (STATES.some(state => state === filterDetail)) {
    queryString += `&state=${filterDetail}`
  } else if (DURATION_FILTERS.some(duration => duration === filterDetail)) {
    queryString += `&duration=${filterDetail[3]}`
  } else {
    queryString += `&numOfPeople=${filterDetail.slice(0, -1)}`
  }

  try {
    const res = await fetch(`/server${URL.url}${queryString}`, {
      method: URL.method,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching places')
      error.message = await res.json()
      throw error
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const PlanFilter = ({}: PlanFilterProps): ReactNode => {
  const [filter, setFilter] = useState<FilterType>(FILTERS[0])
  const [filterDetail, setFilterDetail] = useState<StateType | MemberFilterType | DurationFilterType>(STATES[0])
  const { ref, inView } = useInView({ threshold: 0.5 })

  const onClickFilter: React.MouseEventHandler<HTMLDivElement> = e => {
    const clickedFilter = e.currentTarget.textContent || FILTERS[0]
    if (FILTERS.includes(clickedFilter) && filter !== clickedFilter) {
      setFilter(clickedFilter)

      if (clickedFilter === FILTERS[0]) {
        setFilterDetail(STATES[0])
      } else if (clickedFilter === FILTERS[1]) {
        setFilterDetail(MEMBER_FILTERS[0])
      } else {
        setFilterDetail(DURATION_FILTERS[0])
      }
    }
  }

  const onClickFilterDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent as StateType | MemberFilterType | DurationFilterType
    setFilterDetail(text)
  }

  const { data, fetchNextPage, hasNextPage, refetch, isPending } = useInfiniteQuery({
    queryKey: ['plans', 'community', filterDetail],
    queryFn: ({ pageParam = 0 }) =>
      getPlans({
        filterDetail: filterDetail,
        scrollNum: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const maxPage = lastPage.totalPages
      const nextPage = allPages.length + 1
      return nextPage <= maxPage ? nextPage : undefined
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    // refetch()
  }, [filterDetail])

  const renderDetailFilter = (filter: FilterType) => {
    let detailFilter
    if (filter === FILTERS[0]) {
      detailFilter = STATES
    } else if (filter === FILTERS[1]) {
      detailFilter = MEMBER_FILTERS
    } else {
      detailFilter = DURATION_FILTERS
    }
    return detailFilter.map(detail => (
      <div
        key={detail}
        onClick={e => onClickFilterDetail(e)}
        className={cn(
          'rounded-full px-3 py-2 text-base hover:bg-tbPrimaryHover hover:text-white',
          detail === filterDetail && 'scale-110 bg-tbPrimaryHover text-white',
        )}
      >
        {detail}
      </div>
    ))
  }

  return (
    <div className='mt-16 w-full'>
      {/* 필터 */}
      <div className='flex h-16 items-center gap-3 border-b-[2px] border-solid border-black'>
        {FILTERS.map(item => (
          <div
            key={item}
            onClick={onClickFilter}
            className={cn(
              'ml-3 rounded-full px-3 py-2 text-xl font-semibold hover:bg-tbPrimaryHover hover:text-white',
              item === filter && 'scale-110 bg-tbPrimaryHover text-white',
            )}
          >
            {item}
          </div>
        ))}
      </div>
      {/* 세부 필터 */}
      <div className='flex flex-wrap items-center gap-3 p-3'>{renderDetailFilter(filter)}</div>
      {/* Plans Infinite Scroll */}
      <div className='flex flex-wrap items-center justify-evenly gap-5'>
        {data?.pages.map((page, scrollIndex) =>
          page?.plans.map((plan: FilterPlan, index: number) => (
            <React.Fragment key={plan.plan.planId}>
              <div className='flex h-[288px] w-[330px] items-center justify-center'>
                <PlanCard plan={plan.plan} />
              </div>
              {scrollIndex === data.pages.length - 1 && index === 8 && <div ref={ref} />}
            </React.Fragment>
          )),
        )}
        {data?.pages[0].totalPages === 0 && (
          <div className='mt-5 text-2xl'>만들어진 계획이 없습니다. 계획을 만들고 공유하세요!</div>
        )}
      </div>
      {/* Loading */}
      <div className='flex h-28 w-full items-center justify-center'>
        {(hasNextPage || isPending) && <Loading size={40} />}
      </div>
    </div>
  )
}

export default PlanFilter
