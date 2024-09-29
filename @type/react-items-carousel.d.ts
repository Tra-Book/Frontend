declare module 'react-items-carousel' {
  import React from 'react'

  export interface ItemsCarouselProps {
    // 필요한 props를 정의합니다.
    children: React.ReactNode
    numberOfCards: number
    requestToChangeActive: Dispatch<SetStateAction<number>>
    activeItemIndex: Dispatch<SetStateAction<number>>
    gutter: number
    slidesToScroll: number
    infiniteLoop: boolean
    rightChevron: React.ReactNode
    leftChevron: React.ReactNode
    chevronWidth: number
    // 더 많은 props를 추가할 수 있습니다.
  }

  export default function ItemsCarousel(props: ItemsCarouselProps): JSX.Element
}
