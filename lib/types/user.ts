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
