import React, { ReactNode } from 'react'
import { Map } from 'react-kakao-maps-sdk'

import useMapStore from '@/lib/context/mapStore'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'

import { SpriteMapMarker } from './MapPin'

interface KakaoMapProps {}

const KakaoMap = ({}: KakaoMapProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩
  const { center, focusedPlanPins, focusedPlacePin } = useMapStore()

  return (
    <Map // 지도를 표시할 Container
      id='map'
      center={{
        // 지도의 중심좌표
        lat: center.latitude,
        lng: center.longitude,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={8} // 지도의 확대 레벨
    >
      {/* {pins?.map((pin, index) => <SpriteMapMarker key={index} geo={pin} order={index} id='schedule' />)} */}
      {focusedPlanPins?.map((pin, index) => <SpriteMapMarker key={index} geo={pin} order={index} id='scrap' />)}
      {focusedPlacePin && <SpriteMapMarker geo={focusedPlacePin} order={0} id='focus' />}
    </Map>
  )
}

export default KakaoMap
