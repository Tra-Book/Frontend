import { ReactNode } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'

import LucideIcon from '@/lib/icons/LucideIcon'
import { Geo } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'

interface MapPinProps {
  num: number
  size?: number
  className?: string
}

export const MapPin = ({ num, size, className }: MapPinProps): ReactNode => {
  return (
    <div className={cn('relative h-fit w-fit', className)}>
      <LucideIcon size={size} name='MapPin' fill='tbOrange' strokeWidth={0} className='origin-bottom' />
      <span className='group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs'>{num}</span>
    </div>
  )
}

interface SpriteMapMarkerProps {
  geo: Geo
  order: number
}

const MARKER_SIZE = 44
const MAX_MARKER_COUNT = 16
export const SpriteMapMarker = ({ geo, order }: SpriteMapMarkerProps): ReactNode => {
  return (
    <MapMarker
      position={{
        lat: geo.latitude,
        lng: geo.longitude,
      }}
      image={{
        src: 'https://storage.cloud.google.com/trabook-20240822/frontendComponent/map_markers.png',
        size: {
          // 사용할 이미지 크기
          width: MARKER_SIZE,
          height: MARKER_SIZE,
        },
        options: {
          alt: '마커 이미지',
          spriteOrigin: {
            // 사용할 영역의 좌상단 좌표
            x: 0,
            y: MARKER_SIZE * order,
          },
          spriteSize: {
            // 전체 이미지 크기
            width: MARKER_SIZE,
            height: MARKER_SIZE * MAX_MARKER_COUNT,
          },
        },
      }}
    />
  )
}
