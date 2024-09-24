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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default usePlanStore
