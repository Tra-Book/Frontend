'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import { PlanCardType } from '@/lib/HTTP/plans/API'
import LucideIcon from '@/lib/icons/LucideIcon'
import useFilters, { initArrange } from '@/lib/utils/hooks/useFilters'
import { scrollToTop } from '@/lib/utils/scroll'

import CustomPagination, { ELEMENTS_PER_PAGE } from '../common/Pagination'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
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
  }

  const defaultError = {
    message: ['오류가 발생했습니다.', '다시 시도해주세요.'],
    btnInfo: { route: '/', placeHolder: '홈으로 가기', Icon: <LucideIcon name='House' size={26} /> },
  }

  return errorMap[pathname] || defaultError
}

interface MainPlanContentsProps {
  plans: PlanCardType[]
}

const MainPlanContents = ({ plans }: MainPlanContentsProps): ReactNode => {
  const pathname = usePathname()

  const { filter, filterHandler, applyAllFilters, arrange, arrangeHandler, UseArrange, UseFilter } = useFilters('Plan')
  const [searchInput, setSearchInput] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // 페이지네이션
  const movePageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    scrollToTop()
  }
  // Reset Filter
  const resetHandler = () => {
    setSearchInput('')
    filterHandler('all', 'reset')
    arrangeHandler(initArrange['Plan'])
  }

  // 필터 적용된 데이터
  const filteredData = applyAllFilters(plans, filter, searchInput, arrange)

  // currentPage가 변경될 때 페이지를 이동하고 필터 초기화
  useEffect(() => {
    movePageHandler(1)
  }, [filter, arrange])

  // // #1. 필터, 검색, 정렬 적용
  // const [filteredData, setFilteredData] = useState<PlanCardType[]>([])

  // // #1. 필터, 정렬 적용시
  // useEffect(() => {
  //   const newFilteredData = applyAllFilters(plans, filter, searchInput, arrange)
  //   setFilteredData(newFilteredData)
  // }, [plans, filter, arrange, applyAllFilters])

  // useEffect(() => {
  //   movePageHandler(1)
  // }, [filteredData])
  let contents
  if (plans.length === 0) {
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
  } else if (filteredData.length === 0) {
    contents = (
      <div className='relative flex w-full flex-grow flex-col items-center justify-center gap-10 pb-1 text-3xl font-bold'>
        <p>검색 결과가 없습니다!</p>
        <Button
          variant='tbPrimary'
          className='relative flex h-14 w-52 items-center justify-center gap-3 text-xl font-semibold'
          onClick={resetHandler}
        >
          초기화
          <LucideIcon name='RotateCw' size={26} />
        </Button>
      </div>
    )
  } else {
    // #2. 페이지에 맞는 데이터
    const startIndex = (currentPage - 1) * ELEMENTS_PER_PAGE
    const endIndex = startIndex + ELEMENTS_PER_PAGE
    const displayedData = filteredData.slice(startIndex, endIndex)

    contents = (
      <>
        <div className='relative grid w-full grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden pb-4 pl-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {displayedData.map((data, index) => (
            <MainPlanCard key={index} data={data} />
          ))}
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

  return (
    <>
      <UseFilter movePageHandler={movePageHandler} hasReset={true} />
      <div className='relative mb-3 flex h-auto min-h-min w-full items-center justify-between pl-1'>
        <p className='hidden text-xl font-medium md:block'>총 계획 {filteredData.length}개</p>
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
export default MainPlanContents
