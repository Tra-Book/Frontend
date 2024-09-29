import { QueryClient } from '@tanstack/react-query'
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

export enum HttpMethod {
  CREATE = 'CREATE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

/**
 * Whenever someone needs to reference new status code,
 * please add here
 * https://developer.mozilla.org/ko/docs/Web/HTTP/Status
 */
export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  NoContent = 204,
  SeeOther = 303,
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  Conflict = 409,
  IamAteapot = 418,
  InternalServerError = 500,
  NotImplemented,
}

type Query = {
  key: string
  value: any
}

export type Queries = Array<Query>

export const attachQuery = (API: string, query: Queries): string => {
  if (!query || query.length === 0) return API

  const queryString = query.map(({ key, value }) => `${key}=${value}`).join('&')

  return `${API}?${queryString}`
}
