import { BaseEntity } from '@/lib/utils/typeUtils'

export interface BaseUser extends BaseEntity {
  imageSrc: string
  name: string
  statusMessage: string
}

export interface User extends BaseUser {
  email: string
  password: string
}
