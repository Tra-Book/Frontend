import React, { ReactNode } from 'react'

interface PopularPlanProps {}

const PopularPlan = ({}: PopularPlanProps): ReactNode => {
  return (
    <div className='mb-7'>
      <p className='mb-7 mt-10 text-3xl'>TraBook 인기 여행계획</p>
      <div className='h-[320px]'>
        {/* <Slider {...setting}>
          {popular &&
            popular.map(item => (
              <Link
                key={item.placeId}
                className='h-[320px]'
                style={{ width: 400 }}
                href={`/community/place/detail/${item.placeId}`}
                scroll={false}
              >
                {render(item)}
              </Link>
            ))}
        </Slider> */}
      </div>
    </div>
  )
}

export default PopularPlan
