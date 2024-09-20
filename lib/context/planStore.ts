import { create } from 'zustand' // create로 zustand를 불러옵니다.

import { DUMMY_PLAN, Plan } from '../types/Entity/plan'

interface PlanContext {
  planData: Plan
}

const usePlanStore = create<PlanContext>(set => ({
  planData: DUMMY_PLAN,
  setPlanData: (updatedPlan: Plan) => {
    set(() => ({ planData: updatedPlan }))
  },
}))

export default usePlanStore
