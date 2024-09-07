import React, { ReactNode } from 'react'

import Contents from '@/components/main/Contents'
import LucideIcon from '@/lib/icons/LucideIcon'
import { Geo } from '@/lib/types/Entity/place'
import DummyThumbNail from '@/public/dummy/dummy_plan_thumbnail.png'

interface MainStorePlacePageProps {}

// Todo: 실제 데이터 Fetch하여 사용하기
const dummy_place = {
  id: 1,
  name: '성산일출봉',
  state: '서울특별시',
  city: '강남구',
  location: {
    latitude: 127,
    longitude: 32,
  } as Geo,
  imageSrc: DummyThumbNail,
  tag: '휴양지',
  star: 4.3,
  reviewCnt: 20,
  reviews: [
    '성산일출봉을 가지 않는 것은 제주도 여행을 가지 않겠다는 것이랑 같다.',
    '친구들과 가기 좋아요',
    '연인과 가기 좋아요',
  ],
  usedCnt: 120,
}
export type DummyPlaceType = typeof dummy_place
let dummy_places = []
for (let i = 0; i < 40; i++) {
  dummy_places.push(dummy_place)
}

const MainStorePlacePage = ({}: MainStorePlacePageProps): ReactNode => {
  return (
    <div className='relative flex h-min min-h-screen-header flex-grow flex-col items-start justify-start gap-2 bg-white px-6 md:px-10'>
      <p className='flex h-[10dvh] min-h-[60px] w-full items-end pl-1 text-3xl font-semibold xl:text-4xl'>
        보관함
        <LucideIcon name='ChevronRight' size={36} />
        여행지
      </p>

      <Contents name='Place' datas={dummy_places} />
    </div>
  )
}

export default MainStorePlacePage
