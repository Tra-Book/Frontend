import { create } from 'zustand'

import { Plan } from '../types/Entity/plan'

interface PlanContext {
  planData: Plan | Partial<Plan>
  setPlanData: (updatedPlan: Plan | Partial<Plan>) => void

  isReduced: boolean
  setIsReduced: (val: boolean | ((prev: boolean) => boolean)) => void

  isSearching: boolean
  setIsSearching: (val: boolean | ((prev: boolean) => boolean)) => void
}

const usePlanStore = create<PlanContext>(set => ({
  planData: {},
  setPlanData: (updatedPlan: Plan | Partial<Plan>) => {
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
}))

export default usePlanStore
