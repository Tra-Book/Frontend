import { create } from 'zustand'

import { Geo } from '../types/Entity/place'
import { Nullable } from '../utils/typeUtils'

type NullableGeo = Nullable<Geo>
type NullableGeoArray = Nullable<Array<Geo>>

interface MapContext {
  center: Geo // 중심좌표
  setCenter: (newCenter: Geo) => void

  pins: NullableGeoArray // 스케쥴 핀
  setPins: (updatedPins: NullableGeoArray) => void

  focusedPlanPins: NullableGeoArray // 보관함 여행계획핀
  setFocusedPlanPins: (updatedPins: NullableGeoArray) => void

  focusedPlacePin: NullableGeo // 보관함 여행지핀
  setFocusedPlacePin: (updatedPin: NullableGeo) => void
}

const useMapStore = create<MapContext>(set => ({
  center: {
    latitude: 33.450701,
    longitude: 126.570667,
  },
  setCenter: (newCenter: Geo) => {
    set(() => ({ center: newCenter }))
  },

  pins: null,
  setPins: (updatedPins: NullableGeoArray) => {
    set(() => ({ pins: updatedPins }))
  },

  // 여행계획 클릭시
  focusedPlanPins: null,
  setFocusedPlanPins: (updatedPins: NullableGeoArray) => {
    set(() => ({ focusedPlanPins: updatedPins }))
  },

  // 여행지 하나 클릭시
  focusedPlacePin: null,
  setFocusedPlacePin: (updatedPin: NullableGeo) => {
    set(() => ({ focusedPlacePin: updatedPin }))
  },
}))

export default useMapStore
