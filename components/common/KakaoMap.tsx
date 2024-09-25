import React, { ReactNode } from 'react'
import { Map, Polyline } from 'react-kakao-maps-sdk'

import useMapStore, { NullableGeoArray } from '@/lib/context/mapStore'
import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'
import { colorSet } from '@/public/colors/colors'

import { SpriteMapMarker } from './MapPin'

interface KakaoMapProps {}

const KakaoMap = ({}: KakaoMapProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩
  const { pins, center, focusedPlanPins, focusedPlacePin } = useMapStore()

  const pinsPath = pins?.map(pin => ({
    lat: pin.latitude,
    lng: pin.longitude,
  }))

  const getPath = (pins: NullableGeoArray) => {
    if (pins) {
      return pins.map(pin => ({
        lat: pin.latitude,
        lng: pin.longitude,
      }))
    }
    return []
  }

  return (
    <Map // 지도를 표시할 Container
      id='map'
      center={{
        // 지도의 중심좌표
        lat: center.latitude,
        lng: center.longitude,
      }}
      isPanto={true}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={6} // 지도의 확대 레벨
    >
      {pins?.map((pin, index) => <SpriteMapMarker key={index} geo={pin} order={index} id='schedule' />)}
      {focusedPlanPins?.map((pin, index) => <SpriteMapMarker key={index} geo={pin} order={index} id='scrap' />)}
      {focusedPlacePin && <SpriteMapMarker geo={focusedPlacePin} order={0} id='focus' />}

      {/* 경로 */}
      {pins && (
        <Polyline path={getPath(pins)} strokeColor={colorSet.tbOrange} strokeStyle='shortdot' strokeWeight={4} />
      )}
    </Map>
  )
}

export default KakaoMap
