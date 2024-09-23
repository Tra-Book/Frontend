import { create } from 'zustand'

import { Plan } from '../types/Entity/plan'
import { Nullable } from '../utils/typeUtils'

interface PlanContext {
  planData: Nullable<Plan>
  isReduced: boolean
  setIsReduced: (val: boolean | ((prev: boolean) => boolean)) => void

  isSearching: boolean
  setIsSearching: (val: boolean | ((prev: boolean) => boolean)) => void
}

const usePlanStore = create<PlanContext>(set => ({
  planData: null,

  setPlanData: (updatedPlan: Plan) => {
    set(() => ({ planData: updatedPlan }))
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
}))

export default usePlanStore
