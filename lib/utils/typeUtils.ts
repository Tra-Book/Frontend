export type BaseEntity = {
  id: number
}

export type Partial<T> = {
  [p in keyof T]?: T[p]
}

export type ReadOnly<T> = {
  readonly [p in keyof T]: T[p]
}

export type Required<T> = {
  [p in keyof T]-?: T[p]
}

export type Nullable<T> = T | null
