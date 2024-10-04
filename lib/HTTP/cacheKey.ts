import { QueryClient, useMutation } from '@tanstack/react-query'

import { toast } from '../utils/hooks/useToast'
import { ExtractValueByKey } from '../utils/typeUtils'
import { addPlaceScrap, deletePlaceScrap } from './place/API'
import {
  addPlanComment,
  addPlanLikes,
  addPlanScrap,
  createPlan,
  deletePlan,
  deletePlanLikes,
  deletePlanScrap,
  updatePlan,
} from './plan/API'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 0,
      // 10분으로 staleTime 지정하기
      staleTime: 1 * 60 * 1000 * 10,
    },
    mutations: {
      retry: 1,
      retryDelay: 0,
    },
  },
})

/*
 * Mutation Keys to use Mutations convenient
 */
// 먼저, key와 fc의 구조를 정의합니다.

export const MUTATION_KEYS = {
  PLANS: {},
  PLAN: {
    CREATE: {
      key: ['createPlan'],
      fc: createPlan,
    },
    UPDATE: {
      key: ['updatePlan'],
      fc: updatePlan,
    },
    DELETE: {
      key: ['deletePlan'],
      fc: deletePlan,
    },
    LIKES: {
      ADD: {
        key: ['addPlanLikes'],
        fc: addPlanLikes,
      },
      DELETE: {
        key: ['deletePlanLikes'],
        fc: deletePlanLikes,
      },
    },
    SCRAPS: {
      ADD: {
        key: ['addPlanScrap'],
        fc: addPlanScrap,
      },
      DELETE: {
        key: ['deletePlanScrap'],
        fc: deletePlanScrap,
      },
    },
    COMMENTS: {
      ADD: {
        key: ['addPlanComment'],
        fc: addPlanComment,
      },
      // TODO: 댓글 삭제 로직 생성
      // DELETE: {
      //   key: ['deletePlanScrap'],
      //   fc: deletePlanScrap,
      // },
    },
  },
  PLACES: {},
  PLACE: {
    SCRAPS: {
      ADD: {
        key: ['addPlaceScrap'],
        fc: addPlaceScrap,
      },
      DELETE: {
        key: ['deletePlaceScrap'],
        fc: deletePlaceScrap,
      },
    },
  },
} as const
export type MutationKeyType = ExtractValueByKey<typeof MUTATION_KEYS, 'key'>

/**
 * 프로젝트 전반적인 로직에 필요한  Mutation 설정을 다룹니다.
 * 컴포넌트 내부 필요 로직은 useMutation의 return 값인 mutation의 options를 사용해주세요
 */
// #1. Plan
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.CREATE.key, { mutationFn: MUTATION_KEYS.PLAN.CREATE.fc }) // 생성
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.UPDATE.key, {
  mutationFn: MUTATION_KEYS.PLAN.UPDATE.fc,
  onSuccess: data => {
    toast({ title: '저장되었습니다' }) // 성공 메세지
    // queryClient.invalidateQueries({ queryKey: ['plan', planData.id] }) // Post 내용
    // queryClient.invalidateQueries({ queryKey: ['plans', session.data?.userId, 'user'] })
  },
  onError: () => {
    toast({ title: '다시 시도해주세요!' })
  },
  // onSettled: () => {
  //   queryClient.invalidateQueries({ queryKey: ['plan', { planId: id }] })
  //   queryClient.invalidateQueries({ queryKey: ['plans'] })
  // },
}) // 생성
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.DELETE.key, {
  mutationFn: MUTATION_KEYS.PLAN.DELETE.fc,
  onSuccess(data, variables, context) {
    toast({ title: '삭제 완료!' })
  },
}) // 삭제
/**
 * 좋아요
 */
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.LIKES.ADD.key, {
  mutationFn: MUTATION_KEYS.PLAN.LIKES.ADD.fc,
  // onSettled: () => {
  //   queryClient.invalidateQueries({ queryKey: ['plan', { planId: id }] })
  //   queryClient.invalidateQueries({ queryKey: ['plans'] })
  // },
})
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.LIKES.DELETE.key, {
  mutationFn: MUTATION_KEYS.PLAN.LIKES.DELETE.fc,
  onError(error, variables, context) {
    toast({ title: '서버 오류 다시 시도해주세요' })
  },
  // onSettled: () => {
  //   queryClient.invalidateQueries({ queryKey: ['plan', { planId: id }] })
  //   queryClient.invalidateQueries({ queryKey: ['plans'] })
  // },
})
/**
 * 스크랩
 */
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.SCRAPS.ADD.key, {
  mutationFn: MUTATION_KEYS.PLAN.SCRAPS.DELETE.fc,
  onSettled: () => {
    // queryClient.invalidateQueries({ queryKey: ['plan', { planId: id }] })
    // queryClient.invalidateQueries({ queryKey: ['plans'] })
  },
})
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.SCRAPS.DELETE.key, {
  mutationFn: MUTATION_KEYS.PLAN.SCRAPS.DELETE.fc,
  onSettled: () => {
    // queryClient.invalidateQueries({ queryKey: ['plan', { planId: id }] })
    // queryClient.invalidateQueries({ queryKey: ['plans'] })
  },
})
// 댓글
queryClient.setMutationDefaults(MUTATION_KEYS.PLAN.COMMENTS.ADD.key, {
  mutationFn: MUTATION_KEYS.PLAN.COMMENTS.ADD.fc,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: ['plan', planId] })
    toast({ title: '댓글 업로드 성공' })
  },
  onError: () => {
    toast({ title: '다시 시도해주세요!' })
  },
})

// #2. Place
// 스크랩
queryClient.setMutationDefaults(MUTATION_KEYS.PLACE.SCRAPS.ADD.key, { mutationFn: MUTATION_KEYS.PLACE.SCRAPS.ADD.fc })
queryClient.setMutationDefaults(MUTATION_KEYS.PLACE.SCRAPS.DELETE.key, {
  mutationFn: MUTATION_KEYS.PLACE.SCRAPS.DELETE.fc,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['places', 'scrap'] })
  },
  onError: () => {
    toast({ title: '다시 시도해주세요!' })
  },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['places', 'search'] })
  //   }
})
//const mutation = useMutation({ mutationKey: ['addUser'] });

// const planKeys = {
//   all: ['plan'],
//   list: (page: number) => [...articleKeys.all, 'list', page],
//   favoriteList: (page: number) => [...articleKeys.all, 'favorite', page],
//   detail: (id: number) => [...articleKeys.all, 'detail', id],
// }

// const { data } = useQuery(articleKeys.list(page), () => getArticle(page))

export const useMutationStore = <T>(mutationKey: MutationKeyType) => {
  return useMutation<unknown, Error, T, unknown>({ mutationKey })
}
