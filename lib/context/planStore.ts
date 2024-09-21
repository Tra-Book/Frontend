import { create } from 'zustand' // create로 zustand를 불러옵니다.

import { Plan } from '../types/Entity/plan'

interface PlanContext {
  planData: Plan | Partial<Plan>
  setPlanData: (updatedPlan: Plan | Partial<Plan>) => void
}

const usePlanStore = create<PlanContext>(set => ({
  planData: {},
  setPlanData: (updatedPlan: Plan | Partial<Plan>) => {
    set(state => ({ planData: { ...state.planData, ...updatedPlan } }))
  },
}))

export default usePlanStore
