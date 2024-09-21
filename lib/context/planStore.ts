import { create } from 'zustand' // create로 zustand를 불러옵니다.

import { Plan } from '../types/Entity/plan'
import { Nullable } from '../utils/typeUtils'

interface PlanContext {
  planData: Nullable<Plan>
}

const usePlanStore = create<PlanContext>(set => ({
  planData: null,
  setPlanData: (updatedPlan: Plan) => {
    set(() => ({ planData: updatedPlan }))
  },
}))

export default usePlanStore
