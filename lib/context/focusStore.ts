import { create } from 'zustand'

import { Geo } from '../types/Entity/place'
import { Nullable } from '../utils/typeUtils'

interface MapContext {
  center: Nullable<Geo>
  pins: Nullable<Array<Geo>>
  setPins: (updatedPins: Nullable<Array<Geo>>) => void

  focusedPlanPins: Nullable<Array<Geo>>
  setFocusedPlanPins: (updatedPins: Nullable<Array<Geo>>) => void

  focusedPlacePin: Nullable<Geo>
  setFocusedPlacePin: (updatedPin: Geo) => void
}

const useMapStore = create<MapContext>(set => ({
  center: null,

  pins: null,
  setPins: (updatedPins: Nullable<Array<Geo>>) => {
    set(() => ({ pins: updatedPins }))
  },

  // 여행계획 클릭시
  focusedPlanPins: null,
  setFocusedPlanPins: (updatedPins: Nullable<Array<Geo>>) => {
    set(() => ({ focusedPlanPins: updatedPins }))
  },

  // 여행지 하나 클릭시
  focusedPlacePin: null,
  setFocusedPlacePin: (updatedPin: Geo) => {
    set(() => ({ focusedPlacePin: updatedPin }))
  },
}))

export default useMapStore
