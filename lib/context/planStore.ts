import { create } from 'zustand'

import { Plan } from '../types/Entity/plan'
import { Nullable } from '../utils/typeUtils'


interface PlanContext {
  planData: Nullable<Plan>
  isReduced: boolean
  isSearching: boolean
  setPlanData: (updatedPlan: Plan) => void
  setIsReduced: (val: boolean | ((prev: boolean) => boolean)) => void
  setIsSearching: (val: boolean | ((prev: boolean) => boolean)) => void
}

const usePlanStore = create<PlanContext>(set => ({
  planData: null,
  isReduced: false,
  isSearching: false,

  setPlanData: (updatedPlan: Plan) => {
    set(() => ({ planData: updatedPlan }))
  },

  setIsReduced: val => {
    set(state => ({
      isReduced: typeof val === 'function' ? val(state.isReduced) : val,
    }))
  },

  setIsSearching: val => {
    set(state => ({
      isSearching: typeof val === 'function' ? val(state.isSearching) : val,
    }))
  },
}))

export default usePlanStore
