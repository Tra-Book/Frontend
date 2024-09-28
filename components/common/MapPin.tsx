import { ReactNode } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'

import LucideIcon from '@/lib/icons/LucideIcon'
import { Geo } from '@/lib/types/Entity/place'
import { cn } from '@/lib/utils/cn'
import { ColorType } from '@/public/colors/colors'

export const MAX_MAP_MARKERS = 10
export const MAP_MARKERS: string[] = ['']

for (let i = 1; i <= MAX_MAP_MARKERS; i++) {
  MAP_MARKERS.push(`https://storage.googleapis.com/trabook-20240822/frontendComponent/map_marker_day${i}.png`)
}
export const MAP_MARKER_COLORS: string[] = [
  '#FFFFFF', // 안쓰는 값
  'tbOrange',
  'tbGreen',
  'tbRed',
  'tbPrimary',
  'tbBlue',
  'tbMappin6',
  'tbMappin7',
  'tbMappin8',
  'tbMappin9',
  'tbMappin10',
]

const FOCUS_MAP_PIN = 'https://storage.cloud.google.com/trabook-20240822/frontendComponent/map_marker_focus.png'

interface MapPinProps {
  num: number
  size?: number
  fillIndex: number
  className?: string
}

export const MapPin = ({ num, size, fillIndex = 1, className }: MapPinProps): ReactNode => {
  return (
    <div className={cn('relative h-fit w-fit', className)}>
      <LucideIcon
        size={size}
        name='MapPin'
        fill={MAP_MARKER_COLORS[fillIndex] as ColorType}
        strokeWidth={0}
        className='origin-bottom'
      />
      <span className='group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs'>{num}</span>
    </div>
  )
}

interface SpriteMapMarkerProps {
  geo: Geo
  day?: number
  order: number
  id: 'pins' | 'focus'
}

const MARKER_SIZE = 44
const MAX_MARKER_COUNT = 16
export const SpriteMapMarker = ({ geo, day, order, id }: SpriteMapMarkerProps): ReactNode => {
  let imgSrc: string = ''
  let zIndex: number
  if (id === 'pins') {
    // pins인 경우 day 무조건 있음
    imgSrc = MAP_MARKERS[day as number]
    zIndex = 10
  }
  // 하나의 핀 (id === "focus")
  else {
    imgSrc = FOCUS_MAP_PIN
    zIndex = 20
  }

  return (
    <MapMarker
      position={{
        lat: geo.latitude,
        lng: geo.longitude,
      }}
      image={{
        src: imgSrc,
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
            height: id === 'focus' ? MARKER_SIZE : MARKER_SIZE * MAX_MARKER_COUNT,
          },
        },
      }}
      zIndex={zIndex}
    />
  )
}
