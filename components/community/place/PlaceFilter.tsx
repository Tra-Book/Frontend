'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Loading from '@/components/common/Loading'
import { STATES, StateType } from '@/lib/constants/regions'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import { PLACE_TAG, PlaceTagType } from '@/lib/constants/tag'
import { cn } from '@/lib/utils/cn'

import PlaceCard from './PlaceCard'
import { DetailPlace } from './placeType'

type Query = {
  filterDetail: StateType | PlaceTagType
  scrollNum: number
}

const isStateType = (text: any): boolean => {
  return STATES.includes(text)
}

const isPlaceTagType = (text: any): boolean => {
  return PLACE_TAG.includes(text)
}

const getPlaces = async (query: Query) => {
  const { filterDetail, scrollNum } = query
  const URL = BACKEND_ROUTES.PLACES.GENERAL

  let key
  STATES.some(state => state === filterDetail) ? (key = 'state') : (key = 'category')

  try {
    const res = await fetch(
      `/server${URL.url}?search=&sorts=numOfAdded&pageSize=100&pageNum=${scrollNum}&userScrapOnly=false&${key}=${filterDetail}`,
      {
        method: URL.method,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!res.ok) {
      const error = new Error('An error occurred while fetching places')
      error.message = await res.json()
      throw error
    }
    const data = await res.json()
    return data
  } catch (error) {
    // toast({ title: 'Internal Server Error Occured!' })
  }
}

interface PlaceFilterProps {}

const PlaceFilter = ({}: PlaceFilterProps): ReactNode => {
  const [filter, setFilter] = useState<'region' | 'tag'>('region')
  const [filterDetail, setFilterDetail] = useState<StateType | PlaceTagType>('서울특별시')
  const { ref, inView } = useInView({ threshold: 0.5 })

  const onClickFilter = () => {
    filter === 'region' ? setFilter('tag') : setFilter('region')
    filter === 'region' ? setFilterDetail('관광지') : setFilterDetail('서울특별시')
  }

  const onClickFilterDetail = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const text = e.currentTarget.textContent
    const detail = text && (isPlaceTagType(text) || isStateType(text)) ? text : ''
    setFilterDetail(detail)
  }

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['places', 'community', filterDetail],
    queryFn: ({ pageParam = 0 }) =>
      getPlaces({
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
    refetch()
  }, [filterDetail])

  return (
    <div className='white mt-16 w-full rounded-lg'>
      {/* 지역별, 태그별 필터 */}
      <div className='flex h-16 items-center gap-3 border-b-[2px] border-solid border-black'>
        <div
          onClick={onClickFilter}
          className={cn(
            'ml-3 rounded-full px-3 py-2 text-xl font-semibold hover:bg-tbPrimaryHover hover:text-white',
            filter === 'region' && 'scale-110 bg-tbPrimaryHover text-white',
          )}
        >
          지역별
        </div>
        <div
          onClick={onClickFilter}
          className={cn(
            'rounded-full px-3 py-2 text-xl font-semibold hover:bg-tbPrimaryHover hover:text-white',
            filter === 'tag' && 'scale-110 bg-tbPrimaryHover text-white',
          )}
        >
          태그별
        </div>
      </div>
      {/* 세부 필터 */}
      <div className='flex flex-wrap items-center gap-3 p-3'>
        {filter === 'region'
          ? STATES.map(state => (
              <div
                key={state}
                onClick={e => onClickFilterDetail(e)}
                className={cn(
                  'rounded-full px-3 py-2 text-base hover:bg-tbPrimaryHover hover:text-white',
                  state === filterDetail && 'scale-110 bg-tbPrimaryHover text-white',
                )}
              >
                {state}
              </div>
            ))
          : PLACE_TAG.map(tag => (
              <div
                key={tag}
                onClick={e => onClickFilterDetail(e)}
                className={cn(
                  'rounded-full px-3 py-2 text-base hover:bg-tbPrimaryHover hover:text-white',
                  tag === filterDetail && 'scale-110 bg-tbPrimaryHover text-white',
                )}
              >
                {tag}
              </div>
            ))}
      </div>
      {/* Places Infinite Scroll */}
      <div className='flex flex-wrap items-center justify-evenly gap-5'>
        {data?.pages.map((group, scrollIndex) => {
          return (
            <Fragment key={`${scrollIndex}-${group.places[0]?.placeId}`}>
              {group?.places.map((place: DetailPlace, index: number) => (
                <>
                  <div
                    key={`${scrollIndex}-${index}-${place.place.placeId}`}
                    className='flex h-[288px] w-[330px] items-center justify-center'
                  >
                    <PlaceCard place={place.place} commentsNum={place.comments.length} />
                  </div>
                  {scrollIndex === data.pages.length - 1 && index === 8 && <div ref={ref} />}
                </>
              ))}
            </Fragment>
          )
        })}
        {/* Loading */}
        <Loading size={40} />
      </div>
    </div>
  )
}

export default PlaceFilter
