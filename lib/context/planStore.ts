import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { INITIAL_PLAN } from '../constants/dummy_data'
import { Plan } from '../types/Entity/plan'

interface PlanContext {
  planData: Plan
  setPlanData: (updatedPlan: Partial<Plan>) => void

  isReduced: boolean
  setIsReduced: (val: boolean | ((prev: boolean) => boolean)) => void

  isSearching: boolean
  setIsSearching: (val: boolean | ((prev: boolean) => boolean)) => void
}

// Helper function to revive date strings to Date objects
// const reviveDates = (planData: Plan): Plan => {
//   return {
//     ...planData,
//     startDate: new Date(planData.startDate),
//     endDate: new Date(planData.endDate),
//   }
// }

const usePlanStore = create(
  persist<PlanContext>(
    set => ({
      planData: INITIAL_PLAN,
      setPlanData: (updatedPlan: Partial<Plan>) => {
        set(state => ({ planData: { ...state.planData, ...updatedPlan } }))
      },

      isReduced: false,
      setIsReduced: val => {
        set(state => ({
          isReduced: typeof val === 'function' ? val(state.isReduced) : val,
        }))
      },

      isSearching: false,
      setIsSearching: val => {
        set(state => ({
          isSearching: typeof val === 'function' ? val(state.isSearching) : val,
        }))
      },
    }),
    {
      name: 'plan-context',
      storage: createJSONStorage(() => sessionStorage, {
        reviver: (key, value) => {
          if (value) {
            if (key === 'startDate' || key === 'endDate') return new Date(value as string)
          }
          return value
        },
      }),
      // 상태를 불러올 때 호출
    },
  ),
)

export default usePlanStore
