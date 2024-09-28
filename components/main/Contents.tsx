'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useRef, useState } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import { fetchPlaces, PlaceCardType } from '@/lib/HTTP/places/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import useFilters, { allElements } from '@/lib/utils/hooks/useFilters'
import { scrollToTop } from '@/lib/utils/scroll'

import CustomPagination from '../common/Pagination'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import MainPlaceCard from './MainPlaceCard'
import MainPlanCard from './MainPlanCard'

// 데이터 없을때 contents
// Todo: "여행 계획하기" 버튼에 onClick 필요 (post 생성 API 연결)
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

  const [currentPage, setCurrentPage] = useState<number>(1)
  const { filter, filterHandler, applyAllFilters, arrange, UseArrange, UseFilter } = useFilters(name)
  const searchInputRef = useRef<HTMLInputElement>(null) // Ref를 사용하여 input 값 관리

  // 페이지네이션
  const movePageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    scrollToTop()
  }

  // #0. Data Fetching
  const queryObj =
    name === 'Plan'
      ? {
          queryKey: ['plans', 'scrap', user?.userId, currentPage],
          queryFn: () =>
            fetchPlaces({
              searchInput: searchInputRef.current?.value || '',
              states: filter.state.includes('전체') ? [] : filter.state,
              arrange: arrange,
              scrollNum: currentPage,
              isScrap: true, // 일반 여행지 Fetching : False
              accessToken: session.data.accessToken,
            }),
          enabled: user !== undefined,
        }
      : {
          queryKey: ['places', 'scrap', user?.userId, currentPage],
          queryFn: () =>
            fetchPlaces({
              searchInput: searchInputRef.current?.value || '',
              states: filter.state.includes('전체') ? [] : filter.state,
              arrange: arrange,
              scrollNum: currentPage,
              isScrap: true, // 일반 여행지 Fetching : False
              accessToken: session.data.accessToken,
            }),
          enabled: user !== undefined,
        }

  const { data, isPending, refetch } = useQuery(queryObj)

  let contents
  // Case1: 데이터 자체가 없는 경우 (필터 초기 상태)
  if (filter.state !== allElements && data?.datas.length === 0) {
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
    // Case2-1: 필터된 데이터가 없음
    if (!filteredData) {
      contents = (
        <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-3xl font-bold'>
          <p>검색 결과가 없습니다!</p>
          <Button
            variant='tbPrimary'
            className='relative flex h-14 w-52 items-center justify-center gap-3 text-xl font-semibold'
            onClick={() => filterHandler('all', 'reset')}
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
          <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-1 pl-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {filteredData.map((data, index) =>
              name === 'Plan' ? (
                //TODO: PlanCardType으로 바꿔야함
                <MainPlanCard key={index} data={data as PlaceCardType} />
              ) : (
                <MainPlaceCard key={index} data={data as PlaceCardType} />
              ),
            )}
          </div>
          <CustomPagination
            total={Math.ceil(data?.totalPages)}
            current={currentPage}
            movePageHandler={movePageHandler}
            className='my-4'
          />
        </>
      )
    }
  }

  return (
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
      {contents}
    </>
  )
}
export default Contents
