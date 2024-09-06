import React, { ReactNode } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

interface PaginationProps {
  total: number
  current: number
  movePageHandler: (pageNumber: number) => void
  className?: string
}

export const ELEMENTS_PER_PAGE = 6
const PAGE_GROUP_SIZE = 5 // 한 번에 보여줄 페이지 버튼 수

const CustomPagination = ({ total, current, movePageHandler, className }: PaginationProps): ReactNode => {
  const startPage = Math.floor((current - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1 // 현재 페이지 그룹의 첫 번째 페이지
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, total) // 현재 그룹의 마지막 페이지

  // 이전 그룹의 마지막 페이지로 이동
  const handlePrevious = () => {
    const previousGroupPage = startPage - 1
    if (previousGroupPage > 0) {
      movePageHandler(previousGroupPage)
    }
  }

  // 다음 그룹의 첫 번째 페이지로 이동
  const handleNext = () => {
    const nextGroupPage = endPage + 1
    if (nextGroupPage <= total) {
      movePageHandler(nextGroupPage)
    }
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} disabled={current === 1} />
        </PaginationItem>

        {/* 페이지 번호 렌더링 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink isActive={pageNumber === current} onClick={() => movePageHandler(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext onClick={handleNext} disabled={current === total} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CustomPagination
