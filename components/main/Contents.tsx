'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import { queryClient } from '@/lib/HTTP/http'
import { fetchPlaces, PlaceCardType } from '@/lib/HTTP/places/API'
import { fetchPlans, PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import useFilters, { initArrange } from '@/lib/utils/hooks/useFilters'
import { scrollToTop } from '@/lib/utils/scroll'

import LoadingPage from '../common/LoadingPage'
import CustomPagination from '../common/Pagination'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import MainPlaceCard from './MainPlaceCard'
import MainPlanCard from './MainPlanCard'

// 데이터 없을때 contents
const generateErrorContent = (pathname: string) => {
  const errorMap: Record<
    string,
    { message: string[]; btnInfo: { route: string; placeHolder: string; Icon: React.JSX.Element } }
  > = {
    [ROUTES.MAIN.STORE_PLAN.url]: {
      message: ['보관함에 여행 계획이 없습니다!', '회원들의 재밌는 여행 계획을 참고하세요'],
      btnInfo: {
        route: ROUTES.COMMUNITY.PLAN.url,
        placeHolder: '커뮤니티 가기',
        Icon: <LucideIcon name='ArrowUpRight' size={26} />,
      },
    },
    [ROUTES.MAIN.STORE_PLACE.url]: {
      message: ['보관함에 여행지가 없습니다!', '다양한 여행지를 참고하여 여행을 완성하세요'],
      btnInfo: {
        route: ROUTES.COMMUNITY.PLACE.url,
        placeHolder: '커뮤니티 가기',
        Icon: <LucideIcon name='ArrowUpRight' size={26} />,
      },
    },
  }

  const defaultError = {
    message: ['오류가 발생했습니다.', '다시 시도해주세요.'],
    btnInfo: { route: '/', placeHolder: '홈으로 가기', Icon: <LucideIcon name='House' size={26} /> },
  }

  return errorMap[pathname] || defaultError
}

// Todo: DummyPlanType을 실제 받는 데이터 Type으로 변경
interface ContentsProps {
  name: 'Plan' | 'Place'
}

const Contents = ({ name }: ContentsProps): ReactNode => {
  const pathname = usePathname()
  const session: any = useSession()
  const user = session.data

  const [currentScroll, setCurrentScroll] = useState<number>(0)
  const { filter, filterHandler, applyAllFilters, arrange, arrangeHandler, UseArrange, UseFilter } = useFilters(name)
  const searchInputRef = useRef<HTMLInputElement>(null) // Ref를 사용하여 input 값 관리

  // 페이지네이션
  const movePageHandler = (pageNumber: number) => {
    setCurrentScroll(pageNumber)
    scrollToTop()
  }
  // Reset Filter
  const resetHandler = () => {
    if (searchInputRef.current) searchInputRef.current.value = ''
    arrangeHandler(initArrange[name])
    filterHandler('all', 'reset')
    setCurrentScroll(0) // 페이지네이션 초기화
  }

  // #0. Data Fetching
  const queryKey =
    name === 'Plan' ? ['plans', 'scrap', user?.userId, currentScroll] : ['places', 'scrap', user?.userId, currentScroll]
  const { data, isFetching, refetch } = useQuery({
    queryKey: queryKey,

    queryFn: async () => {
      const commonParams = {
        searchInput: searchInputRef.current?.value || '',
        states: filter.state.includes('전체') ? [] : filter.state,
        arrange: arrange,
        scrollNum: currentScroll,
        accessToken: session.data.accessToken,
        isScrap: true,
      }

      if (name === 'Plan') {
        const response = await fetchPlans({
          ...commonParams,
        })
        return response
      } else {
        const response = await fetchPlaces({
          ...commonParams,
        })
        return response
      }
    },
    enabled: user !== undefined,
  })
  // #0. Refetch when Filter Change
  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: queryKey,
    })
    refetch()
  }, [filter, arrange])

  let contents
  if (isFetching) {
    contents = contents = <LoadingPage className='h-96 w-full flex-grow' />
  }
  // Case1: 데이터 자체가 없는 경우 (필터 초기 상태)
  else if (data && filter.state.includes('전체') && data?.datas.length === 0) {
    const { message, btnInfo } = generateErrorContent(pathname)
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-xl font-bold sm:text-3xl'>
        <p className='text-pretty'>{message[0]}</p>
        <p className='text-pretty text-center'>{message[1]}</p>
        <Link href={btnInfo.route}>
          <Button
            variant='tbPrimary'
            className='relative flex h-14 w-52 items-center justify-center gap-3 text-xl font-semibold'
          >
            {btnInfo.placeHolder}
            {btnInfo.Icon}
          </Button>
        </Link>
      </div>
    )
  }
  // Case2 : 데이터는 있음 (페이지네이션으로 이동한건 항상 있어야 만 함)
  else {
    const filteredData = data?.datas
    console.log('filteredData:', filteredData)

    // Case2-1: 필터된 데이터가 없음
    if (!filteredData || filteredData.length === 0) {
      contents = (
        <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-3xl font-bold'>
          <p>필터된 결과가 없습니다!</p>
          <Button
            variant='tbPrimary'
            className='relative flex h-14 w-52 items-center justify-center gap-3 text-xl font-semibold'
            onClick={resetHandler}
          >
            필터 초기화
            <LucideIcon name='RotateCw' size={26} />
          </Button>
        </div>
      )
    }
    // Case2-2: 필터된 데이터 있음
    else {
      contents = (
        <>
          <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-4 pl-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {filteredData.map((data, index) =>
              name === 'Plan' ? (
                //TODO: PlanCardType으로 바꿔야함
                <MainPlanCard key={index} data={data as PlanCardType} />
              ) : (
                <MainPlaceCard key={index} data={data as PlaceCardType} user={session.data} />
              ),
            )}
          </div>
          <CustomPagination
            total={Math.ceil(data?.totalPages)}
            current={currentScroll + 1}
            movePageHandler={movePageHandler}
            className='my-4'
          />
        </>
      )
    }
  }

  return (
    <>
      {!isFetching && (
        <>
          <UseFilter movePageHandler={movePageHandler} hasReset={true} />
          <div className='relative mb-3 flex h-auto min-h-min w-full items-center justify-between pl-1'>
            <p className='hidden text-xl font-medium md:block'>
              총 {name === 'Plan' ? '계획' : '여행지'} {data?.datas.length}개
            </p>
            <div className='mr-3 flex w-full flex-row-reverse flex-wrap-reverse items-center justify-between gap-4 text-xs text-tbGray md:w-fit md:flex-row md:flex-nowrap md:text-sm'>
              <UseArrange />

              <Input
                id='input'
                ref={searchInputRef}
                placeholder='🔎 여행 제목으로 검색해보세요'
                className='h-full w-full min-w-[140px] justify-self-end md:w-fit'
                type='text'
              />
            </div>
          </div>
        </>
      )}
      {contents}
    </>
  )
}
export default Contents
