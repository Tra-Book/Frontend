export const USER_DEAFULT_STATUSMESSAGE = 'TRABOOK과 떠나는 여행'

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
