'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useState } from 'react'

import { DummyPlanType } from '@/app/(route)/(header)/main/page'
import { DummyPlaceType } from '@/app/(route)/(header)/main/store_place/page'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import useFilters from '@/lib/utils/hooks/useFilters'
import { scrollToTop } from '@/lib/utils/scroll'

import CustomPagination, { ELEMENTS_PER_PAGE } from '../common/Pagination'
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
    [ROUTES.MAIN.MY_PLAN.url]: {
      message: ['아직 생성한 여행 계획이 없습니다!', 'TRABOOK과 함께 신나는 여행을 계획하세요'],
      btnInfo: {
        route: ROUTES.PLAN.INDEX.url,
        placeHolder: '여행 계획하기',
        Icon: <LucideIcon name='Plane' size={26} />,
      },
    },
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
  datas: Array<DummyPlanType> | Array<DummyPlaceType>
}

const Contents = ({ name, datas }: ContentsProps): ReactNode => {
  const pathname = usePathname()
  const { filter, filterHandler, applyAllFilters, arrange, UseArrange, UseFilter } = useFilters(name)

  const [searchInput, setSearchInput] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // 페이지네이션
  const movePageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    scrollToTop()
  }

  /** 필터/검색이 적용된 값
   * 1. 필터 적용하기
   * 2. 검색값 적용하기
   * 3. 정렬 하기
   */
  let contents
  let filteredData: Array<DummyPlanType> | Array<DummyPlaceType> = []

  if (datas.length === 0) {
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
  } else {
    // #1. 필터, 검색, 정렬 적용
    filteredData = applyAllFilters(datas, filter, searchInput, arrange) as Array<DummyPlanType> | Array<DummyPlaceType>
    // #2. 페이지에 맞는 데이터 (로직 필요)
    const startIndex = (currentPage - 1) * ELEMENTS_PER_PAGE
    const endIndex = startIndex + ELEMENTS_PER_PAGE
    const displayedData = filteredData.slice(startIndex, endIndex)

    if (filteredData.length === 0) {
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
    } else {
      contents = (
        <>
          <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-1 pl-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {displayedData.map((data, index) =>
              name === 'Plan' ? (
                <MainPlanCard key={index} data={data as DummyPlanType} />
              ) : (
                <MainPlaceCard key={index} data={data as DummyPlaceType} />
              ),
            )}
          </div>
          <CustomPagination
            total={Math.ceil(filteredData.length / ELEMENTS_PER_PAGE)}
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
          총 {name === 'Plan' ? '계획' : '여행지'} {filteredData.length}개
        </p>
        <div className='mr-3 flex w-full flex-row-reverse flex-wrap-reverse items-center justify-between gap-4 text-xs text-tbGray md:w-fit md:flex-row md:flex-nowrap md:text-sm'>
          <UseArrange />

          <Input
            value={searchInput}
            onChange={e => setSearchInput(e.target?.value)}
            type='text'
            className='h-full w-full min-w-[140px] justify-self-end md:w-fit'
            placeholder='🔎 여행 제목으로 검색해보세요'
          />
        </div>
      </div>
      {contents}
    </>
  )
}
export default Contents
