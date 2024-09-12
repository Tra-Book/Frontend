import Link from 'next/link'
import React, { ReactNode } from 'react'

interface TravelInfoPageProps {}

const TravelInfoPage = ({}: TravelInfoPageProps): ReactNode => {
  return (
    <div>
      <div>초기 설정 페이지</div>
      <Link href='/plan/index'>여행 정보 수정</Link>
    </div>
  )
}

export default TravelInfoPage
