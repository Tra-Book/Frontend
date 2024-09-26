export const USER_DEAFULT_STATUSMESSAGE = '여행이 주는 행복'

export interface BaseUser {
  id: number
  imageSrc: string
  name: string
  statusMessage: string
}

export interface User extends BaseUser {
  email: string
  password: string
}
