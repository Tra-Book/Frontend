import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { MAX_MAP_MARKERS } from '@/components/common/MapPin'

import { Geo } from '../types/Entity/place'
import { Nullable } from '../utils/typeUtils'

// Nullable 타입을 정의합니다.

interface MapContext {
  center: Geo // 중심좌표
  setCenter: (newCenter: Geo) => void

  pins: Array<Geo[]> // 스케줄 핀
  setPins: (day: number, updatedPins: Geo[]) => void
  clearPins: () => void

  focusedPlacePin: Nullable<Geo> // 보관함 여행지핀
  setFocusedPlacePin: (updatedPin: Nullable<Geo>) => void
  clearFocusedPlacePin: () => void

  clearAllPins: () => void
}

const useMapStore = create(
  persist<MapContext>(
    (set, get) => ({
      center: {
        latitude: 37.294068,
        longitude: 126.976654,
      },
      setCenter: (newCenter: Geo) => {
        set(() => ({ center: newCenter }))
      },

      pins: Array.from({ length: MAX_MAP_MARKERS + 1 }, () => []),
      /**
       *
       * @param day 핀이 업데이트될 날짜
       * @param updatedPins 바뀔 핀값
       */
      setPins: (day: number, updatedPins: Geo[]) => {
        set(state => {
          const newPins = [...state.pins]
          newPins[day] = updatedPins
          return { pins: newPins }
        })
      },
      clearPins: () => set(() => ({ pins: Array.from({ length: MAX_MAP_MARKERS + 1 }, () => []) })),

      // 여행지 하나 클릭시
      focusedPlacePin: null,
      setFocusedPlacePin: (updatedPin: Nullable<Geo>) => {
        set(() => ({ focusedPlacePin: updatedPin }))
      },
      clearFocusedPlacePin: () => set(() => ({ focusedPlacePin: null })),

      //모든 Pin 지우기
      // 모든 Pin 지우기
      clearAllPins: () =>
        set(() => ({
          pins: Array.from({ length: MAX_MAP_MARKERS + 1 }, () => []),
          focusedPlacePin: null,
        })),
    }),
    {
      name: 'map-context',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useMapStore
